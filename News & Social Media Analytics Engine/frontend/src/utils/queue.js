import { newsArticles } from '../data/newsData';

/**
 * Queue data structure implementation simulating an Array-based Circular Buffer.
 * O(1) enqueue and dequeue (amortized) by maintaining head/tail pointers.
 * Useful for incoming real-time streams of articles or moderation tasks.
 */
export class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }

  enqueue(item) {
    this.items[this.tail] = item;
    this.tail++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.items[this.head];
    delete this.items[this.head]; // free memory
    this.head++;
    
    // Reset pointers if empty to prevent unbounded memory growth
    if (this.head === this.tail) {
      this.head = 0;
      this.tail = 0;
      this.items = [];
    }
    
    return item;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.head];
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return this.tail - this.head;
  }

  toArray() {
    return this.items.slice(this.head, this.tail);
  }
}

export class NewsQueue extends Queue {
  processNext() {
    const item = this.dequeue();
    if (item) {
      item.processedAt = new Date().toISOString();
      return item;
    }
    return null;
  }
}

export const createIncomingQueue = () => {
  const queue = new NewsQueue();
  // Sort by publishedAt to simulate chronological incoming stream
  const sorted = [...newsArticles].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
  sorted.forEach(article => queue.enqueue(article));
  return queue;
};
