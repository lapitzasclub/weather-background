// src/components/Lightning.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Lightning.scss';

const SafeAnimatePresence = AnimatePresence as React.FC<{ children?: React.ReactNode }>;

interface Point {
  x: number;
  y: number;
}

/**
 * Genera el camino principal y sus ramas.
 * Se redujo la probabilidad de ramificar (branchingFactor) y se incrementó el spread en cada segmento para dar mayor curvatura.
 */
const generateLightningPaths = (branchingFactor: number = 0.2): {
  main: Point[];
  branches: Point[][];
} => {
  const mainPoints: Point[] = [];
  const branches: Point[][] = [];
  // Genera entre 10 y 15 segmentos para el camino principal
  const segments = 10 + Math.floor(Math.random() * 6);
  const startX = window.innerWidth / 2;
  const startY = 0;
  let currentX = startX + (Math.random() - 0.5) * 20; // mayor variación inicial
  let currentY = startY;
  mainPoints.push({ x: currentX, y: currentY });
  for (let i = 0; i < segments; i++) {
    // Dividimos la altura total en segmentos
    const deltaY = (window.innerHeight - startY) / segments;
    currentY += deltaY;
    // Aumentamos la variación horizontal para dar más curvatura
    const offset = (Math.random() - 0.5) * 80;
    currentX += offset;
    mainPoints.push({ x: currentX, y: currentY });
    
    // Con menor probabilidad genera una rama en este segmento
    if (i < segments - 1 && Math.random() < branchingFactor) {
      const branchPoints: Point[] = [];
      let bx = currentX;
      let by = currentY;
      branchPoints.push({ x: bx, y: by });
      // Genera entre 2 y 3 segmentos para la rama (menos ramas)
      const branchSegments = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < branchSegments; j++) {
        const deltaY = (window.innerHeight - by) / (branchSegments + 1);
        by += deltaY;
        // Desviación horizontal menor para ramas
        const bOffset = (Math.random() - 0.5) * 40;
        bx += bOffset;
        branchPoints.push({ x: bx, y: by });
      }
      branches.push(branchPoints);
    }
  }
  return { main: mainPoints, branches };
};

// Convierte un array de puntos en un string para el atributo "d"
const pointsToPath = (points: Point[]): string =>
  points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');

const Lightning: React.FC = () => {
  const [trigger, setTrigger] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTrigger((prev) => prev + 1);
    }, 5000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const { main, branches } = generateLightningPaths(0.2);
  const mainPath = pointsToPath(main);
  const branchPaths = branches.map(pointsToPath);
  // Se usa un valor en píxeles para posicionar el SVG, pero ya se generan puntos relativos a la pantalla.
  const left = Math.random() * window.innerWidth;

  return (
    <SafeAnimatePresence>
      <motion.div
        key={trigger}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          zIndex: 8,
        }}
      >
        {/* Flash overlay: se reduce la opacidad para que no opaque el rayo */}
        <motion.div
          className="lightning-flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }}
        />
        <motion.svg
          className="lightning-svg"
          viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
          style={{
            position: 'absolute',
            top: 0,
            left: left,
            width: window.innerWidth,
            height: window.innerHeight,
          }}
        >
          <defs>
            {/* Filtro para glow (brillo) */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Camino principal con glow y stroke más grueso */}
          <path
            d={mainPath}
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1"  // Incrementamos el grosor principal
            filter="url(#glow)"
          />
          {/* Ramificaciones con glow y grosor ligeramente inferior */}
          {branchPaths.map((branch, idx) => (
            <path
              key={idx}
              d={branch}
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="0.7"  // Más gruesas que antes
              filter="url(#glow)"
            />
          ))}
        </motion.svg>
      </motion.div>
    </SafeAnimatePresence>
  );
};

export default Lightning;
