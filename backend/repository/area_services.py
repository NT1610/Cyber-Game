from fastapi import status, Depends, HTTPException
from database import Session_local
from validations import Area
import models

db = Session_local()


def read_area():
    return db.query(models.Area).all()


def read_area_id(area_id: str):
    db_area = db.query(models.Area).filter(models.Area.area == area_id).first()
    if db_area is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Area {area_id} not found"
        )

    return db_area


def create_area(area: Area):
    db_area = db.query(models.Area).filter(models.Area.area == area.area).first()

    if db_area is not None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Area {area.area} is available"
        )

    new_area = models.Area(
        area=area.area,
        price=area.price,
    )

    db.add(new_area)
    db.commit()
    db.refresh(new_area)
    return new_area


def update_area(area_id: str, area: Area):
    db_area = read_area_id(area_id)

    db_area.price = area.price

    db.commit()
    return db_area


def delete_area(area_id: int):
    db_area = read_area_id(area_id)
    db.delete(db_area)
    db.commit()
    return db_area
