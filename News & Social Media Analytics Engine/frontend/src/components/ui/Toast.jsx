import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Toast({ id, type = 'info', message, onClose, autoClose = 5000 }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (autoClose) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - (100 / (autoClose / 50));
        });
      }, 50);

      const closeTimer = setTimeout(() => {
        onClose(id);
      }, autoClose);

      return () => {
        clearInterval(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [id, onClose, autoClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-emerald-500/10 border-emerald-500/30',
          text: 'text-emerald-400',
          progress: 'bg-emerald-500',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        };
      case 'error':
        return {
          container: 'bg-red-500/10 border-red-500/30',
          text: 'text-red-400',
          progress: 'bg-red-500',
          icon: <AlertCircle className="w-5 h-5 text-red-400" />
        };
      case 'warning':
        return {
          container: 'bg-amber-500/10 border-amber-500/30',
          text: 'text-amber-400',
          progress: 'bg-amber-500',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />
        };
      case 'info':
      default:
        return {
          container: 'bg-blue-500/10 border-blue-500/30',
          text: 'text-blue-400',
          progress: 'bg-blue-500',
          icon: <Info className="w-5 h-5 text-blue-400" />
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className={`relative overflow-hidden bg-slate-800 border rounded-lg shadow-lg flex items-start gap-3 min-w-72 max-w-80 p-4 transform transition-all duration-300 animate-slide-in-right ${styles.container}`}>
      <div className="shrink-0 pt-0.5">
        {styles.icon}
      </div>
      <div className={`flex-1 text-sm font-medium ${styles.text}`}>
        {message}
      </div>
      <button 
        onClick={() => onClose(id)}
        className="shrink-0 text-slate-400 hover:text-slate-200 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      {autoClose && (
        <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-700">
          <div 
            className={`h-full ${styles.progress} transition-all duration-75 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast 
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={removeToast}
          autoClose={toast.autoClose}
        />
      ))}
    </div>
  );
}
