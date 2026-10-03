import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  MessageSquare, 
  Copy, 
  TrendingUp, 
  AlertTriangle, 
  Activity, 
  Shield, 
  Network, 
  Layers, 
  BarChart3, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { newsArticles, categories, sources } from '../data/newsData';
import { socialPosts } from '../data/socialData';
import { newsByCategory, newsVolumeOverTime, priorityDistribution, trendingTopics } from '../data/analyticsData';
import StatCard from '../components/ui/StatCard';
import NewsCard from '../components/ui/NewsCard';
import LoadingState from '../components/ui/LoadingState';
import CategoryChart from '../components/charts/CategoryChart';
import TimelineChart from '../components/charts/TimelineChart';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingState message="Loading dashboard data..." />;
  }

  // Derived data
  const trendingArticles = [...newsArticles]
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 5);

  const recentActivity = [
    { id: 1, text: 'Article flagged as duplicate', time: '2 minutes ago', icon: Copy, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 2, text: 'New trending story: GPT-5 released', time: '5 minutes ago', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 3, text: 'High priority post sent to moderation', time: '12 minutes ago', icon: Shield, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 4, text: 'Duplicate cluster detected: 3 similar articles', time: '28 minutes ago', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 5, text: 'New social post analyzed', time: '45 minutes ago', icon: MessageSquare, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { id: 6, text: 'Story relationships updated', time: '1 hour ago', icon: Network, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 7, text: 'Queue processed 47 new articles', time: '2 hours ago', icon: Layers, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 8, text: 'Analytics report generated', time: '3 hours ago', icon: BarChart3, color: 'text-slate-400', bg: 'bg-slate-400/10' },
  ];

  const topSources = [
    { name: 'TechCrunch', count: 124, percent: 80 },
    { name: 'The Verge', count: 98, percent: 65 },
    { name: 'Wired', count: 76, percent: 50 },
    { name: 'Reuters', count: 65, percent: 45 },
    { name: 'Bloomberg', count: 54, percent: 35 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Dashboard Overview</h1>
          <p className="text-slate-400">System status and real-time analytics</p>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Articles" value="847" change="+12%" changeType="up" icon={Newspaper} color="blue" description="Indexed and analyzed" />
        <StatCard title="Social Posts" value="2,341" change="+28%" changeType="up" icon={MessageSquare} color="violet" description="Across all platforms" />
        <StatCard title="Duplicates Detected" value="23" change="-5%" changeType="up" icon={Copy} color="emerald" description="Content fingerprinted" />
        <StatCard title="Trending Stories" value="14" change="+5 today" changeType="neutral" icon={TrendingUp} color="amber" description="High priority content" />
        <StatCard title="High Priority" value="7" change="Needs review" changeType="down" icon={AlertTriangle} color="red" description="Flagged for moderation" />
        <StatCard title="Avg Trend Score" value="67.4" change="+3.2" changeType="up" icon={Activity} color="blue" description="Across all articles" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trending Right Now */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-slate-100">Trending Right Now</h2>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Updated 2 mins ago
                </span>
              </div>
              <a href="/trending" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                View All <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="inline-block bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs px-2 py-1 rounded mb-4">
              DSA: Priority Queue orders these by trend score
            </div>
            <div className="space-y-4">
              {trendingArticles.map((article) => (
                <NewsCard key={article.id} article={article} compact={true} />
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${activity.bg} ${activity.color} flex-shrink-0 mt-0.5`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-200">{activity.text}</p>
                      <p className="text-xs text-slate-400">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column (1/3 width) */}
        <div className="space-y-6">
          {/* News by Category */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">News by Category</h2>
            <div className="h-64">
              <CategoryChart data={newsByCategory} />
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-slate-100 mb-2">Priority Distribution</h2>
            <div className="inline-block bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs px-2 py-1 rounded mb-4">
              DSA: Heap ensures High priority items are always served first
            </div>
            <div className="space-y-4 mt-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">High (7 articles)</span>
                  <span className="text-red-400">35%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Medium (9 articles)</span>
                  <span className="text-amber-400">45%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Low (4 articles)</span>
                  <span className="text-slate-400">20%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-slate-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Sources */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">Top Sources</h2>
            <div className="space-y-4">
              {topSources.map((source, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="w-1/3 text-sm text-slate-300 truncate pr-2">{source.name}</div>
                  <div className="w-1/2">
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${source.percent}%` }}></div>
                    </div>
                  </div>
                  <div className="w-1/6 text-right text-xs text-slate-400">{source.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Volume Over Time */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">Content Volume Over Time (Last 7 Days)</h2>
        <div className="h-72">
          <TimelineChart data={newsVolumeOverTime} />
        </div>
      </div>
    </div>
  );
}
