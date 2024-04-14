from flask import make_response
from flask_restful import abort, fields, marshal_with, reqparse, Resource, request
from common.db import execute_sql_query, select_table
from common.cors import _build_cors_preflight_response, _corsify_actual_response
from resources.test import test_fields

class Tests(Resource):
  """
  This is the Test controller for handling batch data operations.
  All data is returned in JSON format
  """

  @marshal_with(test_fields)
  def get(self):
    """
      Get all tests
      ---
      tags:
        - Tests
      responses:
        201:
          description: A list of Tests
          schema:
            id: Tests
        500:
          description: Internal error fetching results
      """
    if request.method == "OPTIONS": # CORS preflight
            return _build_cors_preflight_response()
    try:
      table = select_table('Tests')
      if table is not None:
          return table, 201
      return abort(500, message="Internal error fetching results")
    except KeyError as e:
      abort(400, message="Email does not exist.")

  @marshal_with(test_fields)
  def post(self):
    """
    Get tests with filters
    ---
    tags:
      - Tests
    requestBody:
      content:
        application/json:
          schema:
            id: FilteredTests
    parameters:
    - in: body
      name: data
      description: filters to retrieve
      schema:
        id: FilteredTests
        properties:
          filters:
            type: object
            description: The filters to select tests
      required: false
    responses:
      201:
        description: Tests Retrieved
        schema:
          id: Tests
      500:
        description: Internal error updating tests
    """
    data = request.get_json()
    filters = data['filters']

    # if filters are empty, return all tests
    if filters == {}:
      tests = select_table("Tests")
      if tests:
        return tests, 201
    # filters are not empty, return tests with filters
    selected_tests = _select_cols(filters, None)
    if selected_tests is not None:
      return selected_tests, 201
    abort(500, message="Internal error retrieving tests")

  @marshal_with(test_fields)
  def put(self):
    """
    Update tests with batch data and filters
    ---
    tags:
      - Tests
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
  """
  Performs an UPDATE SQL query on the Tests table in the database

  Parameters:
  - update_data (List[Dict[str, Any]]): The data to update for each test

  Returns:
  - None
  """
  execute_sql_query("UPDATE", "Tests", data=[update_data], conditions=filters)


def _select(cn): return _select_cols_one(cn, None)


def _select_cols(cn, cl): return execute_sql_query(
  "SELECT", "Tests", conditions=cn, columns=cl)


def _select_cols_one(cn, cl): return _select_cols(cn, cl)[0]
