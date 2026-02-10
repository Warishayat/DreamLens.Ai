from fastapi import FastAPI
from Routes.auth import auth_router
from Routes.contact import contact_router



app = FastAPI(title="DreamLens.Ai")


app.include_router(auth_router)
app.include_router(contact_router)
