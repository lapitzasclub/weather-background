// src/components/WeatherBackground/Temperature.tsx

import './Temperature.scss';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TemperatureProps {
  /** Intensidad de la temperatura:
   * "none" = sin overlay,
   * "veryLow" = temperaturas muy bajas (más azul),
   * "low" = temperaturas bajas,
   * "high" = temperaturas altas,
   * "veryHigh" = temperaturas muy altas (más rojo).
   */
  temperature: "none" | "veryLow" | "low" | "high" | "veryHigh";
}

const SafeAnimatePresence = AnimatePresence as React.FC<{ children?: React.ReactNode }>;

const temperatureStyles: Record<TemperatureProps["temperature"], { background: string; duration: number }> = {
  none: { background: 'transparent', duration: 0 },
  veryLow: { background: 'rgba(25,118,210,0.5)', duration: 4 },   // Azul profundo
  low: { background: 'rgba(66,133,244,0.35)', duration: 6 },        // Azul claro
  high: { background: 'rgba(244,67,54,0.35)', duration: 6 },        // Naranja/rojo suave
  veryHigh: { background: 'rgba(211,47,47,0.5)', duration: 4 },      // Rojo intenso
};

const Temperature: React.FC<TemperatureProps> = ({ temperature }) => {
  if (temperature === "none") return null;
  const style = temperatureStyles[temperature];
  return (
    <SafeAnimatePresence>
      <motion.div
        className="temperature-container"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: style.duration,
          repeat: Infinity,
          repeatType: 'mirror'
        }}
        style={{ background: style.background }}
      />
    </SafeAnimatePresence>
  );
};

export default Temperature;
