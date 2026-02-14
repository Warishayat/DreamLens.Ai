from fastapi import APIRouter, Depends,HTTPException,status
from sqlalchemy.orm import Session
from Validation.validation import VideoGenValidation,get_current_user
from Database.database import  get_db
from Database.Schemas import VideoData
from Prompts.Prompt import prompt_for_video
from Utils.s3 import upload_video_to_s3
from Services.VideoGeneratorhelper import generate_video_from_prompt

video_router = APIRouter(prefix="/generate",tags=["Video Generation"])

@video_router.post('/video',status_code=status.HTTP_201_CREATED)
async def generate_video(
    data:VideoGenValidation,
    db:Session = Depends(get_db),
    user_id:int = Depends(get_current_user)
):
    try:
        last = db.query(VideoData)\
            .filter(VideoData.user_id == user_id)\
            .order_by(VideoData.video_id.desc())\
            .first()
        
        video_count = last.video_count if last else 0

        if video_count >= 2:
            raise HTTPException(
                status_code=403,
                detail="Your free video limit is finished"
            )
        
        enhanced_prompt = prompt_for_video(data.prompt)
        video_bytes = generate_video_from_prompt(prompt=enhanced_prompt)
        video_url = upload_video_to_s3(video_bytes=video_bytes)
        new_count = video_count + 1
        record = VideoData(
            user_id=user_id,
            prompt=data.prompt,
            video_url=video_url,
            video_count=new_count
        )
        db.add(record)
        db.commit()
        db.refresh(record)
        return {
            "success": True,
            "message": "Video generated",
            "video": video_url,
            "remaining": 2 - new_count
        }
    except Exception as e:
        raise HTTPException(status_code=502,detail=str(e))