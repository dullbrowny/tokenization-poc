from sqlalchemy import create_engine, Column, String, DateTime, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import enum

Base = declarative_base()

class TokenStatus(enum.Enum):
    active = "active"
    suspended = "suspended"
    closed = "closed"

class Token(Base):
    __tablename__ = 'tokens'
    
    token = Column(String, primary_key=True)
    data = Column(String)
    status = Column(Enum(TokenStatus))
    created_at = Column(DateTime, default=datetime.utcnow)

# Setup the database
engine = create_engine('sqlite:///tokens.db')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()
