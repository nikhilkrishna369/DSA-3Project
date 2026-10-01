from collections import deque

class Graph:
    """
    Graph implementation using an adjacency list.
    Used for Story Relationship Network.
    """
    def __init__(self):
        # Maps vertex_id to a dictionary containing data and a list of edges.
        self.vertices = {}

    def add_vertex(self, vertex_id, data=None):
        """
        Adds a vertex to the graph.
        Time Complexity: O(1)
        """
        if vertex_id not in self.vertices:
            self.vertices[vertex_id] = {'data': data, 'edges': []}

    def add_edge(self, v1, v2, weight=1.0, rel_type='related'):
        """
        Adds a directed edge from v1 to v2. (Can be called twice for undirected).
        Time Complexity: O(1)
        """
        if v1 in self.vertices and v2 in self.vertices:
            self.vertices[v1]['edges'].append({
                'target': v2,
                'weight': weight,
                'type': rel_type
            })

    def get_neighbors(self, vertex_id):
        """
        Returns a list of neighbor edges for a vertex.
        Time Complexity: O(1)
        """
        if vertex_id in self.vertices:
            return self.vertices[vertex_id]['edges']
        return []

    def bfs(self, start_id):
        """
        Breadth-First Search traversal.
        Time Complexity: O(V + E)
        """
        if start_id not in self.vertices:
            return []

        visited = set()
        queue = deque([start_id])
        result = []

        visited.add(start_id)

        while queue:
            current = queue.popleft()
            result.append(current)

            for edge in self.get_neighbors(current):
                neighbor = edge['target']
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

        return result

    def dfs(self, start_id):
        """
        Depth-First Search traversal.
        Time Complexity: O(V + E)
        """
        if start_id not in self.vertices:
            return []

        visited = set()
        result = []

        def _dfs_helper(node):
            visited.add(node)
            result.append(node)
            for edge in self.get_neighbors(node):
                neighbor = edge['target']
                if neighbor not in visited:
                    _dfs_helper(neighbor)

        _dfs_helper(start_id)
        return result

    def find_related_stories(self, article_id, depth=2):
        """
        BFS traversal bounded by a specific depth.
        Time Complexity: O(V + E) within the depth limit.
        """
        if article_id not in self.vertices:
            return []

        visited = set([article_id])
        queue = deque([(article_id, 0)])
        result = []

        while queue:
            current, current_depth = queue.popleft()
            
            if current != article_id:
                result.append((current, current_depth))

            if current_depth < depth:
                for edge in self.get_neighbors(current):
                    neighbor = edge['target']
                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append((neighbor, current_depth + 1))

        return result

    def get_connected_components(self):
        """
        Finds all connected components (clusters of stories).
        Time Complexity: O(V + E)
        """
        visited = set()
        components = []

        for vertex in self.vertices:
            if vertex not in visited:
                component = self.bfs(vertex)
                components.append(component)
                visited.update(component)

        return components

def build_from_articles(articles):
    """
    Constructs a graph from a list of articles based on related_ids.
    """
    g = Graph()
    for article in articles:
        g.add_vertex(article['id'], article)
        
    for article in articles:
        for related_id in article.get('relatedIds', []):
            g.add_vertex(related_id) # ensure it exists
            g.add_edge(article['id'], related_id)
            g.add_edge(related_id, article['id']) # making it undirected for exploration
            
    return g
