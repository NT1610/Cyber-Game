from fastapi import status, Depends, HTTPException
from validations import (
    Account,
    Employee,
    Work,
    UserInfo,
    Receipt,
    Order,
    Computer,
    Connect,
    Area,
)
from validations import (
    Account_out,
    Receipt_out,
    UserInfo_out,
    Order_out,
    Computer_out,
)
from typing import List
from fastapi import APIRouter
from repository import (
    account_services,
    employee_services,
    work_services,
    user_services,
    receipt_services,
    order_services,
    computer_services,
    area_services,
)
import models, oauth2

router = APIRouter(prefix="/admin", tags=["admins"])


@router.get("/account", response_model=List[Account_out], status_code=200)
async def read_account(current_user: models.Account = Depends(oauth2.get_current_user)):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return account_services.read_account()


@router.post(
    "/account", response_model=Account_out, status_code=status.HTTP_201_CREATED
)
async def create_account(
    account: Account, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return account_services.create_account(account)


@router.put(
    "/account/{account_id}", response_model=Account_out, status_code=status.HTTP_200_OK
)
async def update_account(
    account_id: int,
    account: Account,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return account_services.update_account(account_id, account)


@router.delete(
    "/account/{account_id}", response_model=Account_out, status_code=status.HTTP_200_OK
)
async def delete_account(
    account_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return account_services.delete_account(account_id)


@router.get("/employee", response_model=List[Employee], status_code=200)
async def read_employee(
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return employee_services.read_employee()


@router.get("/employee/{e_id}", response_model=Employee, status_code=200)
async def read_employee(
    e_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return employee_services.get_employee_by_id(e_id)


@router.post("/employee", response_model=Employee, status_code=status.HTTP_201_CREATED)
async def create_employee(
    employee: Employee, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return employee_services.create_employee(employee)


@router.put("/employee/{employee_id}", response_model=Employee, status_code=200)
async def update_employee(
    employee_id: int,
    employee: Employee,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return employee_services.update_employee(employee_id, employee)


@router.delete(
    "/employee/{employee_id}", response_model=Employee, status_code=status.HTTP_200_OK
)
async def delete_employee(
    employee_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return employee_services.delete_employee(employee_id)


@router.get("/work", response_model=List[Work], status_code=status.HTTP_200_OK)
async def read_work(current_user: models.Account = Depends(oauth2.get_current_user)):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return work_services.read_work()


@router.post("/work", response_model=Work, status_code=status.HTTP_201_CREATED)
async def create_work(
    work: Work, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return work_services.create_work(work)


@router.put("/work/{workID}", response_model=Work, status_code=status.HTTP_200_OK)
async def update_work(
    workID: int,
    work: Work,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return work_services.update_work(workID, work)


@router.get(
    "/userinfo/", response_model=List[UserInfo_out], status_code=status.HTTP_200_OK
)
async def read_user(current_user: models.Account = Depends(oauth2.get_current_user)):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return user_services.read_userinfo()


@router.get("/userinfo/{user_id}", response_model=UserInfo_out, status_code=200)
async def read_user(
    user_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return user_services.get_user_by_id(user_id)


@router.get(
    "/userinfo/account/{account_id}",
    response_model=UserInfo_out,
    status_code=status.HTTP_200_OK,
)
async def read_userinfo_by_account_id(
    account_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return user_services.get_user_by_account_id(account_id)


@router.post(
    "/userinfo", response_model=UserInfo_out, status_code=status.HTTP_201_CREATED
)
async def create_user(
    usserInfo: UserInfo, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return user_services.create_userinfo(usserInfo)


@router.put(
    "/userinfo/{userInfo_id}",
    response_model=UserInfo_out,
    status_code=status.HTTP_200_OK,
)
async def update_user(
    userInfo_id: int,
    userInfo: UserInfo,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return user_services.update_userinfo(userInfo_id, userInfo)


@router.delete(
    "/userinfo/{userInfo_id}",
    response_model=UserInfo_out,
    status_code=status.HTTP_200_OK,
)
async def delete_user(
    userInfo_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return user_services.delete_userinfo(userInfo_id)


@router.get(
    "/reciept", response_model=List[Receipt_out], status_code=status.HTTP_200_OK
)
async def read_reciept(current_user: models.Account = Depends(oauth2.get_current_user)):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return receipt_services.read_receipt()


@router.get(
    "/reciept/{reciept_ID}", response_model=Receipt_out, status_code=status.HTTP_200_OK
)
async def read_reciept(
    reciept_ID: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return receipt_services.read_receipt_id(reciept_ID)


@router.post(
    "/reciept", response_model=Receipt_out, status_code=status.HTTP_201_CREATED
)
async def create_reciept(
    receipt: Receipt, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return receipt_services.create_receipt(receipt)


@router.get("/order", response_model=Order, status_code=status.HTTP_200_OK)
async def read_order(
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return order_services.read_order()


@router.get("/order/{oder_id}", response_model=Order, status_code=status.HTTP_200_OK)
async def read_order_id(
    order_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return order_services.read_order_id(order_id)


@router.post("/order", response_model=Order_out, status_code=status.HTTP_201_CREATED)
async def create_order(
    order: Order, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return order_services.create_order(order)


@router.put("/order", response_model=Order_out, status_code=status.HTTP_200_OK)
async def update_order(
    orderID: int,
    status: str,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return order_services.update_order(orderID, status)


@router.delete("/order", response_model=Order_out, status_code=status.HTTP_200_OK)
async def update_order(
    orderID: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return order_services.delete_order(orderID)


@router.get(
    "/computer", response_model=List[Computer_out], status_code=status.HTTP_200_OK
)
async def read_computer(
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return computer_services.read_computer()


@router.post(
    "/computer", response_model=Computer_out, status_code=status.HTTP_201_CREATED
)
async def create_computer(
    computer: Computer, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return computer_services.create_computer(computer)


@router.put("/computer", response_model=Computer_out, status_code=status.HTTP_200_OK)
async def update_computer(
    comID: int,
    connect: Connect,
    computer: Computer,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return computer_services.update_computer(
        comID=comID, connect=connect, computer=computer
    )


@router.delete("/computer", response_model=Computer_out, status_code=status.HTTP_200_OK)
async def delete_computer(
    comID: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return computer_services.delete_computer(comID)


@router.get("/area", response_model=List[Area], status_code=status.HTTP_200_OK)
async def read_area(current_user: models.Account = Depends(oauth2.get_current_user)):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return area_services.read_area()


@router.get("/area/{area_id}", response_model=Area, status_code=status.HTTP_200_OK)
async def read_area(
    area_id: str, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return area_services.read_area_id(area_id)


@router.post("/area", response_model=Area, status_code=status.HTTP_201_CREATED)
async def create_area(
    area: Area, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return area_services.create_area(area)


@router.put("/area", response_model=Area, status_code=status.HTTP_200_OK)
async def update_area(
    area_id: str,
    area: Area,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return area_services.update_area(area_id, area)


@router.delete("/area/{area_id}", response_model=Area, status_code=status.HTTP_200_OK)
async def delete_area(
    area_id: str, current_user: models.Account = Depends(oauth2.get_current_user)
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return area_services.delete_area(area_id)
