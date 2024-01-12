from fastapi import FastAPI, status, Depends, HTTPException
from database import Session_local
from validations import Work
from typing import List
import models
from sqlalchemy import or_, and_

db = Session_local()


def read_work():
    return db.query(models.Work).all()


def read_work_id(employee_id: int):
    db_work = db.query(models.Work).filter(models.Work.employeeID == employee_id).first()

    if db_work is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="employeeID not found"
        )
    return db_work


def create_work(work: Work):
    db_employee = (
        db.query(models.Employee)
        .filter(models.Employee.employeeID == work.employeeID)
        .first()
    )
    if db_employee is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="employee not found"
        )

    new_work = models.Work(
        employeeID=work.employeeID,
        status=work.status,
        startTime=work.startTime,
        endTime=work.endTime,
    )
    db.add(new_work)
    db.commit()
    db.refresh(new_work)
    return new_work


def update_work(workID: int, work: Work):
    db_work = db.query(models.Work).filter(models.Work.employeeID == workID).first()
    if db_work is None:
        raise Exception(
            status_code=status.HTTP_404_NOT_FOUND, detail="workID not found"
        )

    db_work.employeeID = work.employeeID
    db_work.status = work.status
    db_work.startTime = work.startTime
    db_work.endTime = work.endTime

    db.commit()
    return db_work


def delete_work(workID: int):
    pass
