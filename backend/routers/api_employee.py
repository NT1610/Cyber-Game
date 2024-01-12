from fastapi import status, Depends, HTTPException
from validations import (
    Account,
    UserInfo,
    Receipt,
    Order,
    Computer,
    Connect,
    Area,
)
from validations import Account_out, Receipt_out, UserInfo_out, Order_out, Computer_out
from typing import List
from fastapi import APIRouter
from repository import (
    account_services,
    user_services,
    receipt_services,
    order_services,
    computer_services,
    area_services,
)

import models, oauth2

router = APIRouter(prefix="/employee", tags=["Employee"])


@router.get("/account", response_model=List[Account_out], status_code=200)
async def read_account(current_user: models.Account = Depends(oauth2.get_current_user)):
    """
    - Hàm lấy danh sách các tài khoản
    - Trả về 200 là thành công, 422 là lỗi truyền vào
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return account_services.read_account_by_employee()


@router.post(
    "/account", response_model=Account_out, status_code=status.HTTP_201_CREATED
)
async def create_account(
    account: Account, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm nhận tên tài khoản (account), mật khẩu (password) để tạo tài khoản mới cho người dùng
    - Trả về 200 là thành công, 422 là lỗi truyền vào, 400 là không có quyền thay đổi
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Not an Admin"
        )

    if current_user.role == "Employee":
        account.role = "User"

    return account_services.create_account(account)


@router.put(
    "/account/{account_id}", response_model=Account_out, status_code=status.HTTP_200_OK
)
async def update_account(
    account_id: int,
    account: Account,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    """
    - Hàm nhận tên tài khoản (account), mật khẩu (password), cập nhật người dùng có tài khoản có mã {account_id}
    - Trả về 200 là thành công, 422 là lỗi truyền vào, 400 là không có quyền
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Not an Admin"
        )

    if current_user.role == "Employee":
        account.role = "User"

    return account_services.update_account(account_id, account)


@router.delete(
    "/account/{account_id}", response_model=Account_out, status_code=status.HTTP_200_OK
)
async def delete_account(
    account_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm nhận accountID để xóa tài khoản của người dùng
    - Trả về 200 là thành công, 422 là lỗi truyền vào, 400 là không có quyền
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return account_services.delete_account(account_id)


@router.get("/userinfo/{user_id}", response_model=UserInfo_out, status_code=200)
async def read_user(
    user_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm hiển thị ra tất cả user 
    - Trả về 200 là thành công, 400 là không có quyền
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
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
    """
    - Hàm hiển thị tài khoản có mã {acoount_id}
    - Trả về 200 là thành công, 400 là không có quyền
    """
    if current_user.role != "Employee":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return user_services.get_user_by_account_id(account_id)


@router.post(
    "/userinfo", response_model=UserInfo_out, status_code=status.HTTP_201_CREATED
)
async def create_user(
    usserInfo: UserInfo, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm nhận mã tài khoản (accounID), tên người dùng (name), ngày sinh (birth), mã căn cước
    (id), số điện thoại (phone) và số tiền nhập vào (money) để tạo user mới
    - Trả về 201 là thành công, 422 là lỗi định dạng, 400 là không có quyền
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
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
    """
    - Hàm nhận mã tài khoản (accounID), tên người dùng (name), ngày sinh (birth), mã căn cước
    (id), số điện thoại (phone) và số tiền nhập vào (money) để cập nhật user có mã {userInfo_id}
    - Trả về 200 là thành công, 422 là lỗi định dạng, 400 là không có quyền
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
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
    """
    - Hàm xóa người dùng có mã {userInfo_id}
    - Trả về 200 là thành công, 422 là lỗi định dạng, 400 là không có quyền
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return user_services.delete_userinfo(userInfo_id)


@router.get(
    "/reciept/{reciept_ID}", response_model=Receipt_out, status_code=status.HTTP_200_OK
)
async def read_reciept(
    reciept_ID: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm để xem các hóa đơn để được giao dịch
    - Trả về 200 là thành công, 400 là không có quyền
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return receipt_services.read_receipt_id(reciept_ID)


@router.post(
    "/reciept", response_model=Receipt_out, status_code=status.HTTP_201_CREATED
)
async def create_reciept(
    receipt: Receipt, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm nhận mã người dùng (userID), mô tả thanh toán (description), số tiền thanh toán
    (money), thời gian giao dịch (time) để tạo một giao dịch mới
    - Trả về 201 là thành công, 422 là lỗi định dạng, 400 là không có quyền
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return receipt_services.create_receipt(receipt)


@router.get("/order/{oder_id}", response_model=Order, status_code=status.HTTP_200_OK)
async def read_order_id(
    order_id, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm trả về các thuộc tính của order có mã {oder_id}
    - Trả về 200 là thành công, 400 là không có quyền
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return order_services.read_order_id(order_id)


@router.post("/order", response_model=Order_out, status_code=status.HTTP_201_CREATED)
async def create_order(
    order: Order, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm nhận mã người dùng (userID), mã món ăn (foodID), số lượng đặt (quantity),
    thời gian đặt (orderTime), tình trạng đặt (status) để tạo một order mới
    - Trả về 201 là thành công, 422 là lỗi định dạng, 400 là không có quyền
    """
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return order_services.create_order(order)


@router.put("/order", response_model=Order_out, status_code=status.HTTP_200_OK)
async def update_order(
    orderID: int,
    status: str,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return order_services.update_order(orderID, status)


@router.delete("/order", response_model=Order_out, status_code=status.HTTP_200_OK)
async def update_order(
    orderID: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return order_services.delete_order(orderID)


@router.get(
    "/computer", response_model=List[Computer_out], status_code=status.HTTP_200_OK
)
async def read_computer(
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return computer_services.read_computer()


@router.put(
    "/computer/connect", response_model=Computer_out, status_code=status.HTTP_200_OK
)
async def update_computer(
    comID: int,
    connect: Connect,
    computer: Computer,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return computer_services.update_computer(
        comID=comID, connect=connect, computer=computer
    )


@router.put("/computer", response_model=Computer_out, status_code=status.HTTP_200_OK)
async def update_computer(
    comID: int,
    computer: Computer,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return computer_services.update_computer(
        comID=comID, connect=None, computer=computer
    )


@router.get("/area", response_model=List[Area], status_code=status.HTTP_200_OK)
async def read_area(current_user: models.Account = Depends(oauth2.get_current_user)):
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return area_services.read_area()


@router.get("/area/{area_id}", response_model=Area, status_code=status.HTTP_200_OK)
async def read_area(
    area_id: str, current_user: models.Account = Depends(oauth2.get_current_user)
):
    role = ["Admin", "Employee"]
    if current_user.role not in role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't employee"
        )
    return area_services.read_area_id(area_id)