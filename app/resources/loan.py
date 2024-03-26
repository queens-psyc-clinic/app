from flask_restful import Resource, marshal_with, fields
from common.db import execute_query

loan_fields = {
    'ID': fields.String,
    'StartDate': fields.DateTime,
    'EndDate': fields.DateTime,
    'UserID': fields.String,
    'ItemID': fields.String
}

class Loan(Resource):

    @marshal_with(loan_fields)
    def get(self, id):
        """
        Retrieve Loan with id
        ---
        tags:
          - Loans
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
          500:
            description: Error fetching loans
        """
        return _select_with_id(id)

    @marshal_with(loan_fields)
    def delete(self, id):
        """
        Delete item with id
        ---
        tags:
          - Loans
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
          500:
            description: Error fetching loans
        """
        return _delete_by_id(id)

def _select_with_id(id): 
    return execute_query("SELECT * FROM `Loans` WHERE `ID` = %s", [(id,)], False)

def _delete_by_id(id):
    return execute_query("DELETE FROM `Loans` WHERE `ID` = %s", [(id,)], True)