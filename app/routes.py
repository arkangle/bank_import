from flask import render_template, jsonify
from app import app
from app.models import Category

@app.route('/',methods=['GET'])
@app.route('/index',methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/categories',methods=['GET'])
def categories():
    return render_template('categories.html')

@app.route('/api/categories',methods=['GET'])
def rest_categories():
    Categories = Category.query.all()
    if len(Categories) > 0:
        categories = [c.serialize() for c in Categories]
    else:
        categories = []
    response = jsonify(categories=categories,
                       status='success')
    response.status_code = 200;

    return response

