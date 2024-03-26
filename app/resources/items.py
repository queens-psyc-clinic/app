from flask import abort
from flask_restful import Resource, marshal_with, reqparse, request

from common.cors import _build_cors_preflight_response, _corsify_actual_response
from common.db import execute_sql_query, select_table
from resources.item import item_fields

# for getting args not in BODY or PATH
items_parser = reqparse.RequestParser()
# define the args to look for
items_parser.add_argument(
    'columns', dest='columns',
    location='args', action='append',
    help='The columns to select'
)


class Items(Resource):

    @marshal_with(item_fields)
    def get(self):
        """
        Retrieve all items
        ---
        tags:
          - Items
        responses:
          200:
            description: A list of items
            schema:
              type: array
              items:
                $ref: '#/definitions/Item'
          500:
            description: Error fetching items
        """

        return select_table('Items')

    @marshal_with(item_fields)
    def post(self):
        """
        Get (optional) columns from users satisfying filters
        ---
        tags:
          - Items
        requestBody:
          content:
            application/json:
              schema:
                id: Item
        parameters:
          - in: body
            name: filters
            description: the filters and columns to retrive
            schema:
              id: Item
            required: true
          - in: query
            name: columns
            description: columns to select from db
            type: array
            items:
              type: string
            uniqueItems: true
        responses:
          201:
            description: A list of items
            schema:
              id: Item
          403:
            description: bad request
        example:
        """

        if request.method == "OPTIONS": # CORS preflight
            return _build_cors_preflight_response()
        
        # get data from *not* BODY or PATH
        columns = items_parser.parse_args()['columns']
        # get data from BODY
        filters = request.get_json()

        return _select_cols(filters, columns), 201

    @marshal_with(item_fields)
    def put(self):
        """
        Edit items
        ---
        tags:
          - Items
        parameters:
          - in: body
            name: data
            description: Updated item data and filters
            schema:
              properties:
                updated:
                  schema:
                    id: Item
                    required: true
                filters:
                  schema:
                    id: Item
                    required: true
            required: true
        responses:
          200:
            description: Edit item
            schema:
              type: array
              items:
                $ref: '#/definitions/Item'
          500:
            description: Error fetching items
        """
        if request.method == "OPTIONS": # CORS preflight
            return _build_cors_preflight_response()
        try:
          data = request.get_json()
          updated_data = data['updated']
          filters = data['filters']
          _update(updated_data, filters)
          return data
          #return data
        except KeyError:
            abort(400, message="Bad request")

def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Items", conditions=cn, columns=cl)

def _update(d, f): return execute_sql_query(
    "UPDATE", "Items", data=[d], conditions=f)
