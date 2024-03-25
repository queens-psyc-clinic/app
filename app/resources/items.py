import json
import random
from flask_restful import Resource, abort, marshal_with, reqparse, request, fields

from common.db import execute_sql_query, select_table, check_exists, execute_query
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
                EditionNumber:
                  type: string
                  description: The edition number
                  type: string
                  description: The intended ages
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


#     @marshal_with(item_fields)
#     def post(self, test_ID, item_type="", item_name="", edition_number="", ages="", 
#             number_of_parts="", location="", ordering_company=""):
#         """
#         This endpoint adds a new item
#         ---
#         tags:
#           - Items
#         parameters:
#           - name: item_type
#             in: formData
#             type: string
#             required: false
#             description: The type of the item
#           - name: item_name
#             in: formData
#             type: string
#             required: false
#             description: The name of the item
#           - name: edition_number
#             in: formData
#             type: string
#             required: false
#             description: The edition number of the item, as a string
#           - name: ages
#             in: formData
#             type: string
#             required: false
#             description: The recommended ages for the item, as a string
#           - name: number_of_parts
#             in: formData
#             type: string
#             required: false
#             description: The number of parts the item contains, as a string
#           - name: location
#             in: formData
#             type: string
#             required: false
#             description: The location of the item
#           - name: ordering_company
#             in: formData
#             type: string
#             required: false
#             description: The company ordering the item
#           - name: test_ID
#             in: query
#             type: string
#             required: true
#             description: The test ID associated with the item, as a string
#         responses:
#           200:
#             description: Item successfully added
#           400:
#             description: Error in adding the item
#         """
#         return _post_item(item_type, item_name, edition_number, ages, 
#                           number_of_parts, location, ordering_company, test_ID)

# def _post_item(item_type, item_name, edition_number, ages, 
#              number_of_parts, location, ordering_company, test_ID): 
#     return execute_query("""INSERT INTO Items (ID, Status, ItemType, ItemName,
#                           EditionNumber, Ages, NumberOfParts, Location, 
#                          OrderingCompany, TestID) 
#                          VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) """, 
#                          [(_generate_unique_id(), "1", item_type, item_name, 
#                            edition_number, ages, number_of_parts, location, 
#                            ordering_company, test_ID)], True)
    

def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Items", conditions=cn, columns=cl)

def _generate_unique_id(): 

    existing_ids = execute_query("SELECT `ID` FROM `Items`", None, False)

    while True:
        id = random.randint(1, 100000)
        if id not in existing_ids:
            return str(id)