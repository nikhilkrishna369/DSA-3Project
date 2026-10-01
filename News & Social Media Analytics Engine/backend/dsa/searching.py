def linear_search(articles, query):
    """
    Linear Search across text fields with scoring.
    Time Complexity: O(N * L) where N = articles, L = avg text length
    """
    if not query:
        return articles

    query_lower = query.lower()
    results = []

    for article in articles:
        title = article.get('title', '').lower()
        summary = article.get('summary', '').lower()
        content = article.get('content', '').lower()
        
        # Simple text matching
        if query_lower in title or query_lower in summary or query_lower in content:
            results.append(article)

    return results

def binary_search(sorted_arr, target_score, key_str='trendScore'):
    """
    Binary Search on a pre-sorted array.
    Time Complexity: O(log N)
    """
    low = 0
    high = len(sorted_arr) - 1

    while low <= high:
        mid = (low + high) // 2
        mid_val = sorted_arr[mid].get(key_str, 0)

        if mid_val == target_score:
            return mid
        elif mid_val < target_score:
            low = mid + 1
        else:
            high = mid - 1

    return -1

def levenshtein(a, b):
    """
    Calculates the Levenshtein distance (edit distance) between two strings.
    Dynamic Programming approach.
    Time Complexity: O(len(a) * len(b))
    Space Complexity: O(len(a) * len(b))
    """
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                cost = 0
            else:
                cost = 1
            dp[i][j] = min(
                dp[i - 1][j] + 1,      # Deletion
                dp[i][j - 1] + 1,      # Insertion
                dp[i - 1][j - 1] + cost # Substitution
            )

    return dp[m][n]

def fuzzy_search(items, query, threshold=0.6):
    """
    Fuzzy string matching based on Levenshtein distance.
    Returns items that are 'close enough' to the query.
    """
    if not query:
        return []

    query_lower = query.lower()
    max_dist = int(len(query_lower) * (1 - threshold))
    results = []

    for item in items:
        title = item.get('title', '').lower()
        # For simplicity, just check title words against query words
        title_words = title.split()
        query_words = query_lower.split()
        
        match_found = False
        for q_word in query_words:
            for t_word in title_words:
                if levenshtein(q_word, t_word) <= max_dist:
                    match_found = True
                    break
            if match_found:
                break
                
        if match_found:
            results.append(item)

    return results

def search_all(articles, posts, query):
    """
    Combined search across articles and posts.
    """
    if not query:
        return {'articles': articles, 'posts': posts, 'total': len(articles) + len(posts)}
        
    query_lower = query.lower()
    
    # Search articles
    matched_articles = linear_search(articles, query)
    
    # Search posts
    matched_posts = []
    for post in posts:
        content = post.get('content', '').lower()
        author = post.get('author', '').lower()
        if query_lower in content or query_lower in author:
            matched_posts.append(post)
            
    return {
        'articles': matched_articles,
        'posts': matched_posts,
        'total': len(matched_articles) + len(matched_posts)
    }
