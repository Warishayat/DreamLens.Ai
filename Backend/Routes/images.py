from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from Validation.validation import ImageGenvalidation,get_current_user
from Database.database import get_db
from Database.Schemas import ImageData
from Services.ImageGenratorhelper import genrate_image_from_prompt
from Prompts.Prompt import prompt_for_image
from Utils.s3 import upload_multiple_images_to_s3

img_router = APIRouter(prefix="/generate", tags=["Image Generation"])

@img_router.post("/image", status_code=status.HTTP_201_CREATED)
async def generate_image(
    data: ImageGenvalidation,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    try:
        last = await db.query(ImageData)\
                .filter(ImageData.user_id == user_id)\
                .order_by(ImageData.img_id.desc())\
                .first()

        img_count = last.img_count if last else 0

        if img_count >= 6:
            raise HTTPException(
                status_code=403,
                detail="Your free image limit is finished"
            )

        enhanced_prompt = prompt_for_image(data.prompt)
        images = await genrate_image_from_prompt(enhanced_prompt)
        if not images:
            raise HTTPException(500, "Image generation failed")

        image_urls = await upload_multiple_images_to_s3(images)
        new_count = img_count + 1
        record = ImageData(
            user_id=user_id,
            prompt=data.prompt,
            image_url=image_urls[0],  
            img_count=new_count
        )

        db.add(record)
        db.commit()
        db.refresh(record)

        return {
            "success": True,
            "message": "Image generated",
            "image": image_urls,
            "remaining": 6 - new_count
        }
    except Exception as e:
        raise HTTPException(status_code=502,detail="Internel Server Error.Try Again later.")