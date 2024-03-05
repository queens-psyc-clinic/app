import json
from flask_restful import Resource, abort, marshal_with, reqparse
from pymysql import Error
from common.db_user import update_users

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
        _abort_if_unknown(id)
        args = users_parser.parse_args()
        _update(args['update'], args['filters'])
        return _select(args['filters']), 201

    @marshal_with(user_fields)
    def post(self, id):
        _abort_if_unknown(id)
        args = users_parser.parse_args()
        return _select_cols(args['filters'], args['columns']), 200

    @marshal_with(user_fields)
    def get(self, id):
        _abort_if_unknown(id)
        return select_table('Users'), 200


def _abort_if_unknown(id):
    if not check_exists(id, "Users"):
        abort(403, message='Unknown user')


def _update(d, f): return execute_sql_query(
    "UPDATE", "Users", data=[d], conditions=f)


def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Users", conditions=cn, columns=cl)


def _select(cn): return _select_cols(cn, None)
