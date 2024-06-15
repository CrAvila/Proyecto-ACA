// EarthquakeFeatures.jsx
import React from 'react';
import { motion } from 'framer-motion';

export function Description() {
  return (
    <div>
      <h2>Características de los Terremotos</h2>
      <ul>
        <li>Magnitud: Indica la energía liberada por un terremoto.</li>
        <li>Profundidad: Distancia medida desde la superficie hasta el foco del terremoto.</li>
        <li>Epicentro: Punto en la superficie directamente sobre el foco del terremoto.</li>
        <li>Tipos de Ondas: Pueden ser ondas P (primarias) y S (secundarias), entre otras.</li>
        <li>Efectos: Incluyen sacudidas, daños estructurales, tsunamis, etc.</li>
      </ul>
    </div>
  );
}
