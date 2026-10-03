/**
 * Linear Search
 * Time Complexity: O(n)
 */
export const linearSearch = (articles, query) => {
  const lowerQ = query.toLowerCase();
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowerQ) ||
    article.content.toLowerCase().includes(lowerQ) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQ))
  );
};

/**
 * Binary Search
 * Time Complexity: O(log n)
 * Pre-condition: Array must be sorted by the target property.
 */
export const binarySearch = (sortedArr, targetScore, property = 'trendScore') => {
  let left = 0;
  let right = sortedArr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midVal = sortedArr[mid][property];

    if (midVal === targetScore) {
      return sortedArr[mid];
    }
    
    // Assuming descending sort for trendScore
    if (midVal < targetScore) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return null; // Not found
};

/**
 * Levenshtein Distance for fuzzy searching
 * Time Complexity: O(len1 * len2)
 */
export const levenshtein = (a, b) => {
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

/**
 * Fuzzy Search using Levenshtein distance
 * Matches keywords even with typos.
 */
export const fuzzySearch = (articles, query, threshold = 0.6) => {
  const words = query.toLowerCase().split(/\s+/);
  
  return articles.filter(article => {
    const titleWords = article.title.toLowerCase().split(/\s+/);
    
    // Check if any word in the query is close to any word in the title
    for (const qWord of words) {
      if (qWord.length < 3) continue; // skip very short words
      
      for (const tWord of titleWords) {
        const distance = levenshtein(qWord, tWord);
        const maxLen = Math.max(qWord.length, tWord.length);
        const similarity = 1 - (distance / maxLen);
        
        if (similarity >= threshold) {
          return true; // Match found
        }
      }
    }
    return false;
  });
};

export const searchAll = (articles, posts, query) => {
  const articleMatches = linearSearch(articles, query);
  
  const lowerQ = query.toLowerCase();
  const postMatches = posts.filter(post => 
    post.content.toLowerCase().includes(lowerQ) ||
    post.author.toLowerCase().includes(lowerQ)
  );
  
  return {
    articles: articleMatches,
    posts: postMatches,
    total: articleMatches.length + postMatches.length
  };
};
