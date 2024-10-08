from flask import Flask
from flask_cors import CORS
from .config import Config

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

# Import and register routes
from .routes import *
from .stripe_routes import *

