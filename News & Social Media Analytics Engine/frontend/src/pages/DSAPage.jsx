import React, { useState } from 'react'
import { Cpu, BarChart3, Layers, Network, GitBranch, ArrowUpDown, Search, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DSAPage() {
  const [expandedCard, setExpandedCard] = useState(0)

  const concepts = [
    {
      id: 0,
      title: 'Hash Table',
      app: 'Duplicate Content Detection',
      tag: 'O(1) lookups',
      icon: <Cpu className="w-6 h-6 text-violet-500" />,
      color: 'violet',
      link: '/duplicates',
      what: 'A hash table maps keys to values using a hash function, enabling O(1) average-case lookup time.',
      why: 'When thousands of new articles arrive, we must quickly check if a similar article already exists. Linear search would be O(n) — too slow for large datasets. A hash table resolves this instantly.',
      where: ['/duplicates page', 'Article ingestion pipeline fingerprinting'],
      code: `def check_duplicate(new_article):
  # compute polynomial rolling hash
  h = hash_func(new_article.content) 
  
  if h in hash_table:
    # Hash collision or duplicate! Check detailed similarity
    if compute_similarity(new_article, hash_table[h]) > 0.85:
      return True
  
  hash_table[h] = new_article.id
  return False`,
      complexities: [
        { op: 'Insert', time: 'O(1) avg' },
        { op: 'Lookup', time: 'O(1) avg' },
        { op: 'Worst Case', time: 'O(n) (many collisions)' }
      ]
    },
    {
      id: 1,
      title: 'Priority Queue (Min/Max Heap)',
      app: 'Trending & Moderation Ranking',
      tag: 'O(log n) inserts',
      icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
      color: 'blue',
      link: '/moderation',
      what: 'A binary heap maintains partial ordering, providing O(log n) insertion and O(1) max/min access.',
      why: 'With thousands of articles, we need instant access to the highest-trending or highest-risk content without re-sorting everything (which would cost O(n log n)).',
      where: ['/trending page ranking', '/moderation queue ordering'],
      code: `class ModerationQueue:
  def __init__(self):
    self.heap = []
    
  def add_flagged_item(self, item, severity_score):
    # Insert at end, then heapify-up to restore heap property
    insert_to_heap(self.heap, (-severity_score, item))
    
  def get_most_critical(self):
    # O(1) access to root element
    return self.heap[0]`,
      complexities: [
        { op: 'Insert', time: 'O(log n)' },
        { op: 'Extract Max', time: 'O(log n)' },
        { op: 'Peek', time: 'O(1)' },
        { op: 'Build', time: 'O(n)' }
      ]
    },
    {
      id: 2,
      title: 'Queue (FIFO)',
      app: 'Content Ingestion Pipeline',
      tag: 'Order preservation',
      icon: <Layers className="w-6 h-6 text-emerald-500" />,
      color: 'emerald',
      link: '/',
      what: 'FIFO data structure — first in, first out, modeling a real processing pipeline.',
      why: 'Articles and social posts arrive continuously and concurrently. A queue ensures fair, ordered processing and acts as a buffer during traffic spikes.',
      where: ['Incoming article processing worker', 'Dashboard activity feed'],
      code: `queue = deque()

# Producer (API Webhook)
def on_new_article_received(article_data):
    queue.append(article_data)  # O(1) Enqueue

# Consumer (Background Worker)
def process_pipeline():
    while queue:
        article = queue.popleft()  # O(1) Dequeue
        process_and_store(article)`,
      complexities: [
        { op: 'Enqueue', time: 'O(1)' },
        { op: 'Dequeue', time: 'O(1)' },
        { op: 'Peek', time: 'O(1)' }
      ]
    },
    {
      id: 3,
      title: 'Graph (Adjacency List)',
      app: 'Story Relationship Network',
      tag: 'Complex networks',
      icon: <Network className="w-6 h-6 text-amber-500" />,
      color: 'amber',
      link: '/relationships',
      what: 'Graph of vertices (stories) connected by edges (relationships), stored efficiently as adjacency lists.',
      why: 'News stories are naturally connected by topics, citations, and follow-ups. A graph accurately models these connections and enables exploration algorithms.',
      where: ['/relationships network visualization', 'BFS/DFS story exploration'],
      code: `graph = {
  "article_1": ["article_6", "article_17"],
  "article_6": ["article_1", "social_post_8"],
  # ... adjacency list representation
}

def find_related_stories(start_id, max_depth=2):
    # BFS Traversal
    visited, queue = set(), [(start_id, 0)]
    while queue:
        node, depth = queue.pop(0)
        if depth > max_depth: continue
        visited.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                queue.append((neighbor, depth + 1))`,
      complexities: [
        { op: 'Add Vertex/Edge', time: 'O(1)' },
        { op: 'BFS/DFS Traversal', time: 'O(V + E)' },
        { op: 'Get Neighbors', time: 'O(degree)' }
      ]
    },
    {
      id: 4,
      title: 'Binary Search Tree',
      app: 'Article Search & Classification',
      tag: 'O(log n) structured',
      icon: <GitBranch className="w-6 h-6 text-rose-500" />,
      color: 'rose',
      link: '/search',
      what: 'BST maintains sorted order dynamically with O(log n) search, insertion, and deletion times.',
      why: 'Organizing articles by metrics (like trend score) in a BST enables highly efficient range queries (e.g., "get articles with score between 50 and 80") and sorted retrieval.',
      where: ['Category filtering', 'Score-based range queries'],
      code: `class BSTNode:
    def __init__(self, key, article_id):
        self.key = key          # e.g., trend_score
        self.val = article_id
        self.left = self.right = None

def get_articles_in_range(root, min_score, max_score, result):
    if not root: return
    # Optimization: Only traverse relevant branches
    if root.key > min_score:
        get_articles_in_range(root.left, min_score, max_score, result)
    if min_score <= root.key <= max_score:
        result.append(root.val)
    if root.key < max_score:
        get_articles_in_range(root.right, min_score, max_score, result)`,
      complexities: [
        { op: 'Search', time: 'O(log n) avg' },
        { op: 'Insert', time: 'O(log n) avg' },
        { op: 'In-order Traversal', time: 'O(n)' }
      ]
    },
    {
      id: 5,
      title: 'Merge Sort / Quick Sort',
      app: 'Content Ranking & Ordering',
      tag: 'O(n log n) sorts',
      icon: <ArrowUpDown className="w-6 h-6 text-slate-400" />,
      color: 'slate',
      link: '/search',
      what: 'Advanced divide-and-conquer algorithms achieving optimal O(n log n) comparison sorting.',
      why: 'Ranking thousands of articles dynamically based on complex relevance formulas requires an efficient sorting algorithm, far outperforming basic O(n²) sorts.',
      where: ['News feed sorting', 'Trending analytics ordering'],
      code: `def merge_sort(articles, key_func):
    if len(articles) <= 1: return articles
    
    mid = len(articles) // 2
    left = merge_sort(articles[:mid], key_func)
    right = merge_sort(articles[mid:], key_func)
    
    return merge(left, right, key_func)
    
# Usage: Sort by composite relevance score
sorted_feed = merge_sort(all_articles, 
                         lambda a: a.relevance_score())`,
      complexities: [
        { op: 'Merge Sort', time: 'O(n log n) all cases' },
        { op: 'Quick Sort', time: 'O(n log n) avg, O(n²) worst' },
        { op: 'Space (Merge)', time: 'O(n)' }
      ]
    },
    {
      id: 6,
      title: 'Binary Search + Linear Search',
      app: 'Content Discovery & Lookup',
      tag: 'Search algorithms',
      icon: <Search className="w-6 h-6 text-teal-500" />,
      color: 'teal',
      link: '/search',
      what: 'Linear search sequentially checks elements O(n). Binary search repeatedly divides sorted data in half O(log n).',
      why: 'For full-text fuzzy matching, linear search is required. However, for filtered, pre-sorted datasets (by date or score), binary search dramatically reduces lookup time from millions of operations to less than 20.',
      where: ['Search page lookups', 'Threshold filtering'],
      code: `def binary_search_threshold(sorted_scores, target):
    low, high = 0, len(sorted_scores) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if sorted_scores[mid] == target:
            return mid
        elif sorted_scores[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1 # Not found`,
      complexities: [
        { op: 'Linear Search', time: 'O(n)' },
        { op: 'Binary Search', time: 'O(log n)' },
        { op: 'Requirement', time: 'Binary requires sorted array' }
      ]
    }
  ]

  return (
    <div className="p-6 space-y-8 text-slate-100 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">How DSA Powers NewsIQ</h1>
        <p className="text-slate-400 text-lg">Explore the data structures and algorithms behind the system</p>
        <p className="text-slate-500 text-sm mt-2">This page is your guide to understanding the computational foundations.</p>
      </div>

      <div className="space-y-4">
        {concepts.map((concept) => (
          <div key={concept.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300">
            <button 
              className="w-full p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
              onClick={() => setExpandedCard(expandedCard === concept.id ? -1 : concept.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-${concept.color}-500/10`}>
                  {concept.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">{concept.title}</h3>
                  <div className="text-sm text-slate-400 flex items-center gap-2">
                    <span>{concept.app}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                    <span className={`text-${concept.color}-400 text-xs font-semibold`}>{concept.tag}</span>
                  </div>
                </div>
              </div>
              {expandedCard === concept.id ? <ChevronUp /> : <ChevronDown />}
            </button>
            
            {expandedCard === concept.id && (
              <div className="p-6 border-t border-slate-700 bg-slate-800/50 flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">What it is</h4>
                    <p className="text-slate-200">{concept.what}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Why we use it</h4>
                    <p className="text-slate-200">{concept.why}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Where in NewsIQ</h4>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      {concept.where.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                  </div>
                  <div className="pt-4">
                    <Link to={concept.link} className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-${concept.color}-600 hover:bg-${concept.color}-700 text-white text-sm font-medium transition-colors`}>
                      See it in action <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Complexity</h4>
                    <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-slate-800 text-slate-400">
                          <tr>
                            <th className="px-3 py-2">Operation</th>
                            <th className="px-3 py-2">Complexity</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                          {concept.complexities.map((comp, i) => (
                            <tr key={i}>
                              <td className="px-3 py-2 text-slate-300">{comp.op}</td>
                              <td className="px-3 py-2 font-mono text-xs text-blue-400">{comp.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Example Implementation</h4>
                    <pre className="bg-slate-900 border border-slate-700 p-4 rounded-lg overflow-x-auto text-xs font-mono text-slate-300">
                      <code>{concept.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-center">Summary Table</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-800">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-slate-300">
              <tr>
                <th className="px-4 py-4">DSA Concept</th>
                <th className="px-4 py-4">Used For</th>
                <th className="px-4 py-4">Time Complexity (Primary)</th>
                <th className="px-4 py-4">Space Complexity</th>
                <th className="px-4 py-4">Page</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-slate-300">
              <tr className="hover:bg-slate-700/30">
                <td className="px-4 py-3 font-medium">Hash Table</td>
                <td className="px-4 py-3">Duplicate Detection</td>
                <td className="px-4 py-3 font-mono text-xs text-violet-400">O(1) avg</td>
                <td className="px-4 py-3 font-mono text-xs">O(n)</td>
                <td className="px-4 py-3">/duplicates</td>
              </tr>
              <tr className="hover:bg-slate-700/30">
                <td className="px-4 py-3 font-medium">Priority Queue</td>
                <td className="px-4 py-3">Moderation Ranking</td>
                <td className="px-4 py-3 font-mono text-xs text-blue-400">O(log n) insert/extract</td>
                <td className="px-4 py-3 font-mono text-xs">O(n)</td>
                <td className="px-4 py-3">/moderation</td>
              </tr>
              <tr className="hover:bg-slate-700/30">
                <td className="px-4 py-3 font-medium">Queue (FIFO)</td>
                <td className="px-4 py-3">Ingestion Pipeline</td>
                <td className="px-4 py-3 font-mono text-xs text-emerald-400">O(1) enqueue/dequeue</td>
                <td className="px-4 py-3 font-mono text-xs">O(n)</td>
                <td className="px-4 py-3">/</td>
              </tr>
              <tr className="hover:bg-slate-700/30">
                <td className="px-4 py-3 font-medium">Graph</td>
                <td className="px-4 py-3">Story Network</td>
                <td className="px-4 py-3 font-mono text-xs text-amber-400">O(V+E) BFS/DFS</td>
                <td className="px-4 py-3 font-mono text-xs">O(V+E)</td>
                <td className="px-4 py-3">/relationships</td>
              </tr>
              <tr className="hover:bg-slate-700/30">
                <td className="px-4 py-3 font-medium">BST</td>
                <td className="px-4 py-3">Classified Search</td>
                <td className="px-4 py-3 font-mono text-xs text-rose-400">O(log n) search</td>
                <td className="px-4 py-3 font-mono text-xs">O(n)</td>
                <td className="px-4 py-3">/search</td>
              </tr>
              <tr className="hover:bg-slate-700/30">
                <td className="px-4 py-3 font-medium">Merge/Quick Sort</td>
                <td className="px-4 py-3">Content Ranking</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">O(n log n)</td>
                <td className="px-4 py-3 font-mono text-xs">O(n) or O(log n)</td>
                <td className="px-4 py-3">/search</td>
              </tr>
              <tr className="hover:bg-slate-700/30">
                <td className="px-4 py-3 font-medium">Binary Search</td>
                <td className="px-4 py-3">Threshold Lookup</td>
                <td className="px-4 py-3 font-mono text-xs text-teal-400">O(log n)</td>
                <td className="px-4 py-3 font-mono text-xs">O(1) iterative</td>
                <td className="px-4 py-3">/search</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 bg-slate-800 rounded-xl p-8 border border-slate-700 text-center overflow-x-auto">
        <h2 className="text-2xl font-bold mb-8">How They Work Together (The Pipeline)</h2>
        <div className="flex justify-center items-center gap-2 min-w-[800px] py-4">
          <div className="bg-slate-900 border border-slate-600 p-3 rounded-lg w-32 flex-shrink-0 text-xs">
            <span className="font-bold text-white block mb-1">Incoming Article</span>
            Webhook / API
          </div>
          <ArrowRight className="text-slate-500" />
          <div className="bg-emerald-900/40 border border-emerald-500/50 p-3 rounded-lg w-32 flex-shrink-0 text-xs">
            <span className="font-bold text-emerald-400 block mb-1">Queue</span>
            Buffer traffic
          </div>
          <ArrowRight className="text-slate-500" />
          <div className="bg-violet-900/40 border border-violet-500/50 p-3 rounded-lg w-32 flex-shrink-0 text-xs">
            <span className="font-bold text-violet-400 block mb-1">Hash Table</span>
            Check dupes
          </div>
          <ArrowRight className="text-slate-500" />
          <div className="flex flex-col gap-2 flex-shrink-0">
            <div className="bg-rose-900/40 border border-rose-500/50 p-3 rounded-lg w-32 text-xs">
              <span className="font-bold text-rose-400 block mb-1">BST</span>
              Index by category
            </div>
            <div className="bg-blue-900/40 border border-blue-500/50 p-3 rounded-lg w-32 text-xs">
              <span className="font-bold text-blue-400 block mb-1">Priority Q</span>
              Rank by risk/trend
            </div>
            <div className="bg-amber-900/40 border border-amber-500/50 p-3 rounded-lg w-32 text-xs">
              <span className="font-bold text-amber-400 block mb-1">Graph</span>
              Map relationships
            </div>
          </div>
          <ArrowRight className="text-slate-500" />
          <div className="bg-slate-700 border border-slate-500 p-3 rounded-lg w-32 flex-shrink-0 text-xs">
            <span className="font-bold text-white block mb-1">Dashboard</span>
            User viewing
          </div>
        </div>
      </div>
    </div>
  )
}
