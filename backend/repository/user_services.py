from fastapi import FastAPI, status, Depends, HTTPException
from database import Session_local
from validations import UserInfo
from typing import List
import models
from sqlalchemy import or_, and_

db = Session_local()


def read_userinfo():
    return db.query(models.UserInfo).all()


def get_user_by_id(user_id):
    temp = db.query(models.UserInfo).filter(models.UserInfo.userID == user_id).first()
    if temp is None:
        raise HTTPException(status_code=404)

    return temp


def create_userinfo(userInfo: UserInfo):
    __check_exception(userInfo)
    new_userInfo = models.UserInfo(
        accountID=userInfo.accountID,
        name=userInfo.name,
        birth=userInfo.birth,
        id=userInfo.id,
        phone=userInfo.phone,
        money=userInfo.money,
    )
    db.add(new_userInfo)
    db.commit()
    db.refresh(new_userInfo)
    return new_userInfo


def update_userinfo(userInfo_id: int, userInfo: UserInfo):
    db_usser = get_user_by_id(userInfo_id)
    __check_exception_exclude_self(original=db_usser, user=userInfo)

    db_usser.accountID = userInfo.accountID
    db_usser.name = userInfo.name
    db_usser.birth = userInfo.birth
    db_usser.id = userInfo.id
    db_usser.phone = userInfo.phone
    db_usser.money = userInfo.money

    db.commit()

    return db_usser


def delete_userinfo(userInfo_id):
    db_user = (
        db.query(models.UserInfo).filter(models.UserInfo.userID == userInfo_id).first()
    )

    if db_user is None:
        raise Exception(status=status.HTTP_404_NOT_FOUND, detail="User not found")
    return db_user


def __check_exception(userInfo: UserInfo):
    db_userInfo = (
        db.query(models.UserInfo)
        .join(
            models.Account,
            onclause=models.Account.accountID == models.UserInfo.accountID,
        )
        .filter(
            or_(
                models.Account.accountID == userInfo.accountID,
                models.UserInfo.id == userInfo.id,
                models.UserInfo.phone == userInfo.phone,
            )
        )
        .first()
    )

    if db_userInfo is not None:
        raise HTTPException(status_code=400, detail="Invalid!")


def __check_exception_exclude_self(original: models.UserInfo, user: UserInfo):
    db_userInfo = (
        db.query(models.UserInfo)
        .join(
            models.Account,
            onclause=models.Account.accountID == models.UserInfo.accountID,
        )
        .filter(
            original.userID != models.UserInfo.userID,
            or_(
                models.Account.accountID == user.accountID,
                models.UserInfo.id == user.id,
                models.UserInfo.phone == user.phone,
            ),
        )
        .first()
    )

    if db_userInfo is not None:
        raise HTTPException(status_code=400, detail="Invalid!")
