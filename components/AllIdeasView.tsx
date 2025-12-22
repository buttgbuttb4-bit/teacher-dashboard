import React, { useState } from 'react';
import { ProjectIdea, Status, Session } from '../types';

interface AllIdeasViewProps {
  ideas: ProjectIdea[];
}

type Tab = 'Accepted' | 'Rejected' | 'Morning' | 'Evening';

export const AllIdeasView: React.FC<AllIdeasViewProps> = ({ ideas }) => {
  const [currentTab, setCurrentTab] = useState<Tab>('Accepted');

  const filteredIdeas = ideas.filter(idea => {
    if (currentTab === 'Accepted') return idea.status === 'Accepted';
    if (currentTab === 'Rejected') return idea.status === 'Rejected';
    if (currentTab === 'Morning') return idea.session === 'Morning';
    if (currentTab === 'Evening') return idea.session === 'Evening';
    return true;
  });

  const acceptedCount = ideas.filter(i => i.status === 'Accepted').length;
  const rejectedCount = ideas.filter(i => i.status === 'Rejected').length;

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-1 shrink-0">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">All Ideas</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Manage approved and rejected project proposals across all sessions.</p>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-700 shrink-0">
        <nav aria-label="Tabs" className="flex space-x-8 overflow-x-auto">
          <button 
            onClick={() => setCurrentTab('Accepted')}
            className={`${currentTab === 'Accepted' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
          >
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            Accepted Ideas
            <span className="ml-2 bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs hidden md:inline-block">{acceptedCount}</span>
          </button>
          
          <button 
            onClick={() => setCurrentTab('Rejected')}
            className={`${currentTab === 'Rejected' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
          >
            <span className="material-symbols-outlined text-[20px]">cancel</span>
            Rejected Ideas
            <span className="ml-2 bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 py-0.5 px-2 rounded-full text-xs hidden md:inline-block">{rejectedCount}</span>
          </button>

          <button 
            onClick={() => setCurrentTab('Morning')}
            className={`${currentTab === 'Morning' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
          >
            <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
            Morning Session
          </button>

          <button 
            onClick={() => setCurrentTab('Evening')}
            className={`${currentTab === 'Evening' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
          >
            <span className="material-symbols-outlined text-[20px]">nights_stay</span>
            Evening Session
          </button>
        </nav>
      </div>

      <div className="flex-1 flex flex-col bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-0">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined ${currentTab === 'Accepted' ? 'text-green-600' : currentTab === 'Rejected' ? 'text-red-600' : 'text-slate-600'}`}>
              {currentTab === 'Accepted' ? 'check_circle' : currentTab === 'Rejected' ? 'cancel' : 'list_alt'}
            </span>
            <h3 className="font-bold text-slate-900 dark:text-white">{currentTab} Ideas</h3>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export
            </button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800">Idea Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3 bg-slate-50 dark:bg-slate-800">Description</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800">Leader Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800">Session</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right bg-slate-50 dark:bg-slate-800">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredIdeas.map(idea => (
                <tr key={idea.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-slate-900 dark:text-white text-sm">{idea.title}</td>
                  <td className="px-6 py-3.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{idea.shortDescription}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-600 dark:text-slate-300">{idea.leader.name}</td>
                  <td className="px-6 py-3.5 text-xs text-slate-500">{idea.session}</td>
                  <td className="px-6 py-3.5 text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                      ${idea.status === 'Accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                        idea.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                      {idea.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredIdeas.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No items found in this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 flex justify-between items-center shrink-0">
          <p className="text-xs text-slate-500 dark:text-slate-400">Showing {filteredIdeas.length} results</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};