from typing import Dict, Tuple, List, Union, Optional
from typing import Any, Dict, List, Mapping, Optional, Tuple
import pymysql

Entries = Tuple[Tuple[Any, ...], ...]
MaybeEntries = Optional[Entries]


# configuration for connection to the database
_db_config: Mapping = {
    'host': 'db',
    'user': 'dev',
    'password': '498capstone',
    'db': 'psychClinic'
}


def translate(func, db_response: MaybeEntries) -> List:
    if db_response:
        return [func(i) for i in db_response]
    else:
        return []


def show_tables() -> Entries:
    return execute_query("SHOW TABLES")


def select_table(table: str) -> MaybeEntries:
    return execute_query(f"SELECT * FROM {table}")


def execute_query(
        query: str,
        args: Optional[List[Tuple]] = None,
        commit: bool = False
):
    """
    Executes a given SQL query against the database and optionally commits the
    transaction.

    Parameters:
    - query (str): SQL query to execute.
    - args (Optional[List[Tuple]]): Parameters for the query, if needed.
      Default is None.
    - commit (bool): If True, commits the transaction. Useful for
      insert/update/delete operations. Default is False.

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


def execute_sql_query(operation: str, table: str,
                      data: Optional[List[Dict[str, Any]]] = None,
                      conditions: Optional[Dict[str, Any]] = None,
                      columns: Optional[List[str]] = None
                      ) -> MaybeEntries:
    """
    Generates and executes an SQL query for SELECT, and batch INSERT operations
    on the specified table. UPDATE operations are handled per row.

    Parameters:
    - operation (str): The type of SQL operation ('SELECT', 'INSERT',
      'UPDATE').
    - table (str): The name of the table to operate on.
    - data (Optional[List[Dict[str, Any]]]): A list of dictionaries for batch
      INSERT operations, where each dictionary contains data for one row with
      column names as keys.
    - conditions (Optional[Dict[str, Any]]): Conditions for SELECT/UPDATE,
      where keys are column names and values specify the conditions.
    - columns (Optional[List[str]]): Columns to retrieve for the SELECT
      operation. Retrieves all columns if None.

    Returns:
    - Optional[List[Tuple]]: The result of SELECT operation or None for
      INSERT/UPDATE operations.

    Raises:
    - ValueError: If an unsupported operation is provided or necessary
      parameters are missing. 
    """
    query, params = "", []

    if operation == "SELECT":
        column_part = ", ".join(columns) if columns else "*"
        condition_part = " AND ".join(
            [f"{key} = %s" for key in conditions.keys()]) if conditions else "1 = 1"
        params = list(conditions.values()) if conditions else []
        query = f"SELECT {column_part} FROM {table} WHERE {condition_part}"

    elif operation == "INSERT":
        if not data or not isinstance(data, list) or not all(isinstance(row, dict) for row in data):
            raise ValueError(
                "Data for INSERT operation must be a list of dictionaries")
        columns_part = ", ".join(data[0].keys())
        placeholders = ", ".join(["%s"] * len(data[0]))
        params = [tuple(row.values()) for row in data]
        query = f"INSERT INTO {table} ({columns_part}) VALUES ({placeholders})"
    # TODO This part may not be working correctly
    elif operation == "UPDATE":
        if not data or not conditions or not isinstance(data, list) or len(data) != 1:
            raise ValueError(
                "Data for UPDATE operation must be a single-item list of dictionaries")
        update_part = ", ".join(["{} = %s".format(key) for key in data[0].keys()])
        condition_part = " AND ".join(
            [f"{key} = %s" for key in conditions.keys()])
        params = list(data[0].values()) + list(conditions.values())
        query = f"UPDATE {table} SET {update_part} WHERE {condition_part}"

    else:
        raise ValueError("Unsupported operation")

    # Execute the query
    return execute_query(query, params, commit=operation in ["INSERT", "UPDATE"])
