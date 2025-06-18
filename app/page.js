'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Zap, Gauge, Thermometer, Fuel, Activity, TrendingUp, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import GradualLineChart from './components/GradualLineChart';
import AbruptBarChart from './components/AbruptBarChart';
import AreaChart from './components/AreaChart';
import StatsCard from './components/StatsCard';
import PlantAlert from './components/PlantAlert';
import Tabs from './components/Tabs';
import SmallDemandChart from './components/SmallDemandChart';
import './dashboard.css';
import { usePlantDataFromAPI } from "./hooks/usePlantDataFromAPI";
import StatCard from './components/StatCard';
import { formatNumber } from './utils/format';

export default function Dashboard() {
  const { plantData, loading } = usePlantDataFromAPI();
  const [infoExpandida, setInfoExpandida] = useState(false);
  const [expandida, setExpandida] = useState({ eficiencia: false, tension: false, temperatura: false });
  const [alertHistory, setAlertHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Calcula los valores actuales y alertas ANTES del useEffect
  const lastIdx = plantData?.eficiencia?.values?.length - 1;
  const eficienciaActual = plantData?.eficiencia?.values?.[lastIdx];
  const voltajeActual = plantData?.tension?.values?.[lastIdx];
  const temperaturaActual = plantData?.temperatura?.values?.[lastIdx];
  const alertas = plantData?.alertas || [];

  // Guardar historial de alertas
  useEffect(() => {
    if (alertas && alertas.length > 0) {
      setAlertHistory(prev => [
        ...alertas.map(a => ({ ...a, _ts: Date.now() })),
        ...prev
      ]);
    }
  }, [JSON.stringify(alertas)]);

  // Mostrar loading mientras se obtienen los datos
  if (loading || !plantData) {
    return <div style={{color: '#fff', fontSize: 24, textAlign: 'center', marginTop: 80}}>Cargando datos...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header moderno con gradiente */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-icon">
              <Zap className="header-refresh-icon" />
            </div>
            <div>
              <h1 className="header-title">Monitoreo Inteligente</h1>
              <p className="header-subtitle">Planta de Energía • Tiempo Real</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Layout dinámico con grid asimétrico */}
        <div className="grid grid-cols-12 gap-6 auto-rows-min">
          
          {/* Alerts - Ocupa toda la parte superior */}
          <div className="col-span-12 bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-3xl shadow-2xl border border-red-500/30 overflow-hidden backdrop-blur-sm mt-0">
            <div className="bg-gradient-to-r from-red-800/80 to-orange-800/80 px-8 py-6 border-b border-red-500/30">
              <h2 className="alert-title-main">
                <AlertTriangle className="w-6 h-6 text-red-300" />
                Estado del Sistema
              </h2>
            </div>
            <div className="p-8">
              <PlantAlert data={plantData} />
            </div>
          </div>

          {/* Stats Cards - Grid dinámico */}
          <div className="col-span-12">
            <div className="stats-grid">
              <StatCard
                icon={<TrendingUp className="icon icon-animated-pulse" />}
                colorClass="card-eficiencia"
                title="Eficiencia"
                value={formatNumber(eficienciaActual)}
                unit="%"
                badge={
                  <span className={`stat-badge ${
                    eficienciaActual > 85 ? 'stat-badge-green' : eficienciaActual < 60 ? 'stat-badge-red' : 'stat-badge-gray'
                  }`}>
                    {eficienciaActual > 85 ? '↑' : eficienciaActual < 60 ? '↓' : '='} {formatNumber(Math.abs(eficienciaActual - 85))}%
                  </span>
                }
                expanded={expandida.eficiencia}
                onClick={() => setExpandida(e => ({ ...e, eficiencia: !e.eficiencia }))}
              >
                <p className="stat-sub">Prom: 85%</p>
                {expandida.eficiencia && (
                  <div className="demanda-extra">
                    <div className="demanda-extra-title">Detalles de la Eficiencia</div>
                    <div className="demanda-extra-info">
                      <div>Máximo: 100%</div>
                      <div>Mínimo: 60%</div>
                    </div>
                    <div className="demanda-extra-chart">
                      <SmallDemandChart data={plantData.eficiencia} />
                    </div>
                  </div>
                )}
              </StatCard>
              <StatCard
                icon={<Zap className="icon icon-animated-spin" />}
                colorClass="card-tension"
                title="Voltaje"
                value={formatNumber(voltajeActual)}
                unit="V"
                badge={
                  <span className={`stat-badge ${
                    voltajeActual > 240 ? 'stat-badge-green' : voltajeActual < 200 ? 'stat-badge-red' : 'stat-badge-gray'
                  }`}>
                    {voltajeActual > 240 ? '↑' : voltajeActual < 200 ? '↓' : '='} {formatNumber(Math.abs(voltajeActual - 240))}V
                  </span>
                }
                expanded={expandida.tension}
                onClick={() => setExpandida(e => ({ ...e, tension: !e.tension }))}
              >
                <p className="stat-sub">Prom: 240V</p>
                {expandida.tension && (
                  <div className="demanda-extra">
                    <div className="demanda-extra-title">Detalles del Voltaje</div>
                    <div className="demanda-extra-info">
                      <div>Máximo: 250V</div>
                      <div>Mínimo: 200V</div>
                    </div>
                    <div className="demanda-extra-chart">
                      <SmallDemandChart data={plantData.tension} />
                    </div>
                  </div>
                )}
              </StatCard>
              <StatCard
                icon={<Thermometer className="icon icon-animated-pulse" />}
                colorClass="card-temperatura"
                title="Temperatura"
                value={formatNumber(temperaturaActual)}
                unit="°C"
                badge={
                  <span className={`stat-badge ${
                    temperaturaActual > 60 ? 'stat-badge-green' : temperaturaActual < 30 ? 'stat-badge-red' : 'stat-badge-gray'
                  }`}>
                    {temperaturaActual > 60 ? '↑' : temperaturaActual < 30 ? '↓' : '='} {formatNumber(Math.abs(temperaturaActual - 60))}°C
                  </span>
                }
                expanded={expandida.temperatura}
                onClick={() => setExpandida(e => ({ ...e, temperatura: !e.temperatura }))}
              >
                <p className="stat-sub">Prom: 60°C</p>
                {expandida.temperatura && (
                  <div className="demanda-extra">
                    <div className="demanda-extra-title">Detalles de la Temperatura</div>
                    <div className="demanda-extra-info">
                      <div>Máximo: 80°C</div>
                      <div>Mínimo: 30°C</div>
                    </div>
                    <div className="demanda-extra-chart">
                      <SmallDemandChart data={plantData.temperatura} />
                    </div>
                  </div>
                )}
              </StatCard>
            </div>
          </div>

          {/* Gráfico principal - Tabs solo para Eficiencia, Voltaje y Temperatura */}
          <div className="col-span-12">
            <div className="bg-gradient-to-br from-slate-800/80 to-purple-900/80 rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden backdrop-blur-sm">
              <div className="bg-gradient-to-r from-purple-800/80 to-indigo-800/80 px-8 py-6 border-b border-purple-500/30">
                <h2 className="main-section-title">
                  <TrendingUp className="main-section-icon" />
                  Monitoreo en Tiempo Real
                </h2>
              </div>
              <div className="p-8">
                <Tabs
                  tabs={['Eficiencia', 'Voltaje', 'Temperatura']}
                  panels={[
                    <GradualLineChart key="eficiencia" data={plantData.eficiencia} title="Eficiencia (%) durante el día" />, 
                    <GradualLineChart key="tension" data={plantData.tension} title="Voltaje (V) durante el día" />, 
                    <GradualLineChart key="temperatura" data={plantData.temperatura} title="Temperatura (°C) durante el día" />
                  ]}
                  tabClassName="main-tab-title"
                />
              </div>
            </div>
          </div>

          {/* Información del sistema - Parte inferior */}
          <div className="col-span-12">
            <div className="bg-gradient-to-br from-slate-800/80 to-indigo-900/80 rounded-3xl shadow-2xl border border-indigo-500/30 overflow-hidden backdrop-blur-sm">
              <div
                className="info-header-expandible"
                onClick={() => setInfoExpandida((v) => !v)}
                style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <h3 className="text-xl font-bold text-white" style={{ margin: 0 }}>
                  Información del Sistema
                </h3>
                <ChevronDown className={`info-chevron${infoExpandida ? ' rotated' : ''}`} />
              </div>
              <div
                className={`info-expandible-content${infoExpandida ? ' expanded' : ''}`}
                style={{ maxHeight: infoExpandida ? 800 : 0, overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)' }}
              >
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-3 font-bold text-green-300 text-lg">
                        <TrendingUp className="w-5 h-5" />
                        Eficiencia
                      </h4>
                      <ul className="text-green-200 space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong className="text-white">Eficiencia:</strong> 60-100% (óptimo: 85-95%)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Varía durante el día según condiciones de operación.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-3 font-bold text-blue-300 text-lg">
                        <Zap className="w-5 h-5" />
                        Voltaje
                      </h4>
                      <ul className="text-blue-200 space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong className="text-white">Voltaje:</strong> 200-250V (normal: 220-240V)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Debe mantenerse estable para evitar daños.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-3 font-bold text-orange-300 text-lg">
                        <Thermometer className="w-5 h-5" />
                        Temperatura
                      </h4>
                      <ul className="text-orange-200 space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong className="text-white">Temperatura:</strong> 30-80°C (óptimo: 45-60°C)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-3 h-3 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Controlar para evitar sobrecalentamiento.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de alertas recientes */}
          <div className="col-span-12">
            <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-3xl shadow-2xl border border-red-500/30 overflow-hidden backdrop-blur-sm mt-0">
              <div className="bg-gradient-to-r from-red-800/80 to-orange-800/80 px-8 py-6 border-b border-red-500/30" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h2 className="alert-title-main">Alertas recientes</h2>
                <button
                  onClick={() => setShowHistory(true)}
                  style={{
                    background: '#fff',
                    color: '#7c3aed',
                    border: '1.5px solid #a78bfa',
                    borderRadius: 12,
                    padding: '8px 18px',
                    fontWeight: 600,
                    marginBottom: 0,
                    cursor: 'pointer'
                  }}
                >
                  Ver historial de alertas
                </button>
              </div>
              <div className="p-8">
                <ul style={{color: '#222', fontSize: 16}}>
                  {alertas.length === 0 && <li>No hay alertas recientes.</li>}
                  {alertas.map((a, i) => (
                    <li key={i} style={{marginBottom: 8}}>
                      <b>{a.Fecha}</b> - {a.fuente_alerta.join(", ")} - T: {a.detalles.temp.toFixed(2)}°C, V: {a.detalles.volt.toFixed(2)}V, E: {a.detalles.efic.toFixed(2)}%
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Modal de historial de alertas */}
          {showHistory && (
            <div style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{
                background: '#fff', color: '#222', borderRadius: 16, padding: 32, minWidth: 350, maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 8px 32px 0 rgba(44,0,80,0.18)', position: 'relative'
              }}>
                <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, color: '#7c3aed' }}>Historial de Alertas</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  style={{
                    position: 'absolute', top: 24, right: 32, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#7c3aed'
                  }}
                >×</button>
                <ul style={{ fontSize: 15, color: '#222', padding: 0, margin: 0 }}>
                  {alertHistory.length === 0 && <li>No hay alertas en el historial.</li>}
                  {alertHistory.map((a, i) => (
                    <li key={i} style={{ marginBottom: 10, borderBottom: '1px solid #eee', paddingBottom: 6 }}>
                      <b>{a.Fecha || a._ts}</b> - {a.fuente_alerta?.join(", ")} - T: {a.detalles?.temp?.toFixed(2)}°C, V: {a.detalles?.volt?.toFixed(2)}V, E: {a.detalles?.efic?.toFixed(2)}%
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
