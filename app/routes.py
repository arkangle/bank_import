from flask import render_template, jsonify
from app import app
from app.models import Category

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/categories')
def categories():
    categories = Category.query.all()
    return render_template('categories.html', categories=categories)

@app.route('/api/categories')
def rest_categories():
    categories = Category.query.all()
    response = jsonify(categories)
    response.status_code = 200;
    return response

