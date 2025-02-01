// src/components/Sun.tsx
import React from 'react';
import { motion } from 'framer-motion';
import './Sun.scss';

export interface SunProps {
  sunny?: boolean;
}

const Sun: React.FC<SunProps> = ({ sunny = false }) => {
  if (!sunny) return null;
  return (
    <div className="sun-container">
      <motion.div
        className="sun"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.svg
        className="sunburst"
        viewBox="0 0 400 400"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <radialGradient id="sunburstGradient" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FFDE17" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFF200" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g>
          {Array.from({ length: 12 }, (_, i) => (
            <motion.line
              key={i}
              x1="200"
              y1="200"
              x2="200"
              y2="0"
              stroke="url(#sunburstGradient)"
              strokeWidth="2"
              transform={`rotate(${(360 / 12) * i},200,200)`}
            />
          ))}
        </g>
      </motion.svg>
    </div>
  );
};

export default Sun;
