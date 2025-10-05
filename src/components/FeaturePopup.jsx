import React from "react";

export default function FeaturePopup({ feature }) {
  if (!feature) return null;
  const props = feature.properties || {};

  return (
    <div className="bg-slate-800 p-2 rounded shadow-lg border border-blue-700 text-xs">
      <p><strong>ID:</strong> {feature.id}</p>
      <p><strong>Clase:</strong> {props.class}</p>
      <p><strong>Count:</strong> {props.count}</p>
      <p><strong>Fecha:</strong> {props.date || "Desconocida"}</p>
    </div>
  );
}
