import base64
import json
import os
import random
import boto3
from dotenv import load_dotenv

load_dotenv()

Access_key_ID = os.getenv("Access_key_ID")
Secret_access_key = os.getenv("Secret_access_key")	
bucket_name = os.getenv("bucket_name")
aws_region = os.getenv("aws_region")	

client = boto3.client(
    "bedrock-runtime",
    region_name=aws_region,
    aws_access_key_id=Access_key_ID,
    aws_secret_access_key=Secret_access_key,
)


def genrate_image_from_prompt(prompt:str):
    try:
        model_id = "amazon.nova-canvas-v1:0"
        seed = random.randint(0, 858993460)
        native_request = {
        "taskType": "TEXT_IMAGE",
        "textToImageParams": {"text": prompt},
        "imageGenerationConfig": {
            "seed": seed,
            "quality": "standard",
            "height": 512,
            "width": 512,
            "numberOfImages": 1,
            },
        }
        request = json.dumps(native_request)
        response = client.invoke_model(modelId=model_id, body=request)
        model_response = json.loads(response["body"].read())
        return model_response["images"]
    except Exception as e:
        raise Exception(e)