from fastapi.routing import APIRouter
from fastapi import HTTPException,Depends
from sqlalchemy.orm import Session
from Validation.validation import SignupValidation,LoginValidation,verify_password,hash_password,create_acess_token
from Database.database import get_db
from fastapi import status,HTTPException
from Database.Schemas import UserCredentials
from fastapi.security import OAuth2PasswordRequestForm

auth_router = APIRouter(
    prefix="/auth",
    tags=["User Login and Signup"]
)

@auth_router.post("/signup")
async def Signup(data:SignupValidation,db:Session=Depends(get_db)):
    check_user = db.query(UserCredentials).filter(UserCredentials.email == data.email).first()
    try:
        if check_user:
            raise HTTPException(status_code=400, detail="User already exists")

        hashed_password = hash_password(data.password)

        new_user = UserCredentials(
            name=data.name,
            email=data.email,
            password=hashed_password
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "message": "User created successfully",
            "user_id": new_user.user_id,
            "email": new_user.email
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@auth_router.post("/login")
async def Login(data:LoginValidation,db:Session=Depends(get_db)):
    try:
        check_user = db.query(UserCredentials).filter(UserCredentials.email==data.email).first()
        if not check_user:
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED, 
                detail = "Credential are invalid" 
            )
        verify_pass = verify_password(data.password,check_user.password)
        if not verify_pass:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = "Credential are invalid" 
            )
        acess_token = create_acess_token(data={"user_id":check_user.user_id})
        return{
            "acess_token" : acess_token,
            "token_type" : "Bearer"
        }
    except Exception as e:
        raise HTTPException(status_code=501,detail=str(e))