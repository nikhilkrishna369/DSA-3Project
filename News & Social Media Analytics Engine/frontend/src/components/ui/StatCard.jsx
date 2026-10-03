import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ title, value, change, changeType, description, icon: Icon, color, loading }) {
  const colorMap = {
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', hover: 'hover:border-blue-500/50' },
    violet: { bg: 'bg-violet-500/10', text: 'text-violet-500', hover: 'hover:border-violet-500/50' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', hover: 'hover:border-emerald-500/50' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-500', hover: 'hover:border-amber-500/50' },
    red: { bg: 'bg-red-500/10', text: 'text-red-500', hover: 'hover:border-red-500/50' },
    slate: { bg: 'bg-slate-500/10', text: 'text-slate-500', hover: 'hover:border-slate-500/50' },
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-slate-700"></div>
          <div className="w-16 h-6 rounded-full bg-slate-700"></div>
        </div>
        <div className="w-24 h-8 bg-slate-700 rounded mb-2"></div>
        <div className="w-32 h-4 bg-slate-700 rounded mb-1"></div>
        <div className="w-48 h-3 bg-slate-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-800 rounded-xl border border-slate-700 p-5 transition-colors ${selectedColor.hover}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedColor.bg}`}>
          {Icon && <Icon className={`w-5 h-5 ${selectedColor.text}`} />}
        </div>
        
        {change && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            changeType === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 
            changeType === 'down' ? 'bg-red-500/10 text-red-400' : 
            'bg-slate-700 text-slate-400'
          }`}>
            {changeType === 'up' && <TrendingUp className="w-3 h-3" />}
            {changeType === 'down' && <TrendingDown className="w-3 h-3" />}
            {changeType === 'neutral' && <Minus className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      
      <div className="mb-1">
        <h3 className="text-3xl font-bold text-slate-100">{value}</h3>
      </div>
      
      <div className="flex flex-col">
        <span className="text-slate-400 text-sm font-medium">{title}</span>
        {description && (
          <span className="text-slate-500 text-xs mt-1">{description}</span>
        )}
      </div>
    </div>
  );
}
