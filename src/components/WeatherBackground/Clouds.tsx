// src/components/WeatherBackground/Clouds.tsx
import React from 'react';
import { motion } from 'framer-motion';
import './Clouds.scss';

export interface CloudsProps {
  /** Intensidad de las nubes: "none", "light", "medium" o "heavy" */
  cloudIntensity: "none" | "light" | "medium" | "heavy";
  /** Color de las nubes (opcional) */
  cloudColor?: string;
}

const Clouds: React.FC<CloudsProps> = ({ cloudIntensity, cloudColor = '#fff' }) => {
  // Determinamos la cantidad de nubes según la intensidad
  let count = 0;
  switch (cloudIntensity) {
    case "light":
      count = 4;
      break;
    case "medium":
      count = 8;
      break;
    case "heavy":
      count = 12;
      break;
    default:
      count = 0;
  }
  
  // Si no se activan nubes, no renderizamos nada.
  if (count === 0) return null;

  const cloudsArray = Array.from({ length: count }, (_, i) => i);

  return (
    <div id="background-wrap" className="clouds-container">
      {cloudsArray.map((i) => {
        // Asignamos una posición vertical aleatoria (por ejemplo, entre 0% y 30%)
        const randomTop = Math.random() * 30;
        return (
          <motion.div
            key={i}
            className={`cloud-wrapper x${(i % 5) + 1}`}
            style={{ top: `${randomTop}%` }}
          >
            <div className="cloud" style={{ '--cloud-color': cloudColor } as React.CSSProperties} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default Clouds;
