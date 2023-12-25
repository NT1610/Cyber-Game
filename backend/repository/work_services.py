from fastapi import FastAPI, status, Depends, HTTPException
from database import Session_local
from validations import Work
from typing import List
import models
from sqlalchemy import or_, and_

db = Session_local()


def read_work():
    return db.query(models.Work).all()


def create_work(work: Work):
    db_work = (
        db.query(models.Work)
        .join(
            models.Employee,
            onclause=models.Employee.employeeID == models.Work.employeeID,
        )
        .filter(models.Employee.employeeID == work.employeeID)
        .first()
    )
    if db_work is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="employeeID is required")

    new_work = models.Work(
        employeeID=work.employeeID,
        status=work.status,
        startTime=work.startTime,
        endTime=work.endTime,
    )
    db.add(new_work)
    db.commit()
    return new_work


def update_work(workID: int, work: Work):
    db_work = db.query(models.Work).filter(models.Work.workID == workID).first()
    if db_work is None:
        raise Exception(status_code= status.HTTP_404_NOT_FOUND, detail="workID not found")

    db_work.employeeID = work.employeeID
    db_work.status = work.status
    db_work.startTime = work.startTime
    db_work.endTime = work.endTime

    db.commit()
    return db_work


def delete_work(workID: int):
    pass
