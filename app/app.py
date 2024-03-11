from flask import Flask
from flask_restful import Api
from flasgger import Swagger
from flask_cors import CORS

from resources.auth import User
from resources.users import Users
from resources.item import Item
from resources.items import Items
from resources.createItem import CreateItem
from resources.test import Test
from resources.tests import Tests
from resources.loan import Loan
from resources.loans import Loans
from resources.createLoan import CreateLoan
from resources.search import Search

app = Flask(__name__)
CORS(app)
api = Api(app)
swagger = Swagger(app)


api.add_resource(User, '/user/<string:email>/<string:password>')

api.add_resource(Users, '/users/<id>')
api.add_resource(Loan, '/loan/<id>')
api.add_resource(Loans, '/loans')
api.add_resource(CreateLoan, '/createLoan')
api.add_resource(Items, '/items')
api.add_resource(Item, '/item/<id>')
api.add_resource(CreateItem, '/createItem')
api.add_resource(Test, '/test/<string:acronym>')
api.add_resource(Tests, '/tests')
api.add_resource(Search, '/search/<string:prefix>')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
