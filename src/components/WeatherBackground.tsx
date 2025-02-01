// src/components/WeatherBackground.tsx
import React from 'react';
import Background from './Background';
import Sun from './Sun';
import Moon from './Moon';
import Stars from './Stars';
import Clouds from './Clouds';
import Rain from './Rain';
import Snow from './Snow';
import Temperature from './Temperature';
import Fog from './Fog';
import Lightning from './Lightning'; // Importamos el nuevo componente Lightning basado en canvas
import './WeatherBackground.scss';

export interface WeatherBackgroundProps {
  day?: boolean;
  night?: boolean;
  sunny?: boolean;
  slightlyCloudy?: boolean;
  cloudy?: boolean;
  veryCloudy?: boolean;
  lightRain?: boolean;
  rain?: boolean;
  heavyRain?: boolean;
  storm?: boolean;
  snow?: boolean;
  fog?: boolean;
  veryLowTemp?: boolean;
  lowTemp?: boolean;
  highTemp?: boolean;
  veryHighTemp?: boolean;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = (props) => {
  // Calculamos la opacidad del overlay oscuro según la nubosidad o tormenta.
  const getOverlayOpacity = (): number => {
    if (props.storm) return 0.8;
    if (props.veryCloudy) return 0.5;
    if (props.cloudy) return 0.3;
    if (props.slightlyCloudy) return 0.1;
    return 0;
  };

  const overlayOpacity = getOverlayOpacity();

  // Determinamos el color de las nubes. Si es muy nublado o hay tormenta, usamos tonos grises.
  let cloudColor = '#fff';
  if (props.veryCloudy || props.storm) cloudColor = '#666'; // gris oscuro
  else if (props.cloudy) cloudColor = '#ddd'; // gris claro

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

      {/* Renderizamos las nubes si hay alguna condición de nubosidad o tormenta */}
      {(props.slightlyCloudy || props.cloudy || props.veryCloudy || props.storm) && (
        <Clouds cloudColor={cloudColor} slightlyCloudy={props.slightlyCloudy} cloudy={props.cloudy} veryCloudy={props.veryCloudy} />
      )}

      <Rain
        lightRain={props.lightRain}
        rain={props.rain}
        heavyRain={props.heavyRain}
        storm={props.storm}
        day={props.day}
      />

      <Snow snow={props.snow} />

      <Temperature
        veryLowTemp={props.veryLowTemp}
        lowTemp={props.lowTemp}
        highTemp={props.highTemp}
        veryHighTemp={props.veryHighTemp}
      />

      {/* Si hay tormenta, se muestran los rayos con flash */}
      {props.storm && (
        <Lightning />
      )}
    </div>
  );
};

export default WeatherBackground;
