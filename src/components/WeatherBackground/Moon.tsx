// src/components/WeatherBackground/Moon.tsx
import React, { JSX } from 'react';
import { motion } from 'framer-motion';
import './Moon.scss';

export interface MoonProps {
  /** Fase de la luna */
  phase?:
    | 'new'
    | 'waxing-crescent'
    | 'first-quarter'
    | 'waxing-gibbous'
    | 'full'
    | 'waning-gibbous'
    | 'last-quarter'
    | 'waning-crescent';
}

const Moon: React.FC<MoonProps> = ({ phase = 'full' }) => {
  // Generamos un id único para el clipPath incondicionalmente.
  const generatedId = React.useId();
  const maskId = `moonClip-${generatedId}`;

  // Función que devuelve los parámetros (centro y radio) para el círculo de clipPath según la fase.
  // Los valores se han ajustado para lograr diferencias más notorias:
  // - Para "waxing-crescent", se desplaza el centro mucho hacia la derecha y se reduce ligeramente el radio para mostrar un creciente fino.
  // - Para "first-quarter", se muestra aproximadamente la mitad derecha.
  // - Para "waxing-gibbous", se muestra casi completa, con una ligera sombra a la izquierda.
  // - De forma análoga, para "waning-crescent" y "last-quarter" se ajustan los valores en dirección opuesta.
  const getClipCircleParams = (): { cx: number; cy: number; r: number } | null => {
    switch (phase) {
      case 'waxing-crescent':
        return { cx: 58, cy: 32, r: 28 }; // Creciente fino, parte derecha muy iluminada
      case 'first-quarter':
        return { cx: 48, cy: 32, r: 32 }; // Aproximadamente mitad derecha
      case 'waxing-gibbous':
        return { cx: 42, cy: 32, r: 32 }; // Casi llena, con recorte leve a la izquierda
      case 'waning-gibbous':
        return { cx: 38, cy: 32, r: 32 }; // Casi llena, con recorte leve a la derecha
      case 'last-quarter':
        return { cx: 16, cy: 32, r: 32 }; // Aproximadamente mitad izquierda
      case 'waning-crescent':
        return { cx: 10, cy: 32, r: 28 }; // Menguante fino, parte izquierda muy iluminada
      default:
        return null;
    }
  };

  const clipParams = getClipCircleParams();

  // Renderizado según fase:
  // - "new": Se muestra la luna con opacity 0 (invisible).
  // - "full": Se muestra el círculo completo.
  // - Para las demás fases: se dibuja el círculo base y se superpone un círculo oscuro recortado con el clipPath.
  let svgContent: JSX.Element;
  if (phase === 'new') {
    svgContent = <circle cx="32" cy="32" r="30" fill="#F4F1C9" opacity="0" />;
  } else if (phase === 'full') {
    svgContent = <circle cx="32" cy="32" r="30" fill="#F4F1C9" />;
  } else if (clipParams) {
    svgContent = (
      <>
        <circle cx="32" cy="32" r="30" fill="#F4F1C9" />
        <circle cx="32" cy="32" r="30" fill="#222" clipPath={`url(#${maskId})`} />
      </>
    );
  } else {
    svgContent = <circle cx="32" cy="32" r="30" fill="#F4F1C9" />;
  }

  return (
    <motion.div
      className="moon"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <svg viewBox="0 0 64 64" className="moon-svg">
        {clipParams && (
          <defs>
            <clipPath id={maskId}>
              <circle cx={clipParams.cx} cy={clipParams.cy} r={clipParams.r} />
            </clipPath>
          </defs>
        )}
        {svgContent}
      </svg>
    </motion.div>
  );
};

export default Moon;
