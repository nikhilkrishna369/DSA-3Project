import React from 'react';
import { Heart, Share2, MessageCircle } from 'lucide-react';
import PriorityBadge from './PriorityBadge';

export default function NewsCard({ article, onClick, compact, showDuplicateBadge }) {
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technology: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      Politics: 'text-slate-300 bg-slate-700/50 border-slate-600',
      Sports: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      Business: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      Science: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
      Entertainment: 'text-rose-400 bg-rose-400/10 border-rose-400/20'
    };
    return colors[category] || 'text-slate-400 bg-slate-800 border-slate-700';
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(article);
    } else {
      window.location.href = `/article/${article.id}`;
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500/50 cursor-pointer transition-all hover:bg-slate-800/80 ${compact ? 'p-3' : 'p-4'}`}
    >
      <div className="flex justify-between items-start mb-2 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
          <span className="text-slate-400 text-xs font-medium">{article.source}</span>
          <span className="text-slate-600 text-xs">•</span>
          <span className="text-slate-500 text-xs">{article.publishedAt}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {article.isDuplicate && showDuplicateBadge && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/20 tracking-wider">
              DUPLICATE
            </span>
          )}
          <PriorityBadge priority={article.priority} />
        </div>
      </div>

      <h3 className="text-slate-100 font-semibold text-base leading-snug mb-2 line-clamp-2">
        {article.title}
      </h3>

      {!compact && article.summary && (
        <p className="text-slate-400 text-sm line-clamp-2 mb-3">
          {article.summary}
        </p>
      )}

      {article.tags && article.tags.length > 0 && (
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {article.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
              #{tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">
              +{article.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-700/50">
        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
            <Heart className="w-3.5 h-3.5" />
            <span className="text-xs">{formatNumber(article.engagement?.likes)}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-violet-400 transition-colors">
            <Share2 className="w-3.5 h-3.5" />
            <span className="text-xs">{formatNumber(article.engagement?.shares)}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="text-xs">{formatNumber(article.engagement?.comments)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2" title={`Trend Score: ${article.trendScore}`}>
          <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${Math.min(100, Math.max(0, article.trendScore || 0))}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-blue-400">{article.trendScore}</span>
        </div>
      </div>
    </div>
  );
}
