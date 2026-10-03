import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getPageTitle = (pathname) => {
    const routeTitles = {
      '/dashboard': 'Dashboard Overview',
      '/news': 'News Feed',
      '/social': 'Social Media',
      '/trending': 'Trending Topics',
      '/duplicates': 'Duplicate Detection',
      '/relationships': 'Story Relationships',
      '/moderation': 'Moderation Queue',
      '/search': 'Search',
      '/analytics': 'Analytics',
      '/dsa': 'DSA Concepts'
    };
    return routeTitles[pathname] || 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div 
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'lg:ml-[260px]' : ''
        }`}
      >
        <Navbar 
          title={getPageTitle(location.pathname)} 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        <main className="pt-16 p-6 min-h-screen overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
