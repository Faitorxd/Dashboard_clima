'use client';

import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

export default function PlantAlert({ data }) {
  const getAlerts = () => {
    if (!data || !data.tension || !data.tension.values || data.tension.values.length === 0) {
      return [{
        type: 'info',
        title: 'Cargando Datos',
        message: 'Esperando datos del sistema...',
        icon: Info
      }];
    }

    const alerts = [];
    
    // Alerta de tensión
    const currentTension = data.tension.values[data.tension.values.length - 1];
    if (currentTension < 210 || currentTension > 250) {
      alerts.push({
        type: 'error',
        title: 'Tensión Crítica',
        message: `Tensión fuera de rango: ${currentTension.toFixed(2)}V`,
        icon: XCircle
      });
    } else if (currentTension < 215 || currentTension > 245) {
      alerts.push({
        type: 'warning',
        title: 'Tensión Baja',
        message: `Tensión en límite: ${currentTension.toFixed(2)}V`,
        icon: AlertTriangle
      });
    }

    // Alerta de eficiencia
    if (data.eficiencia && data.eficiencia.values && data.eficiencia.values.length > 0) {
      const currentEficiencia = data.eficiencia.values[data.eficiencia.values.length - 1];
      if (currentEficiencia < 70) {
        alerts.push({
          type: 'error',
          title: 'Eficiencia Crítica',
          message: `Eficiencia muy baja: ${currentEficiencia.toFixed(2)}%`,
          icon: XCircle
        });
      } else if (currentEficiencia < 80) {
        alerts.push({
          type: 'warning',
          title: 'Eficiencia Baja',
          message: `Eficiencia baja: ${currentEficiencia.toFixed(2)}%`,
          icon: AlertTriangle
        });
      }
    }

    // Alerta de temperatura
    const currentTemperatura = data.temperatura.values[data.temperatura.values.length - 1];
    if (currentTemperatura > 70) {
      alerts.push({
        type: 'error',
        title: 'Temperatura Crítica',
        message: `Temperatura muy alta: ${currentTemperatura.toFixed(2)}°C`,
        icon: XCircle
      });
    } else if (currentTemperatura > 60) {
      alerts.push({
        type: 'warning',
        title: 'Temperatura Elevada',
        message: `Temperatura alta: ${currentTemperatura.toFixed(2)}°C`,
        icon: AlertTriangle
      });
    }

    // Estado general
    if (alerts.length === 0) {
      alerts.push({
        type: 'success',
        title: 'Estado Normal',
        message: 'Todos los parámetros están dentro de rangos normales',
        icon: CheckCircle
      });
    }

    return alerts;
  };

  const alerts = getAlerts();

  const getAlertClass = (type) => {
    switch (type) {
      case 'error':
        return 'alert-box alert-error';
      case 'warning':
        return 'alert-box alert-warning';
      case 'success':
        return 'alert-box alert-success';
      case 'info':
        return 'alert-box alert-info';
      default:
        return 'alert-box';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#eab308';
      case 'success':
        return '#22c55e';
      case 'info':
        return '#3b82f6';
      default:
        return '#64748b';
    }
  };

  return (
    <div className="alerts-list">
      {alerts.map((alert, index) => {
        const IconComponent = alert.icon;
        return (
          <div key={index} className={getAlertClass(alert.type)}>
            <span className="alert-icon" style={{ color: getIconColor(alert.type) }}>
              <IconComponent size={22} />
            </span>
            <div>
              <div className="alert-title">{alert.title}</div>
              <div className="alert-message">{alert.message}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 