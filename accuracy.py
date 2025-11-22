from LLM import LLMHandler
import json
import base64
import os
prompt_2= r"C:\Users\menim\OneDrive\Υπολογιστής\LLM_wrapper (1)\prompt_2.txt"#  for the grid

class LLMChatHandler:
    def __init__(self, model):
        self.model = model.lower()
        
        
        self.LLMHandler = LLMHandler(self.model)
        self.messages = []

    def _build_content_parts(self, message):
        content_parts = []

        # Handle text
        if "message" in message and message["message"]:
            content_parts.append({"type": "text", "text": message["message"]})

        
        # Handle plain text file content
        if "text_content_path" in message :
            try:
                with open(message["text_content_path"], "r", encoding="utf-8") as f:
                    text_data = f.read()
                content_parts.append({"type": "text", "text": text_data})
            except Exception as e:
                print(f"Error reading text file: {e}")

        return content_parts
    
    
    def send_message(self, message):
        role = message.get("role", "user")
        content_parts = self._build_content_parts(message)

        if not content_parts:
            raise ValueError("Message must contain at least text, image, or file_content_path")

        formatted_message = {
            "role": role,
            "content": content_parts
        }

        self.messages.append(formatted_message)
        response = self.LLMHandler.send_message(self.messages)
        self.messages.append({"role": "assistant", "content": [{"type": "text", "text": response}]})
        return response


# DIALOG
chat_handler = LLMChatHandler('claude')

response = chat_handler.send_message({"role": "user",
    "text_content_path": prompt_2
})
print(response)
# import json
# import math
# from pathlib import Path

# def similarity(val1, val2):
#     # Υπολογισμός ομοιότητας ανάμεσα σε δύο τιμές

#     if(val1.get("name")==val2.get("name")):
#         if (val1.get("type").lower()==val2.get("type").lower()):
#             return 1.0


#     type_1=val1.get("type").strip('"')
#     type_2=val2.get("type").strip('"')
    
#     return 1.0 if val1 == val2 else 0.0

# def compare_json(j1, j2):
#     keys = set(j1.keys()) | set(j2.keys())
#     sims = []
#     for k in keys:
#         if k in j1 and k in j2:
#             sims.append(similarity(j1[k], j2[k]))
#         else:
#             sims.append(0.0)
#     return sum(sims) / len(sims) if sims else 1.0

# # ---- Διάβασμα 10 JSON ----
# json_files = sorted(Path("C:\Users\menim\OneDrive\Έγγραφα\Διπλωματική\json_components").glob("*.json"))
# json_objects = [json.loads(Path(f).read_text()) for f in json_files]

# # ---- Σύγκριση όλων μεταξύ τους ----
# n = len(json_objects)
# for i in range(n):
#     for j in range(i+1, n):
#         sim = compare_json(json_objects[i], json_objects[j])
#         print(f"JSON {i+1} vs {j+1}: Ομοιότητα {sim*100:.2f}%")
