# CYBER GAME WEB

## Introduction
- Bộ môn: ** Lập trình Web ** 
- Khoa: [Khoa Toán Cơ Tin học](http://mim.hus.vnu.edu.vn/en)
- Trường: [Đại học Khoa học Tự nhiên, Đại học Quốc gia Hà Nội](http://hus.vnu.edu.vn/)

## System Design


![image](https://github.com/hausura/show_read_me/blob/main/Web_cyber.png)

## How to set up
### 1. Clone master brand

```
git clone https://github.com/NT1610/Cyber-Game.git
```

### 2.Install packages
## Back-End:
```
pip install -r requirement.txt
```
###### (file requirement.txt chứa các thư viện cần thiết bao gồm: fastapi, numpy, Pillow, pydicom, uvicorn, python, pyton.dotenv)

## Front-End:
```
npm install
```

## How to use 
### 1.Cách chạy
###### Đồng thời tạo 2 terminal trong VsCode:
- Terminal đầu tiên chạy front-end:
```
cd “./front-end”
```
- Chạy front-end bằng lệnh:
```
npm start
```
- Terminal thứ hai chạy sever back-end:
```
cd “./backend”
```
- Chạy sever back-end bằng lệnh:
```
uvicorn main:app –reload
```







     
