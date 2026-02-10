from pydantic import BaseModel,EmailStr

class SignupValidation(BaseModel):
    name:str
    email:EmailStr
    password:str
    Age:int

class LoginValidation(BaseModel):
    email:EmailStr
    password:str


class ContactValidation(BaseModel):
    name:str
    email:EmailStr
    topic:str
    message:str