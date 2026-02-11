from pydantic import BaseModel,EmailStr
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')
pwd_context = CryptContext(schemes=['bcrypt'],deprecated="auto")


def create_acess_token(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=320)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


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