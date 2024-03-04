from db import execute_sql_query, translate
import db
from typing import List, Optional, Tuple, TypedDict

from pbkdf2 import hash_password, verify_password


class User(TypedDict):
    id: int
    username: str
    email: str
    isAdmin: bool


# Define shape of users in db
DbUser = Tuple[int, str, str, bool]


def user(db_user: DbUser) -> User:
    return User(
        id=db_user[0],
        username=db_user[1],
        email=db_user[2],
        isAdmin=db_user[3]
    )


def default(name: str = "abc", email: str = "abc@xyz.ca") -> User:
    return user((hash(email), name, email, False))


def get() -> List[User]:
    return translate(user, db.select_table("Users"))


def get_with(filters: dict, columns=None) -> List[User]:
    return translate(user, execute_sql_query(
        "SELECT",
        "Users",
        conditions=filters,
        columns=columns
    ))


def add(user: User, pword: str) -> bool:
    dic = {k: user[k] for k in user}
    dic["hash"] = hash_password(pword)
    execute_sql_query("INSERT", "Users", data=[dic])
    return True


def auth(email, pword) -> Optional[str]:
    """
    Returns user ID if successful
    """
    id, hash = execute_sql_query(
            "SELECT", 
            "Users", 
            conditions={"email": email}, 
            columns=["id", "hash"]
            )[0]
    if verify_password(hash, pword):
        return id
    return None


# TODO: find out why this is causing "TypeError: not enough arguments for format string"
def put(filters: dict, user_update: dict):
    execute_sql_query("UPDATE", "Users", data=[user_update], conditions=filters)
    return "{}, {}".format([user_update], filters)
