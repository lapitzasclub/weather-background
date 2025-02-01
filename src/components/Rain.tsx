// src/components/Rain.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightning from './Lightning';
import './Rain.scss';

export interface RainProps {
  lightRain?: boolean;
  rain?: boolean;
  heavyRain?: boolean;
  storm?: boolean;
  day?: boolean; // para ajustar el color según el fondo
}

const minThickness = 2;
const maxThickness = 5;

const SafeAnimatePresence = AnimatePresence as React.FC<{ children?: React.ReactNode }>;

const Rain: React.FC<RainProps> = ({
  lightRain = false,
  rain = false,
  heavyRain = false,
  storm = false,
  day = true,
}) => {
  let rainIntensity: 'none' | 'light' | 'normal' | 'heavy' | 'storm' = 'none';
  if (storm) rainIntensity = 'storm';
  else if (heavyRain) rainIntensity = 'heavy';
  else if (rain) rainIntensity = 'normal';
  else if (lightRain) rainIntensity = 'light';

  let rainCount = 0, rainDuration = 0, rainRepeatDelay = 0;
  switch (rainIntensity) {
    case 'light':
      rainCount = 15;
      rainDuration = 2.5;
      rainRepeatDelay = 0.5;
      break;
    case 'normal':
      rainCount = 25;
      rainDuration = 2;
      rainRepeatDelay = 0.3;
      break;
    case 'heavy':
      rainCount = 40;
      rainDuration = 1.5;
      rainRepeatDelay = 0.2;
      break;
    case 'storm':
      rainCount = 40;
      rainDuration = 1.5;
      rainRepeatDelay = 0.2;
      break;
    default:
      rainCount = 0;
  }
  const rainColor = day ? '#0066cc' : '#66b2ff';

  return (
    <SafeAnimatePresence>
      {rainIntensity !== 'none' ? (
        <motion.div
          className="rain-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {Array.from({ length: rainCount }, (_, i) => {
            const dropThickness =
              Math.random() * (maxThickness - minThickness) + minThickness;
            const dropDuration =
              rainDuration *
                (1 -
                  0.3 *
                    ((dropThickness - minThickness) /
                      (maxThickness - minThickness))) +
              Math.random() * 0.2;
            return (
              <motion.div
                key={i}
                className="rain-drop"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 10}vh`,
                  width: `${dropThickness}px`,
                  background: rainColor,
                }}
                initial={{ y: '-10vh', opacity: 0 }}
                animate={{ y: '110vh', opacity: 1 }}
                transition={{
                  duration: dropDuration,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatDelay: Math.random() * rainRepeatDelay,
                }}
              />
            );
          })}
          {rainIntensity === 'storm' && <Lightning />}
        </motion.div>
      ) : null}
    </SafeAnimatePresence>
  );
};

export default Rain;
