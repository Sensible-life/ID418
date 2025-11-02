// src/components/EmotionTrendChart.jsx

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const EmotionTrendChart = ({ selectedKing }) => {
  // 모의 데이터 생성 (왕에 따라 다른 데이터)
  const generateData = (king) => {
    const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    
    // 왕에 따라 다른 감정 패턴 생성
    const baseMultiplier = king === '세종' ? 1.2 : king === '연산군' ? 1.8 : 1.0;
    
    return {
      labels,
      datasets: [
        {
          label: '기쁨/희망',
          data: labels.map(() => Math.floor(Math.random() * 30 * baseMultiplier) + 10),
          borderColor: 'rgb(251, 191, 36)',
          backgroundColor: 'rgba(251, 191, 36, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: '불안/우려',
          data: labels.map(() => Math.floor(Math.random() * 40 * baseMultiplier) + 20),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: '분노/격노',
          data: labels.map(() => Math.floor(Math.random() * 25 * (king === '연산군' ? 2 : 1)) + 5),
          borderColor: 'rgb(185, 28, 28)',
          backgroundColor: 'rgba(185, 28, 28, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: '슬픔/애도',
          data: labels.map(() => Math.floor(Math.random() * 20) + 8),
          borderColor: 'rgb(96, 165, 250)',
          backgroundColor: 'rgba(96, 165, 250, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e5e7eb',
          font: {
            size: 12,
            family: 'system-ui',
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#fbbf24',
        bodyColor: '#e5e7eb',
        borderColor: '#fbbf24',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}건`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.3)',
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 11,
          },
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div className="chart-area">
      <div className="section-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 className="section-title">감정/톤 시계열 분포 📈</h3>
          <span style={{ 
            padding: '0.5rem 1rem', 
            background: 'rgba(251, 191, 36, 0.1)', 
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#fbbf24'
          }}>
            {selectedKing || '전체'}
          </span>
        </div>
        <p className="section-description">
          {selectedKing || '전체 왕조'} 시기의 실록 기록 내 감정 키워드 빈도 추이
        </p>
      </div>
      <div className="chart-container">
        <Line options={options} data={generateData(selectedKing)} />
      </div>
      <div style={{ 
        marginTop: '1rem', 
        paddingTop: '1rem', 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '0.75rem',
        color: '#64748b'
      }}>
        💡 감정 라인을 클릭하면 해당 기록으로 이동할 수 있습니다.
      </div>
    </div>
  );
};

export default EmotionTrendChart;

