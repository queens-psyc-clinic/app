from typing import Dict, List, Tuple, TypedDict

import db


class User(TypedDict):
    id: int
    name: str
    email: str
    is_admin: bool


# Define shape of users in db
DbUser = Tuple[int, str, str, bool]


def user(db_user: DbUser) -> User:
    return User(
        id=db_user[0],
        name=db_user[1],
        email=db_user[2],
        is_admin=db_user[3]
    )


UserDict = Dict[int, User]


def get() -> List[User]:
    result = db.select_table("Users")
    if result:
        return [user(u) for u in result]
    else:
        return []


def get_dict() -> Dict[int, User]:
    users = get()
    return {u["id"]: u for u in users}
