from sql_alchemy import banco

class DespesaModel(banco.Model):
    __tablename__ = 'despesas'

    despesa_id = banco.Column(banco.Integer, primary_key=True)
    tipo = banco.Column(banco.String(80))
    valor = banco.Column(banco.Integer)
    #site = banco.relationship('SiteModel')

    def __init__(self, despesa_id, tipo, valor):
        self.despesa_id = despesa_id
        self.tipo = tipo
        self.valor = valor

    def json(self):
        return {
            'despesa_id': self.despesa_id,
            'tipo': self.tipo,
            'valor': self.valor
        }

    @classmethod
    def find_despesa(cls, despesa_id):
        despesa = cls.query.filter_by(despesa_id=despesa_id).first()
        if despesa:
            return despesa
        return None

    def save_despesa(self):
        banco.session.add(self)
        banco.session.commit()

    def update_despesa(self, tipo, valor):
        self.tipo = tipo
        self.valor = valor

    def delete_despesa(self):
        banco.session.delete(self)
        banco.session.commit()