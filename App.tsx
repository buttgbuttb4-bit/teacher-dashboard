import React, { useState } from 'react';
import { INITIAL_IDEAS } from './data';
import { ProjectIdea, Status } from './types';
import { DashboardView } from './components/DashboardView';
import { AllIdeasView } from './components/AllIdeasView';
import { ProgressView } from './components/ProgressView';

type View = 'dashboard' | 'all-ideas' | 'progress';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [ideas, setIdeas] = useState<ProjectIdea[]>(INITIAL_IDEAS);

  const handleUpdateStatus = (id: string, status: Status, feedback?: string) => {
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
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between h-full z-20">
        <div className="flex flex-col p-4 gap-6">
          {/* User Profile */}
          <div className="flex gap-3 items-center px-2">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-sm ring-2 ring-primary/10" 
              style={{ backgroundImage: 'url("https://picsum.photos/200")' }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Mrs. Anderson</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Project Coordinator</p>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-colors w-full ${
                currentView === 'dashboard' 
                  ? 'bg-primary/10 text-primary dark:text-blue-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>dashboard</span>
              <p className={`text-sm ${currentView === 'dashboard' ? 'font-semibold' : 'font-medium'}`}>Dashboard</p>
            </button>
            <button 
              onClick={() => setCurrentView('all-ideas')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-colors w-full ${
                currentView === 'all-ideas' 
                  ? 'bg-primary/10 text-primary dark:text-blue-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>tips_and_updates</span>
              <p className={`text-sm ${currentView === 'all-ideas' ? 'font-semibold' : 'font-medium'}`}>All Ideas</p>
            </button>
            <button 
              onClick={() => setCurrentView('progress')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-colors w-full ${
                currentView === 'progress' 
                  ? 'bg-primary/10 text-primary dark:text-blue-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>bar_chart</span>
              <p className={`text-sm ${currentView === 'progress' ? 'font-semibold' : 'font-medium'}`}>Progress</p>
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
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm">
            <span>Teacher Admin</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-slate-900 dark:text-white font-medium">
              {currentView === 'dashboard' ? 'Dashboard' : currentView === 'all-ideas' ? 'All Ideas' : 'Student Progress'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-850"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth">
          <div className="max-w-[1400px] mx-auto h-full">
             {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;