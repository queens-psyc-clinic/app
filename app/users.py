from db import execute_sql_query, translate
import db
from typing import List, Tuple, TypedDict

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


def put(filters: dict, user_update: dict):
    # execute_sql_query("UPDATE", "Users",
    #                   data=[user_update], conditions=filters)
    return "{}, {}".format([user_update], filters)

# cols = tuple(field for field in users[0])
# data = [tuple(u[f] for f in u) for u in users]
# return db.insert_into_table("Users", cols, data)
