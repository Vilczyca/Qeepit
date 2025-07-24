from fastapi import APIRouter, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import Annotated

from app.core import security, hashing
from app.core.config import settings
from app.crud.user import get_user_by_email, create_user
from app.db.session import get_db
from app.schemas.user import UserCreate, UserInDB, Token

router = APIRouter(tags=["Authentication"])

@router.post(
    "/register",
    response_model=UserInDB,
    summary="Register a new user",
    description="Creates a new user account with email and password. Password will be hashed before storage.",
    response_description="The created user's information",
    status_code=status.HTTP_201_CREATED,
    responses={
        201: {
            "description": "User created successfully",
            "content": {
                "application/json": {
                    "example": {
                        "email": "user@example.com",
                        "id": 1,
                    }
                }
            }
        },
        400: {
            "description": "Bad request",
            "content": {
                "application/json": {
                    "example": {"detail": "Email already registered"}
                }
            }
        }
    }
)
async def register(
    user: Annotated[
        UserCreate,
        Body(
            examples=[
                {
                    "email": "user@example.com",
                    "password": "strongpassword123"
                }
            ],
        ),
    ],
    db: Session = Depends(get_db)
):
    """
    Register a new user account.
    
    Required fields:
    - email: must be a valid email address
    - password: minimum 8 characters
    
    Returns:
    - User object without password hash
    """
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    return create_user(db=db, user=user)

@router.post(
    "/login",
    response_model=Token,
    summary="Authenticate user",
    description="Authenticates user credentials and returns JWT token for authorization",
    response_description="Access token for authenticated requests",
    responses={
        200: {
            "description": "Successful authentication",
            "content": {
                "application/json": {
                    "example": {
                        "access_token": "eyJhbGciOiJIUzI1NiIs...",
                        "token_type": "bearer"
                    }
                }
            }
        },
        401: {
            "description": "Unauthorized",
            "content": {
                "application/json": {
                    "example": {"detail": "Incorrect email or password"}
                }
            },
            "headers": {
                "WWW-Authenticate": {
                    "description": "Bearer token authentication scheme",
                    "schema": {"type": "string"}
                }
            }
        }
    }
)
async def login(
    form_data: Annotated[
        OAuth2PasswordRequestForm,
        Depends()
    ],
    db: Session = Depends(get_db)
):
    """
    Authenticate user and get access token.
    
    Requires:
    - email: registered email address
    - password: user's password
    
    Returns:
    - access_token: JWT token for authorization
    - token_type: will always be 'bearer'
    
    Note:
    The token should be included in subsequent requests in the Authorization header:
    `Authorization: Bearer <token>`
    """
    user = get_user_by_email(db, email=form_data.username)
    if not user or not hashing.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}