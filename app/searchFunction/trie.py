from common.db import execute_sql_query, select_table

class TrieNode:
    def __init__(self, text = '', text_type = ''):
        self.text = text
        self.text_type = text_type
        self.children = dict()
        self.is_word = False


class PrefixTree:
    def __init__(self):
        self.root = TrieNode()


    def insert(self, word, text_type):
        """
        Inserts a word into the prefix tree.

        Parameters:
        - word (str): The word to insert
        - text_type (str): The type of the word (e.g. 'Name', 'ID')
        """
        current = self.root
        for i, char in enumerate(word):
            if char not in current.children:
                prefix = word[0:i+1]
                current.children[char] = TrieNode(prefix, text_type)
            current = current.children[char]
        current.is_word = True 


    
    def find(self, word):
        """
        Find a word in the prefix tree.

        Parameters:
        - word (str): the word to search for

        Returns:
        - current (TrieNode):The TrieNode representing the word if it exists, and None otherwise
        """
        current = self.root
        for char in word:
            if char not in current.children:
                return None
            current = current.children[char]
        if current.is_word:
            return current

    def starts_with(self, prefix):
        """
        Get a list of all the words that match the prefix in the trie.

        Parameters:
        - prefix (str): The prefix to search for

        Returns:
        - words (List[Dict[str, str]]): A list of all the words that match the prefix (empty if none exist
        """
        words = list()
        current = self.root
        for char in prefix:
            if char not in current.children:
                # Could also just return words since it's empty by default
                return list()
            current = current.children[char]
        self.__child_words_for(current, words)
        return words


    
    def __child_words_for(self, node, words):
        """
        Cycles through all children of a node recursively, adding them
        to words if they are a whole word (as opposed to merely a prefix).

        Parameters:
        - node (TrieNode): The node to start from
        - words (Dict[str, str]): The list of words to add to
        """
        if node.is_word:
            words.append({'value' : node.text, 'type' : node.text_type})
        for letter in node.children:
            self.__child_words_for(node.children[letter], words)

    
    def size(self, current = None):
        """
        Get the size of a prefix tree (total number of nodes in the tree)
        
        Parameters:
        - current (TrieNode): The node to start from (default is root)

        Returns:
        - count (int): The number of nodes in the tree
        """
        # By default, get the size of the whole trie, starting at the root
        if not current:
            current = self.root
        count = 1
        for letter in current.children:
            count += self.size(current.children[letter])
        return count
    
    def clear(self):
        """
        Clears the trie and makes it empty.
        """
        self.root = TrieNode()





    

    



