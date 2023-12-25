from pydantic import BaseModel
from datetime import date, time, datetime
from typing import Optional


class MyBaseModel(BaseModel):
    class Config:
        orm_mode = True


class Account(MyBaseModel):
    account: str
    password: str
    role: str


class Account_out(MyBaseModel):
    accountID: int 
    account: str
    role: str


class UserInfo(MyBaseModel):
    accountID: int
    name: str
    birth: date
    id: str
    phone: str
    money: float


class Receipt(MyBaseModel):
    userID: int
    description: str
    money: int
    time: time


class Order(MyBaseModel):
    userID: int
    foodID: int
    quantity: int
    orderTime: datetime
    status: str


class Menu(MyBaseModel):
    name: int
    price: float


class Storage(MyBaseModel):
    name: str
    quantity: int


class Computer(MyBaseModel):
    area: str
    status: str


class Employee(MyBaseModel):
    accountID: int
    name: str
    birth: date
    id: str
    phone: str
    position: str
    salary: float


class Work(MyBaseModel):
    employeeID: int
    status: str
    startTime: datetime
    endTime: datetime


class Login(MyBaseModel):
    account: str
    password: str


class Token(MyBaseModel):
    access_token: str
    token_type: str


class TokenData(MyBaseModel):
    accountID: Optional[str] = None
    role: str
