import random
from flask_restful import Resource, marshal_with, request
from common.cors import _build_cors_preflight_response, _corsify_actual_response
from common.db import execute_sql_query, select_table, check_exists, execute_query
from resources.item import item_fields


class CreateItem(Resource):

    @marshal_with(item_fields)
    def post(self):
        """
        Create new item
        ---
        tags:
          - Item
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
