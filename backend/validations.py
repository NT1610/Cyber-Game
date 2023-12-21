from pydantic import BaseModel
from datetime import date, time, datetime


class MyBaseModel(BaseModel):
    class Config:
        orm_mode = True


class Account(MyBaseModel):
    account: str
    password: str
    role: str


class UserInfo(MyBaseModel):
    name: str
    accountID: int
    birth: date
    id: str
    phone = str
    money = float


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
    birth: str
    id: str
    phone: str
    position: str
    salary: int


class Work(MyBaseModel):
    employeeID: int
    status: str
    startTime: datetime
    endTime: datetime
