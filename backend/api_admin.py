from fastapi import FastAPI, status, Depends, HTTPException, Form
from fastapi.responses import HTMLResponse
from database import Session_local
from validations import Account, Employee
from typing import List
from fastapi import APIRouter
import account_services
import employee_services

router = APIRouter(prefix="/admin")


@router.get("/account", response_model=List[Account], status_code=200)
async def read_account():
    return account_services.read_account()


@router.post("/account", response_model=Account, status_code=status.HTTP_201_CREATED)
async def create_account(account: Account):
    return account_services.create_account(account)


@router.put(
    "/account/{account_id}", response_model=Account, status_code=status.HTTP_200_OK
)
async def update_account(account_id: int, account: Account):
    return account_services.update_account(account_id, account)


@router.delete(
    "/account/{account_id}", response_model=Account, status_code=status.HTTP_200_OK
)
async def delete_account(account_id: int):
    return account_services.delete_account(account_id)


@router.get("/employee", response_model=List[Employee], status_code=200)
async def read_employee():
    return employee_services.read_employee()


@router.get("/employee/{e_id}", response_model=Employee, status_code=200)
async def read_employee(e_id: int):
    return employee_services.get_employee_by_id(e_id)


@router.post("/employee", response_model=Employee, status_code=status.HTTP_201_CREATED)
async def create_employee(employee: Employee):
    return employee_services.create_employee(employee)


@router.put("/employee/{employee_id}", response_model=Employee, status_code=200)
async def update_employee(employee_id: int, employee: Employee):
    return employee_services.update_employee(employee_id, employee)


@router.delete(
    "/employee/{employee_id}", response_model=Employee, status_code=status.HTTP_200_OK
)
async def delete_employee(employee_id):
    return employee_services.delete_employee(employee_id)
