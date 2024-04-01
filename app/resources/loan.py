from flask_restful import Resource, marshal_with, fields, abort
from common.db import execute_query

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
