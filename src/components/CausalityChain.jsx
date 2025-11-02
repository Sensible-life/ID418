// src/components/CausalityChain.jsx

import React, { useState } from 'react';
import causalityChainsData from '../data/causalityChains.json';

const CausalityChain = () => {
  const [selectedEvent, setSelectedEvent] = useState('joseon_founding');
  const [selectedChain, setSelectedChain] = useState('joseon_founding');

  // 캐시된 인과관계 데이터 사용
  const causalityData = (() => {
    const chain = causalityChainsData.chains.find(c => c.id === selectedChain);
    if (!chain) {
      // 기본값 (fallback) - 첫 번째 체인 사용
      const defaultChain = causalityChainsData.chains[0];
      if (defaultChain) {
        return {
          before: defaultChain.before || [],
          current: defaultChain.current,
          after: defaultChain.after || []
        };
      }
      return {
        before: [],
        current: { id: 'default', title: '데이터 없음', date: '', type: '', description: '' },
        after: []
      };
    }
    return {
      before: chain.before || [],
      current: chain.current,
      after: chain.after || []
    };
  })();

  const EventCard = ({ event, position, isSelected }) => {
    const getBgColor = () => {
      if (position === 'current') {
        return 'linear-gradient(135deg, #ca8a04 0%, #ea580c 100%)';
      } else if (position === 'before') {
        return 'linear-gradient(135deg, #1e40af 0%, #111827 100%)';
      } else {
        return 'linear-gradient(135deg, #15803d 0%, #14532d 100%)';
      }
    };

    const getBorderColor = () => {
      return isSelected ? 'rgba(251, 191, 36, 0.8)' : 'rgba(75, 85, 99, 0.5)';
    };

    return (
      <div 
        style={{
          background: getBgColor(),
          border: `2px solid ${getBorderColor()}`,
          borderRadius: '0.5rem',
          padding: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
          }
        }}
        onClick={() => setSelectedEvent(event.id)}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between',
          marginBottom: '0.5rem'
        }}>
          <h4 style={{ 
            fontWeight: '700', 
            color: '#ffffff', 
            fontSize: '0.875rem',
            margin: 0
          }}>
            {event.title}
          </h4>
          <span style={{ 
            fontSize: '0.75rem',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            color: '#ffffff'
          }}>
            {event.type}
          </span>
        </div>
        <p style={{ 
          fontSize: '0.75rem', 
          color: 'rgba(255, 255, 255, 0.9)', 
          margin: '0 0 0.5rem 0'
        }}>
          {event.date}
        </p>
        <p style={{ 
          fontSize: '0.875rem', 
          color: '#f3f4f6', 
          lineHeight: '1.5',
          margin: 0
        }}>
          {event.description}
        </p>
        {event.impact && (
          <div style={{ 
            marginTop: '0.5rem', 
            paddingTop: '0.5rem', 
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <span style={{ 
              fontSize: '0.75rem', 
              color: '#fef3c7'
            }}>
              영향도: {event.impact}
            </span>
          </div>
        )}
      </div>
    );
  };

  const Arrow = ({ direction }) => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '0.5rem 0'
    }}>
      <svg 
        style={{
          width: '1.5rem',
          height: '1.5rem',
          color: '#fbbf24',
          transform: direction === 'down' ? 'rotate(90deg)' : 'none',
        }}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 5l7 7-7 7" 
        />
      </svg>
    </div>
  );

  return (
    <div className="chart-area" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="section-header">
        <h3 className="section-title">사건 인과관계 체인 탐색 🔗</h3>
        <p className="section-description">
          중심 사건의 전후 연관 기록을 시각화합니다
        </p>
      </div>

      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        overflowX: 'hidden',
        minHeight: 0,
        paddingRight: '0.5rem'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Before Events */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{ 
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#60a5fa',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                이전 사건
              </span>
              <div style={{ 
                flex: 1, 
                height: '1px', 
                background: '#1e3a8a'
              }}></div>
            </div>
            {causalityData.before.map((event) => (
              <div key={event.id}>
                <EventCard 
                  event={event} 
                  position="before"
                  isSelected={selectedEvent === event.id}
                />
                <Arrow direction="down" />
              </div>
            ))}
          </div>

          {/* Current Event */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{ 
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#fbbf24',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                중심 사건
              </span>
              <div style={{ 
                flex: 1, 
                height: '1px', 
                background: '#ca8a04'
              }}></div>
            </div>
            <EventCard 
              event={causalityData.current} 
              position="current"
              isSelected={selectedEvent === causalityData.current.id}
            />
            <Arrow direction="down" />
          </div>

          {/* After Events */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{ 
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#4ade80',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                이후 사건
              </span>
              <div style={{ 
                flex: 1, 
                height: '1px', 
                background: '#15803d'
              }}></div>
            </div>
            {causalityData.after.map((event, index) => (
              <div key={event.id}>
                <EventCard 
                  event={event} 
                  position="after"
                  isSelected={selectedEvent === event.id}
                />
                {index < causalityData.after.length - 1 && <Arrow direction="down" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '1rem', 
        paddingTop: '1rem', 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '0.75rem',
        color: '#64748b',
        flexShrink: 0
      }}>
        💡 카드를 클릭하면 해당 사건의 원문을 확인할 수 있습니다.
      </div>
    </div>
  );
};

export default CausalityChain;

