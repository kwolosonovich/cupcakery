from flask import Flask, jsonify, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake
from flask_bootstrap import Bootstrap
# from seed import seed_database

app = Flask(__name__)
Bootstrap(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secret"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///cupcakes"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

connect_db(app)

# seed_database()

@app.route('/')
def cupcakes():
    '''Render homepage.'''
    cupcakes = Cupcake.query.all()
    return render_template('cupcakes.html', cupcakes=cupcakes)
    # return render_template('cupcakes.html')

@app.route('/api/cupcakes')
def list_cupcakes():
    '''Return cupcakes from API in JSON'''
    # serialize each cupcake in list using serialize()
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    # assign results to var cupcakes and return cupcakes
    return jsonify(cupcakes=cupcakes)
    # returns 200 in insomnia


@app.route('/api/cupcakes/<int:id>')
def get_single_cupcake(id):
    '''Returns info about one cupcake'''
    cupcake = Cupcake.query.get_or_404(id)
    # serialize and return cupcake
    return jsonify(cupcake=cupcake.serialize())


@app.route('/api/cupcakes', methods=['POST'])
def new_cupcake():
    '''Add a new cupcake and render HTML'''

    data = request.json

    cupcake = Cupcake(
        flavor=data['flavor'],
        rating=data['rating'],
        size=data['size'],
        image=data['image'] or None)

    db.session.add(cupcake)
    db.session.commit()

    return (jsonify(cupcake=cupcake.to_dict()), 201)
