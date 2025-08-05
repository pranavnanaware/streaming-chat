from sqlalchemy.orm import Session
from database.models import GenericItem
from api.schemas import GenericItemCreate, GenericItemUpdate
from typing import List, Optional

def create_item(db: Session, item: GenericItemCreate) -> GenericItem:
    db_item = GenericItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_item(db: Session, item_id: int) -> Optional[GenericItem]:
    return db.query(GenericItem).filter(GenericItem.id == item_id).first()

def get_items(db: Session, skip: int = 0, limit: int = 100) -> List[GenericItem]:
    return db.query(GenericItem).offset(skip).limit(limit).all()

def update_item(db: Session, item_id: int, item_update: GenericItemUpdate) -> Optional[GenericItem]:
    db_item = db.query(GenericItem).filter(GenericItem.id == item_id).first()
    if db_item:
        update_data = item_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_item, field, value)
        db.commit()
        db.refresh(db_item)
    return db_item

def delete_item(db: Session, item_id: int) -> bool:
    db_item = db.query(GenericItem).filter(GenericItem.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
        return True
    return False