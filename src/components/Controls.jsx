import React from "react";

export default function Controls({
  year,
  setYear,
  stage,
  setStage,
  opacity,
  setOpacity,
}) {
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const stages = ["Antes", "Durante", "Después"];

  return (
    <div>
      <h2 className="text-blue-400 font-semibold mb-2">Año</h2>
      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="w-full bg-slate-800/70 text-gray-100 p-2 rounded-lg mb-4 border border-blue-800 focus:ring focus:ring-blue-600/40"
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <h2 className="text-blue-400 font-semibold mb-2">Etapa</h2>
      <select
        value={stage}
        onChange={(e) => setStage(e.target.value)}
        className="w-full bg-slate-800/70 text-gray-100 p-2 rounded-lg mb-4 border border-blue-800 focus:ring focus:ring-blue-600/40"
      >
        {stages.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <h2 className="text-blue-400 font-semibold mb-2">Opacidad</h2>
      <input
        type="range"
        min="0.2"
        max="1"
        step="0.05"
        value={opacity}
        onChange={(e) => setOpacity(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>
  );
}
