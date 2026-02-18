import boto3
import os
from uuid import uuid4
from dotenv import load_dotenv
from Services.ImageGenratorhelper import genrate_image_from_prompt
import sys
import os
sys.path.append(os.path.dirname(os.path.realpath(__file__)))

load_dotenv()

bucket_name = os.getenv("bucket_name")
aws_region = os.getenv("AWS_REGION")
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)

def upload_image_to_s3(image_bytes):
    
    filename = f"{uuid4()}.png"

    s3.put_object(
        Bucket=bucket_name,
        Key=filename,
        Body=image_bytes,
        ContentType="image/png",

    )

    image_url = f"https://{bucket_name}.s3.{aws_region}.amazonaws.com/{filename}"
    return image_url

def make_video_streamable(bucket, key):
    s3.copy_object(
        Bucket=bucket,
        CopySource={"Bucket": bucket, "Key": key},
        Key=key,
        ContentType="video/mp4",
        ContentDisposition="inline",
        MetadataDirective="REPLACE"
    )

if __name__ == "__main__":
    prompt = "A kitten playing in a garden chasing a rat"
    img_bytes=genrate_image_from_prompt(prompt=prompt)
    url=upload_image_to_s3(image_bytes=img_bytes)
    print(url)