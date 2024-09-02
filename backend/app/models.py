from datetime import datetime
from enum import Enum
from . import db

class TokenStatus(Enum):
    active = "active"
    suspended = "suspended"
    closed = "closed"

class Token(db.Model):
    __tablename__ = 'tokens'

    token = db.Column(db.String, primary_key=True)
    data = db.Column(db.String)
    status = db.Column(db.Enum(TokenStatus))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# No need to manually set up the engine or session here.
# Flask-SQLAlchemy will handle this based on the config in __init__.py

