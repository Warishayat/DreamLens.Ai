from fastapi.routing import APIRouter
from fastapi import HTTPException,Depends
from Validation.validation import ContactValidation


contact_router = APIRouter(
    prefix="/admin",
    tags=["User Login and Signup"]
)


contact_router.post("/contact")
async def ContactUs(data:ContactValidation):
    return{
        "message":"Contact-Form code will be work from here"
    }
