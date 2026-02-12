from pydantic import BaseModel,EmailStr
from passlib.context import CryptContext
from jose import jwt,JWTError
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
import os
from fastapi import HTTPException,status,Depends
from Database.Schemas import UserCredentials
from Database.database import get_db


load_dotenv()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')
pwd_context = CryptContext(schemes=['bcrypt'],deprecated="auto")


def create_acess_token(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=320)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            return None

        return user_id
    except JWTError:
        return None

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    user_id = verify_access_token(token)

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.query(UserCredentials).filter(UserCredentials.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user


def hash_passwpord(plan_pass:str):
    return pwd_context.hash(plan_pass)

def verify_password(plan_pas:str,hashed_pass:str):
    return pwd_context.verify(plan_pas,hashed_pass)

class SignupValidation(BaseModel):
    name:str
    email:EmailStr
    password:str

class LoginValidation(BaseModel):
    email:EmailStr
    password:str


class ContactValidation(BaseModel):
    name:str
    email:EmailStr
    topic:str
    message:str

class ImageGenvalidation(BaseModel):
    prompt : str

class VideoGenValidation(BaseModel):
    prompt:str


