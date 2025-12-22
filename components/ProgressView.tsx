import React, { useState } from 'react';
import { ProjectIdea, Session } from '../types';

interface ProgressViewProps {
  ideas: ProjectIdea[];
}

export const ProgressView: React.FC<ProgressViewProps> = ({ ideas }) => {
  const [session, setSession] = useState<Session>('Morning');

  // Only show accepted ideas in progress
  const activeIdeas = ideas.filter(i => i.status === 'Accepted' && i.session === session);

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex flex-col gap-6 shrink-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Student Progress</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Track milestones and task completion for all project groups.</p>
        </div>
        <div className="border-b border-slate-200 dark:border-slate-800">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            <button 
              onClick={() => setSession('Morning')}
              className={`${session === 'Morning' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
            >
              <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
              Morning Progress
            </button>
            <button 
              onClick={() => setSession('Evening')}
              className={`${session === 'Evening' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
            >
              <span className="material-symbols-outlined text-[20px]">dark_mode</span>
              Evening Progress
            </button>
          </nav>
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pb-6">
        {activeIdeas.length === 0 ? (
           <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
             <p className="text-slate-500">No active projects found for this session yet.</p>
           </div>
        ) : (
          activeIdeas.map((idea, index) => (
            <div key={idea.id} className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 w-full md:w-auto">
                <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                  index % 3 === 0 ? 'text-primary' : index % 3 === 1 ? 'text-purple-600 dark:text-purple-400' : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  Group {String.fromCharCode(65 + index)} {/* Alpha, Beta, etc */}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{idea.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Leader: {idea.leader.name}</p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Completion</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{idea.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      idea.progress > 80 ? 'bg-emerald-500' : idea.progress > 50 ? 'bg-primary' : 'bg-amber-500'
                    }`} 
                    style={{ width: `${idea.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>{idea.milestones.current}</span>
                  <span>{idea.milestones.next}</span>
                </div>
              </div>
              <div className="w-full md:w-auto shrink-0">
                <button className="w-full md:w-auto py-2.5 px-5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                  <span>View Full Progress</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};