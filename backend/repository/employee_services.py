from fastapi import FastAPI, status, Depends, HTTPException
from database import Session_local
from validations import Employee
from typing import List
import models
from sqlalchemy import or_, and_

db = Session_local()


def read_employee():
    return db.query(models.Employee).all()


def get_employee_by_id(e_id: int):
    temp = db.query(models.Employee).filter(models.Employee.employeeID == e_id).first()
    if temp is None:
        raise HTTPException(status_code=404)

    return temp


def create_employee(employee: Employee):
    __check_exception(employee)
    new_employee = models.Employee(
        accountID=employee.accountID,
        name=employee.name,
        birth=employee.birth,
        id=employee.id,
        phone=employee.phone,
        position=employee.position,
        salary=employee.salary,
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee


def update_employee(employee_id: int, employee: Employee):
    db_employee = get_employee_by_id(employee_id)
    __check_exception_exclude_self(original=db_employee, employee=employee)

    db_employee.accountID = employee.accountID
    db_employee.id = employee.id
    db_employee.name = employee.name
    db_employee.birth = employee.birth
    db_employee.phone = employee.phone
    db_employee.position = employee.position
    db_employee.salary = employee.salary

    db.commit()

    return db_employee


def delete_employee(employee_id):
    db_employee = (
        db.query(models.Employee)
        .filter(models.Employee.employeeID == employee_id)
        .first()
    )
    if db_employee is None:
        raise Exception(status=status.HTTP_404_NOT_FOUND, detail="Employee not found")
    db.delete(db_employee)
    db.commit()
    return db_employee


def __check_exception(employee: Employee):
    db_employee = (
        db.query(models.Employee)
        .join(
            models.Account,
            onclause=models.Account.accountID == models.Employee.accountID,
        )
        .filter(
            or_(
                models.Account.accountID == employee.accountID,
                models.Employee.id == employee.id,
                models.Employee.phone == employee.phone,
            )
        )
        .first()
    )

    if db_employee is not None:
        raise HTTPException(status_code=400, detail="Invalid!")


def __check_exception_exclude_self(original: models.Employee, employee: Employee):
    db_employee = (
        db.query(models.Employee)
        .join(
            models.Account,
            onclause=models.Account.accountID == models.Employee.accountID,
        )
        .filter(
            original.employeeID != models.Employee.employeeID,
            or_(
                models.Account.accountID == employee.accountID,
                models.Employee.id == employee.id,
                models.Employee.phone == employee.phone,
            ),
        )
        .first()
    )

    if db_employee is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid!")
