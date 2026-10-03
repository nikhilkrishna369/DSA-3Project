import React from 'react';
import { Flame, Minus, ArrowDown } from 'lucide-react';

export default function PriorityBadge({ priority, size = 'sm' }) {
  const normalizedPriority = priority?.toLowerCase() || 'low';
  
  const sizeClasses = size === 'md' ? 'px-2.5 py-1 text-sm' : 'px-2 py-0.5 text-xs';
  const iconSize = size === 'md' ? 'w-4 h-4' : 'w-3 h-3';

  if (normalizedPriority === 'high') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-medium bg-red-500/10 text-red-400 border border-red-500/20 ${sizeClasses}`}>
        <Flame className={iconSize} />
        High
      </span>
    );
  }

  if (normalizedPriority === 'medium') {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 ${sizeClasses}`}>
        <Minus className={iconSize} />
        Medium
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium bg-slate-700 text-slate-400 border border-slate-600 ${sizeClasses}`}>
      <ArrowDown className={iconSize} />
      Low
    </span>
  );
}
