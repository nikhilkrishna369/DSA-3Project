import React from 'react';

export default function TrendScoreBar({ score, showLabel }) {
  const getColor = (s) => {
    if (s <= 40) return 'bg-red-500';
    if (s <= 70) return 'bg-amber-500';
    if (s <= 85) return 'bg-blue-500';
    return 'bg-emerald-500';
  };

  const color = getColor(score);
  
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.max(0, Math.min(100, score))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-slate-300 w-8 text-right shrink-0">
          {score}
        </span>
      )}
    </div>
  );
}
