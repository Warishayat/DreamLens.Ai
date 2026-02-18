from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os
from fastapi import HTTPException, status, Depends
from Database.Schemas import UserCredentials
from Database.database import get_db
from typing import Optional

load_dotenv()
security = HTTPBearer()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')
pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")

class TokenData(BaseModel):
    id: Optional[int] = None
    
def create_acess_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verifiy_Acess_token(token: str, credential_Exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise credential_Exception
        token_data = TokenData(id=user_id)
        return token_data
    except JWTError:
        raise credential_Exception

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials 
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return int(user_id)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Could not validate credentials"
        )

def hash_password(plan_pass: str):
    return pwd_context.hash(plan_pass)

def verify_password(plan_pas: str, hashed_pass: str):
    return pwd_context.verify(plan_pas, hashed_pass)

class SignupValidation(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginValidation(BaseModel):
    email: EmailStr
    password: str

class ContactValidation(BaseModel):
    name: str
    email: EmailStr
    topic: str
    message: str

class ImageGenvalidation(BaseModel):
    prompt: str

class VideoGenValidation(BaseModel):
    prompt: str