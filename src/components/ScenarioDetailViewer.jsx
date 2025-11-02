// src/components/ScenarioDetailViewer.jsx

import React, { useState } from 'react';

const ScenarioDetailViewer = ({ selectedEvent }) => {
  const [activeTab, setActiveTab] = useState('description');

  const mockEventData = {
    title: '선죽교 사건',
    date: '1392년 4월 4일',
    originalText: '是日, 鄭夢周至善竹橋, 李芳遠使人擊之, 夢周墜馬而死。血跡猶在橋上。',
    translation: '이날, 정몽주가 선죽교에 이르렀을 때, 이방원이 사람을 시켜 그를 공격하게 하였다. 몽주는 말에서 떨어져 죽었다. 피 자국이 아직도 다리 위에 남아있었다.',
    characters: [
      { name: '정몽주', role: '고려 충신', emotion: '충성, 비극' },
      { name: '이방원', role: '태종', emotion: '결단, 야망' },
      { name: '이성계', role: '태조', emotion: '복잡한 심경' },
    ],
    sceneElements: {
      location: '선죽교 (개경)',
      weather: '봄날 저녁',
      atmosphere: '긴장감, 비극적',
      props: ['말', '다리', '피 자국'],
    },
  };

  return (
    <div className="sidebar-section">
      <div className="section-header">
        <h3 className="section-title">시나리오 디테일 🖋️</h3>
        <p className="section-description">선택된 기록의 상세 정보</p>
      </div>

      {/* Tabs */}
      <div className="tab-group">
        {[
          { id: 'description', label: '개요', icon: '📋' },
          { id: 'characters', label: '인물', icon: '👥' },
          { id: 'scene', label: '장면', icon: '🎬' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {selectedEvent ? (
          <>
            {activeTab === 'description' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ 
                  background: 'rgba(30, 41, 59, 0.3)',
                  borderRadius: '0.75rem',
                  padding: '1rem'
                }}>
                  <h4 style={{ 
                    fontWeight: '700',
                    color: '#fbbf24',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem'
                  }}>
                    {mockEventData.title}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
                    {mockEventData.date}
                  </p>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>원문:</p>
                    <p style={{ 
                      fontSize: '0.875rem',
                      color: '#e2e8f0',
                      lineHeight: '1.5',
                      background: 'rgba(15, 23, 42, 0.5)',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      fontFamily: 'serif'
                    }}>
                      {mockEventData.originalText}
                    </p>
                  </div>
                  
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>국역:</p>
                    <p style={{ fontSize: '0.875rem', color: '#e2e8f0', lineHeight: '1.5' }}>
                      {mockEventData.translation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'characters' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {mockEventData.characters.map((char, idx) => (
                  <div key={idx} style={{ 
                    background: 'rgba(30, 41, 59, 0.3)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <h5 style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                          {char.name}
                        </h5>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{char.role}</p>
                      </div>
                      <span style={{ fontSize: '1.25rem' }}>👤</span>
                    </div>
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                      <p style={{ fontSize: '0.75rem', color: '#fbbf24' }}>감정: {char.emotion}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'scene' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: '🗺️ 장소', value: mockEventData.sceneElements.location },
                  { label: '🌤️ 날씨/시간', value: mockEventData.sceneElements.weather },
                  { label: '🎭 분위기', value: mockEventData.sceneElements.atmosphere },
                ].map((item, idx) => (
                  <div key={idx} style={{ 
                    background: 'rgba(30, 41, 59, 0.3)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem'
                  }}>
                    <h5 style={{ fontSize: '0.75rem', fontWeight: '600', color: '#e2e8f0', marginBottom: '0.5rem' }}>
                      {item.label}
                    </h5>
                    <p style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>{item.value}</p>
                  </div>
                ))}
                
                <div style={{ 
                  background: 'rgba(30, 41, 59, 0.3)',
                  borderRadius: '0.75rem',
                  padding: '0.75rem'
                }}>
                  <h5 style={{ fontSize: '0.75rem', fontWeight: '600', color: '#e2e8f0', marginBottom: '0.5rem' }}>
                    🎬 소품/요소
                  </h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {mockEventData.sceneElements.props.map((prop, idx) => (
                      <span key={idx} style={{ 
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(30, 41, 59, 0.5)',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        color: '#e2e8f0'
                      }}>
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.5' }}>
                차트나 체인에서 사건을 선택하면<br />
                상세 내용이 표시됩니다
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioDetailViewer;

