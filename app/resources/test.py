from flask_restful import abort, fields, marshal_with, reqparse, Resource, request
from common.db import execute_sql_query, select_table, check_exists

test_fields = {
  'ID': fields.String,
  'Name': fields.String,
  'MeasureOf': fields.String,
  'LevelOfUser': fields.String,
  'EditionNumber' : fields.String,
  'OrderingCompany' : fields.String
}

test_parser = reqparse.RequestParser()
test_parser.add_argument(
  'Name', dest='Name',
  location='args',
  required=True,
  help='The name of the test'
)
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
test_parser.add_argument(
  'EditionNumber', dest='EditionNumber',
  location='args',
  required=False,
  help='The edition number of the test'
)
test_parser.add_argument(
  'OrderingCompany', dest='OrderingCompany',
  location='args',
  required=False,
  help='The ordering company of the test'
)

class Test(Resource):
  """
  This is the Test controller for handling single data operations.
  """

  @marshal_with(test_fields)
  def post(self, acronym):
    """
    Create a new test
    ---
    parameters:
      - in: path
        name: acronym
        type: string
        required: true
      - in: query
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
      - in: query
        name: EditionNumber
        type: string
        required: false
      - in: query
        name: OrderingCompany
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
            EditionNumber:
              type: string
              description: The edition number of the test
            OrderingCompany:
              type: string
              description: The ordering company of the test
      """
    args = test_parser.parse_args()
    new_test = _default_test(acronym, args['Name'], args['MeasureOf'], args['LevelOfUser'], args['EditionNumber'], args['OrderingCompany'])
    _insert(new_test)
    return _select_one({"ID": new_test["ID"]}), 201
    
    
  @marshal_with(test_fields)
  def get(self, acronym):
    """
    Retrieve a test
    ---
    parameters:
      - in: path
        name: acronym
        type: string
        required: true
    responses:
      200:
        description: A single Test
        schema:
          id: Tests
      404:
        description: Test does not exist
    """
    test = _select_one({"ID": acronym})
    if test:
      return test, 200
    
    abort(404, message="Test not found")
    

  @marshal_with(test_fields)
  def delete(self, acronym):
    """
    Delete a test
    ---
    parameters:
      - in: path
        name: acronym
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
    test = _select_one({"ID": acronym})
    if test:
        return _delete_test({"ID": acronym}), 204
    else:
        abort(404, message="Test not found")
    

def _delete_test(test_id):
  """
  Delete a test by its ID

  Parameters:
  - test_id (str): The ID of the test to delete

  Returns:
  - None
  """
  return execute_sql_query("DELETE", "Tests", conditions=test_id)


def _default_test(acronym: str = "abc", name: str = "xyz", measureOf: str = "", levelOfUser: str = "", editionNumber: str = "", orderingCompany: str = ""):
  """
  Creates a test with default values and passes it to _make_test to 

  Parameters:
  - acronym (str): The acronym of the test
  - name (str): The name of the test
  - measureOf (str): The measure of the test
  - levelOfUser (str): The level of the user necessary for the test
  - editionNumber (str): The edition number of the test
  - orderingCompany (str): The ordering company of the test

  Returns:
  - dict: A dictionary containing specified values after _make_test
  """
  return _make_test(acronym, name, measureOf, levelOfUser, editionNumber, orderingCompany)


def _make_test(acronym: str, name: str, measureOf: str, levelOfUser: str, editionNumber: str, orderingCompany: str):
  """
  Creates a test with the given values to be inserted for the INSERT operation

  Parameters:
  - acronym (str): The acronym of the test
  - name (str): The name of the test
  - measureOf (str): The measure of the test
  - levelOfUser (str): The level of the user necessary for the test
  - editionNumber (str): The edition number of the test
  - orderingCompany (str): The ordering company of the test
  
  Returns:
  - dict: A dictionary containing specified values
  """
  return {'ID': acronym, 'Name': name, 'MeasureOf': measureOf, 'LevelOfUser': levelOfUser, 'EditionNumber': editionNumber, 'OrderingCompany': orderingCompany}


def _insert(d): return execute_sql_query(
  "INSERT", "Tests", data=[dict(d)])

def _select_cols(cn, cl): return execute_sql_query(
  "SELECT", "Tests", conditions=cn, columns=cl)


def _select_cols_one(cn, cl): return _select_cols(cn, cl)[0]


def _select_one(cn): return _select_cols_one(cn, None)
