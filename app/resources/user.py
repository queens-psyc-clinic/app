import re
from flask import jsonify, make_response, request
from flask_restful import abort, fields, marshal_with, reqparse, Resource

from common.pbkdf2 import hash_password, verify_password
from common.db import execute_sql_query


def email(email_str: str):
    """Return email_str if valid, raise an exception in other case."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if re.match(pattern, email_str):
        return email_str
    else:
        raise ValueError('{} is not a valid email'.format(email_str))

user_fields = {
    'ID': fields.String,
    'FirstName': fields.String,
    'LastName': fields.String,
    'Email': fields.String,
    'IsAdmin': fields.Boolean,
    'IsSubscribed': fields.Boolean,
}

user_parser = reqparse.RequestParser()
user_parser.add_argument(
    'FirstName', dest='FirstName',
    location='args',
    required=True,
    help='The user\'s first name',
)
user_parser.add_argument(
    'LastName', dest='LastName',
    location='args',
    required=True,
    help='The user\'s first name',
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
          - in: path
            name: password
            type: string
            required: true
          - in: query
            name: FirstName
            type: string
            required: true
          - in: query
            name: LastName
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
                FirstName:
                  type: string
                LastName:
                  type: string
                Email:
                  type: string
                IsAdmin:
                  type: boolean
        """
         
        if request.method == "OPTIONS": # CORS preflight
            return _build_cors_preflight_response()
        else:   
          args = user_parser.parse_args()
          new_user = _default_user(args['FirstName'], args['LastName'], email)
          new_user["Hash"] = hash_password(password)
          try:
              _insert(new_user)
          except Exception as e:
              if "duplicate entry" in str(e).lower():
                  return jsonify({'error': 'Duplicate entry'}), 409
          
          return _corsify_actual_response(make_response(_select_one({"ID": new_user["ID"]}))), 201

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
        if request.method == "OPTIONS": # CORS preflight
            return _build_cors_preflight_response()
        try:
            id_hash = _select_cols_one({"Email": email}, ["ID", "Hash"])
            if verify_password(id_hash["Hash"], password) and (id, hash):
              return _corsify_actual_response(make_response(_select_one({'ID': id_hash['ID']}))), 200
            abort(400, message="Incorrect Password")
        except KeyError as e:
            abort(400, message="Email does not exist.")


def _default_user(firstName = "abc", lastName ="def", email: str = "abc@xyz.ca"):
    return _make_user(hash(email), firstName, lastName,  email, False)


def _make_user(id: int, firstName: str, lastName: str, email: str, isAdmin: bool):
    return {'ID': id, 'FirstName': firstName, 'LastName': lastName, 'Email': email, 'IsAdmin': isAdmin, "Hash": None}


def _insert(d): return execute_sql_query(
    "INSERT", "Users", data=[dict(d)])


def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Users", conditions=cn, columns=cl)


def _select_cols_one(cn, cl): 
  res = _select_cols(cn, cl)
  if res:
    return _select_cols(cn, cl)[0]
  else: 
      raise KeyError


def _select_one(cn): return _select_cols_one(cn, None)

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
