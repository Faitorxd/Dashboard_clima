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

export default function GradualLineChart({ data, title = "Datos Graduales" }) {
  // Formatea los labels del eje X para mostrar la fecha completa
  const formattedLabels = data.labels.map(label => label);

  const chartData = {
    labels: formattedLabels,
    datasets: [
      {
        label: 'Valor',
        data: data.values,
        borderColor: '#2563eb', // Azul vibrante
        backgroundColor: 'rgba(37, 99, 235, 0.10)', // Azul claro
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 1.5,
        datalabels: {
          color: '#fff', // Etiquetas blancas
          font: { weight: 'bold', size: 12 },
          align: 'top',
          anchor: 'end',
          formatter: (value) => value.toFixed(2),
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
            return `Valor: ${context.parsed.y.toFixed(2)}`;
          }
        }
      },
      datalabels: {
        display: true,
        color: '#444',
        font: { weight: 'bold', size: 12 },
        align: 'top',
        anchor: 'end',
        formatter: (value) => value.toFixed(2),
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Fecha',
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
        ticks: {
          color: '#666',
          font: { size: 11 },
          callback: function(value) { return value.toFixed(2); }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return (
    <div className="h-80">
      <Line data={chartData} options={options} />
    </div>
  );
} 