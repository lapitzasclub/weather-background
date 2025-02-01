// src/App.tsx
import React, { useState } from 'react';
import WeatherBackground, { WeatherBackgroundProps } from './components/WeatherBackground';
import './App.css';

const controls: { name: keyof WeatherBackgroundProps; label: string }[] = [
  { name: 'day', label: 'Día' },
  { name: 'night', label: 'Noche' },
  { name: 'sunny', label: 'Soleado' },
  { name: 'slightlyCloudy', label: 'Ligeramente nublado' },
  { name: 'cloudy', label: 'Nublado' },
  { name: 'veryCloudy', label: 'Muy nublado' },
  { name: 'lightRain', label: 'Lluvia ligera' },
  { name: 'rain', label: 'Lluvia' },
  { name: 'heavyRain', label: 'Lluvia severa' },
  { name: 'storm', label: 'Tormenta eléctrica' },
  { name: 'snow', label: 'Nieve' },
  { name: 'fog', label: 'Niebla' },
  { name: 'veryLowTemp', label: 'Temperaturas muy bajas' },
  { name: 'lowTemp', label: 'Temperaturas bajas' },
  { name: 'highTemp', label: 'Temperaturas altas' },
  { name: 'veryHighTemp', label: 'Temperaturas muy altas' },
];

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherBackgroundProps>({
    day: true,
    night: false,
    sunny: true,
    slightlyCloudy: false,
    cloudy: false,
    veryCloudy: false,
    lightRain: false,
    rain: false,
    heavyRain: false,
    storm: false,
    snow: false,
    fog: false,
    veryLowTemp: false,
    lowTemp: false,
    highTemp: false,
    veryHighTemp: false,
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setWeather((prev) => ({ ...prev, [name]: checked }));
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
          {controls.map((control) => (
            <li key={control.name}>
              <label>
                <input
                  type="checkbox"
                  name={control.name}
                  checked={weather[control.name] || false}
                  onChange={handleCheckboxChange}
                />
                {` ${control.label}`}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
