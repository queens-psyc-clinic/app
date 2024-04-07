from flask_restful import abort, Resource, request
from common.db import select_table, execute_sql_query, execute_query
from common.trie import PrefixTree
from datetime import datetime

trie = PrefixTree()

class Search(Resource):
    def post(self, prefix):
        """
        Insert values into prefix tree for searching
        ---
        tags:
        -   Search
        parameters:
        -   in: path
            name: prefix
            type: string
            required: false
        -   in: body
            name: page
            required: true
            schema:
              type: object
              properties:
                Page:
                  type: string
        responses:
            201:
                description: Values inserted
            400:
                description: Invalid page type. Use LOAN, DASHBOARD, SIGNEDOUT, OVERDUE, REQUESTS, ARCHIVED, USERS
            500:
                description: Internal error inserting values
        """
        trie.clear()

        page_type = request.json.get('Page').upper()
        #  page type corresponds to what page you're on
        #  if you are searching on the loans page, use "LOAN" (case insensitive)
        #  if you are searching on the dashboard page, use "DASHBOARD" (case insensitive)

        if page_type == 'LOAN':
            #  builds the tree based on loans table
            table = select_table('Loans')
            if table is not None:
                for row in table:
                    trie.insert(row['ItemID'].upper(), 'ID')
                    item_name = get_item_name(row['ItemID'])
                    trie.insert(item_name.upper(), 'ItemID')
                    user_names = get_first_last_name(row['UserID'])
                    full_name = user_names[0] + ' ' + user_names[1]
                    trie.insert(full_name.upper(), 'FirstLastName')
                return 201
        elif page_type == 'DASHBOARD':
            #  builds the tree based on tests table (Not arcvhived)
            table = _select_cols({'IsArchived': '0'}, None, 'Tests')
            if table is not None:
                for row in table:
                    trie.insert(row['Name'].upper(), 'Name')
                    trie.insert(row['ID'].upper(), 'ID')
                return 201
        elif page_type == 'ARCHIVED':
            #  builds the tree based on tests table (Arcvhived)
            table = _select_cols({'IsArchived': '1'}, None, 'Tests')
            if table is not None:
                for row in table:
                    trie.insert(row['Name'].upper(), 'Name')
                    trie.insert(row['ID'].upper(), 'ID')
                return 201
        elif page_type == 'SIGNEDOUT':
            #  builds the tree based on loans table (isConfirmed set to true)
            table = _select_cols({'IsConfirmed': '1'}, None, 'Loans')
            if table is not None:
                for row in table:
                    trie.insert(row['ItemID'].upper(), 'ItemID')
                    item_name = get_item_name(row['ItemID'])
                    trie.insert(item_name.upper(), 'ItemName')
                    user_names = get_first_last_name(row['UserID'])
                    full_name = user_names[0] + ' ' + user_names[1]
                    trie.insert(full_name.upper(), 'FirstLastName')
                return 201
        elif page_type == 'OVERDUE':
            #  builds the tree based on loans table (isConfirmed set to true)
            #  date is also checked to see if its overdue
            table = _select_cols({'IsConfirmed': '1'}, None, 'Loans')
            if table is not None:
                for row in table:
                    current_date = str(datetime.today().date())
                    loan_date = str(row['EndDate']).split(' ')[0]
                    date1 = datetime.strptime(current_date, "%Y-%m-%d").date()
                    date2 = datetime.strptime(loan_date, "%Y-%m-%d").date()
                    if date1 > date2:
                        trie.insert(row['ItemID'].upper(), 'ID')
                        item_name = get_item_name(row['ItemID'])
                        trie.insert(item_name.upper(), 'ItemID')
                        user_names = get_first_last_name(row['UserID'])
                        full_name = user_names[0] + ' ' + user_names[1]
                        trie.insert(full_name.upper(), 'FirstLastName')
                return 201
        elif page_type == 'REQUESTS':
            #  builds the tree based on loans table (isConfirmed set to false)
            table = _select_cols({'IsConfirmed': '0'}, None, 'Loans')
            if table is not None:
                for row in table:
                    trie.insert(row['ItemID'].upper(), 'ID')
                    item_name = get_item_name(row['ItemID'])
                    trie.insert(item_name.upper(), 'ItemID')
                    user_names = get_first_last_name(row['UserID'])
                    full_name = user_names[0] + ' ' + user_names[1]
                    trie.insert(full_name.upper(), 'FirstLastName')
                return 201      
        elif page_type == 'USERS':
            #  builds the tree based on Users table with users not yet accepted
            table = _select_cols({'IsAccepted': '0'}, None, 'Users')
            if table is not None:
                for row in table:
                    full_name = row['FirstName'] + " " + row['LastName']
                    trie.insert(full_name.upper(), 'FirstLastName')
                return 201
        else:
            return abort(400, message="Invalid page type. Usage: LOAN, DASHBOARD, SIGNEDOUT, OVERDUE, REQUESTS, ARCHIVED, USERS")

        return abort(500, message="Internal error inserting values")
    
    def get(self, prefix):
        """
        Get list of values from prefix tree based on current input
        ---
        tags: 
            - Search
        parameters:
            - in: path
              name: prefix
              type: string
              required: true
        responses:
            201:
                description: Values retrieved
            500:
                description: Internal error fetching values
        """
        prefix = prefix.upper()
        words = trie.starts_with(prefix)
        result = []
        if words:
            for word in words:
                result.append({"value": word['value'], "kind": word['type']})
            return result, 201
        if words == []:
            return [], 201
        return abort(500, message="Internal error fetching values")
    
def get_item_name(item_id):
    item = _select_one({"ID": item_id}, 'Items')
    return item['ItemName']

def get_first_last_name(user_id):
    user = _select_one({"ID": user_id}, 'Users')
    return [user['FirstName'], user['LastName']]

def _select_cols(cn, cl, resource): return execute_sql_query(
  "SELECT", table=resource, conditions=cn, columns=cl)


def _select_cols_one(cn, cl, resource): 
  res = _select_cols(cn, cl, resource)
  if (res):
    return _select_cols(cn, cl, resource)[0]
  else:
    raise KeyError


def _select_one(cn, resource):
  return _select_cols_one(cn, None, resource)
