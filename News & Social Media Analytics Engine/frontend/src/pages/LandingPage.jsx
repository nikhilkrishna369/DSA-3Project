import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Zap, Database, Copy, TrendingUp, Network, BarChart3, 
  Layers, GitBranch, ArrowUpDown, Search, Shield, 
  ChevronDown, Menu, X 
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Section 1: Navbar */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-slate-800/50 h-16 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Zap className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              NewsIQ
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</button>
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('dsa-concepts')} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">DSA Concepts</button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-800">
              Login
            </NavLink>
            <NavLink to="/register" className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20">
              Get Started
            </NavLink>
          </div>

          <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-black border-b border-slate-800 p-4 flex flex-col gap-4 shadow-xl">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">Home</button>
            <button onClick={() => scrollToSection('features')} className="text-left px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-left px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">How It Works</button>
            <button onClick={() => scrollToSection('dsa-concepts')} className="text-left px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg">DSA Concepts</button>
            <div className="h-px bg-slate-800 my-2"></div>
            <NavLink to="/login" className="px-4 py-2 text-center text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-800">Login</NavLink>
            <NavLink to="/register" className="px-4 py-2 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-500">Get Started</NavLink>
          </div>
        )}
      </nav>

      {/* Section 2: Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Floating Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <span>🚀</span> Powered by Advanced DSA
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Turn News & Social Media Data Into <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">Meaningful Insights.</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            NewsIQ uses advanced Data Structures and Algorithms to organize, analyze, rank, and detect relationships in large volumes of media content — in real time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button onClick={() => navigate('/dashboard')} className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
              Explore Dashboard <span className="text-lg">→</span>
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="px-8 py-4 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-300 font-medium transition-colors backdrop-blur-sm">
              See How It Works
            </button>
          </div>

          <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 py-8 mt-12 border-y border-slate-800/50">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-white mb-1">847+</span>
              <span className="text-sm text-slate-400">Articles Indexed</span>
            </div>
            <div className="flex flex-col items-center md:border-l border-slate-800/50">
              <span className="text-4xl font-bold text-white mb-1">8</span>
              <span className="text-sm text-slate-400">DSA Algorithms</span>
            </div>
            <div className="flex flex-col items-center md:border-l border-slate-800/50">
              <span className="text-4xl font-bold text-white mb-1">2,341</span>
              <span className="text-sm text-slate-400">Posts Analyzed</span>
            </div>
            <div className="flex flex-col items-center md:border-l border-slate-800/50">
              <span className="text-4xl font-bold text-white mb-1">99.2%</span>
              <span className="text-sm text-slate-400">Accuracy</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection('how-it-works')}>
          <ChevronDown className="w-8 h-8 text-slate-500" />
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How NewsIQ Works</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">From raw data to structured insights, driven by efficient algorithms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Ingest Content', desc: 'News and social media posts flow into the system through a Queue-based ingestion pipeline.', icon: Database },
              { num: '02', title: 'Detect Duplicates', desc: 'Hash Tables instantly fingerprint each article and detect near-duplicate content with similarity scoring.', icon: Copy },
              { num: '03', title: 'Rank & Prioritize', desc: 'A Heap-based Priority Queue ranks articles by trend score, engagement, and importance.', icon: TrendingUp },
              { num: '04', title: 'Explore Relationships', desc: 'A Graph data structure maps connections between related stories for deep analysis.', icon: Network }
            ].map((step, i) => (
              <div key={i} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                <div className="absolute -right-4 -top-4 text-7xl font-bold text-slate-700/30 group-hover:text-blue-500/10 transition-colors z-0">
                  {step.num}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                    <step.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: DSA Concepts */}
      <section id="dsa-concepts" className="py-24 px-4 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Built on Proven Data Structures & Algorithms</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">The core computer science principles powering our real-time analytics engine.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { name: 'Hash Table', app: 'Duplicate Content Detection', desc: 'Fingerprints each article using polynomial rolling hash to instantly identify similar or duplicate content.', icon: Copy, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'hover:border-violet-500/50' },
              { name: 'Priority Queue (Heap)', app: 'Trend Ranking Engine', desc: 'A min-heap processes incoming articles, always serving the highest-priority content first based on engagement and trend scores.', icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'hover:border-blue-500/50' },
              { name: 'Queue', app: 'Content Ingestion Pipeline', desc: 'FIFO queue manages the steady stream of incoming news articles and social posts, ensuring orderly processing.', icon: Layers, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'hover:border-emerald-500/50' },
              { name: 'Graph', app: 'Story Relationship Mapping', desc: 'Adjacency-list graph connects related stories, enabling BFS/DFS traversal to discover related content clusters.', icon: Network, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'hover:border-amber-500/50' },
              { name: 'Binary Search Tree', app: 'Category Classification', desc: 'BST organizes articles by trend score for efficient range queries and category-based retrieval in O(log n) time.', icon: GitBranch, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'hover:border-rose-500/50' },
              { name: 'Merge Sort / Quick Sort', app: 'Content Ranking', desc: 'Efficient O(n log n) sorting algorithms rank articles by relevance, popularity, date, or trend score.', icon: ArrowUpDown, color: 'text-slate-300', bg: 'bg-slate-700/50', border: 'hover:border-slate-400/50' },
              { name: 'Binary Search', app: 'Fast Content Lookup', desc: 'Binary search on pre-sorted datasets enables O(log n) lookup for trending score thresholds and filters.', icon: Search, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'hover:border-cyan-500/50' }
            ].map((dsa, i) => (
              <div key={i} className={`bg-slate-800/80 rounded-2xl p-6 border border-slate-700/50 hover:-translate-y-1 transition-all duration-300 ${dsa.border}`}>
                <div className={`w-12 h-12 rounded-xl ${dsa.bg} flex items-center justify-center mb-4`}>
                  <dsa.icon className={`w-6 h-6 ${dsa.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-1">{dsa.name}</h3>
                <p className="text-sm font-medium text-slate-300 mb-3">{dsa.app}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{dsa.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Key Features */}
      <section id="features" className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need for Media Analysis</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Powerful tools designed for uncovering the truth in today's fast-paced media cycle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Duplicate Detection', desc: 'Identify near-duplicate articles with configurable similarity thresholds using content hashing.', icon: Copy, color: 'text-blue-400' },
              { title: 'Real-time Trending', desc: 'Priority queue-powered trending engine surfaces the most important stories instantly.', icon: TrendingUp, color: 'text-emerald-400' },
              { title: 'Story Relationships', desc: 'Interactive graph visualization reveals how news stories connect and influence each other.', icon: Network, color: 'text-violet-400' },
              { title: 'Smart Search', desc: 'Multi-algorithm search combines exact matching, fuzzy search, and relevance ranking.', icon: Search, color: 'text-amber-400' },
              { title: 'Moderation Queue', desc: 'Priority-based content moderation assigns high-priority posts for immediate review.', icon: Shield, color: 'text-red-400' },
              { title: 'Analytics Dashboard', desc: 'Comprehensive charts and metrics give you a complete picture of the media landscape.', icon: BarChart3, color: 'text-blue-400' }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl hover:bg-slate-800/50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Analytics Preview */}
      <section className="py-24 px-4 bg-slate-950 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Live Analytics at a Glance</h2>
            <p className="text-slate-400 text-lg">A sneak peek into the dashboard powered by our algorithms.</p>
          </div>

          <div className="bg-black border border-slate-700/50 rounded-2xl shadow-2xl p-6 relative">
            {/* Window Controls */}
            <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Analyzed', val: '124.5K', change: '+12%' },
                { label: 'Duplicates Found', val: '14.2K', change: '-3%' },
                { label: 'Trending Topics', val: '48', change: '+5' },
                { label: 'Avg Processing', val: '1.2s', change: '-0.3s' }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-800 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">{stat.label}</p>
                  <div className="flex items-end gap-3">
                    <p className="text-2xl font-bold">{stat.val}</p>
                    <p className={`text-xs font-medium mb-1 ${stat.change.startsWith('+') ? 'text-emerald-400' : stat.change.startsWith('-') ? 'text-emerald-400' : 'text-rose-400'}`}>{stat.change}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700/50 h-64 flex flex-col justify-end gap-2">
                <p className="text-sm font-medium text-slate-300 mb-auto">Ingestion Volume (Last 7 Days)</p>
                <div className="flex items-end justify-between h-40 w-full gap-2 px-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="w-full bg-gradient-to-t from-blue-600 to-violet-500 rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700/50 h-64 overflow-hidden">
                <p className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> Hot Topics Queue</p>
                <div className="flex flex-col gap-4">
                  {[
                    { t: 'Tech Layoffs 2024', s: '98' },
                    { t: 'Global Market Rally', s: '85' },
                    { t: 'AI Regulations Act', s: '76' },
                  ].map((t, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-slate-700/50 pb-3 last:border-0">
                      <span className="text-slate-300 truncate pr-4">{t.t}</span>
                      <span className="text-emerald-400 font-medium bg-emerald-400/10 px-2 py-0.5 rounded">{t.s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Overlay gradient to fake screenshot bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none rounded-b-2xl"></div>
          </div>
        </div>
      </section>

      {/* Section 7: CTA Banner */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-12 text-center shadow-2xl shadow-blue-900/50">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Analyze the News?</h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Start exploring the dashboard and see how DSA powers real-world analytics.
            </p>
            <button onClick={() => navigate('/register')} className="bg-white text-slate-900 font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-slate-100 transition-colors text-lg">
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Section 8: Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white">NewsIQ</span>
            </div>
            <p className="text-slate-400 text-sm">A DSA-3 College Project demonstrating advanced data structures in a real-world scenario.</p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold mb-2">Navigation</h4>
            <NavLink to="/dashboard" className="text-slate-400 hover:text-white text-sm transition-colors">Dashboard</NavLink>
            <button onClick={() => scrollToSection('features')} className="text-left text-slate-400 hover:text-white text-sm transition-colors">Features</button>
            <button onClick={() => scrollToSection('dsa-concepts')} className="text-left text-slate-400 hover:text-white text-sm transition-colors">DSA Concepts</button>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold mb-2">Academic Info</h4>
            <p className="text-slate-400 text-sm">Course: 25CS2103E</p>
            <p className="text-slate-400 text-sm">Data Structures & Algorithms-3</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} NewsIQ Project. All rights reserved.</p>
          <p>Built with React, Python, and SQLite</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
