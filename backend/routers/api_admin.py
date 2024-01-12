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
    Work_out
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

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/account", response_model=List[Account_out], status_code=200)
async def read_account(current_user: models.Account = Depends(oauth2.get_current_user)):
    """
    - Hàm lấy danh sách các tài khoản
    - Trả về 200 là thành công, 422 là lỗi truyền vào
    """
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
    """
    - Hàm nhận 
    - Trả về 200 là thành công, 422 là lỗi truyền vào
    """
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
    """
    - Description: Sửa account, kết quả trả về phần tử chứa:
        - accountID (integer ): chỉ số tài khoản
        - account (string): tài khoản
        - role (string): quyền của tài khoản
    - Parameters:
        - subscription-key (string): Authentication Key
        - account_id (integer): chỉ số tài khoản cũ
        - accountID (integer ): chỉ số tài khoản mới
        - account (string): tài khoản
        - password (string): mật khẩu
        - role (string): quyền của tài khoản gồm ["Admin", "Employee", "User"]
    """
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
    """
    - Hàm nhận accountID để xóa tài khoản
    - Trả về 200 là thành công, 422 là lỗi truyền vào
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return account_services.delete_account(account_id)


@router.get("/employee", response_model=List[Employee], status_code=200)
async def read_employee(
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    """
    - Hàm trả về các thuộc tính của tất cả nhân viên làm việc trong quán
    - Trả về 200 là thành công
    """
    return employee_services.read_employee()

########################??????????????????????#########################
@router.get("/employee/{account_id}", response_model=Employee, status_code=200)
async def read_employee(
    account_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm nhận mã account (account_id) để trả về các thuộc tính của nhân viên đó
    - Trả về 200 là thành công, 422 là nhân viên không tồn tại
    """
    return employee_services.get_employee_by_id(account_id)


@router.post("/employee", response_model=Employee, status_code=status.HTTP_201_CREATED)
async def create_employee(
    employee: Employee, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm nhận mã tài khoản (AccountID), tên nhân viên (name), ngày sinh (birth),
    mã căn cước (id), số điện thoại (phone), vị trí (position), lương (salary) để tạo
    nhân viên mới
    - Trả về 200 là thành công, trả về 422 là sai định dạng truyền vào 
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return employee_services.create_employee(employee)


@router.put("/employee/{accountID}", response_model=Employee, status_code=200)
async def update_employee(
    accountID: int,
    employee: Employee,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    """
    - Hàm nhận mã tài khoản (AccountID), tên nhân viên (name), ngày sinh (birth),
    mã căn cước (id), số điện thoại (phone), vị trí (position), lương (salary) của nhân viên
    có mã {employee_id} để cập nhật các thông tin mới
    - Trả về 200 là cập nhật thành công, 422 là nhân viên không tồn tại hoặc sai định dạng
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return employee_services.update_employee(accountID, employee)


@router.delete(
    "/employee/{accountID}", response_model=Employee, status_code=status.HTTP_200_OK
)
async def delete_employee(
    accountID: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm nhận mã nhân viên {accountID} để xóa nhân viên
    - Trả về 200 là xóa thành công, 422 là lỗi định dạng hoặc nhân viên không tồn tại
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return employee_services.delete_employee(accountID)


@router.get("/work", response_model=List[Work], status_code=status.HTTP_200_OK)
async def read_work(current_user: models.Account = Depends(oauth2.get_current_user)):
    """
    - Hàm trả về danh sách tất cả các công việc
    - Trả về 200 là thành công
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return work_services.read_work()

@router.get("/work/{employee_id}", response_model=Work_out, status_code=status.HTTP_200_OK)
async def read_work(employee_id:int,current_user: models.Account = Depends(oauth2.get_current_user)):
    """
    - Hàm nhận vào {employee_id} trả về các thuộc tính của công việc đó
    - Trả về 200 là thành công
    """
    return work_services.read_work_id(employee_id)


@router.post("/work", response_model=Work_out, status_code=status.HTTP_201_CREATED)
async def create_work(
    work: Work, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm nhận mã nhân viên (employee_ID), trạng thái mặc định là on (status), giờ
    bắt đầu mặc định là tại thời điểm hiện tại (statTime), và giờ kết thúc mặc định là None 
    (endTime) để tạo một công việc mới
    - Trả về 201 là thành công, 422 là lỗi định dạng
    """
    return work_services.create_work(work)

@router.put("/work/{workID}", response_model=Work_out, status_code=status.HTTP_200_OK)
async def update_work(
    workID: int,
    work: Work,
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    """
    - Hàm nhận mã nhân viên (workID), trạng thái mặc định là off (status), giờ
    bắt đầu mặc định (statTime), và giờ kết thúc mặc định là hiện tại (endTime) để cập nhật 
    công việc có mã {workID}
    - Trả về 201 là thành công, 422 là lỗi định dạng
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return work_services.update_work(workID, work)


@router.get(
    "/userinfo/", response_model=List[UserInfo_out], status_code=status.HTTP_200_OK
)
async def read_user(current_user: models.Account = Depends(oauth2.get_current_user)):
    """
    - Hàm hiển thị ra các thuộc tính của người dùng có mã {user_id}
    - Trả về 200 là thành công
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return user_services.read_userinfo()


@router.get("/userinfo/{user_id}", response_model=UserInfo_out, status_code=200)
async def read_user(
    user_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm hiển thị ra các thuộc tính của người dùng có mã {user_id}
    - Trả về 200 là thành công
    """
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
    """
    - Hàm hiển thị tài khoản có mã {acoount_id}
    - Trả về 200 là thành công
    """
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
    """
    - Hàm nhận mã tài khoản (accounID), tên người dùng (name), ngày sinh (birth), mã căn cước
    (id), số điện thoại (phone) và số tiền nhập vào (money) để tạo user mới
    - Trả về 201 là thành công, 422 là lỗi định dạng
    """
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
    """
    - Hàm nhận mã tài khoản (accounID), tên người dùng (name), ngày sinh (birth), mã căn cước
    (id), số điện thoại (phone) và số tiền nhập vào (money) để cập nhật user có mã {userInfo_id}
    - Trả về 200 là thành công, 422 là lỗi định dạng
    """
    
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
    """
    - Hàm xóa người dùng có mã {userInfo_id}
    - Trả về 200 là thành công, 422 là lỗi định dạng
    """    
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return user_services.delete_userinfo(userInfo_id)


@router.get(
    "/reciept", response_model=List[Receipt_out], status_code=status.HTTP_200_OK
)
async def read_reciept(current_user: models.Account = Depends(oauth2.get_current_user)):
    """
    - Hàm để xem các hóa đơn để được giao dịch
    - Trả về 200 là thành công
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return receipt_services.read_receipt()


@router.get(
    "/reciept/{reciept_ID}", response_model=Receipt_out, status_code=status.HTTP_200_OK
)
async def read_reciept_id(
    reciept_ID: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm lấy hóa đơn có mã {receipt_ID} để hiển thị
    - Trả về 200 là thành công
    """
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
    """
    - Hàm nhận mã người dùng (userID), mô tả thanh toán (description), số tiền thanh toán
    (money), thời gian giao dịch (time) để tạo một giao dịch mới
    - Trả về 201 là thành công, 422 là lỗi định dạng
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return receipt_services.create_receipt(receipt)


@router.get("/order", response_model=List[Order_out], status_code=status.HTTP_200_OK)
async def read_order(
    current_user: models.Account = Depends(oauth2.get_current_user),
):
    """
    - Hàm trả về danh sách các order đã được đặt
    - Trả về 200 là thành công
    """
    if current_user.role != "Admin" and current_user.role != "Employee" :
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return order_services.read_order()


@router.get("/order/{oder_id}", response_model=Order, status_code=status.HTTP_200_OK)
async def read_order_id(
    order_id: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm trả về các thuộc tính của order có mã {oder_id}
    - Trả về 200 là thành công
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return order_services.read_order_id(order_id)


@router.post("/order", response_model=Order_out, status_code=status.HTTP_201_CREATED)
async def create_order(
    order: Order, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm nhận mã người dùng (userID), mã món ăn (foodID), số lượng đặt (quantity),
    thời gian đặt (orderTime), tình trạng đặt (status) để tạo một order mới
    - Trả về 201 là thành công, 422 là lỗi định dạng
    """
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
    """
    - Hàm nhận mã người dùng (userID), mã món ăn (foodID), số lượng đặt (quantity),
    thời gian đặt (orderTime), tình trạng đặt (status) để cập nhật order có mã {OrderID}
    - Trả về 201 là thành công, 422 là lỗi định dạng

    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return order_services.update_order(orderID, status)


@router.delete("/order", response_model=Order_out, status_code=status.HTTP_200_OK)
async def delete_order(
    orderID: int, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm xóa order có mã {orderID}
    - Trả về 200 là thành công, 422 là lỗi định dạng
    """
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
    """
    - Hàm trả về các máy tính
    - Trả về 200 là thành công, 422 là lỗi định dạng
    """
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
    """
    - Hàm nhận khu vực của máy tính (area), tình trạng của máy tính (status) để 
    tạo một máy tính mới
    - Trả về 200 là thành công, 422 là lỗi định dạng
    """
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
    """
    - Hàm nhận các thông tin kết nối(Connect), thông tin máy tính (Computer) để 
    cập nhật máy tính có mã {comID}. Nếu để máy là ON sẽ tự tạo trạng thái connect
    cho người dùng.
    - Trả về 200 là thành công, 422 là lỗi định dạng
    """
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
    """
    - Hàm xóa máy tính có mã {comID}
    - Trả về 200 là thành công, 422 là lỗi định dạng
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return computer_services.delete_computer(comID)


@router.get("/area", response_model=List[Area], status_code=status.HTTP_200_OK)
async def read_area(current_user: models.Account = Depends(oauth2.get_current_user)):
    """
    - Hàm trả về các khu vực 
    - Trả về 200 là thành công
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return area_services.read_area()


@router.get("/area/{area_id}", response_model=Area, status_code=status.HTTP_200_OK)
async def read_area_id(
    area_id: str, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm trả về khu vực có mã {areaID}
    - Trả về 200 là thành công
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return area_services.read_area_id(area_id)


@router.post("/area", response_model=Area, status_code=status.HTTP_201_CREATED)
async def create_area(
    area: Area, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm nhận khu vực (area), giá ở khu vực đó (price) để tạo khu vực mới
    - Trả về 200 là thành công, 422 là lỗi định dạng
    """
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
    """
    - Hàm nhận khu vực (area), giá ở khu vực đó (price) để cập nhật khu vực có mã {area_id}
    - Trả về 200 là thành công, 422 là lỗi định dạng
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return area_services.update_area(area_id, area)


@router.delete("/area/{area_id}", response_model=Area, status_code=status.HTTP_200_OK)
async def delete_area(
    area_id: str, current_user: models.Account = Depends(oauth2.get_current_user)
):
    """
    - Hàm xóa khu vực có mã {area_id}
    - Trả về 200 là thành công, 422 là lỗi định dạng
    """
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="can't admin"
        )
    return area_services.delete_area(area_id)
