import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  Filter, 
  Info, 
  X,
  Calendar,
  Tag,
  Link as LinkIcon
} from 'lucide-react';
import { newsArticles, categories, sources } from '../data/newsData';
import NewsCard from '../components/ui/NewsCard';
import FilterBar from '../components/ui/FilterBar';
import SearchBar from '../components/ui/SearchBar';
import EmptyState from '../components/ui/EmptyState';
import Pagination from '../components/ui/Pagination';
import PriorityBadge from '../components/ui/PriorityBadge';
import TrendScoreBar from '../components/ui/TrendScoreBar';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDsaBannerOpen, setIsDsaBannerOpen] = useState(true);

  const articlesPerPage = 6;
  const topSources = sources.slice(0, 7);
  const categoryFilters = ['All', 'Technology', 'Politics', 'Sports', 'Business', 'Science', 'Entertainment'];
  const sortOptions = ['Relevance', 'Popularity', 'Date', 'Trend Score'];

  // Filtering and Sorting logic (simulating BST + Merge Sort functionality conceptually)
  const filteredAndSortedArticles = useMemo(() => {
    let result = [...newsArticles];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(a => a.category === selectedCategory);
    }

    // Filter by Source
    if (selectedSource !== 'All') {
      result = result.filter(a => a.source === selectedSource);
    }

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.summary.toLowerCase().includes(query) ||
        (a.tags && a.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'Relevance':
        case 'Trend Score':
          return b.trendScore - a.trendScore;
        case 'Popularity':
          const popA = (a.engagement?.likes || 0) + (a.engagement?.shares || 0);
          const popB = (b.engagement?.likes || 0) + (b.engagement?.shares || 0);
          return popB - popA;
        case 'Date':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [selectedCategory, selectedSource, searchQuery, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedArticles.length / articlesPerPage);
  const currentArticles = filteredAndSortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const openDrawer = (article) => {
    setSelectedArticle(article);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedArticle(null), 300);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-slate-100">News Feed</h1>
            <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs px-2.5 py-1 rounded-full font-medium">
              BST + Merge Sort powers search & ranking
            </span>
          </div>
          <p className="text-slate-400">Browse, search, and analyze all indexed news articles</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg p-1">
          <span className="text-sm text-slate-400 pl-3">Sort by:</span>
          <select 
            className="bg-transparent text-slate-200 text-sm focus:outline-none focus:ring-0 p-2 rounded cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions.map(opt => (
              <option key={opt} value={opt} className="bg-slate-800">{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Controls Row */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar 
              placeholder="Search articles, keywords, or topics..." 
              value={searchQuery}
              onChange={(v) => { setSearchQuery(v); setCurrentPage(1); }}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider whitespace-nowrap">Category:</span>
            <FilterBar options={categoryFilters} selected={selectedCategory} onSelect={(c) => { setSelectedCategory(c); setCurrentPage(1); }} />
          </div>
          <div className="w-px h-6 bg-slate-700 hidden lg:block"></div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar flex-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider whitespace-nowrap">Source:</span>
            <FilterBar options={topSources} selected={selectedSource} onSelect={(s) => { setSelectedSource(s); setCurrentPage(1); }} />
          </div>
        </div>
      </div>

      <div className="text-sm text-slate-400">
        Showing {filteredAndSortedArticles.length} of {newsArticles.length} articles
      </div>

      {/* DSA Info Banner */}
      {isDsaBannerOpen && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3 relative">
          <Info className="text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="pr-6">
            <h3 className="text-amber-500 font-medium text-sm mb-1">How Search Works</h3>
            <p className="text-amber-200/80 text-sm leading-relaxed">
              Your query goes through Binary Search Tree lookup → Fuzzy matching (Levenshtein distance) → Merge Sort by relevance score. Time complexity: O(n log n)
            </p>
          </div>
          <button onClick={() => setIsDsaBannerOpen(false)} className="absolute top-4 right-4 text-amber-500/60 hover:text-amber-500">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Article Grid */}
      {currentArticles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {currentArticles.map((article) => (
              <div key={article.id} onClick={() => openDrawer(article)} className="cursor-pointer transition-transform hover:-translate-y-1">
                <NewsCard article={article} />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </div>
        </>
      ) : (
        <EmptyState 
          icon={Filter} 
          title="No articles found" 
          message="No articles found matching your search. Try adjusting your filters." 
          action={{ label: 'Clear Filters', onClick: () => { setSearchQuery(''); setSelectedCategory('All'); setSelectedSource('All'); } }}
        />
      )}

      {/* Article Detail Drawer */}
      {isDrawerOpen && selectedArticle && (
        <>
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 transition-opacity" onClick={closeDrawer}></div>
          <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900 border-l border-slate-700 z-50 shadow-2xl flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-slate-800 flex items-start justify-between bg-slate-900/95 sticky top-0 z-10 backdrop-blur">
              <h2 className="text-lg font-bold text-slate-100 pr-4 leading-tight">Article Details</h2>
              <button onClick={closeDrawer} className="p-1 rounded-full text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded">{selectedArticle.category}</span>
                  <PriorityBadge priority={selectedArticle.priority} />
                  {selectedArticle.isDuplicate && (
                    <span className="text-xs font-medium text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                      DUPLICATE
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-3">{selectedArticle.title}</h3>
                
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                  <div className="flex items-center gap-1.5">
                    <LinkIcon className="w-4 h-4" /> {selectedArticle.source}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {new Date(selectedArticle.publishedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="prose prose-invert prose-sm">
                  <p className="text-slate-300 leading-relaxed">{selectedArticle.summary}</p>
                </div>
              </div>

              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2 mb-3 text-slate-300 font-medium">
                    <Tag className="w-4 h-4" /> Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map(tag => (
                      <span key={tag} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-sm font-medium text-slate-300 mb-3">Trend Metrics</h4>
                <div className="bg-slate-800 p-4 rounded-lg space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Trend Score</span>
                      <span className="text-slate-200 font-medium">{selectedArticle.trendScore}/100</span>
                    </div>
                    <TrendScoreBar score={selectedArticle.trendScore} />
                  </div>
                  {selectedArticle.engagement && (
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <span className="block text-xs text-slate-400 mb-1">Likes</span>
                        <span className="text-sm font-medium text-slate-200">{selectedArticle.engagement.likes.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-slate-400 mb-1">Shares</span>
                        <span className="text-sm font-medium text-slate-200">{selectedArticle.engagement.shares.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedArticle.relatedIds && selectedArticle.relatedIds.length > 0 && (
                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-sm font-medium text-slate-300 mb-3">Related Stories</h4>
                  <div className="space-y-3">
                    {newsArticles
                      .filter(a => selectedArticle.relatedIds.includes(a.id))
                      .map(related => (
                        <div key={related.id} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 hover:border-slate-600 cursor-pointer">
                          <h5 className="text-sm font-medium text-slate-200 line-clamp-2">{related.title}</h5>
                          <div className="text-xs text-slate-400 mt-1 flex justify-between">
                            <span>{related.source}</span>
                            <span>Score: {related.trendScore}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
