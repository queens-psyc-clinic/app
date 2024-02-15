from typing import Dict, List, Tuple, TypedDict
import db


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


def default(name: str, email: str) -> User:
    return user((hash(email), name, email, False))


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


def put_many(users: List[User]) -> bool:
    cols = tuple(field for field in users[0])
    data = [tuple(u[f] for f in u) for u in users]
    return db.insert_into_table("Users", cols, data)

def put(u: User) -> bool:
    cols = [field for field in u]
    data = tuple(u[f] for f in u)
    return db.insert_into_table("Users", cols, [data])
