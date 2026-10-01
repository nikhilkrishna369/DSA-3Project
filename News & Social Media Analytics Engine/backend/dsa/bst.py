class BSTNode:
    """
    Node for the Binary Search Tree.
    """
    def __init__(self, key, data):
        self.key = key
        self.data = data
        self.left = None
        self.right = None

class BST:
    """
    Binary Search Tree implementation.
    Used for article categorization and search.
    """
    def __init__(self):
        self.root = None

    def insert(self, key, data):
        """
        Inserts a new node into the BST.
        Time Complexity: O(log N) average, O(N) worst case.
        """
        if self.root is None:
            self.root = BSTNode(key, data)
        else:
            self._insert_recursive(self.root, key, data)

    def _insert_recursive(self, node, key, data):
        if key < node.key:
            if node.left is None:
                node.left = BSTNode(key, data)
            else:
                self._insert_recursive(node.left, key, data)
        else: # Handle duplicates by placing them on the right
            if node.right is None:
                node.right = BSTNode(key, data)
            else:
                self._insert_recursive(node.right, key, data)

    def search(self, key):
        """
        Searches for a node with the given key.
        Time Complexity: O(log N) average, O(N) worst case.
        """
        return self._search_recursive(self.root, key)

    def _search_recursive(self, node, key):
        if node is None or node.key == key:
            return node
        if key < node.key:
            return self._search_recursive(node.left, key)
        return self._search_recursive(node.right, key)

    def in_order(self):
        """
        In-order traversal of the BST.
        Time Complexity: O(N)
        Returns nodes in ascending order of their keys.
        """
        result = []
        self._in_order_recursive(self.root, result)
        return result

    def _in_order_recursive(self, node, result):
        if node:
            self._in_order_recursive(node.left, result)
            result.append((node.key, node.data))
            self._in_order_recursive(node.right, result)

    def get_by_range(self, min_key, max_key):
        """
        Finds all nodes within a specific key range.
        Time Complexity: O(log N + K) where K is number of elements in range.
        """
        result = []
        self._range_recursive(self.root, min_key, max_key, result)
        return result

    def _range_recursive(self, node, min_key, max_key, result):
        if node is None:
            return
        
        if min_key < node.key:
            self._range_recursive(node.left, min_key, max_key, result)
            
        if min_key <= node.key <= max_key:
            result.append((node.key, node.data))
            
        if max_key > node.key:
            self._range_recursive(node.right, min_key, max_key, result)

def build_article_tree(articles):
    """
    Builds a BST from a list of articles, using trend_score as the key.
    """
    tree = BST()
    for article in articles:
        # Key is trend score, data is the full article
        tree.insert(article.get('trend_score', 0), article)
    return tree

def search_by_keyword(tree, keyword):
    """
    Searches through the tree for articles matching a keyword in the title.
    Since tree is ordered by trend_score, we must do an in-order traversal to check titles.
    Time Complexity: O(N)
    """
    all_articles = tree.in_order()
    results = []
    keyword_lower = keyword.lower()
    for _, article in all_articles:
        if keyword_lower in article.get('title', '').lower():
            results.append(article)
    return results
