import React from 'react';
import { Heart, Repeat2, MessageCircle, CheckCircle, ShieldAlert, Check } from 'lucide-react';
import PriorityBadge from './PriorityBadge';

export default function SocialPostCard({ post, onClick, showModerationActions }) {
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
  };

  const getPlatformIcon = (platform) => {
    switch(platform?.toLowerCase()) {
      case 'twitter':
      case 'x':
        return <span className="font-bold text-blue-400 text-lg leading-none">X</span>;
      case 'linkedin':
        return <span className="font-bold text-blue-600 bg-white px-0.5 rounded-sm text-xs leading-none border border-blue-600">in</span>;
      case 'reddit':
        return <span className="font-bold text-orange-500 bg-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] leading-none border border-orange-500">r/</span>;
      default:
        return <span className="w-4 h-4 rounded-full bg-slate-600"></span>;
    }
  };

  const getSentimentBadge = (sentiment) => {
    switch(sentiment?.toLowerCase()) {
      case 'positive':
        return <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">😊 Positive</span>;
      case 'negative':
        return <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">😤 Negative</span>;
      default:
        return <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 border border-slate-600">😐 Neutral</span>;
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'flagged': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'pending': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'approved': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden shrink-0">
            {post.author ? (
              <span className="font-bold text-slate-300">{post.author.charAt(0)}</span>
            ) : (
              <span className="w-full h-full bg-slate-600"></span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-100 font-medium text-sm">{post.author}</span>
              {post.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-400" />}
              <span className="text-slate-500 text-xs">{post.handle}</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1">
                {getPlatformIcon(post.platform)}
              </div>
              <span className="text-slate-600 text-xs">•</span>
              <span className="text-slate-500 text-xs">{(() => {
                const date = new Date(post.createdAt);
                const now = new Date();
                const diffMs = now - date;
                const diffMins = Math.floor(diffMs / 60000);
                const diffHours = Math.floor(diffMs / 3600000);
                const diffDays = Math.floor(diffMs / 86400000);
                if (diffMins < 60) return `${diffMins}m ago`;
                if (diffHours < 24) return `${diffHours}h ago`;
                if (diffDays < 7) return `${diffDays}d ago`;
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              })()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.status && (
            <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getStatusColor(post.status)}`}>
              {post.status.toUpperCase()}
            </span>
          )}
          <PriorityBadge priority={post.priority} />
        </div>
      </div>

      <p className="text-slate-200 text-sm mb-3 whitespace-pre-wrap">
        {post.content}
      </p>

      {post.hashtags && post.hashtags.length > 0 && (
        <div className="flex gap-1.5 mb-3 flex-wrap">
          {post.hashtags.map((tag, idx) => (
            <a key={idx} href={`/search?q=${tag}`} className="text-blue-400 text-xs hover:underline">
              #{tag}
            </a>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700/50">
        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 hover:text-rose-400 transition-colors cursor-pointer">
            <Heart className="w-4 h-4" />
            <span className="text-xs">{formatNumber(post.engagement?.likes)}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer">
            <Repeat2 className="w-4 h-4" />
            <span className="text-xs">{formatNumber(post.engagement?.shares)}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">{formatNumber(post.engagement?.comments)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {getSentimentBadge(post.sentiment)}
          <div className="px-1.5 py-0.5 bg-slate-700 rounded text-xs font-semibold text-slate-300" title="Trend Score">
            {post.trendScore}
          </div>
        </div>
      </div>

      {showModerationActions && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700/50">
          <button className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            Approve
          </button>
          <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            Flag
          </button>
        </div>
      )}
    </div>
  );
}
