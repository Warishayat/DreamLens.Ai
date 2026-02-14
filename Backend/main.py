from fastapi import FastAPI
from Routes.auth import auth_router
from Routes.contact import contact_router
from Routes.dashboard import dashbaord_router
from Routes.images import img_router
from Database.database import engine,Base
from fastapi.middleware.cors import CORSMiddleware
from Database import Schemas


Base.metadata.create_all(bind=engine)
print(Base.metadata.tables.keys())

app = FastAPI(title="DreamLens.Ai")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)


@app.get("/")
def welcome():
    return{
        "status":200,
        "message":"Your App is up."
    }

app.include_router(auth_router)
app.include_router(contact_router)
app.include_router(img_router)
app.include_router(dashbaord_router)