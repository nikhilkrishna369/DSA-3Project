import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  TrendingUp, 
  ChevronRight,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Flame
} from 'lucide-react';
import { newsArticles } from '../data/newsData';
import NewsCard from '../components/ui/NewsCard';
import FilterBar from '../components/ui/FilterBar';
import PriorityBadge from '../components/ui/PriorityBadge';

export default function TrendingPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Politics', 'Sports', 'Business', 'Science', 'Entertainment'];
  const tabs = ['All', 'High Priority', 'Medium Priority', 'Low Priority'];

  // Sorting purely by trendScore to mimic Max/Min Heap behavior
  const rankedArticles = useMemo(() => {
    let result = [...newsArticles];
    if (selectedCategory !== 'All') {
      result = result.filter(a => a.category === selectedCategory);
    }
    if (activeTab !== 'All') {
      const priorityStr = activeTab.split(' ')[0]; // 'High', 'Medium', 'Low' — already capitalized
      result = result.filter(a => a.priority === priorityStr);
    }
    return result.sort((a, b) => b.trendScore - a.trendScore);
  }, [activeTab, selectedCategory]);

  const getRankColor = (index) => {
    if (index === 0) return 'text-yellow-400';
    if (index === 1) return 'text-slate-300';
    if (index === 2) return 'text-amber-600';
    return 'text-slate-600';
  };

  const getTrendIcon = (score) => {
    if (score >= 90) return <Flame className="w-4 h-4 text-orange-500" />;
    if (score >= 75) return <ArrowUp className="w-4 h-4 text-emerald-500" />;
    if (score >= 50) return <ArrowRight className="w-4 h-4 text-blue-500" />;
    return <ArrowDown className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-1">Trending Stories</h1>
          <p className="text-slate-400">Content ranked by the Priority Queue algorithm</p>
        </div>
        
        <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-5 flex items-start gap-4">
          <div className="bg-violet-500/20 p-2 rounded-lg">
            <Cpu className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h3 className="text-violet-300 font-semibold mb-1">How Priority Queue Works</h3>
            <p className="text-violet-200/70 text-sm leading-relaxed max-w-4xl">
              Each article is assigned a priority based on trendScore, engagement, and recency. A Min-Heap (or Max-Heap depending on implementation) maintains the ranked order, ensuring O(log n) insertion and O(1) access to the highest-priority item.
            </p>
          </div>
        </div>
      </div>

      {/* Priority Tabs & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="text-sm text-slate-500 font-medium">Category:</span>
          <FilterBar options={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>
      </div>

      {/* Trending Grid & Visualization (Only on 'All' tab for full view) */}
      {activeTab === 'All' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Side: Heap Visualization (1/3 width) */}
          <div className="xl:col-span-1 space-y-4">
            <h2 className="text-lg font-semibold text-slate-100">Priority Heap Visualization</h2>
            <p className="text-sm text-slate-400 mb-6">Each node's trend score is ≥ its children</p>
            
            {/* Visual Tree */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 flex flex-col items-center">
              {/* Level 0 */}
              <div className="flex justify-center w-full mb-8 relative">
                {rankedArticles[0] && (
                  <div className="bg-slate-800 border-2 border-violet-500/50 rounded-lg p-3 w-40 text-center z-10 shadow-lg shadow-violet-500/10">
                    <div className="text-violet-400 font-bold text-xl mb-1">{rankedArticles[0].trendScore}</div>
                    <div className="text-xs text-slate-300 truncate">{rankedArticles[0].title}</div>
                  </div>
                )}
                {/* Connecting lines for lvl 1 */}
                <div className="absolute top-1/2 left-[25%] right-[25%] h-12 border-t-2 border-l-2 border-r-2 border-slate-700 rounded-t-xl z-0"></div>
              </div>

              {/* Level 1 */}
              <div className="flex justify-between w-full mb-8 px-4 relative">
                {rankedArticles.slice(1, 3).map((article, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-600 rounded-lg p-2 w-32 text-center z-10 relative">
                    <div className="text-blue-400 font-bold text-lg">{article.trendScore}</div>
                    <div className="text-[10px] text-slate-400 truncate">{article.title}</div>
                    
                    {/* Connecting lines for lvl 2 */}
                    <div className="absolute top-full left-1/2 w-16 -ml-8 h-8 border-t-0 border-l-2 border-r-2 border-slate-700"></div>
                  </div>
                ))}
              </div>

              {/* Level 2 */}
              <div className="flex justify-between w-full">
                {rankedArticles.slice(3, 7).map((article, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-700 rounded p-1.5 w-16 text-center z-10">
                    <div className="text-slate-300 font-bold text-sm">{article.trendScore}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Ranked Grid (2/3 width) */}
          <div className="xl:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-slate-100 mb-2">Top Ranked Content</h2>
            <div className="space-y-4">
              {rankedArticles.slice(0, 5).map((article, index) => (
                <div key={article.id} className="flex bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-colors">
                  <div className="w-16 flex flex-col items-center justify-center bg-slate-900/50 border-r border-slate-700/50 shrink-0">
                    <span className={`text-3xl font-black ${getRankColor(index)}`}>
                      {index + 1}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{article.category}</span>
                        <span className="text-xs text-slate-400">{article.source}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-100 mb-2 line-clamp-2">{article.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <PriorityBadge priority={article.priority} />
                        <span className="text-slate-400 flex items-center gap-1">
                          {article.relatedIds?.length || 0} related articles
                        </span>
                      </div>
                    </div>
                    <div className="sm:w-32 flex flex-col items-end justify-center shrink-0 border-t sm:border-t-0 sm:border-l border-slate-700/50 pt-3 sm:pt-0 sm:pl-4">
                      <div className="text-xs text-slate-400 mb-1">Trend Score</div>
                      <div className="flex items-center gap-1.5 text-2xl font-bold text-slate-100">
                        {article.trendScore} {getTrendIcon(article.trendScore)}
                      </div>
                      <button className="mt-3 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                        View Details <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Breakdown Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-slate-100">Trend Score Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3 font-medium">Rank</th>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium text-right">Trend Score</th>
                <th className="px-5 py-3 font-medium text-center">Priority</th>
                <th className="px-5 py-3 font-medium text-right">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {rankedArticles.map((article, idx) => (
                <tr key={article.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-5 py-3 font-medium text-slate-400">{idx + 1}</td>
                  <td className="px-5 py-3 font-medium text-slate-200 max-w-xs truncate">{article.title}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">{article.category}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-bold">
                      {article.trendScore} {getTrendIcon(article.trendScore)}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex justify-center"><PriorityBadge priority={article.priority} /></div>
                  </td>
                  <td className="px-5 py-3 text-right text-slate-400">
                    {((article.engagement?.likes || 0) + (article.engagement?.shares || 0)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
