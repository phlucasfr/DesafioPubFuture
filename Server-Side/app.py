from flask import Flask, render_template
from flask_cors import CORS
from flask_restful import Api
from resources.receita import Receitas, Receita
from resources.despesa import Despesas, Despesa

from flask_jwt_extended import JWTManager
from sql_alchemy import banco

app = Flask(__name__, template_folder='/home/phlucasfr/templates/', static_folder='/home/phlucasfr/templates/static/')

CORS(app)
banco.init_app(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://phlucasfr:phe123456789@phlucasfr.mysql.pythonanywhere-services.com/phlucasfr$contas'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'DontTellAnyone'
app.config['JWT_BLACKLIST_ENABLED'] = True
api = Api(app)
jwt = JWTManager(app)

@app.route('/')
def entry():
    return render_template('index.html')

@app.route('/appfinance')
def entryfin():
    return render_template('appfinance.html')

@app.before_first_request
def cria_banco():
    banco.create_all()

api.add_resource(Receitas, '/receitas')
api.add_resource(Receita, '/receita/<int:receita_id>')
api.add_resource(Despesas, '/despesas')
api.add_resource(Despesa, '/despesa/<int:despesa_id>')


