import React from "react";

export default function TimelineControls({ year, setYear }) {
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

  return (
    <div className="mt-4">
      <label className="block text-blue-300 font-semibold mb-2">
        Año seleccionado: {year}
      </label>
      <input
        type="range"
        min="2019"
        max="2025"
        step="1"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>
  );
}
