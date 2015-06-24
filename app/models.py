from app import db

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    payee = db.Column(db.String(80))
    category = db.Column(db.String(80))
    regex = db.Column(db.String(80))
    def __init__(self,payee,category,regex):
        self.payee = payee
        self.category = category
        self.regex = regex
    def serialize(self):
        return {"id": self.id,
                "payee": self.payee,
                "category": self.category,
                "regex": self.regex}
