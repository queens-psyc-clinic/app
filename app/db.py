from typing import Any, Mapping, Optional, Tuple
import pymysql 

Entries = Tuple[Any, ...]
MaybeEntries = Optional[Entries]


# configuration for connection to the database
db_config: Mapping = {
    'host' : 'db',
    'user' : 'dev',
    'password' : '498capstone',
    'db' : 'psychClinic'
}

def execute_query(query: str, args = None):
    with pymysql.connect(**db_config) as conn, conn.cursor() as cursor:
        cursor.execute(query, args)
        return cursor.fetchall()

def show_tables() -> Entries:
    return execute_query("SHOW TABLES")

def select_table(table: str) -> MaybeEntries:
    return execute_query(f"SELECT * FROM {table}")

