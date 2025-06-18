import { useState, useEffect } from "react";

export function usePlantDataFromAPI() {
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;
    async function fetchData() {
      try {
        const res = await fetch("http://127.0.0.1:8000/simulate");
        if (!res.ok) {
          throw new Error("Error en la respuesta del backend: " + res.status);
        }
        const data = await res.json();
        console.log("Datos recibidos del backend:", data);

        // Solo tomar los últimos 12 puntos para las gráficas
        const lastN = 12;
        const labels = data.slice(-lastN).map(d => d.Fecha);
        const eficiencia = data.slice(-lastN).map(d => d.Eficiencia);
        const tension = data.slice(-lastN).map(d => d.Voltaje);
        const temperatura = data.slice(-lastN).map(d => d.Temperatura);

        // Para alertas, puedes filtrar los puntos con alerta_total
        const alertas = data
          .map((d, i) => d.alerta_total ? { ...d, index: i } : null)
          .filter(Boolean);

        setPlantData({
          eficiencia: { labels, values: eficiencia },
          tension: { labels, values: tension },
          temperatura: { labels, values: temperatura },
          alertas, // array de puntos con alerta
          raw: data // por si necesitas más adelante
        });
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener datos del backend:", err);
        setPlantData(null);
        setLoading(false);
      }
    }
    fetchData();
    interval = setInterval(fetchData, 10000); // refresca cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  return { plantData, loading };
} 