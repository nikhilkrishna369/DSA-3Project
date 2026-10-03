import React from 'react';

export default function EmptyState({ message, description, icon: Icon, action, actionLabel }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center w-full h-full min-h-[300px]">
      {Icon && (
        <div className="mb-4 text-slate-600">
          <Icon className="w-12 h-12 mx-auto" />
        </div>
      )}
      <h3 className="text-slate-300 font-medium text-lg mb-2">{message}</h3>
      {description && (
        <p className="text-slate-500 text-sm max-w-sm mb-6">{description}</p>
      )}
      {action && actionLabel && (
        <button 
          onClick={action}
          className="px-4 py-2 border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-lg font-medium transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
