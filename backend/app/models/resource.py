from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from app.db.base_class import Base

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    category = Column(String(50), nullable=False)
    quantity = Column(Integer, default=1)
    date_added = Column(DateTime, default=datetime.utcnow)
    date_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)