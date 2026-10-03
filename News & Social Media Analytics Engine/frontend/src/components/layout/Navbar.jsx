import React from 'react';
import { Menu, Zap, Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ title, onMenuToggle }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full h-16 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-40 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="text-slate-400 hover:text-slate-100 transition-colors p-2 rounded-lg hover:bg-slate-800">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">NewsIQ</span>
        </div>
        <div className="h-6 w-px bg-slate-700 mx-2"></div>
        <span className="text-slate-400 font-medium">{title}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search articles, posts, topics..."
            className="block w-64 pl-10 pr-3 py-1.5 border border-slate-700 rounded-full leading-5 bg-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            onClick={() => navigate('/search')}
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-slate-400 hover:text-slate-100 transition-colors p-2 rounded-lg hover:bg-slate-800">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-900"></span>
          </button>
          
          <div className="h-6 w-px bg-slate-700"></div>

          <div className="relative group">
            <button className="flex items-center gap-2 hover:bg-slate-800 p-1 pr-2 rounded-full transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-medium">
                AJ
              </div>
              <div className="flex flex-col items-start hidden sm:block">
                <span className="text-sm font-medium text-slate-200 leading-none">Alex Johnson</span>
              </div>
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-lg border border-slate-700 py-1 hidden group-hover:block">
              <a href="#" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">Settings</a>
              <button onClick={() => navigate('/')} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
