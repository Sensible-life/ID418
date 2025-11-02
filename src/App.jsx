// src/App.jsx

import { useState } from 'react';
import './App.css';
import CharacterMotivationSearch from './components/CharacterMotivationSearch';
import EmotionTrendChart from './components/EmotionTrendChart';
import CausalityChain from './components/CausalityChain';
import TimelineFilter from './components/TimelineFilter';
import ScenarioDetailViewer from './components/ScenarioDetailViewer';

function App() {
  const [selectedKing, setSelectedKing] = useState('세종');
  const [activeView, setActiveView] = useState('emotion');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectKing = (king) => {
    setSelectedKing(king);
    setSelectedEvent(null);
  };

  return (
    <div className="app-container">
      {/* Clean Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-title-section">
            <h1 className="app-title">조선 스토리 연구소</h1>
            <p className="app-subtitle">작가를 위한 실록 기반 시나리오 확장 도구</p>
          </div>
          <div className="header-status">
            <span className="status-badge">Live</span>
            <span className="data-badge">673+ Records</span>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="app-main">
        {/* Left Sidebar */}
        <aside className="app-sidebar left">
          <TimelineFilter 
            selectedKing={selectedKing} 
            onSelectKing={handleSelectKing} 
          />
        </aside>

        {/* Center Content */}
        <section className="app-content">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              onClick={() => setActiveView('emotion')}
              className={`tab-button ${activeView === 'emotion' ? 'active' : ''}`}
            >
              <span className="tab-icon">📊</span>
              <span>감정/톤 트렌드</span>
            </button>
            <button
              onClick={() => setActiveView('causality')}
              className={`tab-button ${activeView === 'causality' ? 'active' : ''}`}
            >
              <span className="tab-icon">⛓️</span>
              <span>인과관계 체인</span>
            </button>
          </div>

          {/* Chart Area */}
          <div className="chart-area">
            {activeView === 'emotion' ? (
              <EmotionTrendChart selectedKing={selectedKing} />
            ) : (
              <CausalityChain />
            )}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="app-sidebar right">
          <div className="sidebar-section">
            <CharacterMotivationSearch />
          </div>
          <div className="sidebar-section">
            <ScenarioDetailViewer selectedEvent={selectedEvent} />
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
