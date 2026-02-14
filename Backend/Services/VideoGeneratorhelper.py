import json
import boto3
import time
import os
from dotenv import load_dotenv

load_dotenv()

AWS_REGION = os.getenv("AWS_REGION")
ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")
SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

MODEL_ID = "amazon.nova-reel-v1:0"
BUCKET_NAME = os.getenv('bucket_name')

bedrock = boto3.client(
    "bedrock-runtime",
    region_name=AWS_REGION,
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
)

def generate_video_from_prompt(prompt: str):

    model_input = {
        "taskType": "TEXT_VIDEO",
        "textToVideoParams": {
            "text": prompt
        },
        "videoGenerationConfig": {
            "dimension": "1280x720",
            "durationSeconds": 6,
            "fps": 24
        }
    }

    response = bedrock.start_async_invoke(
        modelId=MODEL_ID,
        modelInput=model_input,
        outputDataConfig={
            "s3OutputDataConfig": {
                "s3Uri": f"s3://{BUCKET_NAME}/generated/"
            }
        }
    )

    job_arn = response["invocationArn"]


    return wait_for_job(job_arn)


def wait_for_job(job_arn):

    while True:
        result = bedrock.get_async_invoke(invocationArn=job_arn)
        status = result["status"]
        print("Status:", status)

        if status == "Completed":
            job_id = job_arn.split("/")[-1]
            return f"https://{BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/generated/{job_id}/output.mp4"


        if status == "Failed":
            raise Exception("Video generation failed")

        time.sleep(5)


if __name__ == "__main__":
    url = generate_video_from_prompt(
        "a cinematic 3 seconds video of a dog playing with a ball in a green park"
    )
    print("Video URL:", url)