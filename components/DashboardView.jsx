import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_IDEAS } from '../data';
import '../styles/DashboardView.css';

const DashboardView = () => {
  const [ideas, setIdeas] = useState(INITIAL_IDEAS);
  const pendingIdeas = ideas.filter(i => i.status === 'Pending');
  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleFileSelect = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.type)) {
      setUploadedFile(file);
      setUploadSuccess(false);
    } else {
      alert('Please upload only JPG, PNG, or PDF files');
    }
  };




  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileSelect(file);
    }
  };

  const handleUpload = () => {
    if (uploadedFile) {
      // Simulate upload process
      setTimeout(() => {
        setUploadSuccess(true);
        setTimeout(() => {
          setUploadedFile(null);
          setUploadSuccess(false);
        }, 3000);
      }, 1000);
    }
  };

  const handleButtonClick = () => {
    if (uploadedFile) {
      handleUpload();
    } else {
      fileInputRef.current?.click();
    }
  };


  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'image';
    if (type === 'application/pdf') return 'picture_as_pdf';
    return 'description';
  };

  return (
    <div className="dash-page">
      <div className="dash-header-row">
        <div className="dash-header-text">
          <h2 className="dash-title">Pending Submissions</h2>
          <p className="dash-subtitle">Review new student project proposals requiring your approval.</p>
        </div>

        <div className="dash-header-actions">
          <div className="dash-upload-wrapper">
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileInputChange}
              className="dash-file-input-hidden"
            />

            {!uploadSuccess ? (
              <div className="dash-upload-inline">
                {uploadedFile && (
                  <div className="dash-upload-filechip">
                    <span className="material-symbols-outlined dash-upload-filechip-icon">
                      {getFileIcon(uploadedFile.type)}
                    </span>
                    <span className="dash-upload-filechip-name">{uploadedFile.name}</span>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="dash-upload-filechip-close"
                      type="button"
                      aria-label="Remove selected file"
                    >
                      <span className="material-symbols-outlined dash-upload-filechip-close-icon">close</span>
                    </button>
                  </div>
                )}

                <button
                  onClick={handleButtonClick}
                  className="dash-btn dash-btn-primary dash-btn-upload"
                  type="button"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>upload</span>
                  {uploadedFile ? 'Upload' : 'Upload Project'}
                </button>
              </div>
            ) : (
              <div className="dash-upload-success">
                <span className="material-symbols-outlined dash-upload-success-icon">check_circle</span>
                Uploaded!
              </div>
            )}
          </div>
        </div>
      </div>

      {pendingIdeas.length === 0 ? (
        <div className="dash-empty">
          <span className="material-symbols-outlined dash-empty-icon">check_circle</span>
          <p className="dash-empty-title">All caught up!</p>
          <p className="dash-empty-subtitle">No pending submissions to review.</p>
        </div>
      ) : (
        <div className="dash-main-grid">
          <div className="dash-list-card">
            <div className="dash-list-scroll">
              <table className="dash-table">
                <thead className="dash-table-head">
                  <tr>
                    <th className="dash-th dash-th-idea">Idea Name</th>
                    <th className="dash-th">Description</th>
                    <th className="dash-th dash-th-status">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingIdeas.map((idea) => {
                    const isSelected = selectedId === idea.id;
                    return (
                      <tr
                        key={idea.id}
                        onClick={() => { setSelectedId(idea.id); setFeedback(''); }}
                        className={`dash-tr dash-tr-hover ${isSelected ? 'dash-tr-selected' : ''}`}
                      >
                        <td className="dash-td dash-td-idea">
                          <div className="dash-idea-meta">
                            <span className="dash-idea-title">{idea.title}</span>
                            <span className="dash-idea-submeta">{idea.leader.name} • {idea.session}</span>
                          </div>
                        </td>
                        <td className="dash-td">
                          <p className="dash-idea-desc">{idea.shortDescription}</p>
                        </td>
                        <td className="dash-td">
                          <span className="dash-status-pill dash-status-pill-pending">{idea.status}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dash-detail-column">
            {selectedIdea && (
              <div className="dash-detail-card">
                <div className="dash-detail-hero">
                  <div className="dash-detail-avatar-wrapper">
                    <div className="dash-detail-avatar">
                      <span className="material-symbols-outlined">psychology</span>
                    </div>
                  </div>
                </div>

                <div className="dash-detail-body">
                  <div>
                    <div className="dash-detail-title-row">
                      <h3 className="dash-detail-title">{selectedIdea.title}</h3>
                      <span className="dash-session-pill">{selectedIdea.session} Session</span>
                    </div>
                    <p className="dash-detail-leader">
                      Leader: <span className="dash-detail-leader-name">{selectedIdea.leader.name}</span>
                    </p>
                  </div>

                  <div className="dash-detail-section">
                    <h4 className="dash-section-label">Full Description</h4>
                    <div className="dash-detail-description">
                      <p className="dash-section-text">{selectedIdea.fullDescription}</p>
                    </div>
                  </div>

                  <div className="dash-detail-section">
                    <h4 className="dash-section-label">Team Members</h4>
                    <div className="dash-team-list">
                      {selectedIdea.team.length > 0 ? selectedIdea.team.map((member, idx) => (
                        <span key={idx} className="dash-team-pill">
                          <span className="material-symbols-outlined dash-team-pill-icon">person</span>
                          {member.name}
                        </span>
                      )) : (
                        <span className="dash-team-empty">No additional team members</span>
                      )}
                    </div>
                  </div>

                  <div className="dash-feedback-section">
                    <label className="dash-feedback-label-wrapper">
                      <span className="dash-feedback-label">
                        Feedback <span className="dash-feedback-label-note">(Required for rejection)</span>
                      </span>
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="dash-feedback-input"
                        placeholder="Enter feedback for the students..."
                      ></textarea>
                    </label>

                    <div className="dash-actions-row">
                      <button
                        onClick={() => onUpdateStatus(selectedIdea.id, 'Rejected', feedback)}
                        className="dash-btn dash-btn-outline dash-btn-reject"
                        type="button"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>cancel</span>
                        Reject
                      </button>
                      <button
                        onClick={() => onUpdateStatus(selectedIdea.id, 'Accepted')}
                        className="dash-btn dash-btn-primary"
                        type="button"
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check_circle</span>
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

export default DashboardView;
