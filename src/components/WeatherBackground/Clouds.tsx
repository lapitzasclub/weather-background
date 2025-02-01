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
      count = 20; // Aumentado para "heavy"
      break;
    default:
      count = 0;
  }

  // Si no se activa ninguna nubosidad, no renderizamos nada.
  if (count === 0) return null;

  const cloudsArray = Array.from({ length: count }, (_, i) => i);

  return (
    <div id="background-wrap" className="clouds-container">
      {cloudsArray.map((i) => {
        // Posición vertical aleatoria: ahora entre 0% y 100% para cubrir todo el vertical
        const randomTop = Math.random() * 100;
        // Opacidad aleatoria entre 0.4 y 0.9 para variar la transparencia
        const randomOpacity = 0.4 + Math.random() * 0.5;
        return (
          <motion.div
            key={i}
            className={`cloud-wrapper x${(i % 5) + 1}`}
            style={{ top: `${randomTop}%` }}
          >
            <div
              className="cloud"
              style={{
                '--cloud-color': cloudColor,
                opacity: randomOpacity,
              } as React.CSSProperties}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default Clouds;
