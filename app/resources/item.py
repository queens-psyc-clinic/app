from flask_restful import Resource, marshal_with, fields, abort

from common.db import execute_query, execute_sql_query

item_fields = {
    'ID': fields.String,
    'Status': fields.Integer,
    'ItemType': fields.String,
    'ItemName': fields.String,
    'Ages': fields.String,
    'Location': fields.String,
    'TestID': fields.String,
    'IsArchived': fields.Integer,
    'Stock': fields.Integer
}

class Item(Resource):

    @marshal_with(item_fields)
    def get(self, id):
        """
        Retrieve item with id
        ---
        tags:
          - Item
        parameters:
          - in: path
            name: id
            type: string
            required: true
        responses:
          200:
            description: Item with given id
            schema:
              type: array
              items:
                $ref: '#/definitions/Item'
          500:
            description: Error fetching items
        """
        response = _select_with_id(id)

        if not response:
          abort(400, message="ID does not exist")

        return response[0]
    
    @marshal_with(item_fields)
    def delete(self, id):
        """
        Delete item with id
        ---
        tags:
          - Item
        parameters:
          - in: path
            name: id
            type: string
            required: true
        responses:
          200:
            description: Item with given id
            schema:
              type: array
              items:
                $ref: '#/definitions/Item'
          400:
            description: ID does not exist
          500:
            description: Error fetching items
        """
        if not _select_with_id(id):
          abort(400, message="ID does not exist")
        return _delete_by_id(id)

def _select_with_id(id): 
    return execute_query("SELECT * FROM `Items` WHERE `ID` = %s", [(id,)], False)

def _delete_by_id(id):
    return execute_query("DELETE FROM `Items` WHERE `ID` = %s", [(id,)], True)

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

        if request.method == "OPTIONS": # CORS preflight
            return _build_cors_preflight_response()
            
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
