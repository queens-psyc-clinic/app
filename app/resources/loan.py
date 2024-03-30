from datetime import datetime
import random
from flask_restful import Resource, marshal_with, fields, abort, request
from common.db import execute_query, execute_sql_query

loan_fields = {
    'ID': fields.String,
    'StartDate': fields.DateTime,
    'EndDate': fields.DateTime,
    'UserID': fields.String,
    'ItemID': fields.String,
    'IsConfirmed' : fields.Boolean,
    'Quantity': fields.Integer
}

class Loan(Resource):

    @marshal_with(loan_fields)
    def get(self, id):
        """
        Retrieve Loan with id
        ---
        tags:
          - Loan
        parameters:
          - in: path
            name: id
            type: string
            required: true
        responses:
          200:
            description: Loan with given id
            schema:
              id: Loan
              properties:
                ID:
                  type: string
                StartDate:
                  type: string
                  format: date
                EndDate:
                  type: string
                  format: date
                UserID:
                  type: string
                ItemID:
                  type: string
                IsConfirmed:
                  type: boolean
          400:
            description: ID does not exist
          500:
            description: Error fetching loans
        """
        response = _select_with_id(id)

        if not response:
          abort(400, message="ID does not exist")

        return response

    @marshal_with(loan_fields)
    def delete(self, id):
        """
        Delete item with id
        ---
        tags:
          - Loan
        parameters:
          - in: path
            name: id
            type: string
            required: true
        responses:
          200:
            description: Loan with given id
            schema:
              type: array
              loan:
                $ref: '#/definitions/Loan'
          400:
            description: ID does not exist
          500:
            description: Error fetching loans
        """
        if not _select_with_id(id):
          abort(400, message="ID does not exist")
        return _delete_by_id(id)

def _select_with_id(id): 
    return execute_query("SELECT * FROM `Loans` WHERE `ID` = %s", [(id,)], False)

def _delete_by_id(id):
    return execute_query("DELETE FROM `Loans` WHERE `ID` = %s", [(id,)], True)

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
