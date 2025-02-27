from flask import Flask
from api import api  # Импортируем Blueprint

def create_app():
    app = Flask(__name__)

    # Регистрируем Blueprint
    app.register_blueprint(api, url_prefix='/api')

    return app
