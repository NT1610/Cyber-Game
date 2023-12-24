from fastapi import FastAPI
from routers import api_admin, auth
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
app.include_router(auth.router)

