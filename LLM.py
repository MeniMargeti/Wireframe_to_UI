import os
import json
import boto3 # type: ignore
from botocore.exceptions import ClientError # For more specific error handling
from dotenv import load_dotenv # type: ignore
import base64

load_dotenv()

class LLMHandler:
    def __init__(self, model):
        self.model = model.lower()
        
        if self.model != 'claude': # Enforce Claude only
            raise ValueError("This LLMHandler is configured for 'claude' only.")

        # Initialize Claude client (Bedrock)
        self.claude_session = boto3.Session(
            aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"), # Use environment variables
            aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY"), # Use environment variables
            region_name="eu-central-1"
        )
        self.claude_client = self.claude_session.client(service_name="bedrock-runtime", region_name="eu-central-1")
        self.claude_model_id = "anthropic.claude-3-sonnet-20240229-v1:0" 
        # self.claude_model_id = "claude-3-5-sonnet-20240620"
    def send_message(self, messages):
        """
        Sends formatted messages to the Claude API.
        'messages' is expected to be a list of dictionaries, where each dict is
        already formatted for Claude (e.g., using _build_content_parts from LLMChatHandler).
        """
        if not messages:
            raise ValueError("Messages list cannot be empty.")
            
        # For Claude, the messages are already formatted by LLMChatHandler._build_content_parts
        # so we pass them directly.
        formatted_messages_for_api = messages # Renamed for clarity

        response = self._claude_api(formatted_messages_for_api)
        return response
    
    # Removed _format_messages, _format_for_gpt, _format_for_llama as they are not needed for Claude-only
    # The formatting logic for Claude's content is now primarily in LLMChatHandler._build_content_parts

    # The _format_for_claude method from your original LLM.py is largely absorbed
    # into LLMChatHandler._build_content_parts.
    # If you still want a _format_for_claude method here, it would primarily
    # just pass through the already formatted messages.
    # For now, we'll assume LLMChatHandler provides the full format.
    # If you intend to use this LLMHandler directly with raw messages,
    # you'd re-add the image/file processing logic here, but for this setup,
    # LLMChatHandler is doing that work.

    def _claude_api(self, messages):
        """
        Calls the Claude API via AWS Bedrock.
        'messages' should be a list of dictionaries, each already formatted for Claude.
        """
        try:
            body = json.dumps(
                {
                    "anthropic_version": "bedrock-2023-05-31",
                    "max_tokens": 4096, # Set a reasonable max_tokens
                    "messages": messages, # This is the already formatted list of messages
                }
            )
            
            response = self.claude_client.invoke_model(
                modelId=self.claude_model_id,
                body=body
            )
            
            result = json.loads(response.get("body").read())
            output_list = result.get("content", [])
            response_text = ""
            for output in output_list:
                response_text += output.get("text", "") # Use .get for safety
            return response_text
        except ClientError as e:
            error_code = e.response.get("Error", {}).get("Code")
            error_message = e.response.get("Error", {}).get("Message")
            print(f"Claude API Client Error ({error_code}): {error_message}")
            if error_code == "ValidationException" and "messages" in error_message:
                print("Hint: Check your 'messages' format. Claude requires alternating roles (user, assistant).")
                print(f"Attempted messages: {json.dumps(messages, indent=2)}")
            return "Error: Could not get a response from Claude due to API issue."
        except Exception as e:
            print(f"Unexpected error calling Claude API: {e}")
            return "Error: An unexpected issue occurred with the Claude API."