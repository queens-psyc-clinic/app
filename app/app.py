from dotenv import load_dotenv
from os import getenv

from flask import Flask
from flask_apscheduler import APScheduler
from flask_restful import Api, request
from flasgger import Swagger, swag_from
from flask_cors import CORS
from flask_mail import Mail

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

import common.email
import common.jobs

load_dotenv()

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'], allow_headers=["Content-Type"])
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
api.add_resource(Notification, '/notification/<id>')
api.add_resource(CreateNotification, '/createNotification')
api.add_resource(Notifications, '/notifications')

mail= Mail(app)
app.config['MAIL_SERVER']= getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = getenv('MAIL_PORT')
app.config['MAIL_USERNAME'] = getenv('MAIL')
app.config['MAIL_PASSWORD'] = getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

@app.post('/email/<id>/<subject>/<email>')
@swag_from('common/email_spec.yml')
def send_email(id, subject, email):
    message = request.get_data(as_text=True)
    msg = common.email.create_email(id, subject, email, message)
    mail.send(msg)
    return "Sent", 200

scheduler = APScheduler()

@scheduler.task("cron", id="notify_overdue", day="*")
def notify_overdue():
        email_notifs = common.jobs.check_overdue()
        if not email_notifs:
            print('[notify_overdue] Complete -- Nothing Overdue')
            return
        with app.app_context():
            for msg in email_notifs: mail.send(msg)
        print('[notify_overdue] Complete -- Notifications Sent')

scheduler.init_app(app)
scheduler.start()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
