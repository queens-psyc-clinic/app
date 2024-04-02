from flask import Flask, abort
from flask_restful import Api, request
from flasgger import Swagger
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
from os import getenv

import common.db

from resources.user import User
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
from resources.notification import Notification
from resources.createNotification import CreateNotification
from resources.notifications import Notifications

load_dotenv()

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'], allow_headers=["Content-Type"])
api = Api(app)
swagger = Swagger(app)

mail= Mail(app)
app.config['MAIL_SERVER']= getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = getenv('MAIL_PORT')
app.config['MAIL_USERNAME'] = getenv('MAIL')
app.config['MAIL_PASSWORD'] = getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

@app.route('/email/<id>/<subject>/<email>', methods=['POST'])
def email_notifs(id, subject, email):
    """
    end email notification
    ---
    tags:
      - Email
    parameters:
      - in: path
        name: id
      - in: path
        name: subject
      - in: path
        name: email
      - in: body
        name: message
    responses:
      401:
        description: Access Denied
      200:
        description: Email sent
    """
    if not common.db.check_exists(id, 'Users', admin=True):
        abort(401)
    
    message = request.get_data(as_text=True)
    msg = Message(subject, sender = 'psyc.clinic.app@gmail.com', recipients = [email])
    msg.body = message
    mail.send(msg)
    return "Sent", 200

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
api.add_resource(Notification, '/notification/<id>')
api.add_resource(CreateNotification, '/createNotification')
api.add_resource(Notifications, '/notifications')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
