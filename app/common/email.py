from os import getenv
import common.db
from flask_restful import abort
from flask_mail import Message

def create_email(id, subject, email, message) -> Message:
    if not common.db.check_exists(id, 'Users', admin=True):
        abort(401)
    msg = Message(subject, sender = getenv('MAIL'), recipients = [email])
    msg.html=message # gets rid of surrounding quotes
    return msg
