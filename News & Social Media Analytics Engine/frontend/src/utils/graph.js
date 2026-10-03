/**
 * Adjacency List Graph Implementation
 * Useful for mapping relationships between articles, finding clusters (connected components),
 * and discovering related stories via BFS/DFS traversal.
 */
export class Graph {
  constructor() {
    this.vertices = new Map();
  }

  addVertex(id, data) {
    if (!this.vertices.has(id)) {
      this.vertices.set(id, { data, edges: [] });
    }
  }

  addEdge(id1, id2, weight = 1, type = 'related') {
    if (this.vertices.has(id1) && this.vertices.has(id2)) {
      this.vertices.get(id1).edges.push({ node: id2, weight, type });
      // Undirected graph
      this.vertices.get(id2).edges.push({ node: id1, weight, type });
    }
  }

  getNeighbors(id) {
    return this.vertices.has(id) ? this.vertices.get(id).edges : [];
  }

  /**
   * Breadth-First Search
   * Finds all nodes connected to the start node, level by level.
   * Time Complexity: O(V + E)
   */
  bfs(startId) {
    if (!this.vertices.has(startId)) return [];

    const visited = new Set();
    const queue = [startId];
    const result = [];

    visited.add(startId);

    while (queue.length > 0) {
      const currentId = queue.shift();
      result.push(this.vertices.get(currentId).data);

      const neighbors = this.getNeighbors(currentId);
      for (let edge of neighbors) {
        if (!visited.has(edge.node)) {
          visited.add(edge.node);
          queue.push(edge.node);
        }
      }
    }
    return result;
  }

  /**
   * Depth-First Search
   * Time Complexity: O(V + E)
   */
  dfs(startId) {
    if (!this.vertices.has(startId)) return [];

    const visited = new Set();
    const result = [];

    const traverse = (id) => {
      visited.add(id);
      result.push(this.vertices.get(id).data);

      const neighbors = this.getNeighbors(id);
      for (let edge of neighbors) {
        if (!visited.has(edge.node)) {
          traverse(edge.node);
        }
      }
    };

    traverse(startId);
    return result;
  }

  findRelatedStories(articleId, depth = 2) {
    if (!this.vertices.has(articleId)) return [];

    const visited = new Set([articleId]);
    const queue = [{ id: articleId, d: 0 }];
    const result = [];

    while (queue.length > 0) {
      const current = queue.shift();
      
      if (current.d > 0 && current.d <= depth) {
        result.push({ 
          ...this.vertices.get(current.id).data, 
          _degreesOfSeparation: current.d 
        });
      }

      if (current.d < depth) {
        const neighbors = this.getNeighbors(current.id);
        for (let edge of neighbors) {
          if (!visited.has(edge.node)) {
            visited.add(edge.node);
            queue.push({ id: edge.node, d: current.d + 1 });
          }
        }
      }
    }
    return result;
  }

  getConnectedComponents() {
    const visited = new Set();
    const components = [];

    for (let [id, node] of this.vertices.entries()) {
      if (!visited.has(id)) {
        const component = this.bfs(id);
        component.forEach(n => visited.add(n.id));
        if (component.length > 1) { // Only return clusters > 1
          components.push(component);
        }
      }
    }
    return components;
  }
}

export const buildStoryGraph = (articles) => {
  const g = new Graph();
  
  // Add vertices
  articles.forEach(article => {
    g.addVertex(article.id, article);
  });

  // Add edges
  articles.forEach(article => {
    if (article.relatedIds && article.relatedIds.length > 0) {
      article.relatedIds.forEach(relatedId => {
        // Prevent duplicate undirected edges by enforcing order
        if (article.id < relatedId) {
          g.addEdge(article.id, relatedId, 1, 'related');
        }
      });
    }
    if (article.isDuplicate && article.duplicateOf) {
      g.addEdge(article.id, article.duplicateOf, 2, 'duplicate');
    }
  });

  return g;
};
