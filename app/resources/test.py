from flask_restful import abort, fields, marshal_with, reqparse, Resource, request
from common.db import execute_sql_query, select_table

test_fields = {
  'ID': fields.String,
  'Name': fields.String,
  'MeasureOf': fields.String,
  'LevelOfUser': fields.String
}

test_parser = reqparse.RequestParser()
test_parser.add_argument(
  'MeasureOf', dest='MeasureOf',
  location='args',
  required=False,
  help='The measure of the test'
)
test_parser.add_argument(
  'LevelOfUser', dest='LevelOfUser',
  location='args',
  required=False,
  help='The level of the user necessary for the test'
)

class Test(Resource):

  @marshal_with(test_fields)
  def post(self, Name):
    """
    Create a new test
    ---
    parameters:
      - in: path
        name: Name
        type: string
        required: true
      - in: query
        name: MeasureOf
        type: string
        required: false
      - in: query
        name: LevelOfUser
        type: string
        required: false
    responses:
      200:
        description: A single test item
        schema:
          id: Tests
          properties:
            ID: 
              type: string
              description: test id
            Name:
              type: string
              description: The name of the test
            MeasureOf:
              type: string
              description: The measure of the test
            LevelOfUser:
              type: string
              description: The level of the user necessary for the test
      """
    args = test_parser.parse_args()
    new_test = _default_test(Name, args['MeasureOf'], args['LevelOfUser'])
    _insert(new_test)
    return _select_one({"ID": new_test["ID"]}), 201
    
    
  @marshal_with(test_fields)
  def get(self, Name):
    """
    Retrieve a test
    ---
    parameters:
      - in: path
        name: Name
        type: string
        required: true
    responses:
      200:
        description: A single Test
        schema:
          id: Tests
      400:
        description: Test does not exist
    """

    test_id = _get_test_id_by_name(Name)
    if test_id is not None:
        return _select_one({"ID": test_id}), 200
    else:
        abort(404, message="Test not found")
    

  @marshal_with(test_fields)
  def delete(self, Name):
    """
    Delete a test
    ---
    parameters:
      - in: path
        name: Name
        type: string
        required: true
    responses:
      204:
        description: Test successfully deleted
        schema:
          id: Tests
      404:
        description: No test found to delete
    """
    test_id = _get_test_id_by_name(Name)
    if test_id is not None:
        return _delete_test({"ID": test_id}), 204
    else:
        abort(404, message="Test not found")
    

def _delete_test(test_id):
  """
  Delete a test by its ID
  """
  return execute_sql_query("DELETE", "Tests", conditions=test_id)


def _default_test(name: str = "xyz", measureOf: str = '(blank)', levelOfUser: str = '0'):
  return _make_test(hash(name), name, measureOf, levelOfUser)


def _make_test(id: int, name: str, measureOf: str, levelOfUser: str):
  return {'ID': id, 'Name': name, 'MeasureOf': measureOf, 'LevelOfUser': levelOfUser}


def _insert(d): return execute_sql_query(
  "INSERT", "Tests", data=[dict(d)])

def _select_cols(cn, cl): return execute_sql_query(
  "SELECT", "Tests", conditions=cn, columns=cl)


def _select_cols_one(cn, cl): return _select_cols(cn, cl)[0]


def _select_one(cn): return _select_cols_one(cn, None)

def _get_test_id_by_name(name):
  """
  Get the ID of a test by its name
  """
  test = _select_one({"Name": name})
  return test.get("ID") if test else None
