from flask_restful import Resource, marshal_with, fields, abort

from common.db import execute_query

notification_fields = {
    'ID': fields.String,
    'UserID': fields.String,
    'Message': fields.String,
    'NotificationDate': fields.DateTime,
    'ItemID': fields.String
}

class Notification(Resource):

    @marshal_with(notification_fields)
    def get(self, id):
        """
        Retrieve Notification with id
        ---
        tags:
          - Notification
        parameters:
          - in: path
            name: id
            type: string
            required: true
        responses:
          200:
            description: Notification with given id
            schema:
              id: Notification
              properties:
                ID:
                  type: string
                UserID:
                  type: string
                Message:
                  type: string
                NotificationDate:
                  type: string
                  format: datetime
                ItemID:
                  type: string
          400:
            description: ID does not exist
          500:
            description: Error fetching loans
        """
        response = _select_with_id(id)

        if not response:
          abort(400, message="ID does not exist")

        return response

    @marshal_with(notification_fields)
    def delete(self, id):
        """
        Delete notification with id
        ---
        tags:
          - Notification
        parameters:
          - in: path
            name: id
            type: string
            required: true
        responses:
          200:
            description: Notification with given id
            schema:
              type: array
              Notification:
                $ref: '#/definitions/Notification'
          400:
            description: ID does not exist
          500:
            description: Error fetching notifications
        """
        if not _select_with_id(id):
          abort(400, message="ID does not exist")
        return _delete_by_id(id)

def _select_with_id(id): 
    return execute_query("SELECT * FROM `Notifications` WHERE `ID` = %s", [(id,)], False)

def _delete_by_id(id):
    return execute_query("DELETE FROM `Notifications` WHERE `ID` = %s", [(id,)], True)
