// src/components/Stars.tsx
import React from 'react';
import { motion } from 'framer-motion';
import './Stars.scss';

export interface StarsProps {
  count?: number;
}

const Stars: React.FC<StarsProps> = ({ count = 50 }) => {
  // Generamos un array de estrellas con posiciones y tamaños aleatorios
  const starsArray = Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 2, // Tamaño entre 1px y 3px
    delay: Math.random() * 5
  }));

  return (
    <div className="stars-container">
      {starsArray.map((star, index) => (
        <motion.div
          key={index}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: star.delay
          }}
        />
      ))}
    </div>
  );
};

export default Stars;
