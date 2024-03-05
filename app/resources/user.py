from pymysql import Error
from werkzeug import Response
from common.db import execute_sql_query, translate
import common.db as db
from typing import List, Optional, Tuple, TypedDict
import re

from common.pbkdf2 import hash_password, verify_password

from flask_restful import abort, fields, marshal_with, marshal_with_field, reqparse, Resource, marshal


def email(email_str: str):
    """Return email_str if valid, raise an exception in other case."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if re.match(pattern, email_str):
        return email_str
    else:
        raise ValueError('{} is not a valid email'.format(email_str))


user_fields = {
    'ID': fields.String,
    'UserName': fields.String,
    'Email': fields.String,
    'IsAdmin': fields.Boolean,
}

user_parser = reqparse.RequestParser()
user_parser.add_argument(
    'UserName', dest='UserName',
    location='form',
    required=True,
    help='The user\'s username',
)


class User(Resource):
    """
    for sign-up (post) and sign-in (get)
    """

    @marshal_with(user_fields)
    def post(self, email, password):
        args = user_parser.parse_args()
        new_user = _default_user(args['UserName'], email)
        new_user["Hash"] = hash_password(password)
        _insert(new_user)
        return _select_one({"ID": new_user["ID"]}), 201

    @marshal_with(user_fields)
    def get(self, email, password):
        id_hash = _select_cols_one({"Email": email}, ["ID", "Hash"])
        if verify_password(id_hash["Hash"], password) and (id, hash):
            return _select_one({'ID': id_hash['ID']}), 200
        abort(400, message="Incorrect Password")


def _default_user(name: str = "abc", email: str = "abc@xyz.ca"):
    return _make_user(hash(email), name, email, False)


def _make_user(id: int, username: str, email: str, isAdmin: bool):
    return {'ID': id, 'UserName': username, 'Email': email, 'IsAdmin': isAdmin, "Hash": None}


def _insert(d): return execute_sql_query(
    "INSERT", "Users", data=[dict(d)])


def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Users", conditions=cn, columns=cl)


def _select_cols_one(cn, cl): return _select_cols(cn, cl)[0]


def _select_one(cn): return _select_cols_one(cn, None)
