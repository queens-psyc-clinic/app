from flask_restful import Resource, marshal_with, fields, abort

from common.db import execute_query, execute_sql_query

item_fields = {
    'ID': fields.String,
    'Status': fields.Integer,
    'ItemType': fields.String,
    'ItemName': fields.String,
    'Ages': fields.String,
    'NumberOfParts': fields.String,
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
          - Items
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

        return response
    
    @marshal_with(item_fields)
    def delete(self, id):
        """
        Delete item with id
        ---
        tags:
          - Items
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
