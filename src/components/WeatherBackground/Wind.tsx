// src/components/WeatherBackground/Wind.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Wind.scss';

const SafeAnimatePresence = AnimatePresence as React.FC<{ children?: React.ReactNode }>;

export interface WindProps {
  /** Intensidad del viento: "light" (leve), "normal" o "strong" (fuerte) */
  intensity?: 'light' | 'normal' | 'strong';
  /** Indica si es de día para definir el contexto de estilos */
  day?: boolean;
}

const leafPaths = [
  // Variante 1: hoja original
  "M41.9,56.3l0.1-2.5c0,0,4.6-1.2,5.6-2.2c1-1,3.6-13,12-15.6c9.7-3.1,19.9-2,26.1-2.1c2.7,0-10,23.9-20.5,25 c-7.5,0.8-17.2-5.1-17.2-5.1L41.9,56.3z",
  // Variante 2: hoja simplificada (ejemplo)
  "M20,40 C30,10,50,10,60,40 S80,70,70,90",
  // Variante 3: otra forma (ejemplo)
  "M10,50 Q40,20,70,50 T130,50"
];

const Wind: React.FC<WindProps> = ({ intensity = 'normal', day = true }) => {
  // Parámetros ajustados según la intensidad:
  let leavesCount = 0;
  let dustCount = 0;
  let durationMin = 0, durationMax = 0;
  let rotationVariance = 0;
  switch (intensity) {
    case 'light':
      leavesCount = 5;
      dustCount = 15;
      durationMin = 25 / 2;
      durationMax = 30 / 2;
      rotationVariance = 30;
      break;
    case 'normal':
      leavesCount = 10;
      dustCount = 25;
      durationMin = 15 / 2;
      durationMax = 20 / 2;
      rotationVariance = 45;
      break;
    case 'strong':
      leavesCount = 20;
      dustCount = 40;
      durationMin = 4;
      durationMax = 6;
      rotationVariance = 90;
      break;
    default:
      leavesCount = 10;
      dustCount = 25;
      durationMin = 15 / 2;
      durationMax = 20 / 2;
      rotationVariance = 45;
  }

  const leaves = Array.from({ length: leavesCount }, (_, i) => i);
  const dusts = Array.from({ length: dustCount }, (_, i) => i);

  // Creamos un wrapper interno que aplica la clase "day" o "night"
  const wrapperClass = day ? 'wind-wrapper day' : 'wind-wrapper night';

  return (
    <SafeAnimatePresence>
      <div className={wrapperClass}>
        <div className="wind-container">
          {/* Hojas */}
          {leaves.map((i) => {
            const top = Math.random() * 100; // posición vertical (0–100%)
            const amplitude = 20 + Math.random() * 30; // drift vertical: 20–50px
            const initialRotate = Math.random() * 360;
            const deltaRotate = Math.random() * rotationVariance * 2 - rotationVariance;
            const rotateKeyframes = [
              initialRotate,
              initialRotate + deltaRotate,
              initialRotate + deltaRotate * 0.5,
              initialRotate,
            ];
            const duration = durationMin + Math.random() * (durationMax - durationMin);
            const scale = 0.8 + Math.random() * 0.7; // escala entre 0.8 y 1.5
            const leafPath = leafPaths[Math.floor(Math.random() * leafPaths.length)];
            return (
              <motion.svg
                key={`leaf-${i}`}
                className="wind-leaf"
                viewBox="0 0 80 80"
                style={{ top: `${top}%` }}
                initial={{ x: '-30vw', opacity: 1, rotate: initialRotate, scale }}
                animate={{
                  x: '140vw',
                  rotate: rotateKeyframes,
                  y: [0, amplitude, 0, -amplitude, 0]
                }}
                transition={{
                  duration: duration + Math.random() * 2,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
              >
                <g className="wind-leaf-inner">
                  <path d={leafPath} fill="currentColor" />
                </g>
              </motion.svg>
            );
          })}

          {/* Polvo */}
          {dusts.map((i) => {
            const top = Math.random() * 100;
            const duration = durationMin + Math.random() * (durationMax - durationMin);
            const size = Math.random() * 3 + 2;
            const drift = Math.random() * 20 - 10;
            return (
              <motion.div
                key={`dust-${i}`}
                className="wind-dust"
                style={{
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                initial={{ x: '-30vw', opacity: 1 }}
                animate={{
                  x: '140vw',
                  opacity: 1,
                  y: [0, drift, 0],
                }}
                transition={{
                  duration: duration,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
              />
            );
          })}
        </div>
      </div>
    </SafeAnimatePresence>
  );
};

export default Wind;
