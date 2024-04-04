from flask_restful import Resource, marshal_with, reqparse, request

from common.db import execute_sql_query, select_table
from resources.notification import notification_fields

# for getting args not in BODY or PATH
notifications_parser = reqparse.RequestParser()
# define the args to look for
notifications_parser.add_argument(
    'columns', dest='columns',
    location='args', action='append',
    help='The columns to select'
)


class Notifications(Resource):

    @marshal_with(notification_fields)
    def get(self):
        """
        Retrieve all Notifications
        ---
        tags:
          - Notification
        responses:
          200:
            description: A list of notifications
            schema:
              type: array
              items:
                $ref: '#/definitions/Notification'
          500:
            description: Error fetching Notifications
        """

        return select_table('Notifications')
    
    @marshal_with(notification_fields)
    def post(self):
        """
        Get Notifications satisfying filters
        ---
        tags:
          - Notification
        requestBody:
          content:
            application/json:
              schema:
                id: Notification
        parameters:
          - in: body
            name: filters
            description: the filters and columns to retrive
            schema:
              id: Notification
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
            description: A list of Notifications
            schema:
              id: Notification
          403:
            description: bad request
        example:
        """

        # get data from *not* BODY or PATH
        columns = notifications_parser.parse_args()['columns']
        # get data from BODY
        filters = request.get_json()

        return _select_cols(filters, columns), 201
    
    @marshal_with(notification_fields)
    def put(self):
        """
        Edit Notification
        ---
        tags:
          - Notification
        parameters:
          - in: body
            name: data
            description: Updated Notification data and filters
            schema:
              properties:
                updated:
                  schema:
                    id: Notification
                    required: true
                filters:
                  schema:
                    id: Notification
                    required: true
            required: true
        responses:
          200:
            description: Edit Notification
            schema:
              type: array
              items:
                $ref: '#/definitions/Notification'
          500:
            description: Error fetching Notifications
        """
        data = request.get_json()
        updated_data = data['updated']
        filters = data['filters']
        _update(updated_data, filters)
        return data
    
def _select_cols(cn, cl): return execute_sql_query(
    "SELECT", "Notifications", conditions=cn, columns=cl)

def _update(d, f): return execute_sql_query(
    "UPDATE", "Notifications", data=[d], conditions=f)
