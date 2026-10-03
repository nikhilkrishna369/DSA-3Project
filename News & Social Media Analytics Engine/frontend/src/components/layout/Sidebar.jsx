import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Zap, X, LayoutDashboard, Newspaper, MessageSquare, TrendingUp, Copy, Network, Shield, Search, BarChart3, Cpu } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'CONTENT',
      items: [
        { label: 'News Feed', path: '/news', icon: Newspaper },
        { label: 'Social Media', path: '/social', icon: MessageSquare },
        { label: 'Trending', path: '/trending', icon: TrendingUp }
      ]
    },
    {
      title: 'ANALYSIS',
      items: [
        { label: 'Duplicate Detection', path: '/duplicates', icon: Copy },
        { label: 'Story Relationships', path: '/relationships', icon: Network },
        { label: 'Moderation', path: '/moderation', icon: Shield }
      ]
    },
    {
      title: 'TOOLS',
      items: [
        { label: 'Search', path: '/search', icon: Search },
        { label: 'Analytics', path: '/analytics', icon: BarChart3 },
        { label: 'DSA Concepts', path: '/dsa', icon: Cpu }
      ]
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[260px] bg-slate-900 border-r border-slate-800 z-50 transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">NewsIQ</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-100 p-1 rounded-md hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {navGroups.map((group, i) => (
            <div key={i}>
              <h3 className="px-3 text-xs font-semibold text-slate-500 tracking-wider mb-3">{group.title}</h3>
              <div className="space-y-1">
                {group.items.map((item, j) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <NavLink
                      key={j}
                      to={item.path}
                      onClick={() => window.innerWidth < 1024 && onClose()}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive 
                          ? 'bg-blue-500/10 text-blue-400 border-r-2 border-blue-500 rounded-r-none'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 shrink-0">
          <p className="text-xs text-slate-500 text-center">DSA-3 | 25CS2103E</p>
        </div>
      </aside>
    </>
  );
}
