import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function SmallDemandChart({ data }) {
  if (!data || !data.labels || !data.values) return null;
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Demanda',
        data: data.values,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        datalabels: { display: false },
      }
    ]
  };
  const currentValue = data.values && data.values.length > 0 ? data.values[data.values.length - 1] : null;
  const unit = data.unit || '';
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#2563eb',
        bodyColor: '#444',
        borderColor: '#a78bfa',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Valor: ${context.parsed.y}${unit}`;
          }
        }
      },
      datalabels: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    interaction: {
      mode: 'nearest',
      intersect: true
    }
  };
  return (
    <div style={{ height: 50, width: '100%' }}>
      <Line data={chartData} options={options} height={50} />
    </div>
  );
} 