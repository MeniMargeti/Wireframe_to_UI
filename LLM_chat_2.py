import json
import base64
import os
import requests
from dotenv import load_dotenv
load_dotenv('codes.env')
from UI_code import render_component, render_grid_placement
from project import main
import re
import shutil

main()
js=r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\project.json"
with open(js, "r", encoding="utf-8") as f:
    project_json = json.load(f)

prompt= r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\prompt.txt"# prompt given the json from figma 
prompt_2= r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\prompt_2.txt"#  prompt with LLM placement

import_statements = [
        "import React,{useState} from 'react';",
        "import Checkbox from '../components/Checkbox.jsx';",
        "import { PrimaryBackgroundButton, PrimaryBorderButton, SecondaryBackgroundButton, ThirdBackgroundButton } from '../components/Buttons.jsx';",
        "import { Input } from '../components/Input.jsx';",
        "import { PrimaryBackgroundDropdown } from '../components/Dropdowns.jsx';",
        "import Card from '../components/Card.jsx'",
        "import Header from '../components/Header.jsx';",
        "import Switch from '../components/Switch.jsx';",
        "import Table from '../components/Table.jsx'",
        "import Grid from '@mui/material/Grid';",
        "import Box from '@mui/material/Box'",
        "import { Typography } from '@mui/material'"
    ]
import_grid = [
  ".Grid {\n"
  "display: grid;\n"
  "grid-template-columns: repeat(12, 1fr);\n"
  "grid-auto-rows: repeat(15, 1fr); \n"
  "gap: 0.5rem;\n"
  "width: 100vw;\n" 
  "height: 100vh;\n"
  "}\n\n"
  ".Grid > * {\n"
  "overflow-wrap: break-word;\n"
  "word-break: break-word;\n"  
  "white-space: normal;\n"   
  "min-width: 0;\n}\n\n"              
]
from collections import defaultdict

route_files = defaultdict(lambda: {
    "jsx": [],
    "css": []
})

def set_primary_color(path, new_color):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

set_primary_color("C:\\Users\\menim\\OneDrive\\Υπολογιστής\\LLM_wrapper (1)\\my-react-app\\src\\colors.module.scss", project_json["primary_color"])
class LLMChatHandler:
    def __init__(self,model):
        self.url = os.environ.get("BASE_URL")
        self.access_token = os.environ.get("TOKEN")
        self.messages = []

    def _build_content_parts(self, message,screen):
        content_parts = []

        # Handle text
        if "message" in message and message["message"]:
            content_parts.append({"type": "text", "text": message["message"]})

        # Handle image
        if "image" in message:
            try:
                with open(message["image"]["path"], "rb") as image_file:
                    encoded_image = base64.b64encode(image_file.read()).decode("utf-8")

                content_parts.append({
                    "type": "image",
                    "source": {
                        "type": "base64",
                        "media_type": message["image"]["media_type"],
                        "data": encoded_image
                    }
                })
            except Exception as e:
                print(f"Error reading image: {e}")

        # Handle JSON file content
        if "file_content_path" in message:
            try:
                value = message["file_content_path"]

                if isinstance(value, str) and value.strip().startswith("{"):
                    # είναι JSON string
                    json_data = json.loads(value)
                else:
                    # είναι path
                    with open(value, "r", encoding="utf-8") as f:
                        json_data = json.load(f)

                json_string = json.dumps(json_data, indent=2, ensure_ascii=False)
                content_parts.append({
                    "type": "text",
                    "text": f"```json\n{json_string}\n```"
                })

            except Exception as e:
                print(f"Error reading JSON file: {e}")

        
        

        return content_parts
    
    
    def send_message(self, message,screen):
        role = message.get("role", "user")
        content = self._build_content_parts(message,screen)

        if not content:
            raise ValueError("Message must contain at least text, JSON, image or text_content_path")

        # Add user message
        self.messages.append({"role": role, "content": content})
        if "text_content_path" in message:
            try:
                with open(message["text_content_path"], "r", encoding="utf-8") as f:
                    text_data = f.read()
                final_prompt = text_data.replace(
        "{{Project description}}", project_json["description"]
    ).replace(
        "{{Wireframe description}}", screen["description"]
    )
            except Exception as e:
                print(f"Error reading text file: {e}")
        else: final_prompt="Override system prompt"
        # Send request
        response = requests.post(
            f"{self.url}/v1/messages",
            headers={"Authorization": f"Bearer {self.access_token}"},
            json={
                "messages": self.messages,
                "provider": "gcp",
                "model": "claude-sonnet-4-5@20250929",
                "tools": [],
                "system": final_prompt,
                "temperature": 0.7,
                "max_tokens": 4096
            }
        )

        if response.status_code != 200:
            raise RuntimeError(f"Error from LLM API: {response.status_code} - {response.text}")

        # Parse JSON
        response_json = response.json()

        # Extract assistant message content
        assistant_content = response_json.get("content")

        # Append assistant message (correct)
        self.messages.append({
            "role": "assistant",
            "content": assistant_content
        })

        return response_json
    
chat_handler = LLMChatHandler('claude')

frames = []
screens = project_json["screens"]

for i, screen in enumerate(screens, start=0):
    #-----JSON PRODUCTION--------
    response=chat_handler.send_message({"role":"user",
    "message":"I pass you this image and I want you to describe what do you see in the image. The shapes what they contain, if there is a margin in the edges of the wireframe etc. ",
    "image": {
     "path": screens[i]["image"], # Use raw string for paths
     "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
         }},
         screen)
    
    reply = response['content'][0]['text']
    print(f"\n {reply}")
    response = chat_handler.send_message({"role":"user",
    # "message":"I passed you this image and json and your response was that the top components are test, which is obviously wrong because in the top wireframe apear 4 rectangles with lines inside ",
    "text_content_path": prompt_2,
    # "file_content_path":wireframe_str,
    "image": {
     "path": screens[i]["image"], # Use raw string for paths
     "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
         }},
         screen)
    frame = response['content'][0]['text']
    print(f"\n{frame}")
    frames.append(frame)
    #----------JSX & CSS PRODUCTION----------
    json_string_to_parse = frame.strip()
    slug = screen.get("slug", "/")

    if json_string_to_parse.startswith('```json') and json_string_to_parse.endswith('```'):
        json_string_to_parse = json_string_to_parse.removeprefix('```json\n').removesuffix('\n```')

    try:
        components = json.loads(json_string_to_parse)
        jsx_blocks = []
        css_blocks = []
        final_jsx_strings = []
        table_imports=""
        if components:
            for comp in components:
                # 1. Παραγωγή και συλλογή JSX/CSS
                jsx = render_component(comp)
                css = render_grid_placement(comp, None)
                
                if comp.get("columns") is not None:
                    table_columns = comp.get("columns")
                    table_data = comp.get("data")
                    table_info = f"const {comp.get("name")}_columns = {table_columns} \n const {comp.get("name")}_data = {table_data}"
                    table_imports="""
import {ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Edit, Archive, Delete } from "@mui/icons-material";
import { dateOldToNew, stringAToZInsensitive } from "@iamnapo/sort";
import { isFuzzyMatch, dayjs } from "../utils/index.js";
"""
                else:
                    table_info =""
                jsx_blocks.append(jsx) 
                css_blocks.append(css)
                
            
            final_jsx = "\n\n".join(jsx_blocks)
            
            output_jsx_string = f"""
<Grid className="Grid">
    {final_jsx}
</Grid>
"""
            final_output_css = "\n\n".join(css_blocks)
            
            final_table_imports = "".join(table_imports + table_info)

        else:
            print("No components to render, possibly due to LLM not returning valid JSON or an empty list.")
        route_files[slug]["jsx"].append(output_jsx_string)
        route_files[slug]["css"].append(final_output_css)

    except json.JSONDecodeError as e:
        print(f"Error decoding JSON response from LLM: {e}")
        print(f"Problematic JSON content: '{json_string_to_parse}'")

#-----Save the jsx and css for each slug seperately-----------
OUTPUT_DIR = r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\my-react-app\src\screens"
if os.path.exists(OUTPUT_DIR):#remove files (basically the folder) from previous usege
    shutil.rmtree(OUTPUT_DIR)

os.makedirs(OUTPUT_DIR, exist_ok=True)#recreate the folder

for slug, content in route_files.items():
    file_name = slug.strip("/").replace("/", "_") or "index"

    jsx_path = os.path.join(OUTPUT_DIR, f"{file_name}.jsx")
    css_path = os.path.join(OUTPUT_DIR, f"{file_name}.css")

    jsx_body = "\n".join(content["jsx"])
    css_body = "\n".join(content["css"])

    jsx_file_content = f"""
{  "\n".join(import_statements)}
import './{file_name}.css'
{final_table_imports}
function {file_name.capitalize()}() {{
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked]=useState(false);
  const handleCheckbox = (event) => {{
  setIsChecked(event.target.checked);
  }};
  const handleSwitch = (event) => {{
  setIsChecked(event.target.checked);
  }};
  const [dropdownValue, setDropdownValue] = useState(''); 
  const handleDropdown = (event) => {{
    setDropdownValue(event.target.value);
  }};
  return (
    <div>
      {jsx_body}
    </div>
  );
}}
export default {file_name.capitalize()};
"""
    grid="\n".join(import_grid)
    css_file_content="".join(grid+css_body)
    
    with open(jsx_path, "w", encoding="utf-8") as f:
        f.write(jsx_file_content)

    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css_file_content)

    print(f"✔ Written files for slug: {slug}")
#--------Create the App.js for the routes---------
routes = list(route_files.keys())
def slug_to_component(slug):
    name = slug.strip("/").replace("/", "_") or "index"
    return name.capitalize()
def slug_to_path(slug):
    return slug.strip("/")
imports = []
routes_jsx = []

for slug in routes:
    component = slug_to_component(slug)
    path = slug_to_path(slug)

    imports.append(
        f'import {component} from "./screens/{component}.jsx";'
    )

    routes_jsx.append(
        f'<Route path="{path}" element={{<{component} />}} />'
    )
app_jsx = f"""
import {{ Routes, Route }} from "react-router-dom";


{chr(10).join(imports)}

function App() {{
  return (
    <Routes>

      {chr(10).join(routes_jsx)}
    </Routes>
  );
}}

export default App;
"""
app_jsx_path = os.path.join("my-react-app", "src", "App.jsx")

with open(app_jsx_path, "w", encoding="utf-8") as f:
    f.write(app_jsx)

import subprocess

try:
    # Τρέχει την εντολή npm run dev
    process = subprocess.Popen(["npm", "run", "dev"], cwd="./my-react-app", shell=True)
    print("Ο server σηκώθηκε ...")
    process.communicate()
except Exception as e:
    print(f"Παρουσιάστηκε σφάλμα: {e}")
########################################
########################################
########################################
########################################
