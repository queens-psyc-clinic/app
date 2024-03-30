from flask import request
from flask_mail import Message
from flask_restful import abort
import common.db


def send_email(mail, id, subject, email):
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
