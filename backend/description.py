text = """
        API này cung cấp quyền truy cập vào cơ sở dữ liệu, bảng và dữ liệu theo quyền của admin, employee, user.
1)	Login:
-	POST
    http://127.0.0.1:8000/login	
    •   URL: /login
    •   Description: Tạo tocken
    •	Parameters:
        o	username (string): Tên tài khoản
        o	password (string): Mật khẩu
2)	Admin
2.1) Account
-	GET:
    http://127.0.0.1:8000/admin/account
    •	URL: /admin/account
    •	Description: Đọc tất cả account, kết quả trả về là mảng gồm các phần tử chứa:
        o	accountID (integer ): chỉ số tài khoản
        o	account (string): tài khoản
        o	role (string): quyền của tài khoản
    •	Parameters:
        o	subscription-key (string): Authentication Key

-	POST:
    http://127.0.0.1:8000/admin/account
    •	URL: /admin/account
    •	Description: Tạo account, kết quả trả về phần tử chứa:
        o	accountID (integer ): chỉ số tài khoản
        o	account (string): tài khoản
        o	role (string): quyền của tài khoản
    •	Parameters:
        o	subscription-key (string): Authentication Key
        o	accountID (integer ): chỉ số tài khoản
        o	account (string): tài khoản
        o	password (string): mật khẩu
        o	role (string): quyền của tài khoản

-	PUT:
    http://127.0.0.1:8000/admin/account/{account_id}
    •	URL: /admin/account
    •	Description: Sửa account, kết quả trả về phần tử chứa:
        o	accountID (integer ): chỉ số tài khoản
        o	account (string): tài khoản
        o	role (string): quyền của tài khoản
    •	Parameters:
        o	subscription-key (string): Authentication Key
        o	account_id (integer): chỉ số tài khoản cũ
        o	accountID (integer ): chỉ số tài khoản mới
        o	account (string): tài khoản
        o	password (string): mật khẩu
        o	role (string): quyền của tài khoản gồm ["Admin", "Employee", "User"]

-	DELETE:
    http://127.0.0.1:8000/admin/account/{account_id}
    •	URL: /admin/account
    •	Description: Xóa account, kết quả trả về phần tử chứa:
        o	accountID (integer ): chỉ số tài khoản
        o	account (string): tài khoản
        o	role (string): quyền của tài khoản
    •	Parameters:
        o	subscription-key (string): Authentication Key
        o	account_id (integer): chỉ số tài khoản cũ
2.1) Employee


3)	


"""
