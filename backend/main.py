from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from passlib.context import CryptContext
from pydantic import BaseModel
import api_admin
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[""],
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=["*"]
)

app.include_router(api_admin.router)
