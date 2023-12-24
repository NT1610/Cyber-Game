from fastapi import FastAPI, status, Depends, HTTPException, Form
from fastapi.responses import HTMLResponse
from validations import UserInfo
from typing import List
from fastapi import APIRouter
from repository import user_services
import oauth2, models

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/userinfo/{user_id}", response_model=UserInfo, status_code=200)
async def read_userinfo(user_id: int, current_user: models.Account = Depends(oauth2.get_current_user)):
    return user_services.get_user_by_id(user_id)


@router.post("/userinfo", response_model=UserInfo, status_code=status.HTTP_201_CREATED)
async def create_work(usserInfo: UserInfo):
    return user_services.create_userinfo(usserInfo)


@router.put(
    "/userinfo/{userInfo_id}", response_model=UserInfo, status_code=status.HTTP_200_OK
)
async def update_work(userInfo_id: int, userInfo: UserInfo):
    return user_services.update_userinfo(userInfo_id, userInfo)


@router.delete(
    "/userinfo/{userInfo_id}", response_model=UserInfo, status_code=status.HTTP_200_OK
)
async def delete_work(userInfo_id: int):
    return user_services.delete_userinfo(userInfo_id)
