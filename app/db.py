from typing import Any, List, Mapping, Optional, Tuple
import pymysql

Entries = Tuple[Any, ...]
MaybeEntries = Optional[Entries]


# configuration for connection to the database
_db_config: Mapping = {
    'host': 'db',
    'user': 'dev',
    'password': '498capstone',
    'db': 'psychClinic'
}


def execute_query(query: str, args: Optional[List[Tuple]] = None, commit: bool = False):
    """
    Executes a given SQL query against the database and optionally commits the transaction.

    :param query: SQL query to execute.
    :param args: Parameters for the query, if needed. Default is None.
    :param commit: If True, commits the transaction. Useful for insert/update/delete operations. Default is False.
    """
    with pymysql.connect(**_db_config) as conn:
        with conn.cursor() as cursor:
            if args is None:
                cursor.execute(query)
            else:
                cursor.executemany(query, args)
            if commit:
                conn.commit()
            return cursor.fetchall()

def insert_into_table(table: str, columns: Tuple[str, ...], data: List[Tuple]) -> bool:
    """
    Insert data into a specified table.

    :param table: Name of the table to insert data into.
    :param columns: A tuple of column names into which the data will be inserted.
    :param data: A list of tuples, where each tuple represents a row of data to be inserted.
    """
    column_names = ', '.join(columns)
    placeholders = ', '.join(['%s'] * len(columns))
    query = f"INSERT INTO {table} ({column_names}) VALUES ({placeholders})"
    # try:
    execute_query(query, data, commit=True)
    return True
    # except:
    #     return False


def show_tables() -> Entries:
    return execute_query("SHOW TABLES")


def select_table(table: str) -> MaybeEntries:
    """
    Select all data from specified table
    """
    return execute_query(f"SELECT * FROM {table}")
