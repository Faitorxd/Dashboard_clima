'use client';

import { Line } from 'react-chartjs-2';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

export default function AreaChart({ gradualData, abruptData, title = "Comparación de Datos" }) {
  const chartData = {
    labels: gradualData.labels,
    datasets: [
      {
        label: 'Datos Graduales',
        data: gradualData.values,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.10)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 1.5,
        yAxisID: 'y',
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 12 },
          align: 'top',
          anchor: 'end',
          formatter: (value) => value,
        },
      },
      {
        label: 'Datos Abruptos',
        data: abruptData.values,
        borderColor: '#ea580c',
        backgroundColor: 'rgba(251, 146, 60, 0.10)',
        borderWidth: 3,
        fill: true,
        tension: 0,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#ea580c',
        pointBorderColor: '#fff',
        pointBorderWidth: 1.5,
        yAxisID: 'y1',
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 12 },
          align: 'top',
          anchor: 'end',
          formatter: (value) => value,
        },
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#444',
          font: { size: 12, weight: 'bold' }
        }
      },
      title: {
        display: true,
        text: title,
        font: { size: 15, weight: 'bold' },
        color: '#444'
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.95)',
        titleColor: '#222',
        bodyColor: '#444',
        borderColor: '#bbb',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false,
      },
      datalabels: {
        display: true,
        color: '#444',
        font: { weight: 'bold', size: 12 },
        align: 'top',
        anchor: 'end',
        formatter: (value) => value,
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Tiempo',
          color: 'white',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: { color: 'rgba(180,180,180,0.10)' },
        ticks: { color: '#666', font: { size: 11 } }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Datos Graduales',
          color: 'white',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: { color: 'rgba(180,180,180,0.10)' },
        ticks: { color: '#666', font: { size: 11 } }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Datos Abruptos',
          color: 'white',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: { drawOnChartArea: false, color: 'rgba(200,200,200,0.10)' },
        ticks: { color: '#666', font: { size: 11 } }
      }
    }
  };

  return (
    <div className="h-80">
      <Line data={chartData} options={options} />
    </div>
  );
} 