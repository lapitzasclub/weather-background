// src/components/WeatherBackground/WeatherBackground.tsx
import React from 'react';
import Background from './Background';
import Clouds from './Clouds';
import Fog from './Fog';
import Lightning from './Lightning';
import Moon from './Moon';
import Rain from './Rain';
import Snow from './Snow';
import Stars from './Stars';
import Sun from './Sun';
import Temperature from './Temperature';
import './WeatherBackground.scss';
import Wind from './Wind';

export interface WeatherBackgroundProps {
  timeOfDay: "dawn" | "day" | "dusk" | "night";
  sunPhase?: "sunny" | "overcast";
  moonPhase?: "full" | "new" | "waxing-crescent" | "first-quarter" | "waxing-gibbous" | "waning-gibbous" | "last-quarter" | "waning-crescent";
  cloudIntensity?: "none" | "light" | "medium" | "heavy";
  rainIntensity?: "none" | "light" | "moderate" | "heavy" | "storm";
  windIntensity?: "none" | "light" | "normal" | "strong";
  snow?: boolean;
  fog?: boolean;
  temperature?: "none" | "veryLow" | "low" | "high" | "veryHigh";
  veryLowTemp?: boolean;
  lowTemp?: boolean;
  highTemp?: boolean;
  veryHighTemp?: boolean;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = (props) => {
  // Definimos si se trata de un contexto diurno o nocturno según timeOfDay.
  const isDay = props.timeOfDay === "dawn" || props.timeOfDay === "day";
  const isNight = props.timeOfDay === "dusk" || props.timeOfDay === "night";

  // Calculamos la opacidad del overlay de nubosidad
  const getOverlayOpacity = (): number => {
    if (props.rainIntensity === "storm") return 0.8;
    if (props.cloudIntensity === "heavy") return 0.5;
    if (props.cloudIntensity === "medium") return 0.3;
    if (props.cloudIntensity === "light") return 0.1;
    return 0;
  };

  const overlayOpacity = getOverlayOpacity();

  // Determinamos el color de las nubes según la intensidad
  let cloudColor = '#fff';
  if (props.cloudIntensity === "heavy" || props.rainIntensity === "storm")
    cloudColor = '#666';
  else if (props.cloudIntensity === "medium")
    cloudColor = '#ddd';

  return (
    <div className="weather-background">
      <Background timeOfDay={props.timeOfDay} />

      {props.fog && <Fog fog={props.fog} />}

      {overlayOpacity > 0 && (
        <div className="cloudy-overlay" style={{ opacity: overlayOpacity }} />
      )}

      {/* Si es "dawn" o "day", se muestra el sol.
        Podrías modificar Sun para que, en "dawn", el sol tenga menor brillo (por ejemplo, con un filtro de opacidad o brightness) */}
      {(props.timeOfDay === "dawn" || props.timeOfDay === "day") && <Sun phase={props.sunPhase || "sunny"} />}

      {/* En "dusk" podrías optar por mostrar una transición: quizás parte sol y parte luna o simplemente una disminución del brillo y aparición de estrellas. */}
      {props.timeOfDay === "dusk" && (
        <>
          <Sun phase={props.sunPhase || "overcast"} />
          <Stars count={30} />
        </>
      )}

      {/* En "night", se muestra la luna y las estrellas */}
      {props.timeOfDay === "night" && (
        <>
          <Moon phase={props.moonPhase || "full"} />
          <Stars count={50} />
        </>
      )}

      {props.cloudIntensity && props.cloudIntensity !== "none" && (
        <Clouds cloudIntensity={props.cloudIntensity} cloudColor={cloudColor} />
      )}

      {props.windIntensity && props.windIntensity !== "none" && (
        <Wind intensity={props.windIntensity} day={props.timeOfDay === "dawn" || props.timeOfDay === "day"} />
      )}

      {props.rainIntensity && props.rainIntensity !== "none" && (
        <Rain rainIntensity={props.rainIntensity} day={props.timeOfDay === "dawn" || props.timeOfDay === "day"} />
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
