from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import os
BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR,'db','app.db')
db = SQLAlchemy(app)

from app import models
from app import routes
