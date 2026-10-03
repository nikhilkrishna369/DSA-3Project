import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Share2, MessageSquare, ThumbsUp, Network, Hash, Cpu, ArrowRight } from 'lucide-react'
import { newsArticles } from '../data/newsData'
import { socialPosts } from '../data/socialData'
import EmptyState from '../components/ui/EmptyState'
import PriorityBadge from '../components/ui/PriorityBadge'
import TrendScoreBar from '../components/ui/TrendScoreBar'
import SocialPostCard from '../components/ui/SocialPostCard'

export default function ArticleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const articleId = parseInt(id)
  const article = newsArticles.find(a => a.id === articleId)
  
  if (!article) {
    return (
      <div className="p-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <EmptyState 
          icon={<Hash/>}
          title="Article not found"
          message={`No article exists with ID ${id}. It may have been removed or merged.`}
        />
      </div>
    )
  }

  const relatedSocial = socialPosts.filter(post => post.relatedNewsIds?.includes(articleId)) || []
  const relatedArticles = article.relatedIds?.map(rid => newsArticles.find(a => a.id === rid)).filter(Boolean) || []
  const duplicateGroup = newsArticles.filter(a => a.isDuplicate && a.duplicateOf === articleId || a.id === article.duplicateOf || (a.isDuplicate && article.isDuplicate && a.duplicateOf === article.duplicateOf))

  return (
    <div className="p-6 text-slate-100 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link to="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-slate-300">News</span>
        <span>/</span>
        <span className="text-slate-300 truncate max-w-xs">{article.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <div className="flex gap-2 mb-4">
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-bold uppercase">{article.category}</span>
            {article.priority && <PriorityBadge level={article.priority} />}
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">{article.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 py-2 border-b border-slate-700">
            <span className="font-medium text-slate-300">{article.source}</span>
            <span className="flex items-center gap-1"><Clock size={14}/> {article.publishedAt || '2 hours ago'}</span>
            <span>By NewsIQ Staff</span>
            <span>4 min read</span>
          </div>
          
          <div className="flex items-center gap-6 py-2">
            <div className="flex items-center gap-2 text-slate-300"><ThumbsUp size={18}/> {article.engagement?.likes || 1240}</div>
            <div className="flex items-center gap-2 text-slate-300"><Share2 size={18}/> {article.engagement?.shares || 342}</div>
            <div className="flex items-center gap-2 text-slate-300"><MessageSquare size={18}/> {article.engagement?.comments || 89}</div>
            <div className="ml-auto w-32">
              <TrendScoreBar score={article.trendScore} />
            </div>
          </div>

          {article.isDuplicate && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-lg flex items-start gap-3">
              <Hash className="shrink-0 mt-0.5" />
              <div>
                <strong className="block mb-1">Duplicate Content Flagged</strong>
                <span className="text-sm">This article has been identified as a duplicate of an existing story. 
                {article.duplicateOf && <Link to={`/article/${article.duplicateOf}`} className="underline ml-1 font-bold">View Original</Link>}
                </span>
              </div>
            </div>
          )}
          
          <blockquote className="bg-blue-500/5 border-l-4 border-blue-500 p-4 rounded-r-lg text-lg text-slate-300 italic font-medium my-6">
            {article.summary}
          </blockquote>
          
          <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
            <p>{article.content || 'Detailed content for this article has not been loaded. In a full production environment, the complete body text would appear here, properly formatted with paragraphs, inline images, and blockquotes.'}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-700">
            {article.tags?.map(tag => (
              <span key={tag} className="text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">
                #{tag}
              </span>
            ))}
          </div>

          <div className="pt-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Share2 className="text-violet-500"/> Social Media Activity</h3>
            {relatedSocial.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedSocial.map(post => (
                  <SocialPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center text-slate-500">
                No major social media activity linked to this specific article yet.
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <h3 className="font-bold mb-4">Trend Analysis</h3>
            <div className="flex items-end justify-between mb-2">
              <span className="text-4xl font-bold text-white">{article.trendScore}</span>
              <span className="text-emerald-400 text-sm font-bold flex items-center gap-1">+12% <ArrowRight size={12} className="-rotate-45"/></span>
            </div>
            <div className="w-full h-8 flex items-end gap-1 mb-3">
              {[30, 45, 40, 60, 55, 75, article.trendScore].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-500/50 rounded-t-sm" style={{height: `${h}%`}}></div>
              ))}
            </div>
            <p className="text-xs text-slate-400">Score has increased rapidly in the last 24 hours across all tracking platforms.</p>
          </div>

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
            <h3 className="font-bold mb-3 flex items-center gap-2"><Network size={16} className="text-amber-500"/> Related Stories</h3>
            <p className="text-xs text-amber-500/80 mb-4 bg-amber-500/10 px-2 py-1 rounded">DSA: Graph BFS traversal found these related stories</p>
            
            <div className="space-y-3">
              {relatedArticles.length > 0 ? relatedArticles.map(rel => (
                <Link to={`/article/${rel.id}`} key={rel.id} className="block group">
                  <div className="text-sm font-medium text-slate-300 group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">{rel.title}</div>
                  <div className="text-xs text-slate-500 flex justify-between">
                    <span>{rel.source}</span>
                    <span>Score: {rel.trendScore}</span>
                  </div>
                </Link>
              )) : (
                <div className="text-sm text-slate-500">No related stories found in the graph.</div>
              )}
            </div>
          </div>

          {duplicateGroup.length > 0 && (
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
              <h3 className="font-bold mb-3 flex items-center gap-2"><Cpu size={16} className="text-violet-500"/> Similar Articles</h3>
              <p className="text-xs text-violet-500/80 mb-4 bg-violet-500/10 px-2 py-1 rounded">Detected by Hash Table fingerprinting</p>
              
              <div className="space-y-3">
                {duplicateGroup.map(dup => {
                  if (dup.id === articleId) return null;
                  return (
                    <Link to={`/article/${dup.id}`} key={dup.id} className="block group border-b border-slate-700 pb-2 last:border-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="text-sm text-slate-300 group-hover:text-blue-400 line-clamp-2">{dup.title}</div>
                        <span className="text-xs font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded shrink-0">{dup.similarityScore || 85}% match</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 text-sm">
            <h3 className="font-bold mb-3">Article Metadata</h3>
            <div className="space-y-2 text-slate-400">
              <div className="flex justify-between"><span>Article ID</span><span className="text-white">{article.id}</span></div>
              <div className="flex justify-between"><span>Hash Fingerprint</span><span className="font-mono text-xs text-blue-400">{article.hash?.substring(0,8) || 'a8f9c2e4'}</span></div>
              <div className="flex justify-between"><span>Status</span><span className="text-emerald-400">Indexed</span></div>
              <div className="flex justify-between"><span>Queue Processing</span><span>0.3ms</span></div>
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <button 
              onClick={() => navigate(`/article/${articleId - 1}`)} 
              className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 py-2 rounded-lg text-sm text-center transition-colors"
            >
              Previous
            </button>
            <button 
              onClick={() => navigate(`/article/${articleId + 1}`)} 
              className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 py-2 rounded-lg text-sm text-center transition-colors"
            >
              Next
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}
