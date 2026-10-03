import React from 'react';

export default function LoadingState({ message, type = 'spinner' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full min-h-[200px]">
      {type === 'spinner' && (
        <div className="w-8 h-8 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      )}
      
      {type === 'skeleton' && (
        <div className="w-full max-w-md space-y-4 animate-pulse">
          <div className="h-10 bg-slate-800 rounded-lg w-full"></div>
          <div className="h-32 bg-slate-800 rounded-lg w-full"></div>
          <div className="h-10 bg-slate-800 rounded-lg w-2/3"></div>
        </div>
      )}
      
      {type === 'dots' && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      )}
      
      {message && <p className="text-slate-400 text-sm">{message}</p>}
    </div>
  );
}
