// src/components/WeatherBackground/Wind.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Wind.scss';

const SafeAnimatePresence = AnimatePresence as React.FC<{ children?: React.ReactNode }>;

export interface WindProps {
  /** Intensidad del viento: "light" (leve), "normal" o "strong" (fuerte) */
  intensity?: 'light' | 'normal' | 'strong';
}

const leafPaths = [
  // Variante 1: hoja original
  "M41.9,56.3l0.1-2.5c0,0,4.6-1.2,5.6-2.2c1-1,3.6-13,12-15.6c9.7-3.1,19.9-2,26.1-2.1c2.7,0-10,23.9-20.5,25 c-7.5,0.8-17.2-5.1-17.2-5.1L41.9,56.3z",
  // Variante 2: hoja simplificada (ejemplo)
  "M20,40 C30,10,50,10,60,40 S80,70,70,90",
  // Variante 3: otra forma (ejemplo)
  "M10,50 Q40,20,70,50 T130,50"
];

const Wind: React.FC<WindProps> = ({ intensity = 'normal' }) => {
  // Parámetros ajustados según la intensidad del viento:
  let leavesCount = 0;
  let dustCount = 0;
  let durationMin = 0, durationMax = 0;
  let rotationVariance = 0;
  switch (intensity) {
    case 'light':
      leavesCount = 3;
      dustCount = 10;
      durationMin = 25;
      durationMax = 30;
      rotationVariance = 30;
      break;
    case 'normal':
      leavesCount = 7;
      dustCount = 20;
      durationMin = 15;
      durationMax = 20;
      rotationVariance = 45;
      break;
    case 'strong':
      leavesCount = 16;    // Aumentamos la cantidad
      dustCount = 40;      // Más polvo
      durationMin = 4;     // Movimiento más rápido
      durationMax = 6;
      rotationVariance = 90; // Mayor variación en la rotación
      break;
    default:
      leavesCount = 7;
      dustCount = 20;
      durationMin = 15;
      durationMax = 20;
      rotationVariance = 45;
  }

  const leaves = Array.from({ length: leavesCount }, (_, i) => i);
  const dusts = Array.from({ length: dustCount }, (_, i) => i);

  return (
    <SafeAnimatePresence>
      <div className="wind-container">
        {/* Hojas (renderizadas como SVG usando un path para la hoja) */}
        {leaves.map((i) => {
          const top = Math.random() * 100; // posición vertical en %
          const amplitude = 20 + Math.random() * 30; // drift vertical entre 20 y 50px
          const initialRotate = Math.random() * 360;
          const deltaRotate = Math.random() * rotationVariance * 2 - rotationVariance;
          const rotateKeyframes = [
            initialRotate,
            initialRotate + deltaRotate,
            initialRotate + deltaRotate * 0.5,
            initialRotate,
          ];
          const xKeyframes = ['-20vw', '40vw', '80vw', '120vw'];
          const duration = durationMin + Math.random() * (durationMax - durationMin);
          const scale = 0.8 + Math.random() * 0.7; // escala entre 0.8 y 1.5
          const leafPath = leafPaths[Math.floor(Math.random() * leafPaths.length)];
          return (
            <motion.svg
              key={`leaf-${i}`}
              className="wind-leaf"
              viewBox="0 0 80 80"
              style={{ top: `${top}%` }}
              initial={{ x: '-20vw', opacity: 1, rotate: initialRotate, scale }}
              animate={{
                x: xKeyframes,
                rotate: rotateKeyframes,
                y: [0, amplitude, 0, -amplitude, 0],
              }}
              transition={{
                duration: duration + Math.random() * 2,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              <g className="wind-leaf-inner">
                <path d={leafPath} fill="currentColor" />
              </g>
            </motion.svg>
          );
        })}

        {/* Polvo: partículas simples */}
        {dusts.map((i) => {
          const top = Math.random() * 100;
          const duration = durationMin + Math.random() * (durationMax - durationMin);
          const size = Math.random() * 3 + 2; // tamaño entre 2 y 5px
          const drift = Math.random() * 20 - 10; // drift vertical
          return (
            <motion.div
              key={`dust-${i}`}
              className="wind-dust"
              style={{
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              initial={{ x: '-20vw', opacity: 1 }}
              animate={{
                x: ['-20vw', '50vw', '120vw'],
                opacity: 1,
                y: [0, drift, 0],
              }}
              transition={{
                duration: duration,
                ease: 'linear',
                repeat: Infinity,
              }}
            />
          );
        })}
      </div>
    </SafeAnimatePresence>
  );
};

export default Wind;
