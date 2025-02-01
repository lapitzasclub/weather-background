// src/components/Temperature.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Temperature.scss';

export interface TemperatureProps {
  veryLowTemp?: boolean;
  lowTemp?: boolean;
  highTemp?: boolean;
  veryHighTemp?: boolean;
}

const SafeAnimatePresence = AnimatePresence as React.FC<{ children?: React.ReactNode }>;

const Temperature: React.FC<TemperatureProps> = ({
  veryLowTemp = false,
  lowTemp = false,
  highTemp = false,
  veryHighTemp = false,
}) => {
  return (
    <SafeAnimatePresence>
      {(highTemp || veryHighTemp || lowTemp || veryLowTemp) ? (
        <motion.div
          className="temperature-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {highTemp && (
            <motion.div
              className="temperature high"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
            />
          )}
          {veryHighTemp && (
            <motion.div
              className="temperature very-high"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror' }}
            />
          )}
          {lowTemp && (
            <motion.div
              className="temperature low"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror' }}
            />
          )}
          {veryLowTemp && (
            <motion.div
              className="temperature very-low"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror' }}
            />
          )}
        </motion.div>
      ) : null}
    </SafeAnimatePresence>
  );
};

export default Temperature;
