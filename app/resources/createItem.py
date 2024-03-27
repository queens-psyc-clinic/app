import random
from flask_restful import Resource, marshal_with, request

from common.db import execute_sql_query, execute_query
from resources.item import item_fields


class CreateItem(Resource):

    @marshal_with(item_fields)
    def post(self):
        """
        Create new item
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
            name: values
            description: The values to add
            schema:
              id: Item
            required: true
        responses:
          201:
            description: Item created
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
                Ages:
                  type: string
                  description: Recomended ages for item
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
        data = request.get_json()
        data['ID'] = _generate_unique_id()
        _insert(data)

        return data

def _insert(d): return execute_sql_query(
    "INSERT", "Items", data=[dict(d)])

def _generate_unique_id(): 

    existing_ids = execute_query("SELECT `ID` FROM `Items`", None, False)

    while True:
        id = str(random.randint(1, 10000000))
        if id not in existing_ids:
            return id