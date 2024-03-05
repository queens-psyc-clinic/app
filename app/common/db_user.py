from flask_restful import abort
from pymysql import Error
from common.db import execute_sql_query


def make_user(id: int, username: str, email: str, isAdmin: bool):
    return {'id': id, 'username': username, 'email': email, 'isAdmin': isAdmin}


def default(name: str = "abc", email: str = "abc@xyz.ca"):
    return make_user(hash(email), name, email, False)


def select_users(conditions=None, columns=None):
    try:
        return execute_sql_query("SELECT", "Users", conditions, columns)
    except Error as err:
        abort(500, message=err)


def insert_users(data=None):
    try:
        return execute_sql_query("INSERT", "Users", data=data)
    except Error as err:
        abort(500, message=err)


def update_users(data=None, conditions=None):
    try:
        return execute_sql_query("UPDATE", "Users", data, conditions)
    except Error as err:
        abort(500, message=err)
