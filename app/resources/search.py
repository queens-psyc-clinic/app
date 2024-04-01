from flask_restful import abort, Resource
from common.db import select_table
from searchFunction.trie import PrefixTree

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
        responses:
            201:
                description: Values inserted
            500:
                description: Internal error inserting values
        """
        table = select_table('Tests')
        if table is not None:
            for row in table:
                trie.insert(row['Name'].upper(), 'Name')
                trie.insert(row['ID'].upper(), 'ID')
            return 201
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
                result.append({word['value'] : word['type']})
            return result, 201
        if words == []:
            return [], 201
        return abort(500, message="Internal error fetching values")

