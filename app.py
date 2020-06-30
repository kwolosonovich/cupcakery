from flask import Flask, jsonify, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake
from flask_bootstrap import Bootstrap
from seed import seed_database

app = Flask(__name__)
Bootstrap(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "secret"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///cupcakes"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

connect_db(app)

seed_database()

@app.route('/')
def cupcakes():
    '''Render homepage.'''
    cupcakes = Cupcake.query.all()

    return render_template('cupcakes.html', cupcakes=cupcakes)

@app.route('/api/cupcakes')
def cupcakes():
    '''Return cupcakes from API in JSON'''
    # serialize each cupcake in list using serialize()
    all_cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    # assign results to var cupcakes and return cupcakes
    return jsonify(cupcakes=all_cupcakes)
    # returns 200 in insomnia
