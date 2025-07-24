from sqlalchemy.orm import Session
from app.models.resource import Resource
from app.schemas.resource import ResourceCreate, ResourceUpdate
from datetime import datetime

def get_resource(db: Session, resource_id: int, owner_id: int):
    return db.query(Resource).filter(
        Resource.id == resource_id,
        Resource.owner_id == owner_id
    ).first()

def get_resources(db: Session, owner_id: int, skip: int = 0, limit: int = 100):
    return db.query(Resource).filter(
        Resource.owner_id == owner_id
    ).offset(skip).limit(limit).all()

def create_resource(db: Session, resource: ResourceCreate, owner_id: int):
    db_resource = Resource(
        **resource.model_dump(),
        owner_id=owner_id
    )
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource

def update_resource(db: Session, resource_id: int, resource: ResourceUpdate, owner_id: int):
    db_resource = get_resource(db, resource_id, owner_id)
    if not db_resource:
        return None
    
    for key, value in resource.model_dump().items():
        setattr(db_resource, key, value)
    
    db.commit()
    db.refresh(db_resource)
    return db_resource

def delete_resource(db: Session, resource_id: int, owner_id: int):
    db_resource = get_resource(db, resource_id, owner_id)
    if not db_resource:
        return False
    
    db.delete(db_resource)
    db.commit()
    return True