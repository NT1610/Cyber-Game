from fastapi import FastAPI, status, Depends, HTTPException
from database import Session_local
from validations import Account
from typing import List
import models

db = Session_local()


def read_account():
    return db.query(models.Account).all()


def create_account(account: Account):
    new_account = models.Account(
        account=account.account,
        password=account.password,
        role=account.role,
    )

    db_account = (
        db.query(models.Account)
        .filter(models.Account.account == new_account.account)
        .first()
    )

    if db_account is not None:
        raise HTTPException(status_code=400, detail="Account already exists")
    db.add(new_account)
    db.commit()
    db.refresh(new_account)
    return new_account


def update_account(account_id: int, account: Account):
    db_account = (
        db.query(models.Account).filter(models.Account.accountID == account_id).first()
    )

    if db_account is None:
        raise HTTPException(status_code=404, detail="Account not found")

    existing_account = (
        db.query(models.Account)
        .filter(
            models.Account.account == account.account,
            models.Account.accountID != account_id,
        )
        .first()
    )
    if existing_account is not None:
        raise HTTPException(
            status_code=400, detail="Account already exists"
        )

    db_account.account = account.account
    db_account.password = account.password
    db_account.role = account.role

    db.commit()
    db.refresh(db_account)
    return db_account


def delete_account(account_id):
    account_to_delete = (
        db.query(models.Account).filter(models.Account.accountID == account_id).first()
    )

    if account_to_delete is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found"
        )

    db.delete(account_to_delete)
    db.commit()
    return account_to_delete
