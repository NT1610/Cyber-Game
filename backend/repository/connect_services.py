from fastapi import status, Depends, HTTPException
from database import Session_local
from validations import Connect
import models

db = Session_local()


def read_connect():
    return db.query(models.Connect).all()


def read_connect_by_computer(com_id: int):
    db_connect = db.query(models.Connect).filter(models.Connect.comID == com_id).first()
    if db_connect is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="com_id is not connected")
    return db_connect


def create_connect(connect: Connect):
    db_user = (
        db.query(models.UserInfo)
        .filter(models.UserInfo.userID == connect.userID)
        .first()
    )
    db_computer = (
        db.query(models.Computer)
        .filter(models.Computer.comID == connect.comID, models.Computer.status == "OFF")
        .first()
    )

    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="user not found"
        )

    if db_computer is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="computer not found or being used",
        )

    new_connect = models.Connect(
        userID=connect.userID, comID=connect.comID, startTime=connect.startTime
    )
    db.add(new_connect)
    db.commit()
    db.refresh(new_connect)
    return new_connect


def delete_connect(comID: int):
    db_connect = db.query(models.Connect).filter(models.Connect.comID == comID).first()
    if db_connect is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="computer not connected"
        )
    db.delete(db_connect)
    db.commit()
    return db_connect
