from flask_restful import abort, fields, marshal_with, reqparse, Resource, request
from common.db import execute_sql_query, select_table

test_fields = {
  'ID': fields.String,
  'Name': fields.String,
  'MeasureOf': fields.String,
  'LevelOfUser': fields.String
}

class Tests(Resource):
  @marshal_with(test_fields)
  def get(self):
    """
      Get all tests
      ---
      responses:
        201:
          description: A list of user items
          schema:
            id: Tests
        500:
          description: Internal error fetching results
      """
    table = select_table('Tests')
    if table is not None:
        return table, 201
    return abort(500, message="Internal error fetching results")

  @marshal_with(test_fields)
  def put(self):
    """
    Update tests with batch data and filters
    ---
    requestBody:
      content:
        application/json:
          schema:
            id: BatchTestData
    parameters:
      - in: body
        name: data
        description: The batch data and filters
        schema:
          id: BatchTestData
          properties:
            update:
              type: object
              description: The data to update for each test
            filters:
              type: object
              description: The filters to select tests for update
        required: true
    responses:
      201:
        description: Updated tests
        schema:
          id: Tests
      500:
        description: Internal error updating tests
    """
    data = request.get_json()
    update_data = data['update']
    filters = data['filters']

    _update_tests(update_data, filters)

    updated_tests = _select(filters)
    if updated_tests is not None:
        return updated_tests, 201

    abort(500, message="Internal error updating tests")

def _update_tests(update_data, filters):
  execute_sql_query("UPDATE", "Tests", data=[update_data], conditions=filters)


def _select(cn): return _select_cols_one(cn, None)


def _select_cols(cn, cl): return execute_sql_query(
  "SELECT", "Tests", conditions=cn, columns=cl)


def _select_cols_one(cn, cl): return _select_cols(cn, cl)[0]
