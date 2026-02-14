import boto3
import json
import os
from dotenv import load_dotenv

load_dotenv()

aws_region = os.getenv("AWS_REGION")

llm = boto3.client("bedrock-runtime", region_name=aws_region)

SYSTEM_PROMPT = """
You are DreamLens Prompt Engine.

Your job is to transform short or weak user input into a powerful, detailed prompt optimized for AI image generation.

Rules:
1. The final output must be less than 1000 tokens.
2. The output must be optimized for text-to-image models.
3. Do not include explanations, comments, or formatting labels.
4. Do not mention AI, models, or cameras.
5. Do not use copyrighted characters or brand names.
6. The prompt must be visually rich, cinematic, and descriptive.

You must:
• Expand the user idea with visual detail and always stick with to the point result.
• Add lighting, mood, colors, atmosphere
• Add environment and composition
• Make the scene emotionally appealing
• Keep it safe

Output only the final enhanced prompt.
"""

def prompt_for_image(user_prompt: str):

    final_prompt = SYSTEM_PROMPT + "\nUser idea: " + user_prompt

    payload = {
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "text": final_prompt
                    }
                ]
            }
        ],
        "inferenceConfig": {
            "maxTokens": 900,
            "temperature": 0.7,
            "topP": 0.9
        }
    }

    response = llm.invoke_model(
        modelId="amazon.nova-lite-v1:0",
        body=json.dumps(payload),
        contentType="application/json",
        accept="application/json"
    )

    result = json.loads(response["body"].read())
    return result["output"]["message"]["content"][0]["text"]

def prompt_for_video(user_prompt: str):
    final_prompt = SYSTEM_PROMPT + "\nUser idea: " + user_prompt

    payload = {
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "text": final_prompt
                    }
                ]
            }
        ],
        "inferenceConfig": {
            "maxTokens": 900,
            "temperature": 0.7,
            "topP": 0.9
        }
    }

    response = llm.invoke_model(
        modelId="amazon.nova-lite-v1:0",
        body=json.dumps(payload),
        contentType="application/json",
        accept="application/json"
    )

    result = json.loads(response["body"].read())
    return result["output"]["message"]["content"][0]["text"]



if __name__ == "__main__":
    res = prompt_for_image("poor kid dreaming of success")
    res2 = prompt_for_video("A cat chasing a mouse")
    print(res)
    print(res2)
