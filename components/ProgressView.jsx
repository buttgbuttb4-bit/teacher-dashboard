import React, { useState } from 'react';
import { INITIAL_IDEAS } from '../data';
import '../styles/ProgressView.css';

const ProgressView = () => {
  const [ideas] = useState(INITIAL_IDEAS);
  const [session, setSession] = useState('Morning');

  // Only show accepted ideas in progress
  const activeIdeas = ideas.filter(i => i.status === 'Accepted' && i.session === session);

  return (
    <div className="prog-page">
      <div className="prog-header">
        <div className="prog-header-text">
          <h2 className="prog-title">Student Progress</h2>
          <p className="prog-subtitle">Track milestones and task completion for all project groups.</p>
        </div>

        <div className="prog-tabs-wrapper">
          <nav aria-label="Tabs" className="prog-tabs">
            <button
              onClick={() => setSession('Morning')}
              className={`prog-tab-btn ${session === 'Morning' ? 'prog-tab-btn-active' : ''}`}
            >
              <span className="material-symbols-outlined prog-tab-icon">wb_sunny</span>
              Morning Progress
            </button>
            <button
              onClick={() => setSession('Evening')}
              className={`prog-tab-btn ${session === 'Evening' ? 'prog-tab-btn-active' : ''}`}
            >
              <span className="material-symbols-outlined prog-tab-icon">dark_mode</span>
              Evening Progress
            </button>
          </nav>
        </div>
      </div>

      <div className="prog-list">
        {activeIdeas.length === 0 ? (
          <div className="prog-empty">
            <p className="prog-empty-text">No active projects found for this session yet.</p>
          </div>
        ) : (
          activeIdeas.map((idea, index) => (
            <div key={idea.id} className="prog-card">
              <div className="prog-card-main">
                <div
                  className={`prog-group-label ${
                    index % 3 === 0
                      ? 'prog-group-label-primary'
                      : index % 3 === 1
                        ? 'prog-group-label-purple'
                        : 'prog-group-label-emerald'
                  }`}
                >
                  Group {String.fromCharCode(65 + index)}
                </div>
                <h3 className="prog-card-title">{idea.title}</h3>
                <p className="prog-card-leader">
                  Leader: <span>{idea.leader.name}</span>
                </p>
              </div>

              <div className="prog-card-progress">
                <div className="prog-progress-header">
                  <span className="prog-progress-label">Completion</span>
                  <span className="prog-progress-value">{idea.progress}%</span>
                </div>
                <div className="prog-progress-bar-bg">
                  <div
                    className={`prog-progress-bar-fill ${
                      idea.progress > 80
                        ? 'prog-progress-bar-emerald'
                        : idea.progress > 50
                          ? 'prog-progress-bar-primary'
                          : 'prog-progress-bar-amber'
                    }`}
                    style={{ width: `${idea.progress}%` }}
                  ></div>
                </div>
                <div className="prog-progress-milestones">
                  <span>{idea.milestones.current}</span>
                  <span>{idea.milestones.next}</span>
                </div>
              </div>

              <div className="prog-card-action">
                <button className="prog-btn-view">
                  <span>View Full Progress</span>
                  <span className="material-symbols-outlined prog-btn-view-icon">arrow_forward</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProgressView;
