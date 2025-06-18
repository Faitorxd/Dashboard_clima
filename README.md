# Monitoreo Inteligente de Planta de Energía

Un sistema de control y supervisión en tiempo real para plantas de energía, construido con Next.js, Chart.js y Tailwind CSS. Permite monitorear y visualizar parámetros críticos de operación.

## 🚀 Características

### Parámetros Monitoreados

1. **Tensión de Salida**
   - Rango: 200-250V (normal: 220-240V)
   - Cambios graduales y controlados
   - Gráfico de líneas con área rellena
   - Alertas por valores fuera de rango

2. **Frecuencia del Sistema**
   - Rango: 59.5-60.5Hz (normal: 59.9-60.1Hz)
   - Parámetro muy estable
   - Monitoreo de estabilidad
   - Crítico para la calidad de energía

3. **Temperatura del Sistema**
   - Rango: 30-80°C (normal: 45-60°C)
   - Cambios graduales con posibles picos
   - Indicador de eficiencia operativa
   - Alertas por sobrecalentamiento

4. **Consumo de Combustible**
   - Rango: 0-100% (crítico: <20%)
   - Cambios abruptos por carga/descarga
   - Gráfico de barras con colores dinámicos
   - Monitoreo de eficiencia energética

5. **Demanda Eléctrica**
   - Rango: 20-120MW (picos: >100MW)
   - Patrones según uso horario
   - Análisis de picos y valles
   - Planificación de capacidad

### Componentes del Sistema

- **Panel de Alertas**: Estado crítico del sistema en tiempo real
- **Tarjetas de Estadísticas**: Valores actuales, promedios y tendencias
- **Gráficos Especializados**: Visualización específica por parámetro
- **Análisis Correlacional**: Relación entre parámetros
- **Sistema de Alertas**: Notificaciones automáticas por rangos críticos
- **Interfaz Responsiva**: Optimizada para diferentes dispositivos

## 🛠️ Tecnologías Utilizadas

- **Next.js 15**: Framework de React para el frontend
- **Chart.js**: Librería de gráficos interactivos
- **react-chartjs-2**: Wrapper de React para Chart.js
- **Tailwind CSS**: Framework de CSS utilitario
- **Lucide React**: Iconos modernos
- **React Hooks**: Gestión de estado y efectos

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd dashboard
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎯 Uso

### Datos de Simulación

El sistema incluye un generador de datos realistas que simula:

- **Tensión**: Cambios graduales entre 220-240V con variaciones de ±2V/hora
- **Frecuencia**: Estabilidad en 60Hz con variaciones de ±0.05Hz/hora
- **Temperatura**: Base 45-55°C con picos aleatorios de ±7.5°C
- **Combustible**: Consumo gradual con descargas abruptas (25% probabilidad)
- **Demanda**: Patrones horarios realistas con picos en horas pico

### Personalización

Para conectar con datos reales, modifica el hook `useDataGenerator` en `app/hooks/useDataGenerator.js`:

```javascript
// Ejemplo de integración con API real
const fetchPlantData = async () => {
  const response = await fetch('/api/plant-data');
  const data = await response.json();
  
  return {
    tension: { labels: data.tension.labels, values: data.tension.values },
    frecuencia: { labels: data.frecuencia.labels, values: data.frecuencia.values },
    temperatura: { labels: data.temperatura.labels, values: data.temperatura.values },
    combustible: { labels: data.combustible.labels, values: data.combustible.values },
    demanda: { labels: data.demanda.labels, values: data.demanda.values }
  };
};
```

## 📊 Tipos de Gráficos Implementados

### Para Parámetros Graduales
- **Gráfico de Líneas**: Tensión, frecuencia y temperatura
- **Área Rellena**: Enfatiza la magnitud de los cambios
- **Curvas Suaves**: Para transiciones naturales

### Para Parámetros Variables
- **Gráfico de Barras**: Combustible y demanda
- **Colores Dinámicos**: Indican la magnitud del cambio
- **Análisis de Patrones**: Identificación de picos y valles

### Análisis Correlacional
- **Gráficos Duales**: Comparación entre parámetros
- **Ejes Separados**: Para diferentes escalas
- **Identificación de Relaciones**: Causa-efecto entre variables

## 🚨 Sistema de Alertas

### Niveles de Alerta
- **🔴 Crítico**: Acción inmediata requerida
- **🟡 Advertencia**: Monitoreo intensivo
- **🟢 Normal**: Operación estable

### Rangos de Alerta
- **Tensión**: <210V o >250V (crítico), <215V o >245V (advertencia)
- **Frecuencia**: <59.8Hz o >60.2Hz (crítico)
- **Temperatura**: >70°C (crítico), >60°C (advertencia)
- **Combustible**: <10% (crítico), <20% (advertencia)
- **Demanda**: >110MW (crítico), >100MW (advertencia)

## 🎨 Mejores Prácticas Implementadas

1. **Responsive Design**: Adaptable a todos los dispositivos
2. **Accesibilidad**: Contraste adecuado y navegación por teclado
3. **Performance**: Actualizaciones eficientes cada 10 segundos
4. **UX/UI**: Interfaz intuitiva con feedback visual inmediato
5. **Código Limpio**: Componentes reutilizables y bien estructurados
6. **Seguridad**: Validación de rangos y alertas automáticas

## 🔧 Scripts Disponibles

- `npm run dev`: Servidor de desarrollo
- `npm run build`: Construcción para producción
- `npm run start`: Servidor de producción
- `npm run lint`: Verificación de código

## 📈 Próximas Mejoras

- [ ] Integración con SCADA real
- [ ] Base de datos para histórico
- [ ] Predicción de fallas (ML)
- [ ] Reportes automáticos
- [ ] Notificaciones push
- [ ] Modo oscuro
- [ ] Exportación de datos
- [ ] Múltiples plantas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.
