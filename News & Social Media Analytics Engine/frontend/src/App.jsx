import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import AppProvider from './context/AppContext';
import { ToastContainer } from './components/ui/Toast';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NewsPage from './pages/NewsPage';
import SocialMediaPage from './pages/SocialMediaPage';
import TrendingPage from './pages/TrendingPage';
import DuplicatesPage from './pages/DuplicatesPage';
import RelationshipsPage from './pages/RelationshipsPage';
import ModerationPage from './pages/ModerationPage';
import SearchPage from './pages/SearchPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DSAPage from './pages/DSAPage';
import ArticleDetailPage from './pages/ArticleDetailPage';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <ToastContainer />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes inside DashboardLayout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/social" element={<SocialMediaPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/duplicates" element={<DuplicatesPage />} />
            <Route path="/relationships" element={<RelationshipsPage />} />
            <Route path="/moderation" element={<ModerationPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/dsa" element={<DSAPage />} />
            <Route path="/article/:id" element={<ArticleDetailPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppProvider>
    </AuthProvider>
  );
}
