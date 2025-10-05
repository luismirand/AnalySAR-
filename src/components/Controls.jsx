import React from "react";

export default function Controls({
  year,
  setYear,
  stage,
  setStage,
  is3D,
  setIs3D,
  opacity,
  setOpacity,
}) {
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const stages = ["Antes", "Durante", "Después"];

  return (
    <div className="bg-[#0e1530] p-4 rounded-lg border border-blue-800 shadow-md text-gray-200">
      <label className="block text-blue-300 font-semibold mb-2">Año</label>
      <select
        className="w-full bg-slate-800 text-gray-100 p-2 rounded mb-4 focus:ring focus:ring-blue-500"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      >
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <label className="block text-blue-300 font-semibold mb-2">Etapa</label>
      <select
        className="w-full bg-slate-800 text-gray-100 p-2 rounded mb-4 focus:ring focus:ring-blue-500"
        value={stage}
        onChange={(e) => setStage(e.target.value)}
      >
        {stages.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Vista 2D/3D */}
      <div className="flex items-center justify-between mt-4">
        <label className="text-blue-300 font-semibold">Vista 3D</label>
        <button
          onClick={() => setIs3D(!is3D)}
          className={`px-3 py-1 rounded text-sm font-semibold ${
            is3D
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-slate-700 hover:bg-slate-600"
          }`}
        >
          {is3D ? "Activada" : "Desactivada"}
        </button>
      </div>

      {/* Opacidad */}
      <div className="mt-4">
        <label className="block text-blue-300 font-semibold mb-1">
          Opacidad: {Math.round(opacity * 100)}%
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className="w-full accent-blue-500"
        />
      </div>

      {/* Leyenda */}
      <div className="mt-6">
        <h3 className="text-blue-300 font-semibold mb-2">Leyenda</h3>
        <div className="flex items-center mb-1">
          <span className="w-5 h-3 bg-blue-600 mr-2 rounded-sm"></span>
          <span>Inundación principal</span>
        </div>
        <div className="flex items-center">
          <span className="w-5 h-3 bg-blue-400 mr-2 rounded-sm"></span>
          <span>Zona afectada secundaria</span>
        </div>
      </div>
    </div>
  );
}
