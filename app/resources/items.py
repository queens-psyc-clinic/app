import random
from flask_restful import Resource, marshal_with, reqparse, request

from common.db import execute_sql_query, select_table, execute_query
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
                id: User
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
              properties:
                ID:
                  type: string
                  description: The item ID.
                Status:
                  type: integer
                  description: Item status
                ItemType:
                  type: string
                  description: Item type
                ItemName:
                  type: string
                  description: The name of the item.
                NumberOfParts:
                  type: string
                  description: The number of parts
                Location:
                  type: string
                  description: The item location
                TestID:
                  type: string
                  description: The related testID
                IsArchived:
                  type: integer
                  description: If the item is archived
                Stock:
                  type: integer
                  description: The number of stock
          403:
            description: bad request
        example:
        """

        # get data from *not* BODY or PATH
        columns = items_parser.parse_args()['columns']
        # get data from BODY
        filters = request.get_json()

        return _select_cols(filters, columns), 201

def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Items", conditions=cn, columns=cl)
