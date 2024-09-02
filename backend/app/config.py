# Configuration settings for the Flask app

class Config:
    SECRET_KEY = 'your-secret-key'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///tokens.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
