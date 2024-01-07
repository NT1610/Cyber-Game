from fastapi import status, Depends, HTTPException
from database import Session_local
from validations import Computer, Connect
from repository import connect_services
import models

db = Session_local()


def read_computer():
    return db.query(models.Computer).all()


def read_computer_id(comID: int):
    db_computer = (
        db.query(models.Computer).filter(models.Computer.comID == comID).first()
    )
    if db_computer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Computer {comID} not found"
        )

    return db_computer


def create_computer(computer: Computer):
    db_area = db.query(models.Area).filter(models.Area.area == computer.area).first()
    if db_area is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Area not found"
        )

    new_computer = models.Computer(
        area=computer.area,
        status=computer.status,
    )

    db.add(new_computer)
    db.commit()
    db.refresh(new_computer)
    return new_computer


def update_computer(comID: int, connect: Connect | None, computer: Computer):
    db_computer = read_computer_id(comID)
    allowed_statuses = ["ON", "OFF", "BROKEN"]

    if connect is not None:
        if computer.status == allowed_statuses[2]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Computer is BROKEN"
            )

        db_computer.status = computer.status
        if db_computer.status == allowed_statuses[0]:
            connect_services.create_connect(connect)
        elif db_computer.status == allowed_statuses[1]:
            connect_services.delete_connect(comID)
    else:
        db_computer.status = computer.status
        db_computer.area = computer.area

    db.commit()
    return db_computer


def delete_computer(comID: int):
    db_computer = read_computer_id(comID)
    db.delete(db_computer)
    db.commit()
    return db_computer
