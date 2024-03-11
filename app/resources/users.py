import json
from flask_restful import Resource, abort, marshal_with, reqparse, request
from common.pbkdf2 import hash_password

from resources.auth import user_fields
from common.db import execute_sql_query, select_table, check_exists

# for getting args not in BODY or PATH
users_parser = reqparse.RequestParser()
# define the args to look for
users_parser.add_argument(
    'columns', dest='columns',
    location='args', action='append',
    help='The columns to select'
)

class Users(Resource):

    @marshal_with(user_fields)
    def put(self, id):
        """
        Update users, matching filters, with data
        ---
        tags:
          - Users
        requestBody:
          content:
            application/json:
              schema:
                id: UserUpdate
        parameters:
          - in: path
            name: id
            type: string
            required: true
            description: user ID to ensure access rights
          - in: body
            name: data
            description: filter and data
            required: true
            type: object
            schema:
              id: UserUpdate
              properties:
                update:
                  type: object
                  schema:
                    id: User
                filters:
                  type: object
                  schema:
                    id: User
        responses:
          200:
            description: A list of users
            schema:
              id: User
          403:
            description: Unknown user
          400:
            description: incorrect User ID
        """
        if not check_exists(id, "Users"):
            abort(403, message='Unknown user')

        # get data from BODY
        data = request.get_json(force=True)
        if data is not dict:
            abort(400, message="No data provided")
        update = data['update']
        filters = data['filters']

        # CHANGE PWORD
        if 'Password' in update:
            if not check_exists(id, 'Users', admin=True):
                if id == filters['ID']:
                    pass
                else:
                    abort(401, message='Access Denied')
            update = {'Hash': hash_password(update['Password'])}
            filters = {'ID': filters['ID']}

        _update(update, filters)
        return _select(update), 200

    @marshal_with(user_fields)
    def post(self, id):
        """
        Get (optional) columns from users matching filters
        ---
        tags:
          - Users
        requestBody:
          content:
            application/json:
              schema:
                id: User
        parameters:
          - in: path
            name: id
            type: string
            required: true
            description: user ID to ensure access rights
          - in: body
            name: filters
            description: the filters and columns to retrive
            schema:
              id: User
            required: true
          - in: query
            name: columns
            description: columns to select from db
            type: array
            items:
              type: string
            enum:
              - ID
              - UserName
              - Email
              - IsAdmin
        responses:
          200:
            description: A list of user items
            schema:
              id: User
          403:
            description: Incorrect User ID
          400:
            description: No filters provided
        """
        if not check_exists(id, "Users"):
            abort(403, message='Unknown user')

        # get data from *not* BODY or PATH
        columns = users_parser.parse_args()['columns']
        # get data from BODY
        filters = request.get_json()
        if filters is not dict:
            abort(400, message='No filters provided')

        return _select_cols(filters, columns), 200

    @marshal_with(user_fields)
    def get(self, id):
        """
        Get all users
        ---
        tags:
          - Users
        parameters:
          - in: path
            name: id
            type: string
            required: true
            description: user ID to ensure access rights
        responses:
          200:
            description: A list of user items
            schema:
              id: User
          403:
            description: incorrect User ID
        """
        if not check_exists(id, "Users"):
            abort(403, message='Unknown user')

        return select_table('Users'), 200



def _update(d, f): return execute_sql_query(
    "UPDATE", "Users", data=[d], conditions=f)


def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Users", conditions=cn, columns=cl)


def _select(cn): return _select_cols(cn, None)

