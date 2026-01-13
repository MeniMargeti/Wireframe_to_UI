import json
import base64
import os
import requests
from dotenv import load_dotenv
load_dotenv('codes.env')
from UI_code import render_component, render_grid_placement
# image=r"C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\wireframe_6\Frame.png"
# json_code=r"C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\wireframe_6\wireframe.json"
# json_code=r"C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\all\wireframe.json"
image=[r"C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\all\Frame_1.png",
       r"C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\all\Frame_2.png",
       r"C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\all\Frame_3.png"]
# image=[r"C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\all\Frame.png"]
prompt= r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\prompt.txt"# prompt 1 refers to the list of components
prompt_2= r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\prompt_2.txt"#  for the grid
prompt_3= r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\prompt_3.txt"# for the final json
placement=r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\Placement.txt"
wrong=r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\wrong.txt"
image_response=r"C:\Users\menim\OneDrive\Εικόνες\Στιγμιότυπα οθόνης\Screenshot 2025-12-12 190556.png"

class LLMChatHandler:
    def __init__(self,model):
        self.url = os.environ.get("BASE_URL")
        self.access_token = os.environ.get("TOKEN")
        self.messages = []

    def _build_content_parts(self, message):
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

        
        if "text_content_path" in message:
            try:
                with open(message["text_content_path"], "r", encoding="utf-8") as f:
                    text_data = f.read()
                content_parts.append({"type": "text","text": f"```text\n{text_data}\n```" })
            except Exception as e:
                print(f"Error reading text file: {e}")

        return content_parts
    
    
    def send_message(self, message):
        role = message.get("role", "user")
        content = self._build_content_parts(message)

        if not content:
            raise ValueError("Message must contain at least text, JSON, image or text_content_path")

        # Add user message
        self.messages.append({"role": role, "content": content})

        # Send request
        response = requests.post(
            f"{self.url}/v1/messages",
            headers={"Authorization": f"Bearer {self.access_token}"},
            json={
                "messages": self.messages,
                "provider": "gcp",
                "model": "claude-sonnet-4-5@20250929",
                "tools": [],
                "system": "Override system prompt",
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



# DIALOG
chat_handler = LLMChatHandler('claude')
frames = []
# response = chat_handler.send_message({"role":"user",
#     "message":"In the following picture in your last response you mistook the bottom left input for a button and the bottom right button for an input. This is a big mistake and you should never do this again. When the rectangle has a line inside then it is button, if not then it is a input thats it.  What it is that confused you?",
#     "image": {
#      "path": image, # Use raw string for paths
#      "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
#          }})
# print(response)
# response = chat_handler.send_message({"role":"user",
#     "message":"What exactly do you see in this image? Do not make any assumption, explain only what do you seen every detail matters. Is there any lines/shapes inside the rectangles and if yes in which ones exactly? ",
#     "image": {
#      "path": image, # Use raw string for paths
#      "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
#          }})
# print(response)
###############
####Simple Wireframe####
# response = chat_handler.send_message({"role":"user",
#     "text_content_path": prompt_3,
#     "file_content_path":json_code,
#     "image": {
#      "path": image, # Use raw string for paths
#      "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
#          }})
# print(response)
#################
####Scroll####

# for i in range(len(image)):
    # response=chat_handler.send_message({"role":"user",
    # "message":"I pass you this image and I want you to describe what do you see in the image. The shapes what they contain, if there is a margin in the edges of the wireframe etc. ",
    # "image": {
    #  "path": image[i], # Use raw string for paths
    #  "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
    #      }})
    
    # reply = response['content'][0]['text']
    # print(f"\n {reply}")
    # response = chat_handler.send_message({"role":"user",
    # # "message":"I passed you this image and json and your response was that the top components are test, which is obviously wrong because in the top wireframe apear 4 rectangles with lines inside ",
    # "text_content_path": prompt,
    # "file_content_path":json_code,
    # "image": {
    #  "path": image[i], # Use raw string for paths
    #  "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
    #      }})
    # wireframe = response['content'][0]['text']
    # print(f"\n{wireframe}")
    # wireframes.append(wireframe)
########################################
############ With JSON CODE ############
# with open(json_code, "r", encoding="utf-8") as f:
#     data = json.load(f)

# wireframes = data["document"]["children"][0]["children"]

# for i, wireframe in enumerate(wireframes, start=0):
#     wireframe_str = json.dumps(
#         wireframe,
#         ensure_ascii=False,
#         indent=2
#     )
#     response=chat_handler.send_message({"role":"user",
#     "message":"I pass you this image and I want you to describe what do you see in the image. The shapes what they contain, if there is a margin in the edges of the wireframe etc. ",
#     "image": {
#      "path": image[i], # Use raw string for paths
#      "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
#          }})
    
#     reply = response['content'][0]['text']
#     print(f"\n {reply}")
#     response = chat_handler.send_message({"role":"user",
#     # "message":"I passed you this image and json and your response was that the top components are test, which is obviously wrong because in the top wireframe apear 4 rectangles with lines inside ",
#     "text_content_path": prompt_2,
#     # "file_content_path":wireframe_str,
#     "image": {
#      "path": image[i], # Use raw string for paths
#      "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
#          }})
#     frame = response['content'][0]['text']
#     print(f"\n{frame}")
#     frames.append(frame)
##############################################
############ WITHOUT JSON CODE ###############
for i in range(len(image)):
    
    response=chat_handler.send_message({"role":"user",
    "message":"I pass you this image and I want you to describe what do you see in the image. The shapes what they contain, if there is a margin in the edges of the wireframe etc. ",
    "image": {
     "path": image[i], # Use raw string for paths
     "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
         }})
    
    reply = response['content'][0]['text']
    print(f"\n {reply}")
    response = chat_handler.send_message({"role":"user",
    # "message":"I passed you this image and json and your response was that the top components are test, which is obviously wrong because in the top wireframe apear 4 rectangles with lines inside ",
    "text_content_path": prompt_2,
    # "file_content_path":wireframe_str,
    "image": {
     "path": image[i], # Use raw string for paths
     "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
         }})
    frame = response['content'][0]['text']
    print(f"\n{frame}")
    frames.append(frame)
# response=chat_handler.send_message({"role":"user",
#     "message":"I gave you this image, the rules you must follow and the  json code and you change the absolut bounding box for Wireframe 1.The first text file contains the json code from figma for the wireframe and the second text contains youre response json code. What confused you and shrunk the first wireframe and where did you get those values (\"x\": 867),because you use this one each time and this specific value does not apear in the json code not even once? The whole wireframe is smaller and especially the inputs. Tell me how can i help you because youve been doing the same mistake over and over again ",
#     "text_content_path":prompt,
#     "file_content_path":json_code,
#     "text_content_path":wrong,
#     "image": {
#      "path": image[0], # Use raw string for paths
#      "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
#         }})
# reply = response['content'][0]['text']
# print(f"\n {reply}")
##############
# response = chat_handler.send_message({"role":"user",
#     "text_content_path": placement,
#     "message":json_1,
#     "image": {
#      "path": image, # Use raw string for paths
#      "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
#          }})

generated_jsx_blocks = []
generated_css_blocks = []
claude_components = [] 
all_components =[]
all_final_grid_strings = [] 
generated_css_blocks = [] 
column_list = []

for frame in frames:
    current_jsx_blocks = []
    
    json_string_to_parse = frame.strip()
    
    if json_string_to_parse.startswith('```json') and json_string_to_parse.endswith('```'):
        json_string_to_parse = json_string_to_parse.removeprefix('```json\n').removesuffix('\n```')

    try:
        claude_components = json.loads(json_string_to_parse)
        
        if claude_components:
            for comp in claude_components:
                # 1. Παραγωγή και συλλογή JSX/CSS
                jsx = render_component(comp)
                css = render_grid_placement(comp, None)
                if comp.get("columns") is not None:
                    columns = ["""{
			Header: <Typography id="name_header" variant="h6">{"Name"}</Typography>,
			accessor: "column_i",
			id: "column_i",
			filterable: true,
			minWidth: 200,
			sortMethod: (value1, value2) => stringAToZInsensitive()(value1, value2),
			filterMethod: ({ id, value }, row) => isFuzzyMatch(row[id], value),
			Cell: ({ value }) => (
				<Box sx={{ display: "flex", ml: 1, alignItems: "center" }}>
					{value}
				</Box>
			)}""" for _ in range(comp.get("columns"))]
                    column_list.append(columns)
            
                current_jsx_blocks.append(jsx) 
                generated_css_blocks.append(css)
                
            
            final_jsx = "\n\n".join(current_jsx_blocks)
            
            output_jsx_string = f"""
<Grid className="Grid">
    {final_jsx}
</Grid>
"""
            all_final_grid_strings.append(output_jsx_string)

        else:
            print("No components to render, possibly due to LLM not returning valid JSON or an empty list.")
            
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON response from LLM: {e}")
        print(f"Problematic JSON content: '{json_string_to_parse}'")

    
final_output_jsx = "\n\n".join(all_final_grid_strings)
final_output_css = "\n\n".join(generated_css_blocks)
final_columns = f" const = {column_list}" if column_list else ""
print("--- Final JSX Output ---")
print(final_output_jsx)
print("--- Final CSS Output ---")
print(final_output_css)



import_statements = [
        "import React,{useState} from 'react';",
        "import Checkbox from './components/Checkbox.jsx';",
        "import { PrimaryBackgroundButton, SecondaryBackgroundButton, ThirdBackgroundButton } from './components/Buttons.jsx';",
        "import { Input } from './components/Input.jsx';",
        "import { PrimaryBackgroundDropdown } from './components/Dropdowns.jsx';",
        "import Card from './components/Card.jsx'",
        "import Header from './components/Header.jsx';",
        "import Switch from './components/Switch.jsx';",
        "import Table from './components/Table.jsx'",
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
grid="\n".join(import_grid)
final_css="".join(grid+final_output_css)
react_component_template = f"""
{  "\n".join(import_statements)}
import './App.css'
function App() {{
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
  {final_columns}
  return (
    <div>
        {final_output_jsx}
    </div>
  );
}}

export default App;
"""
app_jsx_path = os.path.join("my-react-app", "src", "App.jsx")

with open(app_jsx_path, "w", encoding="utf-8") as f:
    f.write(react_component_template)

output_css_file_path = os.path.join("my-react-app", "src", "App.css")

with open(output_css_file_path, "w", encoding="utf-8") as f:
    f.write(final_css) # Γράφει το συγκεντρωμένο CSS

print(f"Generated CSS saved to: {output_css_file_path}")
print("\n--- End of Generated JSX Output ---")
print("\nRemember to add import statements in your actual JSX file.")
#############
import subprocess

try:
    # Τρέχει την εντολή npm run dev
    process = subprocess.Popen(["npm", "run", "dev"], cwd="./my-react-app", shell=True)
    print("Ο server σηκώθηκε ...")
    process.communicate()
except Exception as e:
    print(f"Παρουσιάστηκε σφάλμα: {e}")

##############

# # # ##################

# # # # response = chat_handler.send_message({"role": "user", "message": "If there are some components that can be as one are existing for the same perpose then join them and rewrite the json file. For example i f there is a text as a label or a label you can join them with component the component that refers to"})
# # # # print(response)
# # # # print("########################")
# # # # response = chat_handler.send_message({"role": "user", "message": "i want you to match your components with my ready components that they are in these files,and write the total json code for the components writen by the folder's json code format:",
# # # #                                       "json_folder_path":folder
# # # #                                       })
# # # # print(response)
# # # #Chat format 
# # # # class LLMChatHandler:
# # # #     def __init__(self, model):
# # # #         self.model = model.lower()
        
# # # #         if self.model not in ['gpt', 'llama', 'claude']:
# # # #             raise ValueError("Unsupported model. Choose from 'gpt', 'llama', or 'claude'.")

# # # #         self.LLMHandler = LLMHandler(self.model)
# # # #         self.messages = []
    
# # # #     def send_message(self, message):
# # # #         self.messages.append({"role": "user", "message": message})
# # # #         response = self.LLMHandler.send_message(self.messages)
# # # #         self.messages.append({"role": "assistant", "message": response})
# # # #         return response

# # # # if __name__ == "__main__":
# # # #     # Initialize the chat handler
# # # #     chat_handler = LLMChatHandler('claude')

# # # #     print("Start chatting with the model! Type 'exit' to quit.\n")

# # # #     while True:
# # # #         user_input = input("[ You ]: ")
# # # #         if user_input.lower() == "exit":
# # # #             print("Exiting chat. Bye!")
# # # #             break
        
# # # #         response = chat_handler.send_message(user_input)
# # # #         print("[ Assistant: ]", response)

