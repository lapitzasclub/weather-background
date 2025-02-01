// src/components/Moon.tsx
import React from 'react';
import { motion } from 'framer-motion';
import './Moon.scss';

export interface MoonProps {}

const Moon: React.FC<MoonProps> = () => {
  return (
    <motion.div
      className="moon"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <svg viewBox="0 0 64 64" className="moon-svg">
        <circle cx="32" cy="32" r="30" fill="#F4F1C9" />
      </svg>
    </motion.div>
  );
};

export default Moon;
