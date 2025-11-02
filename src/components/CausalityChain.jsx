// src/components/CausalityChain.jsx

import React, { useState } from 'react';

const CausalityChain = () => {
  const [selectedEvent, setSelectedEvent] = useState('event2');

  // 모의 인과관계 데이터
  const causalityData = {
    before: [
      {
        id: 'event0',
        title: '정몽주 암살 계획',
        date: '1392년 3월',
        type: '정치적 모의',
        description: '이성계 일파가 정몽주 제거를 논의',
      },
      {
        id: 'event1',
        title: '선죽교 사건',
        date: '1392년 4월',
        type: '암살',
        description: '이방원이 정몽주를 선죽교에서 살해',
      },
    ],
    current: {
      id: 'event2',
      title: '조선 건국',
      date: '1392년 7월',
      type: '왕조 교체',
      description: '이성계가 왕위에 올라 조선을 건국',
      impact: '높음',
    },
    after: [
      {
        id: 'event3',
        title: '한양 천도 논의',
        date: '1394년 1월',
        type: '정치적 결정',
        description: '새 수도 건설 계획 시작',
      },
      {
        id: 'event4',
        title: '한양 천도',
        date: '1394년 10월',
        type: '수도 이전',
        description: '한양으로 수도를 옮기고 궁궐 건설',
      },
    ],
  };

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

