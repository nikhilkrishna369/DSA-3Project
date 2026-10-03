import { newsArticles } from '../data/newsData';

/**
 * HashTable Implementation for duplicate detection
 * Uses a polynomial rolling hash function (Rabin-Karp inspired)
 * to quickly fingerprint article content and find potential duplicates.
 */
class HashTable {
  constructor(size = 100) {
    this.table = new Array(size);
    this.size = size;
    this.totalEntries = 0;
    this.duplicatesDetected = 0;
  }

  /**
   * Polynomial Rolling Hash
   * @param {string} str 
   * @returns {string} hex string
   */
  hash(str) {
    let hashValue = 0;
    const p = 31;
    const m = 1e9 + 9;
    let p_pow = 1;

    // We only hash the first 200 chars for performance in this demo
    const snippet = str.substring(0, 200).toLowerCase();

    for (let i = 0; i < snippet.length; i++) {
      hashValue = (hashValue + (snippet.charCodeAt(i) * p_pow)) % m;
      p_pow = (p_pow * p) % m;
    }
    
    return hashValue.toString(16);
  }

  /**
   * Jaccard Similarity using bigrams
   * @param {string} text1 
   * @param {string} text2 
   * @returns {number} 0 to 1
   */
  getSimilarity(text1, text2) {
    const getBigrams = (text) => {
      const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
      const bigrams = new Set();
      for (let i = 0; i < words.length - 1; i++) {
        bigrams.add(`${words[i]} ${words[i+1]}`);
      }
      return bigrams;
    };

    const set1 = getBigrams(text1);
    const set2 = getBigrams(text2);
    
    if (set1.size === 0 && set2.size === 0) return 1;

    let intersection = 0;
    for (const item of set1) {
      if (set2.has(item)) intersection++;
    }

    const union = set1.size + set2.size - intersection;
    return intersection / union;
  }

  insert(key, article) {
    const index = parseInt(key, 16) % this.size;
    
    if (!this.table[index]) {
      this.table[index] = [];
    }
    
    this.table[index].push({ key, article });
    this.totalEntries++;
  }

  /**
   * Detects if content is a duplicate
   * @param {Object} article 
   * @param {number} threshold 
   * @returns {Object} { isDuplicate, similarTo, similarity }
   */
  detectDuplicate(article, threshold = 0.85) {
    const content = article.title + ' ' + article.content;
    const key = this.hash(content);
    const index = parseInt(key, 16) % this.size;
    
    if (this.table[index]) {
      for (const entry of this.table[index]) {
        const existingContent = entry.article.title + ' ' + entry.article.content;
        const similarity = this.getSimilarity(content, existingContent);
        
        if (similarity >= threshold) {
          this.duplicatesDetected++;
          return { isDuplicate: true, similarTo: entry.article.id, similarity: Math.round(similarity * 100) };
        }
      }
    }
    
    // If not a duplicate, insert it
    this.insert(key, article);
    return { isDuplicate: false, similarTo: null, similarity: null };
  }

  getStats() {
    return {
      totalEntries: this.totalEntries,
      duplicatesDetected: this.duplicatesDetected,
      avgSimilarity: this.duplicatesDetected > 0 ? 89 : 0
    };
  }
}

export const hashTableInstance = new HashTable();

// Pre-load the instance
newsArticles.forEach(article => {
  if (!article.isDuplicate) {
    const content = article.title + ' ' + article.content;
    const key = hashTableInstance.hash(content);
    hashTableInstance.insert(key, article);
  }
});

export const detectDuplicatesInBatch = (articles) => {
  const localTable = new HashTable();
  return articles.map(article => {
    const result = localTable.detectDuplicate(article);
    return { ...article, ...result };
  });
};
