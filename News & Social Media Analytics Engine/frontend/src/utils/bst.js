/**
 * Binary Search Tree (BST) for hierarchical categorization and fast retrieval
 * of articles by keys (like trendScore or category hashes).
 */
class BSTNode {
  constructor(data, key) {
    this.data = data;
    this.key = key; // The sorting key (e.g., trendScore)
    this.left = null;
    this.right = null;
  }
}

export class BST {
  constructor() {
    this.root = null;
  }

  insert(article, keyFunction = (a) => a.trendScore) {
    const key = keyFunction(article);
    const newNode = new BSTNode(article, key);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  /**
   * Search via In-Order traversal and filter by keyword
   */
  search(keyword) {
    const results = [];
    const lowerKeyword = keyword.toLowerCase();
    
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        if (node.data.title.toLowerCase().includes(lowerKeyword)) {
          results.push(node.data);
        }
        traverse(node.right);
      }
    };
    
    traverse(this.root);
    return results;
  }

  inOrder() {
    const results = [];
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        results.push(node.data);
        traverse(node.right);
      }
    };
    traverse(this.root);
    return results;
  }

  getByCategory(category) {
    const results = [];
    const traverse = (node) => {
      if (node !== null) {
        traverse(node.left);
        if (category === 'All' || node.data.category === category) {
          results.push(node.data);
        }
        traverse(node.right);
      }
    };
    traverse(this.root);
    return results;
  }
}

export const createArticleTree = (articles) => {
  const bst = new BST();
  articles.forEach(article => bst.insert(article));
  return bst;
};
