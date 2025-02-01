// src/components/WeatherBackground/Background.tsx
import React from 'react';
import './Background.scss';

export interface BackgroundProps {
  day?: boolean;
  night?: boolean;
}

const Background: React.FC<BackgroundProps> = ({ day = true, night = false }) => (
  <>
    {day && <div className="background day" />}
    {night && <div className="background night" />}
  </>
);

export default Background;
