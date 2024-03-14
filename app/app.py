from flask import Flask
from flask_restful import Api
from flasgger import Swagger

from resources.user import User
from resources.users import Users
from resources.test import Test
from resources.tests import Tests

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)


api.add_resource(User, '/user/<string:email>/<string:password>')

api.add_resource(Users, '/users/<id>')
# api.add_resource(Loans, '/loans/<id>')
api.add_resource(Test, '/test/<string:Name>')
api.add_resource(Tests, '/tests')
# api.add_resource(Items, '/items/<id>')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
