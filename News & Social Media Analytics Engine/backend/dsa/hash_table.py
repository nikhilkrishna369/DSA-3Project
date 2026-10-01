class HashTable:
    """
    Hash Table implementation using polynomial rolling hash and chaining for collisions.
    Used for duplicate content detection.
    """
    def __init__(self, capacity=1024):
        self.capacity = capacity
        self.size = 0
        self.table = [[] for _ in range(capacity)]
        self.prime = 31
        self.mod = 10**9 + 9

    def _hash(self, key):
        """
        Polynomial rolling hash function.
        Time Complexity: O(L) where L is the length of the string.
        """
        hash_val = 0
        p_pow = 1
        for char in str(key):
            hash_val = (hash_val + ord(char) * p_pow) % self.mod
            p_pow = (p_pow * self.prime) % self.mod
        return hash_val % self.capacity

    def insert(self, key, value):
        """
        Inserts a key-value pair into the hash table.
        Time Complexity: O(1) average, O(N) worst case.
        """
        if self.size / self.capacity > 0.7:
            self._rehash()

        index = self._hash(key)
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        self.table[index].append((key, value))
        self.size += 1

    def get(self, key):
        """
        Retrieves a value by key.
        Time Complexity: O(1) average, O(N) worst case.
        """
        index = self._hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        return None

    def delete(self, key):
        """
        Deletes a key-value pair.
        Time Complexity: O(1) average, O(N) worst case.
        """
        index = self._hash(key)
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                del self.table[index][i]
                self.size -= 1
                return True
        return False

    def contains(self, key):
        """
        Checks if a key exists in the hash table.
        Time Complexity: O(1) average, O(N) worst case.
        """
        return self.get(key) is not None

    def _rehash(self):
        """
        Doubles the capacity and rehashes all elements.
        Time Complexity: O(N)
        """
        old_table = self.table
        self.capacity *= 2
        self.table = [[] for _ in range(self.capacity)]
        self.size = 0
        for bucket in old_table:
            for k, v in bucket:
                self.insert(k, v)

    def _get_bigrams(self, text):
        words = text.lower().split()
        return set(zip(words, words[1:]))

    def _jaccard_similarity(self, text1, text2):
        """
        Calculates Jaccard similarity based on word bigrams.
        """
        bigrams1 = self._get_bigrams(text1)
        bigrams2 = self._get_bigrams(text2)
        if not bigrams1 and not bigrams2:
            return 1.0
        if not bigrams1 or not bigrams2:
            return 0.0
        
        intersection = bigrams1.intersection(bigrams2)
        union = bigrams1.union(bigrams2)
        return len(intersection) / len(union)

    def detect_duplicate(self, content, threshold=0.85):
        """
        Checks for duplicate or similar content.
        Time Complexity: O(N * L) where N is the number of elements and L is content length.
        Returns: { 'is_duplicate': bool, 'similar_to': key, 'similarity': float }
        """
        # Exact match check
        hashed_content = str(self._hash(content))
        if self.contains(hashed_content):
            return {
                'is_duplicate': True,
                'similar_to': self.get(hashed_content),
                'similarity': 1.0
            }
            
        # Similarity check
        best_match = None
        highest_similarity = 0.0
        
        for bucket in self.table:
            for k, original_content in bucket:
                sim = self._jaccard_similarity(content, original_content)
                if sim > highest_similarity:
                    highest_similarity = sim
                    best_match = k

        if highest_similarity >= threshold:
            return {
                'is_duplicate': True,
                'similar_to': best_match,
                'similarity': highest_similarity
            }
            
        return {
            'is_duplicate': False,
            'similar_to': None,
            'similarity': highest_similarity
        }
