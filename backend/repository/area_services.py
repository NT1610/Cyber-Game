from fastapi import status, Depends, HTTPException
from database import Session_local
from validations import Area
import models

db = Session_local()


def read_area():
    return db.query(models.Area).all()


def read_area_id(area: str):
    db_area = (
        db.query(models.Area).filter(models.Area.area == area).first()
    )
    if db_area is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Area {area} not found"
        )

    return db_area


def create_area(area: Area):
    db_area = db.query(models.Area).filter(models.Area.area == area.area).first()

    if db_area is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Area not found"
        )
    
    new_area = models.Area(
        area = area.area,
        status = area.status,
    )

    db.add(new_area)
    db.commit()
    db.refresh(new_area)
    return new_area

def update_area(comID: int, status: str):
    db_area = read_area_id(comID)

    db_area.status = status

    db.commit()
    return db_area


def delete_area(comID: int):
    db_area = read_area_id(comID)
    db.delete(db_area)
    db.commit()
    return db_area