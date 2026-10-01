def merge_sort(arr, key_fn, reverse=False):
    """
    Stable Merge Sort implementation.
    Time Complexity: O(N log N) in all cases.
    Space Complexity: O(N)
    """
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid], key_fn, reverse)
    right = merge_sort(arr[mid:], key_fn, reverse)

    return _merge(left, right, key_fn, reverse)

def _merge(left, right, key_fn, reverse):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        left_val = key_fn(left[i])
        right_val = key_fn(right[j])

        if reverse:
            condition = left_val >= right_val
        else:
            condition = left_val <= right_val

        if condition:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

def quick_sort(arr, key_fn, low=0, high=None, reverse=False):
    """
    In-place Quick Sort implementation.
    Time Complexity: O(N log N) average, O(N^2) worst case.
    Space Complexity: O(log N) for recursion stack.
    """
    if high is None:
        high = len(arr) - 1

    if low < high:
        pi = _partition(arr, key_fn, low, high, reverse)
        quick_sort(arr, key_fn, low, pi - 1, reverse)
        quick_sort(arr, key_fn, pi + 1, high, reverse)
        
    return arr

def _partition(arr, key_fn, low, high, reverse):
    pivot_val = key_fn(arr[high])
    i = low - 1

    for j in range(low, high):
        curr_val = key_fn(arr[j])
        if reverse:
            condition = curr_val >= pivot_val
        else:
            condition = curr_val <= pivot_val

        if condition:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def rank_articles(articles, criteria='trending'):
    """
    Ranks articles based on various criteria using Merge Sort (stable sort).
    """
    if criteria == 'popularity':
        # Sort by total engagement
        def pop_key(a):
            eng = a.get('engagement', {})
            return eng.get('likes', 0) + eng.get('shares', 0) + eng.get('comments', 0)
        return merge_sort(articles, key_fn=pop_key, reverse=True)
        
    elif criteria == 'date':
        # Sort by publish date
        return merge_sort(articles, key_fn=lambda a: a.get('publishedAt', ''), reverse=True)
        
    else: # Default to trending
        return merge_sort(articles, key_fn=lambda a: a.get('trendScore', 0), reverse=True)

def rank_by_relevance(articles, query):
    """
    Ranks articles by relevance to a query (TF-IDF inspired).
    """
    if not query:
        return articles
        
    query_lower = query.lower()
    
    def rel_score(article):
        score = 0
        title = article.get('title', '').lower()
        content = article.get('content', '').lower()
        
        # Exact match in title is worth most
        if query_lower in title:
            score += 10
            
        # Matches in content
        score += content.count(query_lower) * 2
        
        return score
        
    return merge_sort(articles, key_fn=rel_score, reverse=True)
