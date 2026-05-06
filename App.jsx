import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { INITIAL_IDEAS } from './data';
import DashboardView from './components/DashboardView';
import AllIdeasView from './components/AllIdeasView';
import ProgressView from './components/ProgressView';
import Upload from './components/Upload';
import './styles/main.css';
import './styles/utilities.css';
import './styles/scrollbar.css';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-content">
          {/* User Profile */}
          <div className="user-profile">
            <div 
              className="user-avatar" 
              style={{ backgroundImage: 'url("https://picsum.photos/200")' }}
            ></div>
            <div className="user-info">
              <h1>Mrs. Anderson</h1>
              <p>Project Coordinator</p>
            </div>
          </div>
          {/* Navigation */}
          <nav className="nav-menu">
            <Link 
              to="/dashboard"
              className={`nav-button ${isActive('/dashboard') ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined nav-icon">dashboard</span>
              <p className={`nav-text ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</p>
            </Link>
            <Link 
              to="/allideas"
              className={`nav-button ${isActive('/allideas') ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined nav-icon">tips_and_updates</span>
              <p className={`nav-text ${isActive('/allideas') ? 'active' : ''}`}>All Ideas</p>
            </Link>
            <Link 
              to="/progress"
              className={`nav-button ${isActive('/progress') ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined nav-icon">bar_chart</span>
              <p className={`nav-text ${isActive('/progress') ? 'active' : ''}`}>Progress</p>
            </Link>
            <Link 
              to="/upload"
              className={`nav-button ${isActive('/upload') ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined nav-icon">upload</span>
              <p className={`nav-text ${isActive('/upload') ? 'active' : ''}`}>Upload</p>
            </Link>
          </nav>
        </div>
        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors w-full">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
            <p className="text-xs font-medium">Settings</p>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-breadcrumb">
            <span>Teacher Admin</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
            <span className="current">
              {location.pathname === '/dashboard' ? 'Dashboard' : 
               location.pathname === '/allideas' ? 'All Ideas' : 'Student Progress'}
            </span>
          </div>
          <div className="header-actions">
            <button className="notification-btn">
              <span className="material-symbols-outlined">notifications</span>
              <span className="notification-dot"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="content-area">
          <div className="content-wrapper">
            <Routes>
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="/allideas" element={<AllIdeasView />} />
              <Route path="/progress" element={<ProgressView />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/" element={<DashboardView />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navigation />
    </Router>
  );
};

export default App;
