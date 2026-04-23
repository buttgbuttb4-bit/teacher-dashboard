import React, { useState } from 'react';
import { INITIAL_IDEAS } from './data';
import DashboardView from './components/DashboardView';
import AllIdeasView from './components/AllIdeasView';
import ProgressView from './components/ProgressView';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [ideas, setIdeas] = useState(INITIAL_IDEAS);

  const handleUpdateStatus = (id, status, feedback) => {
    setIdeas(prev => prev.map(idea => {
      if (idea.id === id) {
        return { ...idea, status };
      }
      return idea;
    }));
  };

  const renderView = () => {
    switch(currentView) {
      case 'dashboard':
        return <DashboardView ideas={ideas} onUpdateStatus={handleUpdateStatus} />;
      case 'all-ideas':
        return <AllIdeasView ideas={ideas} />;
      case 'progress':
        return <ProgressView ideas={ideas} />;
      default:
        return <DashboardView ideas={ideas} onUpdateStatus={handleUpdateStatus} />;
    }
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
            <button 
              onClick={() => setCurrentView('dashboard')}
              className={`nav-button ${currentView === 'dashboard' ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined nav-icon">dashboard</span>
              <p className={`nav-text ${currentView === 'dashboard' ? 'active' : ''}`}>Dashboard</p>
            </button>
            <button 
              onClick={() => setCurrentView('all-ideas')}
              className={`nav-button ${currentView === 'all-ideas' ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined nav-icon">tips_and_updates</span>
              <p className={`nav-text ${currentView === 'all-ideas' ? 'active' : ''}`}>All Ideas</p>
            </button>
            <button 
              onClick={() => setCurrentView('progress')}
              className={`nav-button ${currentView === 'progress' ? 'active' : ''}`}
            >
              <span className="material-symbols-outlined nav-icon">bar_chart</span>
              <p className={`nav-text ${currentView === 'progress' ? 'active' : ''}`}>Progress</p>
            </button>
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
              {currentView === 'dashboard' ? 'Dashboard' : currentView === 'all-ideas' ? 'All Ideas' : 'Student Progress'}
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
             {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
