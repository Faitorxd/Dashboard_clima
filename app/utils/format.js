export function formatNumber(val, decimals = 2) {
  return typeof val === 'number' ? val.toFixed(decimals) : val;
}

export function exportAlertsToCSV(alerts) {
  if (!alerts || alerts.length === 0) return;
  const header = ['Fecha', 'Tipo', 'Fuente', 'Temperatura', 'Voltaje', 'Eficiencia'];
  const rows = alerts.map(a => [
    a.Fecha || '',
    a.type || '',
    (a.fuente_alerta || []).join(' | '),
    a.detalles?.temp?.toFixed(2) ?? '',
    a.detalles?.volt?.toFixed(2) ?? '',
    a.detalles?.efic?.toFixed(2) ?? ''
  ]);
  const csvContent = [header, ...rows]
    .map(row => row.map(val => `"${val}"`).join(','))
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'historial_alertas.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportPlantDataToCSV(plantData) {
  if (!plantData) return;
  const header = ['Fecha', 'Eficiencia', 'Voltaje', 'Temperatura'];
  // Asumimos que todas las series tienen el mismo número de labels
  const n = plantData.eficiencia.labels.length;
  const rows = Array.from({ length: n }, (_, i) => [
    plantData.eficiencia.labels[i] || '',
    plantData.eficiencia.values[i]?.toFixed(2) ?? '',
    plantData.tension.values[i]?.toFixed(2) ?? '',
    plantData.temperatura.values[i]?.toFixed(2) ?? ''
  ]);
  const csvContent = [header, ...rows]
    .map(row => row.map(val => `"${val}"`).join(','))
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'datos_planta.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 