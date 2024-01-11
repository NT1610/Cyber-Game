from database import Base, engine
from sqlalchemy import (
    String,
    Boolean,
    Integer,
    Column,
    Text,
    ForeignKey,
    Float,
    Date,
    TIMESTAMP,
)


class Account(Base):
    __tablename__ = "account"
    accountID = Column(Integer, primary_key=True)
    account = Column(String, unique=True)
    password = Column(String)
    role = Column(String)


class UserInfo(Base):
    __tablename__ = "userinfo"
    userID = Column(Integer, primary_key=True, index=True)
    accountID = Column(Integer, ForeignKey("account.accountID"))
    name = Column(String)
    birth = Column(Date)
    id = Column(String)
    phone = Column(String)
    money = Column(Float)


class Computer(Base):
    __tablename__ = "computer"
    comID = Column(Integer, primary_key=True)
    area = Column(String, ForeignKey("area.area"))
    status = Column(String)


class Connect(Base):
    __tablename__ = "connect"
    tmp = Column(Integer, primary_key=True)
    userID = Column(Integer, ForeignKey("userinfo.userID"))
    comID = Column(Integer, ForeignKey("computer.comID"))
    startTime = Column(TIMESTAMP)


class Area(Base):
    __tablename__ = "area"
    area = Column(String, primary_key=True)
    price = Column(Integer)


class Employee(Base):
    __tablename__ = "employee"
    employeeID = Column(Integer, primary_key=True, autoincrement=True)
    accountID = Column(Integer, ForeignKey("account.accountID"))
    name = Column(String)
    birth = Column(Date)
    id = Column(String)
    phone = Column(String)
    position = Column(String)
    salary = Column(Float)


class Work(Base):
    __tablename__ = "work"
    workID = Column(Integer, primary_key=True, autoincrement=True)
    employeeID = Column(Integer, ForeignKey("employee.employeeID"))
    status = Column(String)
    startTime = Column(TIMESTAMP)
    endTime = Column(TIMESTAMP)


class Menu(Base):
    __tablename__ = "menu"
    foodID = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    price = Column(Float)
    quantity = Column(Integer)

class Storage(Base):
    __tablename__ = "storage"
    ingredientID = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    quantity = Column(Integer)


class Recipe(Base):
    __tablename__ = "recipe"
    tmp = Column(Integer, primary_key=True)
    foodID = Column(Integer, ForeignKey("menu.foodID"))
    ingredientID = Column(Integer, ForeignKey("storage.ingredientID"))
    quantity = Column(Integer)


class Order(Base):
    __tablename__ = "order"
    orderID = Column(Integer, primary_key=True, autoincrement=True)
    userID = Column(Integer, ForeignKey("userinfo.userID"))
    foodID = Column(Integer, ForeignKey("menu.foodID"))
    quantity = Column(Integer)
    orderTime = Column(TIMESTAMP)
    status = Column(String)


class Receipt(Base):
    __tablename__ = "receipt"
    receiptID = Column(Integer, primary_key=True)
    userID = Column(Integer, ForeignKey("userinfo.userID"))
    description = Column(String)
    money = Column(Integer)
    time = Column(TIMESTAMP)

# class Event(Base):
#     __tablename__ = "event"
#     receiptID = Column(Integer, primary_key=True)
#     userID = Column(Integer, ForeignKey("userinfo.userID"))
#     description = Column(String)
#     money = Column(Integer)
#     time = Column(TIMESTAMP)


def create_DB():
    Base.metadata.create_all(bind=engine)
