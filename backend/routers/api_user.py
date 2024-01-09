from fastapi import status, Depends, HTTPException
from validations import UserInfo, Order, Computer, Receipt, Connect, Area
from validations import Order_out, UserInfo_out, Computer_out
from typing import List
from fastapi import APIRouter
from repository import (
    user_services,
    order_services,
    computer_services,
    receipt_services,
    area_services,
)
import oauth2, models

router = APIRouter(prefix="/user", tags=["User"])


@router.get(
    "/userinfo/{user_id}", response_model=UserInfo_out, status_code=status.HTTP_200_OK
)
async def read_userinfo_id(
    user_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    return user_services.get_user_by_id(user_id)


@router.get(
    "/userinfo/account/{account_id}",
    response_model=UserInfo_out,
    status_code=status.HTTP_200_OK,
)
async def read_userinfo_by_account_id(
    account_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    role = ["Admin", "Employee", "User"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't user"
        )
    return user_services.get_user_by_account_id(account_id)


@router.put(
    "/userinfo/{userInfo_id}",
    response_model=UserInfo,
    status_code=status.HTTP_200_OK,
)
async def update_user(
    userInfo_id: int,
    userInfo: UserInfo_out,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    return user_services.update_userinfo(userInfo_id, userInfo)


@router.post("/reciept", response_model=Receipt, status_code=status.HTTP_201_CREATED)
async def create_reciept(receipt: Receipt):
    return receipt_services.create_receipt(receipt)


@router.get("/order/{oder_id}", response_model=Order, status_code=status.HTTP_200_OK)
async def read_order_id(
    order_id, current_user: models.Account = Depends(oauth2.get_current_user)
):
    return order_services.read_order_id(order_id)


@router.post("/order", response_model=Order_out, status_code=status.HTTP_201_CREATED)
async def create_order(
    order: Order, current_user: models.Account = Depends(oauth2.get_current_user)
):
    return order_services.create_order(order)


@router.get(
    "/computer", response_model=List[Computer_out], status_code=status.HTTP_200_OK
)
async def read_computer():
    return computer_services.read_computer()


@router.put("/computer", response_model=Computer_out, status_code=status.HTTP_200_OK)
async def update_computer(
    comID: int,
    connect: Connect,
    computer: Computer,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    return computer_services.update_computer(
        comID=comID, connect=connect, computer=computer
    )


@router.get("/area", response_model=List[Area], status_code=status.HTTP_200_OK)
async def read_area():
    return area_services.read_area()


@router.get("/area/{area_id}", response_model=Area, status_code=status.HTTP_200_OK)
async def read_area(
    area_id: str, current_user: models.Account = Depends(oauth2.get_current_user)
):
    return area_services.read_area_id(area_id)
