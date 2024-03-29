import random
from flask_restful import Resource, marshal_with, request, abort
from common.db import execute_sql_query, execute_query
from resources.loan import loan_fields
from datetime import datetime

class CreateLoan(Resource):

    @marshal_with(loan_fields)
    def post(self):
        """
        Create new loan
        ---
        tags:
          - Loans
        requestBody:
          content:
            application/json:
              schema:
                id: Loan
        parameters:
          - in: body
            name: values
            description: The values to add
            schema:
              id: Loan
            required: true
        responses:
          201:
            description: Loan created
            schema:
              id: Loan
          400:
            description: Bad request
        example:
        """
        data = request.get_json()

        _verify_item_id(data['ItemID'])
        _verify_user_id(data['UserID'])

        data['ID'] = _generate_unique_id()

        # Convert date strings to datetime objects
        data['EndDate'] = datetime.strptime(data['EndDate'], "%Y-%m-%d")
        data['StartDate'] = datetime.strptime(data['StartDate'], "%Y-%m-%d")

        _insert(data)

        return data

def _insert(d): return execute_sql_query(
    "INSERT", "Loans", data=[dict(d)])

def _verify_item_id(id): 
  if not execute_query("SELECT * FROM `Items` WHERE `ID` = %s", [(id,)], False):
    abort(400, message="Item ID does not exist")
  return True

def _verify_user_id(id):
  if not execute_query("SELECT * FROM `Users` WHERE `ID` = %s", [(id,)], False):
    abort(400, message="User ID does not exist")
  return True

def _generate_unique_id(): 

    existing_ids = execute_query("SELECT `ID` FROM `Loans`", None, False)

    while True:
        id = str(random.randint(1, 10000000))
        if id not in existing_ids:
            return id