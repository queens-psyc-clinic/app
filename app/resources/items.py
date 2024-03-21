import json
import random
from flask_restful import Resource, abort, marshal_with, reqparse, request, fields

from common.db import execute_sql_query, select_table, check_exists, execute_query
from resources.item import item_fields

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

    @marshal_with(item_fields)
    def post(self, test_ID, item_type="", item_name="", edition_number="", ages="", 
            number_of_parts="", location="", ordering_company=""):
        """
        This endpoint adds a new item
        ---
        tags:
          - Items
        parameters:
          - name: item_type
            in: formData
            type: string
            required: false
            description: The type of the item
          - name: item_name
            in: formData
            type: string
            required: false
            description: The name of the item
          - name: edition_number
            in: formData
            type: string
            required: false
            description: The edition number of the item, as a string
          - name: ages
            in: formData
            type: string
            required: false
            description: The recommended ages for the item, as a string
          - name: number_of_parts
            in: formData
            type: string
            required: false
            description: The number of parts the item contains, as a string
          - name: location
            in: formData
            type: string
            required: false
            description: The location of the item
          - name: ordering_company
            in: formData
            type: string
            required: false
            description: The company ordering the item
          - name: test_ID
            in: query
            type: string
            required: true
            description: The test ID associated with the item, as a string
        responses:
          200:
            description: Item successfully added
          400:
            description: Error in adding the item
        """
        return _post_item(item_type, item_name, edition_number, ages, 
                          number_of_parts, location, ordering_company, test_ID)

def _post_item(item_type, item_name, edition_number, ages, 
             number_of_parts, location, ordering_company, test_ID): 
    return execute_query("""INSERT INTO Items (ID, Status, ItemType, ItemName,
                          EditionNumber, Ages, NumberOfParts, Location, 
                         OrderingCompany, TestID) 
                         VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) """, 
                         [(_generate_unique_id(), "1", item_type, item_name, 
                           edition_number, ages, number_of_parts, location, 
                           ordering_company, test_ID)], True)
def _generate_unique_id(): 

    existing_ids = execute_query("SELECT `ID` FROM `Items`", None, False)

    while True:
        id = random.randint(1, 100000)
        if id not in existing_ids:
            return str(id)