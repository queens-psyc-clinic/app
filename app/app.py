from typing import Dict
from flask import Flask, render_template
import db
from pbkdf2 import verify_password
import users

app = Flask(__name__)


@app.route('/')
def display_data():
    tables = [table[0] for table in db.show_tables()]

    # Fetch all data from each table
    all_data: Dict[str, db.MaybeEntries] = {}
    for t in tables:
        all_data[t] = db.select_table(t)

    return render_template('index.html', all_data=all_data)


@app.route('/users')
def get_users():
    """
    Get All Users
    """
    return users.get()


@app.route('/users/<id>')
def get_user(id):
    """
    Get User By id
    """
    return users.get_with({"id": id})


@app.route('/users/add/<name>/<email>/<pword>')
def new_user(name, email, pword) -> str:
    """
    Create new user with name, email, and password
    """
    if users.add(users.default(name, email), pword):
        return "user created"
    else:
        return "error"


@app.route('/users/auth/<email>/<pword>')
def auth_user(email, pword):
    """
    Verify password for email/account
    """
    result = users.auth(email, pword)
    return result if result else "error"


@app.route('/users/put/<id>/<field>/<new_data>')
def put_user_update(id, field, new_data):
    """
    Put new_data at field for user with id
    """
    return users.put({"id": id}, {field: new_data})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
