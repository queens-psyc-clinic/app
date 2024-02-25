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


# def generate_sql_query(
#     operation: str,
#     table: str,
#     data: Optional[Dict[str, Any]] = None,
#     conditions: Optional[Dict[str, Any]] = None,
#     columns: Optional[List[str]] = None
# ) -> Tuple[str, List[Any]]:
#     """
#     Generates an SQL query and parameters for SELECT, INSERT, and UPDATE
#     operations.

#     Parameters:
#     - operation (str): The type of SQL operation ('SELECT', 'INSERT',
#       'UPDATE').
#     - table (str): The name of the table.
#     - data (Optional[Dict[str, Any]]): Data for INSERT/UPDATE operations with
#       column names as keys.
#     - conditions (Optional[Dict[str, Any]]): Conditions for SELECT/UPDATE
#       operations with column names as keys.
#     - columns (Optional[List[str]]): Columns to retrieve for SELECT operation.
#       If None, all columns are retrieved.

#     Returns:
#     - Tuple[str, List[Any]]: The SQL query string and a list of parameters.

#     Raises:
#         - ValueError: If an unsupported operation is provided.
#     """
#     query = ""
#     params = []

#     if operation == "SELECT":
#         column_part = ", ".join(columns) if columns else "*"
#         condition_part = " AND ".join(
#             [f"{key} = %s" for key in conditions.keys()]) if conditions else "1 = 1"
#         params = list(conditions.values()) if conditions else []
#         query = f"SELECT {column_part} FROM {table} WHERE {condition_part}"

#     elif operation == "INSERT":
#         if not data:
#             raise ValueError("Data required for INSERT operation")
#         columns_part = ", ".join(data.keys())
#         placeholders = ", ".join(["%s"] * len(data))
#         params = list(data.values())
#         query = f"INSERT INTO {table} ({columns_part}) VALUES ({placeholders})"

#     elif operation == "UPDATE":
#         if not data or not conditions:
#             raise ValueError(
#                 "Data and conditions required for UPDATE operation")
#         update_part = ", ".join([f"{key} = %s" for key in data.keys()])
#         condition_part = " AND ".join(
#             [f"{key} = %s" for key in conditions.keys()])
#         params = list(data.values()) + list(conditions.values())
#         query = f"UPDATE {table} SET {update_part} WHERE {condition_part}"

#     else:
#         raise ValueError("Unsupported operation")

#     return query, params

# def insert_into_table(
#         table: str,
#         columns: Tuple[str, ...],
#         data: List[Tuple]
# ) -> bool:
#     """
#     Insert data into a specified table.

#     :param table: Name of the table to insert data into.
#     :param columns: A tuple of column names into which the data will be
#     inserted.
#     :param data: A list of tuples, where each tuple represents a row of data to
#     be inserted.
#     """
#     column_names = ', '.join(columns)
#     placeholders = ', '.join(['%s'] * len(columns))
#     query = f"INSERT INTO {table} ({column_names}) VALUES ({placeholders})"
#     # try:
#     execute_query(query, data, commit=True)
#     return True
#     # except:
#     #     return False


# def select_with_constraints(
#         table: str,
#         constraints: Dict[str, Any],
#         columns: Optional[List[str]] = None
# ) -> MaybeEntries:
#     """
#     Selects data from a specified table based on given constraints.

#     Parameters:
#     - table (str): The name of the table to select data from.
#     - constraints (Dict[str, Any]): A dictionary where keys are column names
#       and values are the conditions those columns must meet.
#     - columns (Optional[List[str]]): A list of column names to retrieve. If
#       None, all columns are retrieved. Default is None.

#     Example:
#     # Assuming you want to select the name and location of tests for 'Anxiety'
#     constraints = {"measureOf": "Anxiety"}
#     columns = ["name", "age"]
#     results = select_with_constraints("Tests", constraints, columns)

#     """
#     column_part = ", ".join(columns) if columns else "*"

#     constraint_part = " AND ".join(
#         [f"{col} = %s" for col in constraints.keys()])
#     params = list(constraints.values())

#     query = f"SELECT {column_part} FROM {table} WHERE {constraint_part}"

#     return execute_query(query, params)


# def update_table_row(table: str, updates: Dict[str, Any], conditions: Dict[str, Any]) -> None:
#     """
#     Updates specific columns of rows in a table that meet given conditions.

#     Parameters:
#     - table (str): The name of the table to update.
#     - updates (Dict[str, Any]): A dictionary where keys are the column names to be updated and values are the new values.
#     - conditions (Dict[str, Any]): A dictionary specifying the conditions rows must meet to be updated. Keys are column names, and values are the conditions the columns must satisfy.

#     Example Usage:
#     - To update the age and diagnosis of a patient with ID 1:
#       update_table_row('patients', {'age': 31, 'diagnosis': 'Updated Diagnosis'}, {'id': 1})

#     Note:
#     - This function constructs a parameterized SQL update statement to prevent SQL injection.
#     """
#     update_part = ", ".join([f"{key} = %s" for key in updates.keys()])
#     update_values = list(updates.values())

#     condition_part = " AND ".join([f"{key} = %s" for key in conditions.keys()])
#     condition_values = list(conditions.values())

#     params = update_values + condition_values

#     query = f"UPDATE {table} SET {update_part} WHERE {condition_part}"

#     execute_query(query, params, commit=True)
