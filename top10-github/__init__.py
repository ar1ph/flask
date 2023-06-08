import os

from flask import Flask, render_template, jsonify
import requests
import json


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='shh',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Index Page
    @app.route('/')
    @app.route('/<user>')
    def index(user = None):
        return render_template('index.html', user = user)

    # Top 10 Page
    @app.route('/top10')
    def top10page():
        return render_template('top10.html') 
    
    @app.route('/api/top10repos')
    def top10fetch():
        apiResponse = requests.get("https://api.github.com/search/repositories?q=stars:%3E100&sort=stars&per_page=10&order=desc")
        data = apiResponse.json()
        res = [{'id': item['id'], 'full_name': item['full_name'], 'stargazers_count': item['stargazers_count']} for item in data['items']]
        return  jsonify(res)

    return app