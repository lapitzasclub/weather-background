// src/App.tsx
import React, { useState } from 'react';
import WeatherBackground, { WeatherBackgroundProps } from './components/WeatherBackground/WeatherBackground';
import './App.css';

const binaryControls: { name: keyof WeatherBackgroundProps; label: string }[] = [
  { name: 'day', label: 'Día' },
  { name: 'night', label: 'Noche' },
  { name: 'sunny', label: 'Soleado' },
  { name: 'snow', label: 'Nieve' },
  { name: 'fog', label: 'Niebla' },
];

const intensityControls: {
  name: keyof WeatherBackgroundProps;
  label: string;
  options: string[];
}[] = [
  { name: 'cloudIntensity', label: 'Nubosidad', options: ['none', 'light', 'medium', 'heavy'] },
  { name: 'rainIntensity', label: 'Lluvia', options: ['none', 'light', 'moderate', 'heavy', 'storm'] },
  { name: 'windIntensity', label: 'Viento', options: ['none', 'light', 'normal', 'strong'] },
  { name: 'temperature', label: 'Temperatura', options: ['none', 'veryLow', 'low', 'high', 'veryHigh'] },
];

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherBackgroundProps>({
    day: true,
    night: false,
    sunny: true,
    snow: false,
    fog: false,
    cloudIntensity: 'none',
    rainIntensity: 'none',
    windIntensity: 'none',
    temperature: 'none',
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setWeather((prev) => ({ ...prev, [name]: checked }));
  };

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
          top: '10px',
          left: '10px',
          background: 'rgba(255,255,255,0.9)',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 100,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <h2>Controles</h2>
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
        {intensityControls.map((control) => (
          <div key={control.name} style={{ marginTop: '10px' }}>
            <label>
              {control.label}:
              <select name={control.name} value={weather[control.name] as string} onChange={handleSelectChange}>
                {control.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
