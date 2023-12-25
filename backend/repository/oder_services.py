from fastapi import status, Depends, HTTPException
from database import Session_local
from validations import Order
import models

db = Session_local()

    