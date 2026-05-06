import React, { useState } from 'react';
import { INITIAL_IDEAS } from '../data';
import '../styles/AllIdeasView.css';

const AllIdeasView = () => {
  const [ideas] = useState(INITIAL_IDEAS);
  const [currentTab, setCurrentTab] = useState('Accepted');

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
    <div className="ideas-page">
      <div className="ideas-header">
        <h2 className="ideas-title">All Ideas</h2>
        <p className="ideas-subtitle">Manage approved and rejected project proposals across all sessions.</p>
      </div>

      <div className="ideas-tabs-wrapper">
        <nav aria-label="Tabs" className="ideas-tabs">
          <button
            onClick={() => setCurrentTab('Accepted')}
            className={`ideas-tab-btn ${currentTab === 'Accepted' ? 'ideas-tab-btn-active' : ''}`}
          >
            <span className="material-symbols-outlined ideas-tab-icon">check_circle</span>
            Accepted Ideas
            <span className="ideas-tab-badge ideas-tab-badge-blue">{acceptedCount}</span>
          </button>

          <button
            onClick={() => setCurrentTab('Rejected')}
            className={`ideas-tab-btn ${currentTab === 'Rejected' ? 'ideas-tab-btn-active' : ''}`}
          >
            <span className="material-symbols-outlined ideas-tab-icon">cancel</span>
            Rejected Ideas
            <span className="ideas-tab-badge ideas-tab-badge-gray">{rejectedCount}</span>
          </button>

          <button
            onClick={() => setCurrentTab('Morning')}
            className={`ideas-tab-btn ${currentTab === 'Morning' ? 'ideas-tab-btn-active' : ''}`}
          >
            <span className="material-symbols-outlined ideas-tab-icon">wb_sunny</span>
            Morning Session
          </button>

          <button
            onClick={() => setCurrentTab('Evening')}
            className={`ideas-tab-btn ${currentTab === 'Evening' ? 'ideas-tab-btn-active' : ''}`}
          >
            <span className="material-symbols-outlined ideas-tab-icon">nights_stay</span>
            Evening Session
          </button>
        </nav>
      </div>

      <div className="ideas-card">
        <div className="ideas-card-header">
          <div className="ideas-card-header-left">
            <span
              className={`material-symbols-outlined ideas-status-icon ${
                currentTab === 'Accepted'
                  ? 'ideas-status-icon-accepted'
                  : currentTab === 'Rejected'
                    ? 'ideas-status-icon-rejected'
                    : 'ideas-status-icon-default'
              }`}
            >
              {currentTab === 'Accepted' ? 'check_circle' : currentTab === 'Rejected' ? 'cancel' : 'list_alt'}
            </span>
            <h3 className="ideas-card-title">{currentTab} Ideas</h3>
          </div>
        </div>

        <div className="ideas-table-wrapper">
          <table className="ideas-table">
            <thead className="ideas-table-head">
              <tr>
                <th className="ideas-th">Idea Name</th>
                <th className="ideas-th ideas-th-description">Description</th>
                <th className="ideas-th">Leader Name</th>
                <th className="ideas-th">Session</th>
                <th className="ideas-th ideas-th-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredIdeas.map(idea => (
                <tr key={idea.id} className="ideas-tr">
                  <td className="ideas-td ideas-td-title">{idea.title}</td>
                  <td className="ideas-td ideas-td-description">{idea.shortDescription}</td>
                  <td className="ideas-td">{idea.leader.name}</td>
                  <td className="ideas-td ideas-td-session">{idea.session}</td>
                  <td className="ideas-td ideas-td-right">
                    <span
                      className={`ideas-status-pill ${
                        idea.status === 'Accepted'
                          ? 'ideas-status-pill-accepted'
                          : idea.status === 'Rejected'
                            ? 'ideas-status-pill-rejected'
                            : 'ideas-status-pill-pending'
                      }`}
                    >
                      {idea.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredIdeas.length === 0 && (
                <tr>
                  <td colSpan={5} className="ideas-empty">No items found in this view.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="ideas-card-footer">
          <p className="ideas-footer-text">Showing {filteredIdeas.length} results</p>
        </div>
      </div>
    </div>
  );
};

export default AllIdeasView;
