import re
from typing import Optional
from flask_restful import abort, fields, marshal_with, reqparse, Resource
import pymysql

from common.pbkdf2 import hash_password, verify_password
from common.db import execute_sql_query


def check_email(email_str: str):
    """Return email_str if valid, raise an exception in other case."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if re.match(pattern, email_str):
        return email_str
    else:
        abort(400)

user_fields = {
    'ID': fields.String,
    'UserName': fields.String,
    'Email': fields.String,
    'IsAdmin': fields.Boolean,
}

user_parser = reqparse.RequestParser()
user_parser.add_argument(
    'UserName', dest='UserName',
    location='args',
    required=True,
    help='The user\'s username',
)


class User(Resource):

    @marshal_with(user_fields)
    def post(self, email, password):
        """
        Create a new user
        ---
        tags:
          - Authentication
        parameters:
          - in: path
            name: email
            type: string
            required: true
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
          - in: path
            name: password
            type: string
            required: true
          - in: query
            name: UserName
            type: string
            required: true
        responses:
          200:
            description: A single user item
            schema:
              id: User
              properties:
                ID: 
                  type: string
                  description: user id
                UserName:
                  type: string
                  description: The name of the user
                Email:
                  type: string
                  description: The email of the user

                IsAdmin:
                  type: boolean
                  description: Permissions
          400:
            description: Invalid details
        """
        
        args = user_parser.parse_args()
        if check_email(email):
            if not args['UserName']:
                abort(400, message='Invalid details')
            new_user = _default_user(args['UserName'], email)
            new_user["Hash"] = hash_password(password)
            try:
                _insert(new_user)
            except:
                abort(400, message='Invalid details')
            return _select({"ID": new_user["ID"]}), 200

    @marshal_with(user_fields)
    def get(self, email, password):
        """
        Authenticate user
        ---
        tags:
          - Authentication
        parameters:
          - in: path
            name: email
            type: string
            required: true
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
          - in: path
            name: password
            type: string
            required: true
        responses:
          200:
            description: A single user item
            schema:
              id: User
          400:
            description: Incorrect credentials
        """
        id_hash = _select_cols({"Email": check_email(email)}, ["ID", "Hash"])
        id_hash = id_hash[0] if len(id_hash) else abort(400, message='Incorrect credentials')
        if verify_password(id_hash['Hash'], password) and id_hash:
            return _select({'ID': id_hash['ID']}), 200
        abort(400, message="Incorrect credentials")


def _default_user(name: str = "abc", email = "abc@xyz.ca"):
    return _make_user(hash(email), name, email, False)


def _make_user(id: int, username: str, email: str, isAdmin: bool):
    return {'ID': id, 'UserName': username, 'Email': email, 'IsAdmin': isAdmin, "Hash": None}


def _insert(d): return execute_sql_query(
    "INSERT", "Users", data=[dict(d)])


def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Users", conditions=cn, columns=cl)

def _select(cn): return _select_cols(cn, None)

