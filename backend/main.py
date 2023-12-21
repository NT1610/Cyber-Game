from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from passlib.context import CryptContext
from pydantic import BaseModel
import api_account

app = FastAPI()

app.include_router(api_account.router)
