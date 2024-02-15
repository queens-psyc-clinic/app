from typing import Dict
from flask import Flask, render_template
import db
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
    '''
    Get All Users
    '''
    return users.get()


@app.route('/users/<id>')
def get_user(id):
    '''
    Get User By id
    '''
    user = users.get_dict().get(int(id))
    return user if user else f"user with id:{id} was not found"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
