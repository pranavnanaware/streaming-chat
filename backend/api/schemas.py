from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class GenericItemBase(BaseModel):
    name: str
    description: Optional[str] = None

class GenericItemCreate(GenericItemBase):
    pass

class GenericItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class GenericItem(GenericItemBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True