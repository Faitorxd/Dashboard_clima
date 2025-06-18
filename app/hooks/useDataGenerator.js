'use client';

import { useState, useEffect } from 'react';

export function useDataGenerator() {
  const [isClient, setIsClient] = useState(false);
  const [plantData, setPlantData] = useState(null); // Inicializar como null

  // Marcar que estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generar datos de tensión (graduales - cambios suaves)
  const generateTensionData = () => {
    const labels = [];
    const values = [];
    let currentValue = 220 + Math.random() * 20; // Entre 220-240V
    
    for (let i = 0; i < 24; i++) {
      labels.push(`${i}:00`);
      // Cambio gradual: máximo ±2V por hora
      const change = (Math.random() - 0.5) * 4;
      currentValue = Math.max(200, Math.min(250, currentValue + change));
      values.push(Math.round(currentValue * 10) / 10);
    }
    
    return { labels, values };
  };

  // Generar datos de frecuencia (graduales - muy estables)
  const generateFrecuenciaData = () => {
    const labels = [];
    const values = [];
    let currentValue = 60 + (Math.random() - 0.5) * 0.2; // Entre 59.9-60.1 Hz
    
    for (let i = 0; i < 24; i++) {
      labels.push(`${i}:00`);
      // Cambio muy gradual: máximo ±0.05 Hz por hora
      const change = (Math.random() - 0.5) * 0.1;
      currentValue = Math.max(59.5, Math.min(60.5, currentValue + change));
      values.push(Math.round(currentValue * 100) / 100);
    }
    
    return { labels, values };
  };

  // Generar datos de temperatura (graduales con picos)
  const generateTemperaturaData = () => {
    const labels = [];
    const values = [];
    let currentValue = 45 + Math.random() * 10; // Entre 45-55°C
    
    for (let i = 0; i < 24; i++) {
      labels.push(`${i}:00`);
      // Cambio gradual con posibles picos
      if (Math.random() < 0.1) { // 10% probabilidad de pico
        currentValue += (Math.random() - 0.5) * 15; // Pico de ±7.5°C
      } else {
        const change = (Math.random() - 0.5) * 3; // Cambio normal ±1.5°C
        currentValue += change;
      }
      currentValue = Math.max(30, Math.min(80, currentValue));
      values.push(Math.round(currentValue * 10) / 10);
    }
    
    return { labels, values };
  };

  // Generar datos de combustible (abruptos - cambios por carga/descarga)
  const generateCombustibleData = () => {
    const labels = [];
    const values = [];
    let currentValue = 70 + Math.random() * 20; // Entre 70-90%
    
    for (let i = 0; i < 24; i++) {
      labels.push(`${i}:00`);
      // Cambio abrupto: 25% probabilidad de cambio brusco
      if (Math.random() < 0.25) {
        if (Math.random() < 0.5) {
          currentValue -= Math.random() * 30; // Descarga
        } else {
          currentValue += Math.random() * 20; // Recarga
        }
      } else {
        // Consumo gradual
        currentValue -= Math.random() * 2;
      }
      currentValue = Math.max(0, Math.min(100, currentValue));
      values.push(Math.round(currentValue * 10) / 10);
    }
    
    return { labels, values };
  };

  // Generar datos de demanda eléctrica (abruptos - según uso)
  const generateDemandaData = () => {
    const labels = [];
    const values = [];
    let currentValue = 50 + Math.random() * 30; // Entre 50-80 MW
    
    for (let i = 0; i < 24; i++) {
      labels.push(`${i}:00`);
      // Patrón de demanda: picos en horas pico
      const hour = i;
      let baseDemand = 50;
      
      if (hour >= 7 && hour <= 9) { // Mañana
        baseDemand = 80 + Math.random() * 20;
      } else if (hour >= 18 && hour <= 21) { // Noche
        baseDemand = 85 + Math.random() * 25;
      } else if (hour >= 22 || hour <= 6) { // Madrugada
        baseDemand = 30 + Math.random() * 20;
      } else { // Día normal
        baseDemand = 60 + Math.random() * 20;
      }
      
      // Variación aleatoria
      const variation = (Math.random() - 0.5) * 20;
      currentValue = Math.max(20, Math.min(120, baseDemand + variation));
      values.push(Math.round(currentValue * 10) / 10);
    }
    
    return { labels, values };
  };

  // Generar datos de eficiencia (porcentaje durante el día)
  const generateEficienciaData = () => {
    const labels = [];
    const values = [];
    let currentValue = 80 + Math.random() * 10; // Entre 80-90%
    for (let i = 0; i < 24; i++) {
      labels.push(`${i}:00`);
      // Pico de eficiencia durante el día (10-18h)
      if (i >= 10 && i <= 18) {
        currentValue += (Math.random() - 0.3) * 2; // Más probable subir
      } else {
        currentValue += (Math.random() - 0.5) * 2; // Cambios suaves
      }
      currentValue = Math.max(60, Math.min(100, currentValue));
      values.push(Math.round(currentValue * 10) / 10);
    }
    return { labels, values };
  };

  // Actualizar datos cada 10 segundos (más realista para planta)
  useEffect(() => {
    if (!isClient) return; // No generar datos en el servidor

    const updateData = () => {
      setPlantData({
        eficiencia: generateEficienciaData(),
        tension: generateTensionData(),
        temperatura: generateTemperaturaData(),
        // frecuencia y combustible ya no se usan
      });
    };

    // Datos iniciales
    updateData();

    // Actualizar cada 10 segundos
    const interval = setInterval(updateData, 10000);

    return () => clearInterval(interval);
  }, [isClient]); // Dependencia en isClient

  // Función para actualizar manualmente
  const refreshData = () => {
    if (!isClient) return; // No generar datos en el servidor
    
    setPlantData({
      eficiencia: generateEficienciaData(),
      tension: generateTensionData(),
      temperatura: generateTemperaturaData(),
      // frecuencia y combustible ya no se usan
    });
  };

  return {
    plantData,
    refreshData,
    isClient
  };
} 