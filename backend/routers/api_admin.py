from fastapi import status, Depends
from validations import Account, Employee, Work, UserInfo, Receipt, Order, Computer, Connect
from validations import Account_out, Receipt_out, UserInfo_out, Order_out, Computer_out
from typing import List
from fastapi import APIRouter
from repository import (
    account_services,
    employee_services,
    work_services,
    user_services,
    receipt_services,
    order_services,
    computer_services
)
import models, oauth2

router = APIRouter(prefix="/admin", tags=["admins"])

# @router.get("/account", response_model=List[Account_out], status_code=200)
# async def read_account(current_user: models.Account = Depends(oauth2.get_current_user)):
#     # if(current_user.role != "Admin"):
#     return account_services.read_account()


@router.get("/account", response_model=List[Account_out], status_code=200)
async def read_account():
    return account_services.read_account()


@router.post(
    "/account", response_model=Account_out, status_code=status.HTTP_201_CREATED
)
async def create_account(account: Account):
    return account_services.create_account(account)


@router.put(
    "/account/{account_id}", response_model=Account_out, status_code=status.HTTP_200_OK
)
async def update_account(account_id: int, account: Account):
    return account_services.update_account(account_id, account)


@router.delete(
    "/account/{account_id}", response_model=Account_out, status_code=status.HTTP_200_OK
)
async def delete_account(account_id: int):
    return account_services.delete_account(account_id)


@router.get("/employee", response_model=List[Employee], status_code=200)
async def read_employee():
    return employee_services.read_employee()


@router.get("/employee/{e_id}", response_model=Employee, status_code=200)
async def read_employee(e_id: int):
    return employee_services.get_employee_by_id(e_id)


@router.post("/employee", response_model=Employee, status_code=status.HTTP_201_CREATED)
async def create_employee(employee: Employee):
    return employee_services.create_employee(employee)


@router.put("/employee/{employee_id}", response_model=Employee, status_code=200)
async def update_employee(employee_id: int, employee: Employee):
    return employee_services.update_employee(employee_id, employee)


@router.delete(
    "/employee/{employee_id}", response_model=Employee, status_code=status.HTTP_200_OK
)
async def delete_employee(employee_id):
    return employee_services.delete_employee(employee_id)


@router.get("/work", response_model=List[Work], status_code=status.HTTP_200_OK)
async def read_work():
    return work_services.read_work()


@router.post("/work", response_model=Work, status_code=status.HTTP_201_CREATED)
async def create_work(work: Work):
    return work_services.create_work(work)


@router.put("/work/{workID}", response_model=Work, status_code=status.HTTP_200_OK)
async def update_work(workID: int, work: Work):
    return work_services.update_work(workID, work)


@router.get(
    "/userinfo/", response_model=List[UserInfo_out], status_code=status.HTTP_200_OK
)
async def read_user():
    return user_services.read_userinfo()


@router.get("/userinfo/{user_id}", response_model=UserInfo_out, status_code=200)
async def read_user(user_id: int):
    return user_services.get_user_by_id(user_id)


@router.post(
    "/userinfo", response_model=UserInfo_out, status_code=status.HTTP_201_CREATED
)
async def create_user(usserInfo: UserInfo):
    return user_services.create_userinfo(usserInfo)


@router.put(
    "/userinfo/{userInfo_id}",
    response_model=UserInfo_out,
    status_code=status.HTTP_200_OK,
)
async def update_user(userInfo_id: int, userInfo: UserInfo):
    return user_services.update_userinfo(userInfo_id, userInfo)


@router.delete(
    "/userinfo/{userInfo_id}",
    response_model=UserInfo_out,
    status_code=status.HTTP_200_OK,
)
async def delete_user(userInfo_id: int):
    return user_services.delete_userinfo(userInfo_id)


@router.get(
    "/reciept", response_model=List[Receipt_out], status_code=status.HTTP_200_OK
)
async def read_reciept():
    return receipt_services.read_receipt()


@router.get(
    "/reciept/{reciept_ID}", response_model=Receipt_out, status_code=status.HTTP_200_OK
)
async def read_reciept(reciept_ID: int):
    return receipt_services.read_receipt_id(reciept_ID)


@router.post(
    "/reciept", response_model=Receipt_out, status_code=status.HTTP_201_CREATED
)
async def create_reciept(receipt: Receipt):
    return receipt_services.create_receipt(receipt)


@router.get("/order", response_model=Order, status_code=status.HTTP_200_OK)
async def read_order_id(order_id):
    return order_services.read_order(order_id)


@router.get("/order/{oder_id}", response_model=Order, status_code=status.HTTP_200_OK)
async def read_order_id(order_id):
    return order_services.read_order_id(order_id)


@router.post("/order", response_model=Order_out, status_code=status.HTTP_201_CREATED)
async def create_order(order: Order):
    return order_services.create_order(order)


@router.put("/order", response_model=Order_out, status_code=status.HTTP_200_OK)
async def update_order(orderID: int, status: str):
    return order_services.update_order(orderID, status)


@router.delete("/order", response_model=Order_out, status_code=status.HTTP_200_OK)
async def update_order(orderID: int):
    return order_services.delete_order(orderID)


@router.get("/computer", response_model=List[Computer_out], status_code=status.HTTP_200_OK)
async def read_computer():
    return computer_services.read_computer()


@router.put("/computer", response_model=Computer_out, status_code=status.HTTP_200_OK)
async def update_computer(comID: int, connect: Connect, computer: Computer):
    return computer_services.update_computer(
        comID=comID, connect=connect, computer=computer
    )
