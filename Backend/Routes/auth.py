from fastapi.routing import APIRouter
from fastapi import HTTPException,Depends
from Validation.validation import SignupValidation,LoginValidation


auth_router = APIRouter(
    prefix="/auth",
    tags=["User Login and Signup"]
)


auth_router.post("/signup")
async def Signup(data:SignupValidation):
    return{
        "message":"Signup code will be work from here"
    }

auth_router.post("/login")
async def Login(data:LoginValidation):
    return{
        "message":"Login code will be work from here"
    }
