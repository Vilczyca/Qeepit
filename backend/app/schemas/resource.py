from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class ResourceBase(BaseModel):
    name: str = Field(..., max_length=100, example="Laptop Dell XPS")
    description: Optional[str] = Field(None, example="15-calowy laptop z procesorem i7")
    category: str = Field(..., max_length=50, example="Elektronika")
    quantity: int = Field(1, gt=0, example=5)

class ResourceCreate(ResourceBase):
    pass

class ResourceUpdate(ResourceBase):
    pass

class ResourceInDB(ResourceBase):
    id: int
    date_added: datetime
    date_updated: datetime
    owner_id: int

    class Config:
        from_attributes = True