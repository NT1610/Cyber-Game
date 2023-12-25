from fastapi import status, Depends, HTTPException
from database import Session_local
from validations import Receipt
import models

db = Session_local()


def read_receipt():
    return db.query(models.Receipt).all()


def read_receipt_id(receipt_id: int):
    temp = (
        db.query(models.UserInfo).filter(models.Receipt.receiptID == receipt_id).first()
    )
    if temp is None:
        raise HTTPException(
            status=status.HTTP_404_NOT_FOUND, detail=f"Receipt {receipt_id} not found"
        )
    return temp


def create_receipt(receipt: Receipt):
    db_user = (
        db.query(models.UserInfo())
        .join(
            models.Receipt,
            onclause= models.Receipt.userID == models.Receipt.userID
        )
        .filter(models.Receipt.userID == Receipt.userID)
        .first()
    )

    if db_user is not None:
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
