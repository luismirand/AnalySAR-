import React from "react";
import { calcularAreaTotal } from "../utils/geoUtils.js";


export default function InfoPanel({ data }) {
  if (!data || !data.features) return null;
  const totalArea = calcularAreaTotal(data).toFixed(2);
  const numFeatures = data.features.length;

  return (
    <div className="mt-4 text-sm">
      <h2 className="text-blue-300 font-semibold mb-2">Estadísticas</h2>
      <p>Polígonos: <span className="text-blue-400">{numFeatures}</span></p>
      <p>Área total: <span className="text-blue-400">{totalArea} km²</span></p>
    </div>
  );
}
