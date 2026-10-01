class MinHeap:
    """
    Min-Heap implementation for Priority Queue.
    Used for trending and moderation ranking.
    """
    def __init__(self):
        self.heap = []

    def _parent(self, index):
        return (index - 1) // 2

    def _left_child(self, index):
        return 2 * index + 1

    def _right_child(self, index):
        return 2 * index + 2

    def _swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    def insert(self, item, priority):
        """
        Inserts an item with a given priority.
        Time Complexity: O(log N)
        """
        self.heap.append((priority, item))
        self._heapify_up(len(self.heap) - 1)

    def extract_min(self):
        """
        Extracts the item with the minimum priority value (highest priority).
        Time Complexity: O(log N)
        """
        if not self.heap:
            return None
        
        if len(self.heap) == 1:
            return self.heap.pop()

        root = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._heapify_down(0)
        
        return root

    def peek(self):
        """
        Returns the highest priority item without removing it.
        Time Complexity: O(1)
        """
        return self.heap[0] if self.heap else None

    def _heapify_up(self, index):
        """
        Maintains the heap property by moving an element up.
        Time Complexity: O(log N)
        """
        parent = self._parent(index)
        if index > 0 and self.heap[index][0] < self.heap[parent][0]:
            self._swap(index, parent)
            self._heapify_up(parent)

    def _heapify_down(self, index):
        """
        Maintains the heap property by moving an element down.
        Time Complexity: O(log N)
        """
        smallest = index
        left = self._left_child(index)
        right = self._right_child(index)

        if left < len(self.heap) and self.heap[left][0] < self.heap[smallest][0]:
            smallest = left

        if right < len(self.heap) and self.heap[right][0] < self.heap[smallest][0]:
            smallest = right

        if smallest != index:
            self._swap(index, smallest)
            self._heapify_down(smallest)

class TrendPriorityQueue(MinHeap):
    """
    Extends MinHeap for ranking articles based on trend score.
    """
    def rank_articles(self, articles):
        """
        Returns articles sorted by priority.
        """
        for article in articles:
            # Assume lower number is higher priority. 
            # e.g., 100 - trend_score makes higher scores have lower priority values.
            priority_val = 100 - article.get('trend_score', 0)
            self.insert(article, priority_val)
            
        ranked = []
        while self.heap:
            ranked.append(self.extract_min()[1])
            
        return ranked

    def create_moderation_queue(self, posts):
        """
        Creates a priority queue from flagged posts.
        """
        priority_map = {'High': 1, 'Medium': 2, 'Low': 3}
        for post in posts:
            if post.get('status') == 'Flagged' or post.get('priority') in priority_map:
                p_val = priority_map.get(post.get('priority', 'Low'), 3)
                self.insert(post, p_val)
        return self
