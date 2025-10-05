import React from "react";

const timeline = [
  { year: 2019, label: "Ago–Dic" },
  { year: 2020, label: "Sep–Dic" },
  { year: 2021, label: "Oct–Dic" },
  { year: 2022, label: "Oct–Dic" },
  { year: 2023, label: "Nov–Dic" },
  { year: 2024, label: "Oct–Dic" },
  { year: 2025, label: "Sep–Dic" },
];

export default function Timeline({ year, setYear }) {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-blue-700/30 rounded-2xl px-6 py-3 shadow-lg">
      <h3 className="text-center text-blue-400 text-sm mb-2 font-semibold">
        Línea de Tiempo
      </h3>
      <div className="flex items-center justify-between">
        {timeline.map((t) => (
          <button
            key={t.year}
            onClick={() => setYear(t.year)}
            className={`flex flex-col items-center text-xs ${
              year === t.year
                ? "text-blue-300 font-bold"
                : "text-gray-400 hover:text-blue-200"
            }`}
          >
            <span>{t.year}</span>
            <div
              className={`h-2 w-2 rounded-full mt-1 ${
                year === t.year ? "bg-blue-400" : "bg-gray-600"
              }`}
            ></div>
            <span className="text-[10px] text-gray-500">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
