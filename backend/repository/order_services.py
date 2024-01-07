from fastapi import status, Depends, HTTPException
from database import Session_local
from validations import Order
import models

db = Session_local()


def read_order():
    return db.query(models.Order).all()


def read_order_id(order_id: int):
    db_order = db.query(models.Order).filter(models.Order.orderID == order_id).first()

    if db_order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="orderID not found"
        )
    return db_order


def create_order(order: Order):
    db_user = (
        db.query(models.UserInfo).filter(models.UserInfo.userID == order.userID).first()
    )
    db_menu = (
        db.query(models.Menu)
        .filter(
            models.Menu.foodID == order.foodID,
            order.quantity <= models.Menu.quantity,
        )
        .first()
    )

    if db_menu is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="foodID not found or excess quantity of food",
        )

    if db_user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="userID not found"
        )

    new_order = models.Order(
        userID=order.userID,
        foodID=order.foodID,
        quantity=order.quantity,
        orderTime=order.orderTime,
        status=order.status,
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order


def update_order(orderID: int, status_oder: str):
    db_order = read_order_id(orderID)

    db_order.status = status_oder
    allowed_statuses = ["done", "processing"]
    if status_oder not in allowed_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status: {status_oder}. Allowed statuses are {', '.join(allowed_statuses)}",
        )
    db.commit()
    db.refresh(db_order)
    return db_order


def delete_order(orderID: int):
    order_to_delete = read_order_id(orderID)
    # if(order_to_delete.status == "done"):
    #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The dish is done")
    db.delete(order_to_delete)
    db.commit()
    return order_to_delete
