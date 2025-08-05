from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database.database import get_db
from api import crud, schemas

router = APIRouter()

@router.post("/items", response_model=schemas.GenericItem, status_code=status.HTTP_201_CREATED)
def create_item(item: schemas.GenericItemCreate, db: Session = Depends(get_db)):
    """Create a new generic item"""
    return crud.create_item(db=db, item=item)

@router.get("/items", response_model=List[schemas.GenericItem])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all generic items with pagination"""
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

@router.get("/items/{item_id}", response_model=schemas.GenericItem)
def read_item(item_id: int, db: Session = Depends(get_db)):
    """Get a specific generic item by ID"""
    db_item = crud.get_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.put("/items/{item_id}", response_model=schemas.GenericItem)
def update_item(item_id: int, item: schemas.GenericItemUpdate, db: Session = Depends(get_db)):
    """Update a generic item"""
    db_item = crud.update_item(db, item_id=item_id, item_update=item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    """Delete a generic item"""
    success = crud.delete_item(db, item_id=item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item not found")