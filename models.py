from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    '''Cupcake model'''

    default_image_url = 'https://tinyurl.com/demo-cupcake'

    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    flavor = db.Column(db.String,
                       nullable=False)
    size = db.Column(db.String,
                     nullable=False)
    rating = db.Column(db.Float,
                       nullable=False)
    image = db.Column(db.String,
                      nullable=False,
                      default=default_image_url)

    def serialize(self):
        '''Create a cupcake dictionary'''
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
        }