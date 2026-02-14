import boto3
import os
from dotenv import load_dotenv

load_dotenv()

Access_key_ID = os.getenv("AWS_ACCESS_KEY_ID")
Secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
aws_region = os.getenv("AWS_REGION")

bedrock_client = boto3.client(
    "bedrock",
    region_name=aws_region,
    aws_access_key_id=Access_key_ID,
    aws_secret_access_key=Secret_access_key,
)

try:
    # List all available models
    response = bedrock_client.list_foundation_models()
    
    print("Available Video/Image Generation Models:\n")
    for model in response['modelSummaries']:
        model_id = model['modelId']
        # Filter for image/video generation models
        if 'nova' in model_id.lower() or 'video' in model_id.lower() or 'image' in model_id.lower():
            print(f"✓ {model_id}")
            print(f"  Provider: {model['provider']}")
            print(f"  Input Modalities: {model.get('inputModalities', [])}")
            print(f"  Output Modalities: {model.get('outputModalities', [])}")
            print()
    
except Exception as e:
    print(f"Error: {e}")
