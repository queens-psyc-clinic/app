from flask_restful import Resource, marshal_with, reqparse, request

from common.db import execute_sql_query, select_table
from resources.loan import loan_fields

# for getting args not in BODY or PATH
loans_parser = reqparse.RequestParser()
# define the args to look for
loans_parser.add_argument(
    'columns', dest='columns',
    location='args', action='append',
    help='The columns to select'
)


class Loans(Resource):

    @marshal_with(loan_fields)
    def get(self):
        """
        Retrieve all Loans
        ---
        tags:
          - Loans
        responses:
          200:
            description: A list of Loans
            schema:
              type: array
              items:
                $ref: '#/definitions/Loan'
          500:
            description: Error fetching Loans
        """

        return select_table('Loans')
    
    @marshal_with(loan_fields)
    def post(self):
        """
        Get Loans satisfying filters
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
            name: filters
            description: the filters and columns to retrive
            schema:
              id: Loan
            required: true
          - in: query
            name: columns
            description: columns to select from db
            type: array
            items:
              type: string
            uniqueItems: true
        responses:
          201:
            description: A list of Loans
            schema:
              id: Loan
          403:
            description: bad request
        example:
        """

        # get data from *not* BODY or PATH
        columns = loans_parser.parse_args()['columns']
        # get data from BODY
        filters = request.get_json()

        return _select_cols(filters, columns), 201
    
    @marshal_with(loan_fields)
    def put(self):
        """
        Edit Loans
        ---
        tags:
          - Loans
        parameters:
          - in: body
            name: data
            description: Updated Loan data and filters
            schema:
              properties:
                updated:
                  schema:
                    id: Loan
                    required: true
                filters:
                  schema:
                    id: Loan
                    required: true
            required: true
        responses:
          200:
            description: Edit loan
            schema:
              type: array
              items:
                $ref: '#/definitions/Loan'
          500:
            description: Error fetching Loans
        """
        data = request.get_json()
        updated_data = data['updated']
        filters = data['filters']
        _update(updated_data, filters)
        return data
    
def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Loans", conditions=cn, columns=cl)

def _update(d, f): return execute_sql_query(
    "UPDATE", "Loans", data=[d], conditions=f)
