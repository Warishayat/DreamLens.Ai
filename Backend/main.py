from fastapi import FastAPI
from fastapi.responses import FileResponse
from Routes.auth import auth_router
from Routes.contact import contact_router
from Routes.dashboard import dashbaord_router
from Routes.images import img_router
from Routes.videos import video_router
from Database.database import engine,Base
from fastapi.middleware.cors import CORSMiddleware
from Database import Schemas
from slowapi import _rate_limit_exceeded_handler
from Utils.limiter import limiter
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware


app = FastAPI(title="DreamLens.Ai")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)
app.add_exception_handler(
    RateLimitExceeded,_rate_limit_exceeded_handler
)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    print("Tables:", Base.metadata.tables.keys())

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
app.include_router(video_router)

@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    return FileResponse("Frontend/dist/index.html")