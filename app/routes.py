from flask import render_template, jsonify, request
from app import app
from app.models import Category
from app import db

@app.route('/',methods=['GET'])
@app.route('/index',methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/categories',methods=['GET'])
def categories():
    return render_template('categories.html')

@app.route('/api/categories',methods=['GET'])
def rest_get_all_categories():
    Categories = Category.query.order_by(Category.payee).all()
    if len(Categories) > 0:
        categories = [c.serialize() for c in Categories]
    else:
        categories = []
    response = jsonify(categories=categories,
                       status='success')
    response.status_code = 200
    return response

@app.route('/api/category/<category_id>',methods=['GET'])
def rest_get_category(category_id):
    category = Category.query.get(category_id)
    if category:
        response = jsonify(category=category.serialize(),
                           status='success')
        response.status_code = 200
    else:
        response = jsonify(status='error')
        response.status_code = 404
    return response

@app.route('/api/category/<category_id>',methods=['PUT'])
def rest_update_category(category_id):
    category_update = request.json
    category = Category.query.get(category_id)
    category.payee = category_update['payee']
    category.category = category_update['category']
    category.regex = category_update['regex']
    db.session.commit()
    response = jsonify(status='success')
    response.status_code = 200
    return response

@app.route('/api/category',methods=['POST'])
def rest_create_category():
    category_update = request.json
    category = Category(category_update['payee'],category_update['category'],category_update['regex'])
    db.session.add(category)
    db.session.commit()
    response = jsonify(status='success')
    response.status_code = 200
    return response

@app.route('/api/category/<category_id>',methods=['DELETE'])
def rest_delete_category(category_id):
    category = Category.query.get(category_id)
    db.session.delete(category)
    db.session.commit()
    response = jsonify(status='success')
    response.status_code = 200
    return response
