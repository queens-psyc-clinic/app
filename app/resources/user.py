import re
from flask_restful import abort, fields, marshal_with, reqparse, Resource

from common.pbkdf2 import hash_password, verify_password


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

    @marshal_with(user_fields)
    def post(self, email, password):
        """
        Create a new user
        ---
        parameters:
          - in: path
            name: email
            type: string
            required: true
          - in: path
            name: password
            type: string
            required: true
          - in: form
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
        """
        args = user_parser.parse_args()
        new_user = _default_user(args['UserName'], email)
        new_user["Hash"] = hash_password(password)
        _insert(new_user)
        return _select_one({"ID": new_user["ID"]}), 201

    @marshal_with(user_fields)
    def get(self, email, password):
        """
        Authenticate user
        ---
        parameters:
          - in: path
            name: email
            type: string
            required: true
          - in: path
            name: password
            type: string
            required: true
        responses:
          200:
            description: A single user item
            schema:
              id: User
        """
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
