import json
from flask_restful import Resource, abort, marshal_with, reqparse

from resources.user import user_fields
from common.db import execute_sql_query, select_table, check_exists

users_parser = reqparse.RequestParser()
users_parser.add_argument(
    'filters', dest='filters',
    location='form', type=json.loads,
    required=True,
    help='The column:value pairs to filter results'
)
users_parser.add_argument(
    'update', dest='update',
    location='form', type=json.loads,
    help='The column:value pairs to update'
)
users_parser.add_argument(
    'columns', dest='columns',
    location='form', action='append',
    help='The columns to select'
)


class Users(Resource):

    @marshal_with(user_fields)
    def put(self, id):
        """
        Update woth data at filters
        ---
        parameters:
          - in: path
            name: id
            type: string
            required: true
          - in: form
            name: update
            description: "{column:value, ...}"
            required: true
          - in: form
            name: filters
            description: "{column:value, ...}"
            action: append
        responses:
          200:
            description: A list of user items
            schema:
              id: User
        """
        if not check_exists(id, "Users"):
            abort(403, message='Unknown user')
        args = users_parser.parse_args()
        _update(args['update'], args['filters'])
        return _select(args['filters']), 201

    @marshal_with(user_fields)
    def post(self, id):
        """
        Get (optional) columns from users satisfying filters!!!
        ---
        parameters:
          - in: path
            name: id
            type: string
            required: true
          - in: form
            name: filters
            description: "{column:value, ...}"
            required: true
          - in: form
            name: columns
            description: columns to select from db
            action: append
        responses:
          200:
            description: A list of user items
            schema:
              id: User
        example:
        """
        if not check_exists(id, "Users"):
            abort(403, message='user')
        args = users_parser.parse_args()
        return _select_cols(args['filters'], args['columns']), 200

    @marshal_with(user_fields)
    def get(self, id):
        """
        Get all users
        ---
        parameters:
          - in: path
            name: id
            type: string
            required: true
        responses:
          200:
            description: A list of user items
            schema:
              id: User
        """
        if not check_exists(id, "Users"):
            abort(403, message='Unknown user')
        return select_table('Users'), 200



def _update(d, f): return execute_sql_query(
    "UPDATE", "Users", data=[d], conditions=f)


def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Users", conditions=cn, columns=cl)


def _select(cn): return _select_cols(cn, None)

