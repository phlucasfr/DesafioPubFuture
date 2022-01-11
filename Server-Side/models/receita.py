from sql_alchemy import banco

class ReceitaModel(banco.Model):
    __tablename__ = 'receitas'

    receita_id = banco.Column(banco.Integer, primary_key=True)
    tipo = banco.Column(banco.String(80))
    valor = banco.Column(banco.Integer)

    def __init__(self, receita_id, tipo, valor):
        self.receita_id = receita_id
        self.tipo = tipo
        self.valor = valor

    def json(self):
        return {
            'receita_id': self.receita_id,
            'tipo': self.tipo,
            'valor': self.valor
        }

    @classmethod
    def find_receita(cls, receita_id):
        receita = cls.query.filter_by(receita_id=receita_id).first()
        if receita:
            return receita
        return None

    def save_receita(self):
        banco.session.add(self)
        banco.session.commit()

    def update_receita(self, tipo, valor):
        self.tipo = tipo
        self.valor = valor

    def delete_receita(self):
        banco.session.delete(self)
        banco.session.commit()