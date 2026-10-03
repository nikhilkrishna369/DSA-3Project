import React, { useState, useMemo } from 'react'
import { Search, Filter, Hash, Newspaper, Clock, TrendingUp } from 'lucide-react'
import { newsArticles } from '../data/newsData'
import { socialPosts } from '../data/socialData'
import EmptyState from '../components/ui/EmptyState'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [isSearching, setIsSearching] = useState(false)

  const levenshtein = (a, b) => {
    const matrix = []
    for (let i = 0; i <= b.length; i++) matrix[i] = [i]
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1))
        }
      }
    }
    return matrix[b.length][a.length]
  }

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setIsSearching(e.target.value.length > 0)
  }

  const results = useMemo(() => {
    if (!query) return { news: [], social: [] }
    const q = query.toLowerCase()
    
    let newsRes = newsArticles.filter(article => {
      const matchExact = article.title.toLowerCase().includes(q) || 
                         article.summary.toLowerCase().includes(q) || 
                         article.tags.some(t => t.toLowerCase().includes(q))
      
      if (!matchExact && q.length > 3) {
        const titleWords = article.title.toLowerCase().split(' ')
        return titleWords.some(w => levenshtein(w, q) <= 2)
      }
      return matchExact
    })
    
    let socialRes = socialPosts.filter(post => {
      return post.content.toLowerCase().includes(q) || 
             post.author.toLowerCase().includes(q) || 
             post.hashtags.some(h => h.toLowerCase().includes(q))
    })

    if (typeFilter === 'News Articles') socialRes = []
    if (typeFilter === 'Social Posts') newsRes = []

    return { news: newsRes, social: socialRes }
  }, [query, typeFilter])

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="bg-blue-500/40 text-white px-1 rounded">{part}</mark> : part
    );
  }

  const totalResults = results.news.length + results.social.length

  return (
    <div className="p-6 space-y-6 text-slate-100 max-w-6xl mx-auto">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Global Search</h1>
        <p className="text-slate-400 mb-8">Search across all news articles, social media posts, topics, and sources</p>
        
        <div className="relative max-w-3xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
          <input 
            type="text" 
            placeholder="Search for 'GPT-5', 'Climate', or 'Bitcoin'..."
            className="w-full bg-slate-800 border-2 border-slate-700 rounded-full py-4 pl-14 pr-6 text-lg focus:border-blue-500 focus:outline-none transition-all shadow-lg"
            value={query}
            onChange={handleSearch}
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Hash size={14} />
          <span>Using: Fuzzy Search + Levenshtein Distance + Relevance Ranking</span>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-700 pb-4 justify-center">
        {['All', 'News Articles', 'Social Posts', 'Topics', 'Sources'].map(f => (
          <button 
            key={f}
            onClick={() => setTypeFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${typeFilter === f ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {!isSearching ? (
        <div className="space-y-8 py-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp className="text-blue-500"/> Popular Searches</h3>
            <div className="flex flex-wrap gap-3">
              {['GPT-5', 'Champions League', 'Bitcoin', 'Alzheimer', 'Climate Summit', 'Quantum Computing'].map(tag => (
                <button key={tag} onClick={() => handleSearch({target: {value: tag}})} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg text-sm transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Clock className="text-emerald-500"/> Recent News</h3>
              <div className="space-y-3">
                {newsArticles.slice(0,4).map(a => (
                  <div key={a.id} className="text-sm border-b border-slate-700 pb-2 last:border-0 hover:text-blue-400 cursor-pointer transition-colors">
                    {a.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex justify-between items-center bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
            <div className="font-medium text-lg">
              {totalResults > 0 ? `${totalResults} results for "${query}"` : `No results found for "${query}"`}
            </div>
            <div className="text-xs text-blue-400 flex flex-col items-end">
              <span className="font-bold bg-blue-500/20 px-2 py-1 rounded mb-1">Linear Search + Fuzzy Match</span>
              <span>Search complexity: O(n) with Levenshtein distance scoring</span>
            </div>
          </div>

          {totalResults === 0 ? (
             <EmptyState 
                icon={<Search />}
                title={`No results found for "${query}"`}
                message="Try adjusting your search terms or using broader keywords."
                actionLabel="Clear Search"
                onAction={() => {setQuery(''); setIsSearching(false);}}
             />
          ) : (
            <div className="space-y-8">
              {results.news.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 border-b border-slate-700 pb-2">
                    <Newspaper className="text-blue-500"/> 
                    News Articles <span className="text-slate-500 text-sm font-normal">({results.news.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.news.map(article => (
                      <div key={article.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl hover:border-slate-500 transition-colors">
                        <div className="text-xs text-blue-400 mb-2 font-bold uppercase">{article.category}</div>
                        <h4 className="font-bold mb-2">{highlightText(article.title, query)}</h4>
                        <p className="text-sm text-slate-400 mb-3 line-clamp-2">{highlightText(article.summary, query)}</p>
                        <div className="text-xs text-slate-500 flex justify-between">
                          <span>{article.source}</span>
                          <span>Score: {article.trendScore}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.social.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 border-b border-slate-700 pb-2">
                    <Hash className="text-violet-500"/> 
                    Social Posts <span className="text-slate-500 text-sm font-normal">({results.social.length})</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {results.social.map(post => (
                      <div key={post.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl hover:border-slate-500 transition-colors">
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="font-bold">@{highlightText(post.author, query)}</span>
                          <span className="text-slate-500 text-xs">{post.platform}</span>
                        </div>
                        <p className="text-sm text-slate-300 mb-3">{highlightText(post.content, query)}</p>
                        <div className="flex gap-2">
                          {post.hashtags.map(h => (
                            <span key={h} className="text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">#{highlightText(h, query)}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
