from fastapi import status, Depends, HTTPException
from database import Session_local
from validations import Receipt, Receipt_out
import models

db = Session_local()


def read_receipt():
    return db.query(models.Receipt).all()


def read_receipt_id(receipt_id: int):
    temp = (
        db.query(models.Receipt).filter(models.Receipt.receiptID == receipt_id).first()
    )
    if temp is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Receipt {receipt_id} not found"
        )
    return temp


def create_receipt(receipt: Receipt):
    db_user = (
        db.query(models.UserInfo)
        .filter(models.UserInfo.userID == receipt.userID)
        .first()
    )

    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="userID is not found")
    
    new_receipt = models.Receipt(
        userID = receipt.userID,
        description = receipt.description,
        money = receipt.money,
        time = receipt.time
    )

    db.add(new_receipt)
    db.commit()
    db.refresh(new_receipt)
    return new_receipt
