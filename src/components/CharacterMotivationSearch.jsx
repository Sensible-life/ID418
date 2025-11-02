// src/components/CharacterMotivationSearch.jsx

import React, { useState } from 'react';

const mockResults = [
  { id: 1, snippet: "세조가 몹시 '불안'해하며 궁궐 뒤뜰을 서성였다는 기록이 있다.", emotion: "불안", date: "1455년 10월" },
  { id: 2, snippet: "신숙주가 '야심'을 숨기지 않고 이 일에 앞장섰다.", emotion: "야심", date: "1453년 10월" },
  { id: 3, snippet: "김종서의 '주저'하는 모습에 왕의 노여움이 극에 달했다.", emotion: "주저", date: "1453년 9월" },
];

const CharacterMotivationSearch = () => {
  const [characterName, setCharacterName] = useState('한명회');
  const [targetEmotion, setTargetEmotion] = useState('야망');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    // 실제로는 여기서 API 호출 및 결과 필터링 로직이 들어갑니다.
    console.log(`Searching for: ${characterName} with emotion: ${targetEmotion}`);
    setTimeout(() => setIsSearching(false), 500);
  };

  const emotionIcons = {
    '야망': '🎯',
    '불안': '😰',
    '주저': '🤔',
    '공포': '😨',
    '질투': '😤',
    '충성': '🛡️',
  };

  return (
    <div className="sidebar-section">
      <div className="section-header">
        <h3 className="section-title">인물-동기 연관 검색 🎭</h3>
        <p className="section-description">특정 인물과 감정 키워드로 실록 검색</p>
      </div>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="character" className="form-label">
            인물 이름
          </label>
          <input
            id="character"
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="form-input"
            placeholder="예: 이성계, 정몽주"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="emotion" className="form-label">
            타겟 감정/동기
          </label>
          <select
            id="emotion"
            value={targetEmotion}
            onChange={(e) => setTargetEmotion(e.target.value)}
            className="form-select"
          >
            {['야망', '불안', '주저', '공포', '질투', '충성'].map(emotion => (
              <option key={emotion} value={emotion}>
                {emotionIcons[emotion]} {emotion}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isSearching}
          className="search-button"
        >
          {isSearching ? (
            <>
              <svg style={{ 
                display: 'inline-block',
                animation: 'spin 1s linear infinite',
                marginRight: '0.5rem',
                width: '1rem',
                height: '1rem'
              }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              검색 중...
            </>
          ) : (
            '🔍 기록 속 동기 탐색'
          )}
        </button>
      </form>
      
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ 
          paddingTop: '1rem', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '1rem'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#e2e8f0' }}>
              결과 스니펫
            </h4>
            <span style={{ 
              fontSize: '0.75rem',
              background: 'rgba(251, 191, 36, 0.1)',
              color: '#fbbf24',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontWeight: '600'
            }}>
              {mockResults.length}건
            </span>
          </div>
          <ul className="results-list">
            {mockResults.map(result => (
              <li key={result.id} className="result-item">
                <div className="result-header">
                  <span className="result-emotion">
                    {emotionIcons[result.emotion]} [{result.emotion}]
                  </span>
                  <span className="result-date">{result.date}</span>
                </div>
                <p className="result-snippet">{result.snippet}</p>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ 
          paddingTop: '1rem', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          💡 검색 결과를 클릭하면 전문을 확인할 수 있습니다.
        </div>
      </div>
    </div>
  );
};

export default CharacterMotivationSearch;

