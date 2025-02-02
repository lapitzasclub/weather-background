// src/App.tsx
import React, { useState } from 'react';
import WeatherBackground, { WeatherBackgroundProps } from './components/WeatherBackground/WeatherBackground';
import './App.css';

// Controles booleanos para efectos como nieve y niebla
const binaryControls: { name: keyof Pick<WeatherBackgroundProps, 'snow' | 'fog'>; label: string }[] = [
  { name: 'snow', label: 'Nieve' },
  { name: 'fog', label: 'Niebla' },
];

// Controles de intensidad para nubosidad, lluvia, viento y temperatura
const intensityControls: {
  name: keyof Pick<WeatherBackgroundProps, 'cloudIntensity' | 'rainIntensity' | 'windIntensity' | 'temperature'>;
  label: string;
  options: string[];
}[] = [
  { name: 'cloudIntensity', label: 'Nubosidad', options: ['none', 'light', 'medium', 'heavy'] },
  { name: 'rainIntensity', label: 'Lluvia', options: ['none', 'light', 'moderate', 'heavy', 'storm'] },
  { name: 'windIntensity', label: 'Viento', options: ['none', 'light', 'normal', 'strong'] },
  { name: 'temperature', label: 'Temperatura', options: ['none', 'veryLow', 'low', 'high', 'veryHigh'] },
];

// Controles para el estado diurno y efectos solares y lunares
const stateControls: {
  name: keyof Pick<WeatherBackgroundProps, 'timeOfDay' | 'sunPhase' | 'moonPhase'>;
  label: string;
  options: string[];
}[] = [
  { name: 'timeOfDay', label: 'Hora del día', options: ['dawn', 'day', 'dusk', 'night'] },
  { name: 'sunPhase', label: 'Estado del Sol', options: ['sunny', 'overcast'] },
  { name: 'moonPhase', label: 'Fase de la Luna', options: ['full', 'new', 'waxing-crescent', 'first-quarter', 'waxing-gibbous', 'waning-gibbous', 'last-quarter', 'waning-crescent'] },
];

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherBackgroundProps>({
    timeOfDay: 'day',
    sunPhase: 'sunny',
    moonPhase: 'full',
    snow: false,
    fog: false,
    cloudIntensity: 'none',
    rainIntensity: 'none',
    windIntensity: 'none',
    temperature: 'none',
    veryLowTemp: false,
    lowTemp: false,
    highTemp: false,
    veryHighTemp: false,
  });

  // Estado para controlar el colapso del panel
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  // Manejo de cambios en los checkbox (efectos booleanos)
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setWeather((prev) => ({ ...prev, [name]: checked }));
  };

  // Manejo de cambios en los selectores (para intensidades y estados)
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWeather((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <WeatherBackground {...weather} />
      <div
        className="weather-controls"
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          background: 'rgba(255,255,255,0.6)',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 100,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <button onClick={togglePanel} style={{ marginBottom: '10px' }}>
          {isPanelOpen ? 'Ocultar controles' : 'Mostrar controles'}
        </button>
        {isPanelOpen && (
          <>
            <h2>Controles</h2>
            {/* Controles booleanos */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {binaryControls.map((control) => (
                <li key={control.name}>
                  <label>
                    <input
                      type="checkbox"
                      name={control.name}
                      checked={Boolean(weather[control.name])}
                      onChange={handleCheckboxChange}
                    />
                    {` ${control.label}`}
                  </label>
                </li>
              ))}
            </ul>
            {/* Controles de intensidad */}
            {intensityControls.map((control) => (
              <div key={control.name} style={{ marginTop: '10px' }}>
                <label>
                  {control.label}:
                  <select
                    name={control.name}
                    value={weather[control.name] as string}
                    onChange={handleSelectChange}
                  >
                    {control.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))}
            {/* Controles de estado diurno y efectos solares y lunares */}
            {stateControls.map((control) => (
              <div key={control.name} style={{ marginTop: '10px' }}>
                <label>
                  {control.label}:
                  <select
                    name={control.name}
                    value={weather[control.name] as string}
                    onChange={handleSelectChange}
                  >
                    {control.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
