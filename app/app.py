from flask import Flask
from flask_restful import Api
from flasgger import Swagger

from resources.user import User
from resources.users import Users
from resources.item import Item
from resources.items import Items
from resources.createItem import CreateItem

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)


api.add_resource(User, '/user/<string:email>/<string:password>')

api.add_resource(Users, '/users/<id>')
# api.add_resource(Loans, '/loans/<id>')
# api.add_resource(Tests, '/tests/<id>')
api.add_resource(Items, '/items')
api.add_resource(Item, '/item/<id>')
api.add_resource(CreateItem, '/createItem')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
