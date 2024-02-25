from typing import Dict
from flask import Flask, render_template
import db
from pbkdf2 import verify_password
import users

app = Flask(__name__)


@app.route('/')
def display_data():
    return "hello world"
    tables = [table[0] for table in db.show_tables()]

    # Fetch all data from each table
    all_data: Dict[str, db.MaybeEntries] = {}
    for t in tables:
        all_data[t] = db.select_table(t)

    return render_template('index.html', all_data=all_data)


@app.route('/users')
def get_users():
    '''
    Get All Users
    '''
    return users.get()


@app.route('/users/<id>')
def get_user(id):
    '''
    Get User By id
    '''
    return users.get_with({"id": id})


@app.route('/users/add/<name>/<email>/<pword>')
def new_user(name, email, pword) -> str:
    if users.add(users.default(name, email), pword):
        return "user created"
    else:
        return "error"


@app.route('/users/auth/<email>/<pword>')
def auth_user(email, pword):
    id, hash = db.execute_sql_query("SELECT", "Users", conditions={
                                    "email": email}, columns=["id", "hash"])[0]
    if verify_password(hash, pword):
        return id
    return "error"


@app.route('/users/put/name/<id>/<name>')
def put_user_update(id, name):
    return users.put(dict({"id": "603619278311385986"}), dict({"username": "ki"}))
    # return "{}, {}".format({"id": id}, {field: data})
    # if users.put({"id": "603619278311385986"}, {"username": "ki"}):
    #     return "update applied"
    # return "error"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
