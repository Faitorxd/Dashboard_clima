'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function AbruptBarChart({ data, title = "Datos Abruptos" }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Valor',
        data: data.values,
        backgroundColor: data.values.map(() => 'rgba(251, 146, 60, 0.85)'),
        borderColor: data.values.map(() => '#ea580c'),
        borderWidth: 1.5,
        borderRadius: 4,
        borderSkipped: false,
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 12 },
          align: 'end',
          anchor: 'end',
          formatter: (value) => value,
        },
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        callbacks: {
          label: function(context) {
            return `Valor: ${context.parsed.y}`;
          }
        }
      },
      datalabels: {
        display: true,
        color: '#444',
        font: { weight: 'bold', size: 12 },
        align: 'end',
        anchor: 'end',
        formatter: (value) => value,
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Período',
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
        display: true,
        title: {
          display: true,
          text: 'Valor',
          color: 'white',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: { color: 'rgba(180,180,180,0.10)' },
        ticks: { color: '#666', font: { size: 11 } },
        beginAtZero: true
      }
    }
  };

  return (
    <div className="h-80">
      <Bar data={chartData} options={options} />
    </div>
  );
} 