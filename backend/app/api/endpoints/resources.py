from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

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

router = APIRouter()

@router.post("/", response_model=ResourceInDB, status_code=status.HTTP_201_CREATED)
def create_new_resource(
    resource: ResourceCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new resource
    """
    return create_resource(db=db, resource=resource, owner_id=current_user["id"])

@router.get("/", response_model=List[ResourceInDB])
def read_resources(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Retrieve resources
    """
    return get_resources(db=db, owner_id=current_user["id"], skip=skip, limit=limit)

@router.get("/{resource_id}", response_model=ResourceInDB)
def read_resource(
    resource_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Get resource by ID
    """
    resource = get_resource(db=db, resource_id=resource_id, owner_id=current_user["id"])
    if not resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resource not found"
        )
    return resource

@router.put("/{resource_id}", response_model=ResourceInDB)
def update_existing_resource(
    resource_id: int,
    resource: ResourceUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Update a resource
    """
    db_resource = update_resource(db=db, resource_id=resource_id, resource=resource, owner_id=current_user["id"])
    if not db_resource:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resource not found"
        )
    return db_resource

@router.delete("/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_resource(
    resource_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Delete a resource
    """
    if not delete_resource(db=db, resource_id=resource_id, owner_id=current_user["id"]):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resource not found"
        )
    return {"ok": True}