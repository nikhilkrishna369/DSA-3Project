import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  AlertTriangle, 
  Activity, 
  X,
  Hash,
  Filter
} from 'lucide-react';
import { socialPosts } from '../data/socialData';
import { newsArticles } from '../data/newsData';
import SocialPostCard from '../components/ui/SocialPostCard';
import FilterBar from '../components/ui/FilterBar';
import SearchBar from '../components/ui/SearchBar';
import EngagementChart from '../components/charts/EngagementChart';
import EmptyState from '../components/ui/EmptyState';
import TrendScoreBar from '../components/ui/TrendScoreBar';

export default function SocialMediaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Trend Score');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const platforms = ['All', 'Twitter', 'LinkedIn', 'Reddit'];
  const statuses = ['All', 'Active', 'Pending', 'Flagged', 'Approved'];
  const sortOptions = ['Trend Score', 'Engagement', 'Date'];

  const trendingHashtags = [
    { tag: '#GPT5', size: 'text-base', count: 12400 },
    { tag: '#AI', size: 'text-sm', count: 8300 },
    { tag: '#ChampionsLeague', size: 'text-base', count: 11200 },
    { tag: '#Bitcoin', size: 'text-xs', count: 4100 },
    { tag: '#Climate', size: 'text-sm', count: 6200 },
    { tag: '#Alzheimers', size: 'text-xs', count: 2800 },
    { tag: '#QuantumComputing', size: 'text-xs', count: 3100 },
    { tag: '#PremierLeague', size: 'text-sm', count: 7500 },
    { tag: '#FederalReserve', size: 'text-xs', count: 4400 },
    { tag: '#Olympics', size: 'text-sm', count: 5900 },
  ];

  const filteredPosts = useMemo(() => {
    let result = [...socialPosts];
    
    if (selectedPlatform !== 'All') {
      result = result.filter(p => p.platform === selectedPlatform);
    }
    
    if (selectedStatus !== 'All') {
      result = result.filter(p => p.status === selectedStatus.toLowerCase() || p.status === selectedStatus);
    }
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.content.toLowerCase().includes(q) || 
        p.author.toLowerCase().includes(q)
      );
    }
    
    result.sort((a, b) => {
      if (sortBy === 'Trend Score') return b.trendScore - a.trendScore;
      if (sortBy === 'Engagement') return (b.engagement.likes + b.engagement.shares) - (a.engagement.likes + a.engagement.shares);
      if (sortBy === 'Date') return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      return 0;
    });
    
    return result;
  }, [selectedPlatform, selectedStatus, searchQuery, sortBy]);

  const openDrawer = (post) => {
    setSelectedPost(post);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-1">Social Media Analytics</h1>
          <p className="text-slate-400">Monitor, analyze, and moderate social media content</p>
        </div>
        
        {/* Stats Row */}
        <div className="flex gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 min-w-[120px]">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <MessageSquare className="w-3 h-3" /> Total Posts
            </div>
            <div className="text-xl font-bold text-slate-100">2,341</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 min-w-[120px]">
            <div className="flex items-center gap-2 text-red-400 text-xs mb-1">
              <AlertTriangle className="w-3 h-3" /> Flagged
            </div>
            <div className="text-xl font-bold text-red-100">3</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 min-w-[120px]">
            <div className="flex items-center gap-2 text-blue-400 text-xs mb-1">
              <Activity className="w-3 h-3" /> Avg Engagement
            </div>
            <div className="text-xl font-bold text-blue-100">1,240</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar 
              placeholder="Search posts, users, or content..." 
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-1 px-2">
            <span className="text-sm text-slate-400">Sort by:</span>
            <select 
              className="bg-transparent text-slate-200 text-sm focus:outline-none cursor-pointer p-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(o => <option key={o} value={o} className="bg-slate-800">{o}</option>)}
            </select>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Platform:</span>
            <FilterBar options={platforms} selected={selectedPlatform} onSelect={setSelectedPlatform} />
          </div>
          <div className="w-px h-6 bg-slate-700 hidden lg:block"></div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Status:</span>
            <FilterBar options={statuses} selected={selectedStatus} onSelect={setSelectedStatus} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Engagement by Platform</h2>
          <div className="h-48">
            <EngagementChart data={[]} /> {/* Using mock component internally or passing data if available */}
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-slate-100 mb-6">Sentiment Analysis</h2>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-emerald-400 font-medium">Positive</span>
                <span className="text-slate-300">58%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-blue-400 font-medium">Neutral</span>
                <span className="text-slate-300">27%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '27%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-red-400 font-medium">Negative</span>
                <span className="text-slate-300">15%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Hashtags */}
      <div className="relative z-10">
        <h2 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <Hash className="w-4 h-4 text-white" /> Trending Hashtags
        </h2>
        <div className="flex overflow-x-auto gap-3 pb-2" style={{scrollbarWidth:'none', msOverflowStyle:'none'}}>
          {trendingHashtags.map((ht, idx) => (
            <div
              key={idx}
              className="whitespace-nowrap shrink-0 bg-zinc-900 text-white border border-zinc-700 rounded-full px-4 py-1.5 text-sm font-medium cursor-pointer hover:bg-zinc-800 hover:border-white transition-colors"
            >
              {ht.tag}
            </div>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map(post => (
            <div 
              key={post.id} 
              onClick={() => openDrawer(post)}
              className={`cursor-pointer transition-transform hover:-translate-y-1 rounded-xl ${post.status === 'flagged' ? 'ring-1 ring-red-500/30' : ''}`}
            >
              <SocialPostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={Filter} 
          title="No posts found" 
          message="Adjust your filters to see more results."
        />
      )}

      {/* Post Detail Drawer */}
      {isDrawerOpen && selectedPost && (
        <>
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" onClick={closeDrawer}></div>
          <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900 border-l border-slate-700 z-50 p-6 shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold text-slate-100">Post Details</h2>
              <button onClick={closeDrawer} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-400 font-medium">{selectedPost.platform}</span>
                  {selectedPost.status === 'flagged' && (
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/30 font-medium">Flagged</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 border border-slate-700">
                    {selectedPost.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-slate-200 font-medium">{selectedPost.author}</div>
                    <div className="text-slate-400 text-xs">{new Date(selectedPost.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  {selectedPost.content}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-sm font-medium text-slate-300 mb-4">Analytics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1 text-slate-400">
                      <span>Trend Score</span>
                      <span className="text-slate-200">{selectedPost.trendScore}</span>
                    </div>
                    <TrendScoreBar score={selectedPost.trendScore} />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
                      <div className="text-xs text-slate-400 mb-1">Likes</div>
                      <div className="font-medium text-slate-200">{selectedPost.engagement?.likes || 0}</div>
                    </div>
                    <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
                      <div className="text-xs text-slate-400 mb-1">Shares</div>
                      <div className="font-medium text-slate-200">{selectedPost.engagement?.shares || 0}</div>
                    </div>
                    <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
                      <div className="text-xs text-slate-400 mb-1">Comments</div>
                      <div className="font-medium text-slate-200">{selectedPost.engagement?.comments || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
