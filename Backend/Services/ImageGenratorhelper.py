import base64
import json
import os
import random
import boto3
from dotenv import load_dotenv

load_dotenv()

Access_key_ID = os.getenv("AWS_ACCESS_KEY_ID")
Secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
aws_region = os.getenv("AWS_REGION")

client = boto3.client(
    "bedrock-runtime",
    region_name=aws_region,
    aws_access_key_id=Access_key_ID,
    aws_secret_access_key=Secret_access_key,
)

def genrate_image_from_prompt(prompt: str):
    try:
        model_id = "amazon.nova-canvas-v1:0"
        seed = random.randint(0, 858993460)

        native_request = {
            "taskType": "TEXT_IMAGE",
            "textToImageParams": {
                "text": prompt
            },
            "imageGenerationConfig": {
                "seed": seed,
                "quality": "standard",
                "height": 512,
                "width": 512,
                "numberOfImages": 1
            }
        }

        response = client.invoke_model(
            modelId=model_id,
            body=json.dumps(native_request),
            contentType="application/json",
            accept="application/json"
        )

        model_response = json.loads(response["body"].read())
        base64_image = model_response["images"][0]
        image_bytes = base64.b64decode(base64_image)
        return image_bytes
    
    except Exception as e:
        raise Exception(str(e))


if __name__ == "__main__":
    imgs = genrate_image_from_prompt("A boy with green eyes sitting on black horse in front of a castle")

    print(imgs)