/**
 * Merge Sort implementation
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
export const mergeSort = (arr, key, asc = true) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), key, asc);
  const right = mergeSort(arr.slice(mid), key, asc);

  return merge(left, right, key, asc);
};

const merge = (left, right, key, asc) => {
  let result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    const valL = left[i][key];
    const valR = right[j][key];
    
    if (asc ? valL <= valR : valL >= valR) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
};

/**
 * Quick Sort implementation (In-place)
 * Time Complexity: O(n log n) average, O(n^2) worst case
 * Space Complexity: O(log n) stack space
 */
export const quickSort = (arr, key, asc = true, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const pivotIndex = partition(arr, key, asc, left, right);
    quickSort(arr, key, asc, left, pivotIndex - 1);
    quickSort(arr, key, asc, pivotIndex + 1, right);
  }
  return arr;
};

const partition = (arr, key, asc, left, right) => {
  const pivot = arr[right][key];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    const valJ = arr[j][key];
    if (asc ? valJ <= pivot : valJ >= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
};

/**
 * Insertion Sort
 * Time Complexity: O(n^2) worst/avg, O(n) best
 * Good for very small datasets.
 */
export const insertionSort = (arr, key, asc = true) => {
  const result = [...arr];
  for (let i = 1; i < result.length; i++) {
    let current = result[i];
    let j = i - 1;
    while (j >= 0 && (asc ? result[j][key] > current[key] : result[j][key] < current[key])) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = current;
  }
  return result;
};

export const rankArticles = (articles, criteria) => {
  switch (criteria) {
    case 'popularity':
      // Sort by engagement total
      const withTotal = articles.map(a => ({
        ...a, 
        _totalEng: a.engagement.likes + a.engagement.shares + a.engagement.comments
      }));
      return mergeSort(withTotal, '_totalEng', false);
    case 'date':
      return mergeSort(articles, 'publishedAt', false);
    case 'trending':
    default:
      return mergeSort(articles, 'trendScore', false);
  }
};

export const rankByRelevance = (articles, query) => {
  const lowerQ = query.toLowerCase();
  
  const scored = articles.map(article => {
    let score = 0;
    if (article.title.toLowerCase().includes(lowerQ)) score += 10;
    if (article.content.toLowerCase().includes(lowerQ)) score += 5;
    article.tags.forEach(tag => {
      if (tag.toLowerCase() === lowerQ) score += 3;
    });
    return { ...article, _relevanceScore: score };
  });

  // Filter out zero score, then sort descending
  const filtered = scored.filter(a => a._relevanceScore > 0);
  return mergeSort(filtered, '_relevanceScore', false);
};
