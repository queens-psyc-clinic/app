import json
from flask_restful import Resource, abort, marshal_with, reqparse, request, fields

from common.db import execute_sql_query, select_table, check_exists, execute_query
from resources.item import item_fields
# item_fields = {
#     'ID': fields.String,
#     'Status': fields.String,
#     'ItemType': fields.String,
#     'ItemName': fields.String,
#     'EditionNumber': fields.String,
#     'Ages': fields.String,
#     'NumberOfParts': fields.String,
#     'Location': fields.String,
#     'OrderingCompany': fields.String,
#     'TestID': fields.String,
# }

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
        definitions:
          Item:
            type: object
            properties:
              ID:
                type: integer
                description: The item ID.
              ItemName:
                type: string
                description: The name of the item.
              # Add other properties here
        """

        return select_table('Items')




# return execute_sql_query("SELECT", "Items", None, {"ID" : id}, None)

def _update(d, f): return execute_sql_query(
    "UPDATE", "Items", data=[d], conditions=f)


def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Items", conditions=cn, columns=cl)


def _select(cn): return _select_cols(cn, None)

