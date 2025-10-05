import React from "react";

export default function InfoPanel({ info, year, stage }) {
  return (
    <div>
      <h2 className="text-blue-400 font-bold mb-2">
        Datos de {stage.toLowerCase()} ({year})
      </h2>
      {info ? (
        <ul className="space-y-1 text-sm">
          <li>
            <span className="text-gray-400">Polígonos:</span> {info.count}
          </li>
          <li>
            <span className="text-gray-400">Área total:</span>{" "}
            {info.area_km2.toFixed(2)} km²
          </li>
          <li>
            <span className="text-gray-400">Volumen estimado:</span>{" "}
            {info.volume_liters.toLocaleString()} L
          </li>
          <li>
            <span className="text-gray-400">Clase dominante:</span>{" "}
            {info.mainClass}
          </li>
        </ul>
      ) : (
        <p className="text-gray-400 text-sm">Cargando información...</p>
      )}
    </div>
  );
}
