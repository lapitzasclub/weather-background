import React, { useRef, useEffect, useCallback } from 'react';
import './Clouds.scss';

export interface CloudsProps {
  cloudIntensity: 'none' | 'light' | 'medium' | 'heavy';
  cloudColor?: string;
}

const Clouds: React.FC<CloudsProps> = ({ cloudIntensity, cloudColor }) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  
  // Configuración según la intensidad: cantidad de nubes y capas.
  const intensitySettings = {
    none: { clouds: 0, layers: 0 },
    light: { clouds: 3, layers: 5 },
    medium: { clouds: 5, layers: 8 },
    heavy: { clouds: 8, layers: 12 }
  };

  const { clouds: cloudCount, layers: layersPerCloud } = intensitySettings[cloudIntensity];

  // Si no se pasa un valor en cloudColor, se asigna según la intensidad:
  // light: blanco, medium: gris claro, heavy: gris oscuro.
  const computedColor =
    cloudColor ||
    (cloudIntensity === 'light'
      ? '#FFFFFF'
      : cloudIntensity === 'medium'
      ? '#DDD'
      : cloudIntensity === 'heavy'
      ? '#666'
      : '#CFD8DC');

  // Variables para las transformaciones 3D
  const d = useRef(0);
  const worldXAngle = useRef(0);
  const worldYAngle = useRef(0);
  const layers = useRef<Array<{ element: HTMLDivElement; data: any }>>([]);
  const animationFrameId = useRef<number | null>(null);

  const createCloudLayers = useCallback(
    (cloudBase: HTMLDivElement) => {
      const newLayers = [];
      
      for (let j = 0; j < layersPerCloud; j++) {
        const cloudLayer = document.createElement('div');
        cloudLayer.className = 'cloud-layer';
        
        // Valores aleatorios para posición y animación
        const x = 256 - Math.random() * 512;
        const y = 256 - Math.random() * 512;
        const z = 100 - Math.random() * 200;
        const angle = Math.random() * 360;
        const scale = 0.25 + Math.random();
        const speed = 0.1 * Math.random();
        
        cloudLayer.style.transform = `
          translateX(${x * 0.2}px) 
          translateY(${y * 0.2}px) 
          translateZ(${z}px) 
          rotateZ(${angle}deg) 
          scale(${scale})
        `;
        // En lugar de aplicar un backgroundColor (que pintaría el fondo), asignamos
        // la propiedad "color". Esto hará que el SVG que uses (si usa currentColor)
        // se "tinte" con el valor de computedColor.
        cloudLayer.style.color = computedColor;
        
        newLayers.push({
          element: cloudLayer,
          data: { x: x * 0.2, y: y * 0.2, z, angle, speed, scale }
        });
        
        cloudBase.appendChild(cloudLayer);
      }
      
      return newLayers;
    },
    [layersPerCloud, computedColor]
  );

  const generateClouds = useCallback(() => {
    if (!worldRef.current) return;
    
    worldRef.current.innerHTML = '';
    layers.current = [];
    
    for (let i = 0; i < cloudCount; i++) {
      const cloudBase = document.createElement('div');
      cloudBase.className = 'cloud-base';
      
      // Posición base aleatoria
      const x = 256 - Math.random() * 512;
      const y = 256 - Math.random() * 512;
      const z = 256 - Math.random() * 512;
      
      cloudBase.style.transform = `
        translateX(${x}px) 
        translateY(${y}px) 
        translateZ(${z}px)
      `;
      
      layers.current.push(...createCloudLayers(cloudBase));
      worldRef.current.appendChild(cloudBase);
    }
  }, [cloudCount, createCloudLayers]);

  const updateView = useCallback(() => {
    if (worldRef.current) {
      worldRef.current.style.transform = `
        translateZ(${d.current}px) 
        rotateX(${worldXAngle.current}deg) 
        rotateY(${worldYAngle.current}deg)
      `;
    }
  }, []);

  const animate = useCallback(() => {
    layers.current.forEach(layer => {
      // Incrementamos el ángulo (rotación acumulada) según la velocidad
      layer.data.angle += layer.data.speed;
      // Se aplica un factor (0.2) a la rotación Z para que sea sutil
      layer.element.style.transform = `
        translateX(${layer.data.x}px)
        translateY(${layer.data.y}px)
        translateZ(${layer.data.z}px)
        rotateY(${-worldYAngle.current}deg)
        rotateX(${-worldXAngle.current}deg)
        rotateZ(${layer.data.angle * 0.2}deg)
        scale(${layer.data.scale})
      `;
    });
    
    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    generateClouds();
    animate();
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [generateClouds, animate]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!viewportRef.current) return;
      
      const rect = viewportRef.current.getBoundingClientRect();
      worldYAngle.current = -(0.5 - e.clientX / rect.width) * 180;
      worldXAngle.current = (0.5 - e.clientY / rect.height) * 180;
      updateView();
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      d.current -= e.deltaY * 0.1;
      updateView();
    };

    const viewport = viewportRef.current;
    viewport?.addEventListener('mousemove', handleMouseMove);
    viewport?.addEventListener('wheel', handleWheel);

    return () => {
      viewport?.removeEventListener('mousemove', handleMouseMove);
      viewport?.removeEventListener('wheel', handleWheel);
    };
  }, [updateView]);

  if (cloudIntensity === 'none') return null;

  return (
    <div ref={viewportRef} className="clouds-viewport">
      <div ref={worldRef} className="clouds-world" />
    </div>
  );
};

export default Clouds;
