// src/components/TimelineFilter.jsx

import React from 'react';

const TimelineFilter = ({ selectedKing, onSelectKing }) => {
  const kings = [
    { name: '태조', reign: '1392-1398', icon: '👑' },
    { name: '태종', reign: '1400-1418', icon: '⚔️' },
    { name: '세종', reign: '1418-1450', icon: '📚' },
    { name: '세조', reign: '1455-1468', icon: '🗡️' },
    { name: '성종', reign: '1469-1494', icon: '📜' },
    { name: '연산군', reign: '1494-1506', icon: '🔥' },
    { name: '중종', reign: '1506-1544', icon: '🏛️' },
    { name: '선조', reign: '1567-1608', icon: '⚡' },
    { name: '숙종', reign: '1674-1720', icon: '👁️' },
    { name: '정조', reign: '1776-1800', icon: '💫' },
    { name: '고종', reign: '1863-1907', icon: '🌅' },
  ];

  return (
    <div className="sidebar-section">
      <div className="section-header">
        <h3 className="section-title">왕조 타임라인</h3>
        <p className="section-description">왕을 선택하여 해당 시기의 기록을 탐색하세요</p>
      </div>
      
      <div className="king-list">
        {kings.map(king => (
          <button
            key={king.name}
            onClick={() => onSelectKing(king.name)}
            className={`king-button ${selectedKing === king.name ? 'active' : ''}`}
          >
            <span className="king-icon">{king.icon}</span>
            <div className="king-info">
              <div className="king-name">{king.name}</div>
              <div className="king-reign">{king.reign}</div>
            </div>
            {selectedKing === king.name && (
              <svg className="check-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className="selection-summary">
        <div className="summary-item">
          <span className="summary-label">선택된 왕</span>
          <span className="summary-value">{selectedKing || '없음'}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">총 데이터</span>
          <span className="summary-value">{kings.length}명</span>
        </div>
      </div>
    </div>
  );
};

export default TimelineFilter;
