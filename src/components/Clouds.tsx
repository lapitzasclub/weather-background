// src/components/Clouds.tsx
import React from 'react';
import { motion } from 'framer-motion';
import './Clouds.scss';

export interface CloudsProps {
  cloudColor?: string;
  slightlyCloudy?: boolean;
  cloudy?: boolean;
  veryCloudy?: boolean;
}

const Clouds: React.FC<CloudsProps> = ({
  cloudColor = '#fff',
  slightlyCloudy = false,
  cloudy = false,
  veryCloudy = false,
}) => {
  // Determinamos la cantidad de nubes según el estado:
  let count = 0;
  if (veryCloudy) count = 12;
  else if (cloudy) count = 8;
  else if (slightlyCloudy) count = 4;

  // Si no se activa ninguna de estas props, no renderizamos nubes.
  if (count === 0) return null;

  // Generamos un array de índices
  const cloudsArray = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div id="background-wrap">
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
