from fastapi import status, Depends, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from validations import Login
from fastapi import APIRouter
from database import Session_local
import models, oauth2
from hashing import Hash

db = Session_local()

router = APIRouter(tags=["Authentication"])


@router.post("/login")
def login(request: Login):
    db_account = (
        db.query(models.Account)
        .filter(models.Account.account == request.account)
        .first()
    )
    if not db_account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid account"
        )

    if not Hash.verify(db_account.password, request.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid password"
        )

    access_token = oauth2.create_access_token(
        data={"account": db_account.accountID, "role": db_account.role}
    )
    return {"access_token": access_token, "token_type": "bearer"}
