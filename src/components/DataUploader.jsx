import React from "react";

export default function DataUploader({ stage, setStage }) {
  const stages = ["Antes", "Durante", "Después"];

  return (
    <div className="mb-4">
      <h2 className="text-blue-300 font-semibold mb-2">Etapa</h2>
      <select
        className="w-full bg-slate-700 text-gray-100 p-2 rounded focus:ring focus:ring-blue-500"
        value={stage}
        onChange={(e) => setStage(e.target.value)}
      >
        {stages.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
