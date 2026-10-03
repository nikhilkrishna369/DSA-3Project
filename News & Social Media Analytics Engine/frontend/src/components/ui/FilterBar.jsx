import React from 'react';

// FilterBar supports two prop interfaces:
// 1. Legacy (used by pages): options={string[]}, selected={string}, onSelect={fn}
// 2. Object style: filters={[{id, label, count}]}, activeFilter, onFilterChange
export default function FilterBar({ 
  // Legacy props
  options, selected, onSelect,
  // Object props  
  filters, activeFilter, onFilterChange,
  label 
}) {
  // Normalize to unified format
  const normalizedFilters = filters 
    ? filters 
    : (options || []).map(opt => ({ id: opt, label: opt }));

  const currentActive = activeFilter !== undefined ? activeFilter : selected;
  const handleChange = onFilterChange || onSelect || (() => {});

  return (
    <div className="flex items-center gap-4">
      {label && <span className="text-slate-400 text-sm font-medium whitespace-nowrap">{label}</span>}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none sm:pb-0">
        {normalizedFilters.map((filter) => {
          const isActive = currentActive === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => handleChange(filter.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                isActive
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {filter.label}
              {filter.count !== undefined && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] leading-none ${
                  isActive ? 'bg-slate-900 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  {filter.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
