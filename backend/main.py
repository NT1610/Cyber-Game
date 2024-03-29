from fastapi import FastAPI
from fastapi.openapi.models import Info, Contact, License
from routers import api_admin, auth, api_user, api_employee
from fastapi.middleware.cors import CORSMiddleware
import description


app = FastAPI(
    title="API Cybergame",
    version="1.0.0",
    description=description.text,
    openapi_url="/openapi.json",
)


origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[""],
#     allow_credentials=True,
#     allow_methods=[""],
#     allow_headers=["*"],
# )

app.include_router(auth.router)
# app.include_router(api_account.router)
app.include_router(api_admin.router)
app.include_router(api_employee.router)
app.include_router(api_user.router)


@app.get("/")
async def get():
    return "Hello, world!"
