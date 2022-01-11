from flask_restful import Resource, reqparse
from models.receita import ReceitaModel

path_params = reqparse.RequestParser()
path_params.add_argument('tipo', type=str)
path_params.add_argument('valor', type=int)


class Receitas(Resource):
    def get(self):
        return {'receitas': [receita.json() for receita in ReceitaModel.query.all()]}

class Receita(Resource):
    atributos = reqparse.RequestParser()
    atributos.add_argument('tipo', type=str, required=True, help="The field 'tipo' cannot be left blank.")
    atributos.add_argument('valor')

    def get(self, receita_id):
        receita = ReceitaModel.find_receita(receita_id)
        if receita:
            return receita.json()
        return {'message': 'Receita not found.'}, 404


    def post(self, receita_id):
        if ReceitaModel.find_receita(receita_id):
            return {"message": "Tipo '{}' already exists.".format(self)}, 400 #Bad Request

        dados = Receita.atributos.parse_args()
        receita = ReceitaModel(receita_id, **dados)

        try:
            receita.save_receita()
        except:
            return {"message": "An error ocurred trying to create receita."}, 500 #Internal Server Error
        return receita.json(), 201

    def put(self, receita_id):
        dados = Receita.atributos.parse_args()
        receita_encontrada = ReceitaModel.find_receita(receita_id)
        if receita_encontrada:
            receita_encontrada.update_receita(**dados)
            receita_encontrada.save_receita()
            return receita_encontrada.json(), 201
        receita = ReceitaModel(receita_id, **dados)
        try:
            receita.save_receita()
        except:
            return {'message': 'An internal erro ocurred tryng to save receita'}, 500  # internal server error
        return receita.json(), 201 #created

    def delete(self, receita_id):
        receita = ReceitaModel.find_receita(receita_id)
        if receita:
            try:
                receita.delete_receita()
            except:
                return {'message': 'An internal erro ocurred tryng to delete receita'}, 500  # internal server error
            return {'message': 'Receita deleted.'}
        return {'message': 'Receita not found.'}, 404