// src/components/WeatherBackground/Wind.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Wind.scss';

// Wrapper seguro para AnimatePresence (para evitar errores de tipado)
const SafeAnimatePresence = AnimatePresence as React.FC<{ children?: React.ReactNode }>;

export interface WindProps {
  /** Intensidad del viento: "light" (leve), "normal" o "strong" (fuerte) */
  intensity?: 'light' | 'normal' | 'strong';
}

// Path de la hoja (copiado del ejemplo que proporcionaste)
const leafPath =
  "M41.9,56.3l0.1-2.5c0,0,4.6-1.2,5.6-2.2c1-1,3.6-13,12-15.6c9.7-3.1,19.9-2,26.1-2.1c2.7,0-10,23.9-20.5,25 c-7.5,0.8-17.2-5.1-17.2-5.1L41.9,56.3z";

const Wind: React.FC<WindProps> = ({ intensity = 'normal' }) => {
  // Parámetros según la intensidad del viento
  let particleCount = 0;
  let duration = 0;
  let rotationVariance = 0;
  switch (intensity) {
    case 'light':
      particleCount = 5;
      duration = 20; // animación más lenta
      rotationVariance = 30;
      break;
    case 'normal':
      particleCount = 10;
      duration = 15;
      rotationVariance = 45;
      break;
    case 'strong':
      particleCount = 15;
      duration = 10; // animación más rápida
      rotationVariance = 60;
      break;
    default:
      particleCount = 10;
      duration = 15;
      rotationVariance = 45;
  }

  const particles = Array.from({ length: particleCount }, (_, i) => i);

  return (
    <SafeAnimatePresence>
      <div className="wind-container">
        {particles.map((i) => {
          // Posición vertical aleatoria (en porcentaje)
          const top = Math.random() * 100;
          // Rotación inicial aleatoria
          const initialRotate = Math.random() * 360;
          // Variación de rotación para darle dinamismo
          const finalRotate = initialRotate + (Math.random() * rotationVariance * 2 - rotationVariance);
          // Drift vertical (oscilación) para un movimiento natural
          const driftY = Math.random() * 10;
          return (
            <motion.svg
              key={i}
              className="wind-leaf"
              viewBox="0 0 80 80"
              style={{ top: `${top}%`, left: '-10%' }}
              initial={{ x: 0, opacity: 0, rotate: initialRotate, y: 0 }}
              animate={{
                x: '110vw', // Se desplaza a lo largo de la pantalla
                opacity: 1,
                rotate: finalRotate,
                y: [0, driftY, 0], // Oscilación vertical
              }}
              transition={{
                duration: duration + Math.random() * 2,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              {/* Se usa "currentColor" para que, si se desea, se pueda controlar mediante CSS */}
              <path d={leafPath} fill="currentColor" />
            </motion.svg>
          );
        })}
      </div>
    </SafeAnimatePresence>
  );
};

export default Wind;
