from fastapi import FastAPI, status, Depends, HTTPException, Form
from fastapi.responses import HTMLResponse
from database import Session_local
from validations import Account
from typing import List
import models
from fastapi import APIRouter

router = APIRouter(prefix="/admin")
# app = FastAPI()


db = Session_local()


@router.get("/account", response_model=List[Account], status_code=200)
async def read_account():
    accounts = db.query(models.Account).all()
    print(type(accounts))
    return accounts


@router.post("/account", response_model=Account, status_code=status.HTTP_201_CREATED)
async def create_account(account: Account):
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

    print(db_account)

    if db_account is not None:
        raise HTTPException(status_code=400, detail="Account already exists")
    db.add(new_account)
    db.commit()
    db.refresh(new_account)
    return new_account
