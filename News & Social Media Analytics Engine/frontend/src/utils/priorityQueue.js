/**
 * MinHeap based Priority Queue.
 * We use MinHeap logic, so smaller priority values surface to the top.
 * For trendScore (where higher is better), we invert the score when inserting.
 * For severity/priority (High=1, Medium=2, Low=3), MinHeap naturally puts High first.
 */
export class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  /**
   * Insert element into the queue
   * @param {Object} item { id, data, priority, trendScore }
   */
  insert(item) {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }

  /**
   * Extract highest priority item
   */
  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return top;
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp(index) {
    let curr = index;
    while (curr > 0) {
      const parentIndex = Math.floor((curr - 1) / 2);
      if (this.heap[curr].priority < this.heap[parentIndex].priority) {
        // Swap
        const temp = this.heap[curr];
        this.heap[curr] = this.heap[parentIndex];
        this.heap[parentIndex] = temp;
        curr = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown(index) {
    let curr = index;
    const length = this.heap.length;

    while (true) {
      let leftChild = 2 * curr + 1;
      let rightChild = 2 * curr + 2;
      let smallest = curr;

      if (leftChild < length && this.heap[leftChild].priority < this.heap[smallest].priority) {
        smallest = leftChild;
      }
      if (rightChild < length && this.heap[rightChild].priority < this.heap[smallest].priority) {
        smallest = rightChild;
      }

      if (smallest !== curr) {
        const temp = this.heap[curr];
        this.heap[curr] = this.heap[smallest];
        this.heap[smallest] = temp;
        curr = smallest;
      } else {
        break;
      }
    }
  }

  toSortedArray() {
    const copy = new PriorityQueue();
    copy.heap = [...this.heap];
    const sorted = [];
    while (!copy.isEmpty()) {
      sorted.push(copy.extractMax());
    }
    return sorted;
  }
}

export const createTrendingQueue = (articles) => {
  const pq = new PriorityQueue();
  articles.forEach(article => {
    // Invert trendScore so higher score has lower priority value (tops the MinHeap)
    pq.insert({ ...article, priority: -article.trendScore });
  });
  return pq;
};

export const createModerationQueue = (posts) => {
  const pq = new PriorityQueue();
  const priorityMap = { 'High': 1, 'Medium': 2, 'Low': 3 };
  
  posts.forEach(post => {
    if (post.status === 'Flagged' || post.status === 'Pending') {
      pq.insert({ ...post, priority: priorityMap[post.priority] || 4 });
    }
  });
  return pq;
};
