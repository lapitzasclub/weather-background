// src/components/WeatherBackground/Fog.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Fog.scss';

export interface FogProps {
  fog?: boolean;
}

const SafeAnimatePresence = AnimatePresence as React.FC<{ children?: React.ReactNode }>;

const Fog: React.FC<FogProps> = ({ fog = false }) => {
  if (!fog) return null;
  return (
    <SafeAnimatePresence>
      <motion.div
        className="fog"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
    </SafeAnimatePresence>
  );
};

export default Fog;
