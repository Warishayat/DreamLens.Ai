import boto3
import os
from uuid import uuid4
from dotenv import load_dotenv

load_dotenv()

bucket_name = os.getenv("bucket_name")
aws_region = os.getnenv("aws_region")
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("Access_key_ID"),
    aws_secret_access_key=os.getenv("Secret_access_key"),
    region_name=os.getenv("aws_region")
)


def upload_multiple_images_to_s3(image_bytes_list):
    urls = []
    for img_bytes in image_bytes_list:
        filename = f"images/{uuid4()}.png"
        s3.put_object(
            Bucket=bucket_name,
            Key=filename,
            Body=img_bytes,
            ContentType="image/png",
            ACL="public-read"
        )
        url = f"https://{bucket_name}.s3.{aws_region}.amazonaws.com/{filename}"
        urls.append(url)

    return urls
