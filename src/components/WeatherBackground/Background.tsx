// src/components/WeatherBackground/Background.tsx
import React from 'react';
import './Background.scss';

export interface BackgroundProps {
  timeOfDay: "dawn" | "day" | "dusk" | "night";
}

const Background: React.FC<BackgroundProps> = ({ timeOfDay }) => {
  return <div className={`background ${timeOfDay}`} />;
};

export default Background;
