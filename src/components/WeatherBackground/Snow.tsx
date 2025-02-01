// src/components/WeatherBackground/Snow.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Snow.scss';

export interface SnowProps {
  snow?: boolean;
}

const SafeAnimatePresence = AnimatePresence as React.FC<{ children?: React.ReactNode }>;

// Parámetros para el tamaño de los copos de nieve
const minSnowSize = 4;  // píxeles
const maxSnowSize = 12; // píxeles

// Duración base para la caída (para un copo de tamaño mínimo)
// Queremos que la nieve caiga más lenta que la lluvia, por lo que usamos un valor mayor.
const baseDuration = 5; // segundos

// Factor de aceleración para que los copos más grandes caigan un poco más rápido (pero aún así lentamente)
const accelerationFactor = 0.2;

const Snow: React.FC<SnowProps> = ({ snow = false }) => {
  const snowCount = 30;

  return (
    <SafeAnimatePresence>
      {snow ? (
        <motion.div
          className="snow-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {Array.from({ length: snowCount }, (_, i) => {
            // Generar un tamaño aleatorio para el copo
            const size =
              Math.random() * (maxSnowSize - minSnowSize) + minSnowSize;
            // Calcular la duración: los copos más grandes (cercanos a maxSnowSize) caerán más rápido.
            const duration =
              baseDuration *
                (1 -
                  accelerationFactor *
                    ((size - minSnowSize) / (maxSnowSize - minSnowSize))) +
              Math.random() * 0.2;
            // Generar un valor de drift horizontal (en píxeles) aleatorio; algunos caerán rectos, otros se moverán lateralmente.
            const drift = (Math.random() - 0.5) * 40; // entre -20 y 20 px

            return (
              <motion.div
                key={i}
                className="snow-flake"
                style={{
                  left: `${Math.random() * 100}%`,
                  // La posición vertical inicial se establece de forma aleatoria dentro del 10% superior.
                  top: `${Math.random() * 10}vh`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                initial={{ y: '-5vh', opacity: 0, x: 0 }}
                animate={{ y: '110vh', opacity: 1, x: [0, drift, 0] }}
                transition={{
                  duration: duration,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
              />
            );
          })}
        </motion.div>
      ) : null}
    </SafeAnimatePresence>
  );
};

export default Snow;
