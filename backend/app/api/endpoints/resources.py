from fastapi import APIRouter, Depends, HTTPException, status, Body, Path, Query
from sqlalchemy.orm import Session
from typing import List, Annotated

from app.crud.resource import (
    get_resource,
    get_resources,
    create_resource,
    update_resource,
    delete_resource
)
from app.schemas.resource import ResourceCreate, ResourceUpdate, ResourceInDB
from app.db.session import get_db
from app.core.security import get_current_user

router = APIRouter(tags=["Resources"])

@router.post(
    "/",
    response_model=ResourceInDB,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new resource",
    description="Creates a new resource owned by the authenticated user.",
    response_description="The created resource object",
    responses={
        201: {
            "description": "Resource created successfully",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "name": "My Resource",
                        "description": "A useful resource",
                        "owner_id": 42
                    }
                }
            }
        }
    }
)
def create_new_resource(
        resource: Annotated[
            ResourceCreate,
            Body(
                examples=[
                    {
                        "name": "My Resource",
                        "description": "This is a useful resource"
                    }
                ]
            )
        ],
        db: Session = Depends(get_db),
        current_user: dict = Depends(get_current_user)
):
    return create_resource(db=db, resource=resource, owner_id=current_user["id"])

@router.get(
    "/",
    response_model=List[ResourceInDB],
    summary="Retrieve all resources",
    description="Returns a list of resources owned by the authenticated user. Supports pagination via `skip` and `limit`.",
    response_description="List of user's resources",
    responses={
        200: {
            "description": "List of resources",
            "content": {
                "application/json": {
                    "example": [
                        {
                            "id": 1,
                            "name": "First resource",
                            "description": "Details here",
                            "owner_id": 42
                        },
                        {
                            "id": 2,
                            "name": "Second resource",
                            "description": "More info",
                            "owner_id": 42
                        }
                    ]
                }
            }
        }
    }
)
def read_resources(
        skip: Annotated[int, Query(ge=0)] = 0,
        limit: Annotated[int, Query(le=100)] = 100,
        db: Session = Depends(get_db),
        current_user: dict = Depends(get_current_user)
):
    return get_resources(db=db, owner_id=current_user["id"], skip=skip, limit=limit)

@router.get(
    "/{resource_id}",
    response_model=ResourceInDB,
    summary="Get resource by ID",
    description="Retrieves a single resource by its ID, if it belongs to the current user.",
    response_description="Single resource object",
    responses={
        200: {
            "description": "Resource found",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "name": "My Resource",
                        "description": "A useful resource",
                        "owner_id": 42
                    }
                }
            }
        },
        404: {
            "description": "Resource not found",
            "content": {
                "application/json": {
                    "example": {"detail": "Resource not found"}
                }
            }
        }
    }
)
def read_resource(
        resource_id: Annotated[int, Path(ge=1)],
        db: Session = Depends(get_db),
        current_user: dict = Depends(get_current_user)
):
    resource = get_resource(db=db, resource_id=resource_id, owner_id=current_user["id"])
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resource not found"
        )
    return resource

@router.put(
    "/{resource_id}",
    response_model=ResourceInDB,
    summary="Update a resource",
    description="Updates a specific resource if it belongs to the current user.",
    response_description="Updated resource object",
    responses={
        200: {
            "description": "Resource updated successfully",
            "content": {
                "application/json": {
                    "example": {
                        "id": 1,
                        "name": "Updated Resource",
                        "description": "Updated description",
                        "owner_id": 42
                    }
                }
            }
        },
        404: {
            "description": "Resource not found",
            "content": {
                "application/json": {
                    "example": {"detail": "Resource not found"}
                }
            }
        }
    }
)
def update_existing_resource(
        resource_id: Annotated[int, Path(ge=1)],
        resource: Annotated[
            ResourceUpdate,
            Body(
                examples=[
                    {
                        "name": "Updated Resource",
                        "description": "Updated description"
                    }
                ]
            )
        ],
        db: Session = Depends(get_db),
        current_user: dict = Depends(get_current_user)
):
    db_resource = update_resource(db=db, resource_id=resource_id, resource=resource, owner_id=current_user["id"])
    if not db_resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resource not found"
        )
    return db_resource

@router.delete(
    "/{resource_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a resource",
    description="Deletes a specific resource owned by the authenticated user.",
    responses={
        204: {"description": "Resource deleted successfully"},
        404: {
            "description": "Resource not found",
            "content": {
                "application/json": {
                    "example": {"detail": "Resource not found"}
                }
            }
        }
    }
)
def delete_existing_resource(
        resource_id: Annotated[int, Path(ge=1)],
        db: Session = Depends(get_db),
        current_user: dict = Depends(get_current_user)
):
    if not delete_resource(db=db, resource_id=resource_id, owner_id=current_user["id"]):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resource not found"
        )
