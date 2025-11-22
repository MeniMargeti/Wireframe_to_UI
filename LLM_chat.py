import json
import base64
import os
import requests
from dotenv import load_dotenv
load_dotenv('codes.env')
# image=r"C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\wireframe_6\Frame.png"
# json_code=r"C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\wireframe_6\wireframe.json"
json_code=r"C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\Table\wireframe.json"
image=r"C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\Table\Frame.png"
dsl_code_path=r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\dsl_code.dsl"
prompt= r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\prompt.txt"# prompt 1 refers to the list of components
prompt_2= r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\prompt_2.txt"#  for the grid
prompt_3= r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\prompt_3.txt"# for the final json
placement=r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\Placement.txt"
image_response=r"C:\Users\menim\OneDrive\Εικόνες\Στιγμιότυπα οθόνης\Screenshot 2025-10-09 103255.png"

class LLMChatHandler:
    def __init__(self,model):
        self.url = os.environ.get("url")
        self.access_token = os.environ.get("access_token")
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
                with open(message["file_content_path"], "r", encoding="utf-8") as f:
                    json_data = json.load(f)
                json_string = json.dumps(json_data, indent=2, ensure_ascii=False)
                content_parts.append({"type": "text", "text": f"```json\n{json_string}\n```"})
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

        # Προσθήκη μηνύματος στο context
        self.messages.append({"role": role, "content": content})

        # Κλήση στο API
        headers = {
            "access_token": self.access_token,
            "Content-Type": "application/json"
        }
        body = {"messages": self.messages,"max_tokens":4096}

        response = requests.post(self.url, headers=headers, json=body)

        if response.status_code != 200:
            raise RuntimeError(f"Error from LLM API: {response.status_code} - {response.text}")

        assistant_reply = response.json()
        self.messages.append({"role": "assistant", "content": assistant_reply})
        return assistant_reply


# DIALOG
chat_handler = LLMChatHandler('claude')

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
response = chat_handler.send_message({"role":"user",
    "text_content_path": prompt_3,
    "file_content_path":json_code,
    "image": {
     "path": image, # Use raw string for paths
     "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
         }})
print(response)

# response = chat_handler.send_message({"role":"user",
#     "text_content_path": placement,
#     "message":json_1,
#     "image": {
#      "path": image, # Use raw string for paths
#      "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
#          }})
# response = chat_handler.send_message({"role":"user",
#     "message": "I gave yout this wireframe:",
#     "image": {
#      "path": image, # Use raw string for paths
#      "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
#          },
#     "message":"and the wireframe from your response was the following image as you can see it is not quite right because  as you can see in the given wireframe the 3rd image is squere but in your result it is a rectangle",
#     "image": {
#      "path": image_response, # Use raw string for paths
#      "media_type": "image/png" # Or "image/jpeg" if it's a JPEG
#          }})


claude_components = [] # Initialize to an empty list to prevent NameError

json_string_to_parse = response.strip() # Use the dedicated variable for JSON response

# Clean the LLM response by stripping Markdown code block fences
if json_string_to_parse.startswith('```json') and json_string_to_parse.endswith('```'):
    json_string_to_parse = json_string_to_parse.removeprefix('```json\n').removesuffix('\n```')

try:
    # Now parse the cleaned string
    claude_components = json.loads(json_string_to_parse)
except json.JSONDecodeError as e:
    print(f"Error decoding JSON response from LLM: {e}")
    print(f"Problematic JSON content: '{json_string_to_parse}'")

def render_component (component_data):
    if component_data.get("type")=="Image":
        return f"<Box style={{{{border: \"2px dashed grey\",display: \"flex\",color: \"grey\"}}}} className=\"{component_data.get('name')}\" >{component_data.get('name')}</Box>"
    elif component_data.get("type")=="Text":
        return f"<div className=\"{component_data.get('name')}\" >{component_data.get('name')}</div>"
    elif component_data.get("type")=="Button":
        return  f"<PrimaryBackgroundButton className=\"{component_data.get('name')}\" />"
    elif component_data.get("type") == "Input":
        if component_data.get("label") is None:
            return f"<Input className=\"{component_data.get('name')}\" id=\"{component_data.get('name')}\" />"
        else:
            return f"<Input className=\"{component_data.get('name')}\" id=\"{component_data.get('name')}\" label=\"{component_data.get('label')}\"/>"
    elif component_data.get("type") == "Dropdown":
        return f"<PrimaryBackgroundDropdown className=\"{component_data.get('name')}\" placeholder=\"{component_data.get('name')}\"  items={{{component_data.get('items')}}} value={{dropdownValue}} onChange={{handleDropdown}}/>"
    elif component_data.get("type") == "Checkbox":
        return f"<Checkbox className=\"{component_data.get('name')}\" checked={{isChecked}}  onChange={{handleCheckbox}}/>"
    elif component_data.get("type") == "Card":
        if component_data.get("children") is None:
            return f"<Card className=\"{component_data.get('name')}\" title==\"{component_data.get('name')}\"/>"
        else :
            children_list=[]
            for child in component_data.get("children"):
                children=render_component(child)
                children_list.append(children)
            children_final="\n".join(children_list)
            return  f"""<Card className=\"{component_data.get('name')}\" title=\"{component_data.get('name')}\" >
        {children_final}
      </Card>"""
    elif component_data.get("type") == "Switch":
        return f"<Switch className=\"{component_data.get('name')}\" checked={{isChecked}} onChange={{handleSwitch}}/>"
    elif component_data.get("type") == "Table":
        return f"<Table className=\"{component_data.get('name')}\" columns=\"{component_data.get('columns')}\" data={{{component_data.get('data')}}}/>"
    return

def map_x_to_column(x,fr):
    z = x / fr
    if z == 0:
        return 1
    else:
        return (z + 1) // 2 + 1

def map_y_to_row(y,fr):
    z = y / fr
    if z == 0:
        return 1
    else:
        return (z + 1) // 2 + 1
    
def render_grid_placement (component_data,Parent):
    bbox = component_data.get("absoluteBoundingBox")
    x = bbox.get("x")
    y = bbox.get("y")
    width = bbox.get("width")
    height = bbox.get("height")
    if Parent==None:
        start_column = map_x_to_column(x,80)
        end_column = map_x_to_column(x+width,80)
        if start_column==end_column:
            end_column=end_column+1

        start_row = map_y_to_row(y,24)
        end_row = map_y_to_row(y+height,24)
        if start_row==end_row:
            end_row=end_row+1
            # start_row = y
        # end_row = y + height
    else:
        start_column = map_x_to_column(x-Parent[0],Parent[2]/24)
        end_column = map_x_to_column(x-Parent[0]+width,Parent[2]/24)
        if start_column==end_column:
            end_column=end_column+1

        start_row = map_y_to_row(y-Parent[1]-44,(Parent[3]-44)/20)
        end_row = map_y_to_row(y-Parent[1]+height-44,(Parent[3]-44)/20)
        if start_row==end_row:
            end_row=end_row+1
    component_css_name = component_data.get("name").strip('"')
    css_list = []
    css_list.append(f'grid-column:{int(start_column)}/{int(end_column)};')
    css_list.append(f'grid-row:{int(start_row)}/{int(end_row)};') 
    css_string = "\n".join(css_list)
    if component_data.get("children") is None:
        return f".{component_css_name} {{ \n{css_string} }}"  
    else :
        children_list=[]
        for child in component_data.get("children"):
            children_placement=render_grid_placement(child,[x,y,width,height])
            children_list.append(children_placement)
        children_final_placement="\n".join(children_list)
        return f"""
.{component_css_name} {{ \n{css_string} }}
.{component_css_name}_Grid{{
display: grid;
grid-template-columns: repeat(13, 1fr);
grid-template-rows: repeat(10, minmax(0, 1fr));
width: 100%;
height: 100%;
min-height: 0;
}}
{children_final_placement}"""

print("\n--- Generated JSX Components ---")
generated_jsx_blocks = []
generated_css_blocks = []

    # Iterate and render components if claude_components is not empty
if claude_components: # Check if the list has elements
    for comp in claude_components:
        jsx = render_component(comp)
        css = render_grid_placement(comp,None)
        generated_jsx_blocks.append(jsx)
        generated_css_blocks.append(css)
else:
    print("No components to render, possibly due to LLM not returning valid JSON or an empty list.")
    
# Always define final_output_jsx, even if generated_jsx_blocks is empty
final_output_jsx = "\n\n".join(generated_jsx_blocks)
final_output_css = "\n\n".join(generated_css_blocks)
print(final_output_jsx)
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
        "import Box from '@mui/material/Box'"
    ]
import_grid = [
  ".Grid {\n"
  "display: grid;\n"
  f"grid-template-columns: repeat(12, 1fr);\n"
  "grid-auto-rows: 25px; \n"
  "gap: 0rem;\n"
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
    <Grid columns="12" className="Grid">
      {final_output_jsx.replace('\\n', '\\n\\t')}
    </Grid>
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
# import subprocess

# try:
#     # Τρέχει την εντολή npm run dev
#     process = subprocess.Popen(["npm", "run", "dev"], cwd="./my-react-app", shell=True)
#     print("Ο server σηκώθηκε ...")
#     process.communicate()
# except Exception as e:
#     print(f"Παρουσιάστηκε σφάλμα: {e}")

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

