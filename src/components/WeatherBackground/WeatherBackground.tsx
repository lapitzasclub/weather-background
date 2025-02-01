// src/components/WeatherBackground/WeatherBackground.tsx
import React from 'react';
import Background from './Background';
import Sun from './Sun';
import Moon from './Moon';
import Stars from './Stars';
import Clouds from './Clouds';
import Wind from './Wind';
import Rain from './Rain';
import Snow from './Snow';
import Temperature from './Temperature';
import Fog from './Fog';
import Lightning from './Lightning';
import './WeatherBackground.scss';

export interface WeatherBackgroundProps {
  day?: boolean;
  night?: boolean;
  sunny?: boolean;
  // Unificamos nubosidad en una única propiedad
  cloudIntensity?: "none" | "light" | "medium" | "heavy";
  // Unificamos lluvia en una única propiedad
  rainIntensity?: "none" | "light" | "moderate" | "heavy" | "storm";
  // Viento ahora es una propiedad de intensidad
  windIntensity?: "none" | "light" | "normal" | "strong";
  snow?: boolean;
  fog?: boolean;
  // Temperatura unificada
  temperature?: "none" | "veryLow" | "low" | "high" | "veryHigh";
  // Otros efectos (se mantienen booleans)
  veryLowTemp?: boolean;
  lowTemp?: boolean;
  highTemp?: boolean;
  veryHighTemp?: boolean;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = (props) => {
  // Por ejemplo, para el overlay de nubosidad, si la nubosidad es "medium" o "heavy" o si hay tormenta,
  // podemos calcular la opacidad.
  const getOverlayOpacity = (): number => {
    if (props.rainIntensity === "storm") return 0.8;
    if (props.cloudIntensity === "heavy") return 0.5;
    if (props.cloudIntensity === "medium") return 0.3;
    if (props.cloudIntensity === "light") return 0.1;
    return 0;
  };

  const overlayOpacity = getOverlayOpacity();

  // Por ejemplo, para el color de nubes, si la intensidad es alta o hay tormenta usamos tonos oscuros.
  let cloudColor = '#fff';
  if (props.cloudIntensity === "heavy" || props.rainIntensity === "storm") cloudColor = '#666';
  else if (props.cloudIntensity === "medium") cloudColor = '#ddd';

  return (
    <div className="weather-background">
      <Background day={props.day} night={props.night} />

      {props.fog && <Fog fog={props.fog} />}

      {overlayOpacity > 0 && (
        <div className="cloudy-overlay" style={{ opacity: overlayOpacity }} />
      )}

      {props.sunny && <Sun sunny={props.sunny} />}

      {props.night && (
        <>
          <Moon />
          <Stars count={50} />
        </>
      )}

      {props.cloudIntensity && props.cloudIntensity !== "none" && (
        <Clouds cloudIntensity={props.cloudIntensity} cloudColor={cloudColor} />
      )}

      {props.windIntensity && props.windIntensity !== "none" && (
        <Wind intensity={props.windIntensity} />
      )}

      {props.rainIntensity && props.rainIntensity !== "none" && (
        <Rain rainIntensity={props.rainIntensity} day={props.day} />
      )}

      <Snow snow={props.snow} />

      {props.temperature && props.temperature !== "none" && (
        <Temperature temperature={props.temperature} />
      )}

      {props.rainIntensity === "storm" && <Lightning />}
    </div>
  );
};

export default WeatherBackground;
