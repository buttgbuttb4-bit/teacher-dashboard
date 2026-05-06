import React, { useState, useRef } from 'react';
import '../styles/Upload.css';

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [announcement, setAnnouncement] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type,
      announcement: announcement || 'No announcement',
      uploadDate: new Date().toLocaleString()
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleUpload = () => {
    if (uploadedFiles.length === 0) {
      alert('Please select files to upload first');
      return;
    }
    
    // Simulate upload process
    alert(`Uploading ${uploadedFiles.length} file(s)...`);
    setTimeout(() => {
      // Clear only announcement, keep history
      setAnnouncement('');
      alert('Upload completed successfully!');
    }, 2000);
  };

  const handleAnnouncementChange = (e) => {
    const value = e.target.value;
    // Allow only letters and numbers
    const sanitized = value.replace(/[^a-zA-Z0-9\s]/g, '');
    setAnnouncement(sanitized);
  };

  const handleClearAnnouncement = () => {
    setAnnouncement('');
  };

  const handleDeleteFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (size) => {
    if (size === '0.00 MB') return '0 KB';
    return size;
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        {/* Left Side - Upload System */}
        <div className="upload-left">
          <div className="upload-header">
            <h2 className="upload-title">Upload System</h2>
            <p className="upload-subtitle">Share your materials with the team</p>
          </div>

          {/* Announcement Section */}
          <div className="announcement-section">
            <label className="announcement-label">
              Announcement
              <span className="announcement-note">(Hold Enter to broadcast)</span>
            </label>
            <textarea
              value={announcement}
              onChange={handleAnnouncementChange}
              placeholder="Enter announcement text..."
              className="announcement-input"
            />
            <button
              onClick={handleClearAnnouncement}
              className="clear-btn"
            >
              Clear
            </button>
          </div>

          {/* File Upload Section */}
          <div className="upload-section">
            <label className="upload-label">
              Upload New Material
            </label>
            <div className="upload-area">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileSelect}
                className="file-input"
              />
              <div className="upload-drop-zone">
                <span className="upload-icon">📁</span>
                <p className="upload-text">
                  Click to browse or drag and drop files here
                </p>
                <p className="upload-subtext">
                  Supported formats: PDF, JPG, PNG, DOC, DOCX
                </p>
              </div>
            </div>
            </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="upload-btn primary-btn"
            disabled={uploadedFiles.length === 0}
          >
            <span className="upload-btn-icon">⬆</span>
            Upload {uploadedFiles.length} {uploadedFiles.length === 1 ? 'File' : 'Files'}
          </button>
        </div>

        {/* Right Side - Upload History */}
        <div className="upload-right">
          <div className="history-header">
            <h3 className="history-title">Upload History</h3>
            <p className="history-subtitle">Recent uploads and materials</p>
          </div>

          <div className="history-list">
            {uploadedFiles.length === 0 ? (
              <div className="empty-history">
                <span className="empty-icon">📂</span>
                <p className="empty-text">No uploads yet</p>
                <p className="empty-subtext">Start by uploading your first material</p>
              </div>
            ) : (
              uploadedFiles.map(file => (
                <div key={file.id} className="history-item">
                  <div className="file-info">
                    <div className="file-icon">
                      {file.type.includes('pdf') ? '📄' : 
                       file.type.includes('image') ? '🖼️' : 
                       file.type.includes('doc') ? '📄' : '📎'}
                    </div>
                    <div className="file-details">
                      <h4 className="file-name">{file.name}</h4>
                      <p className="file-announcement">{file.announcement}</p>
                      <p className="file-meta">
                        <span className="file-size">{formatFileSize(file.size)}</span>
                        <span className="file-date">{file.uploadDate}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
