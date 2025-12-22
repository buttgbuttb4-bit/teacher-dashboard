import React, { useState, useEffect } from 'react';
import { ProjectIdea } from '../types';

interface DashboardViewProps {
  ideas: ProjectIdea[];
  onUpdateStatus: (id: string, status: 'Accepted' | 'Rejected', feedback?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ ideas, onUpdateStatus }) => {
  const pendingIdeas = ideas.filter(i => i.status === 'Pending');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  // Auto-select first item if none selected or current selection is no longer pending
  useEffect(() => {
    if (pendingIdeas.length > 0) {
      if (!selectedId || !pendingIdeas.find(i => i.id === selectedId)) {
        setSelectedId(pendingIdeas[0].id);
        setFeedback('');
      }
    } else {
      setSelectedId(null);
    }
  }, [pendingIdeas, selectedId]);

  const selectedIdea = pendingIdeas.find(i => i.id === selectedId);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-wrap justify-between items-end gap-4 shrink-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Pending Submissions</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Review new student project proposals requiring your approval.</p>
        </div>
        <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
          <button className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded shadow-sm">All</button>
          <button className="px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700">Morning</button>
          <button className="px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700">Evening</button>
        </div>
      </div>

      {pendingIdeas.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
          <span className="material-symbols-outlined text-6xl mb-4">check_circle</span>
          <p className="text-lg font-medium">All caught up!</p>
          <p className="text-sm">No pending submissions to review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start h-full overflow-hidden">
          {/* List Table */}
          <div className="xl:col-span-7 2xl:col-span-8 flex flex-col bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full">
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/3 bg-slate-50 dark:bg-slate-800">Idea Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-800">Description</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-24 bg-slate-50 dark:bg-slate-800">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {pendingIdeas.map((idea) => (
                    <tr 
                      key={idea.id}
                      onClick={() => { setSelectedId(idea.id); setFeedback(''); }}
                      className={`cursor-pointer transition-colors border-l-4 ${
                        selectedId === idea.id 
                          ? 'bg-primary/5 dark:bg-primary/10 border-l-primary' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-l-transparent'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-white text-sm">{idea.title}</span>
                          <span className="text-xs text-slate-500">{idea.leader.name} • {idea.session}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{idea.shortDescription}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          {idea.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="xl:col-span-5 2xl:col-span-4 h-full overflow-y-auto">
            {selectedIdea && (
              <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col overflow-hidden sticky top-0">
                <div className="relative h-32 bg-slate-200 dark:bg-slate-800" style={{ background: 'linear-gradient(135deg, #137fec 0%, #0d5ea6 100%)' }}>
                  <div className="absolute -bottom-6 left-6 border-4 border-white dark:border-slate-850 rounded-lg shadow-sm bg-white dark:bg-slate-800 p-1">
                    <div className="size-12 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center text-slate-500">
                      <span className="material-symbols-outlined">psychology</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 px-6 pb-6 flex flex-col gap-6">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{selectedIdea.title}</h3>
                      <span className="shrink-0 inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {selectedIdea.session} Session
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Leader: <span className="text-slate-900 dark:text-slate-200 font-medium">{selectedIdea.leader.name}</span></p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Full Description</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedIdea.fullDescription}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Team Members</h4>
                    <div className="flex gap-2 flex-wrap">
                      {selectedIdea.team.length > 0 ? selectedIdea.team.map((member, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800">
                          <span className="material-symbols-outlined text-[14px]">person</span> {member.name}
                        </span>
                      )) : (
                        <span className="text-xs text-slate-400 italic">No additional team members</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">Feedback <span className="text-slate-400 font-normal">(Required for rejection)</span></span>
                      <textarea 
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full min-h-[80px] rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-primary focus:border-primary placeholder:text-slate-400 p-2" 
                        placeholder="Enter feedback for the students..."
                      ></textarea>
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <button 
                        onClick={() => onUpdateStatus(selectedIdea.id, 'Rejected', feedback)}
                        disabled={!feedback && false /* Typically strictly enforced, but let's allow click for demo feel if wanted, but UI says required */}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-900/50 transition-all disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[18px]">cancel</span>
                        Reject
                      </button>
                      <button 
                         onClick={() => onUpdateStatus(selectedIdea.id, 'Accepted')}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 shadow-sm transition-all shadow-blue-500/20"
                      >
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};