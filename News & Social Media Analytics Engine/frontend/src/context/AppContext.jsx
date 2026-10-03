import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const useApp = () => useContext(AppContext);

export default function AppProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type, duration: 4000 }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <AppContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </AppContext.Provider>
  );
}
