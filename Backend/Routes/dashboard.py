from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from Database.database import get_db
from Validation.validation import get_current_user
from Database.Schemas import UserCredentials, ImageData, VideoData

dashbaord_router = APIRouter(prefix="/dashboard", tags=["User Dashboard"])

@dashbaord_router.get("/user")
async def get_dashboard(db: Session = Depends(get_db),user_id: UserCredentials = Depends(get_current_user)):
    try:
        user = db.query(UserCredentials).filter(
            UserCredentials.user_id == user_id
        ).first()
        total_images = db.query(ImageData).filter(ImageData.user_id == user_id).count()
        total_videos = db.query(VideoData).filter(VideoData.user_id == user_id).count()

        images = db.query(ImageData.image_url)\
                .filter(ImageData.user_id == user_id)\
                .order_by(ImageData.created_at.desc())\
                .limit(6)\
                .all()

        videos = db.query(VideoData.video_url)\
                .filter(VideoData.user_id == user_id)\
                .order_by(VideoData.created_at.desc())\
                .limit(6)\
                .all()

        return {
            "user": {
                "name": user.name,
                "email": user.email
            },
            "usage": {
                "images_used": total_images,
                "videos_used": total_videos,
                "images_left": max(0, 6 - total_images),
                "videos_left": max(0, 2 - total_videos),
                "trial_status": "EXPIRED" if total_images >= 3 and total_videos >= 3 else "ACTIVE"
            },
            "media": {
                "images": [i[0] for i in images],
                "videos": [v[0] for v in videos]
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=501,
            detail=str(e)
        )