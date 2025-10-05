import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

export default function DashboardPanel({
  year,
  setYear,
  stage,
  setStage,
  opacity,
  setOpacity,
  is3D,
  setIs3D,
}) {
  const [visible, setVisible] = useState(true);
  console.log("Renderizando DashboardPanel → visible:", visible);

  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  const stages = ["Antes", "Durante", "Después"];

  const chartData = {
    labels: stages,
    datasets: [
      {
        label: "Área (km²)",
        data: [1200, 2500, 1800],
        backgroundColor: "rgba(37,99,235,0.85)",
        borderRadius: 6,
        fill: true,
      },
    ],
  };

  return (
    <>
      {!visible && (
        <button
          onClick={() => setVisible(true)}
          className="fixed right-6 top-6 z-[60] rounded-full bg-blue-600 px-4 py-2 font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:bg-blue-700"
        >
          ⚙️ Panel
        </button>
      )}

      <AnimatePresence>
        {visible && (
          <motion.div
            id="dashboard-panel"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-auto fixed right-6 top-6 z-[60] w-[360px] max-h-[92vh] overflow-y-auto rounded-2xl border border-blue-700/40 bg-slate-900/90 p-5 text-slate-200 shadow-2xl backdrop-blur-xl space-y-5"
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <h2 className="text-lg font-semibold text-blue-300">Panel de Control</h2>
              <button
                onClick={() => setVisible(false)}
                className="text-xl text-gray-400 hover:text-white"
                aria-label="Cerrar panel"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-sm text-blue-400 mb-2">
                Año seleccionado: <span className="font-semibold">{year}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`rounded-md px-3 py-1 text-sm transition-all ${
                      year === y
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              {stages.map((s) => (
                <button
                  key={s}
                  onClick={() => setStage(s)}
                  className={`mx-1 flex-1 rounded-lg border py-2 transition-all ${
                    stage === s
                      ? "border-blue-400 bg-blue-600 text-white"
                      : "border-slate-700 bg-slate-800 text-slate-200 hover:border-blue-500 hover:text-blue-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm text-blue-400 mb-1">
                Opacidad ({opacity.toFixed(1)})
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-400">
                Modo actual: {is3D ? "3D" : "2D"}
              </span>
              <button
                onClick={() => setIs3D(!is3D)}
                className="rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold transition-all hover:bg-blue-700"
              >
                {is3D ? "Cambiar a 2D" : "Cambiar a 3D"}
              </button>
            </div>

            <div className="rounded-lg bg-slate-800/60 p-2">
              <Bar
                data={chartData}
                options={{
                  plugins: { legend: { labels: { color: "#cbd5e1" } } },
                  scales: {
                    x: { ticks: { color: "#cbd5e1" } },
                    y: { ticks: { color: "#cbd5e1" } },
                  },
                }}
              />
            </div>

            <div className="border-t border-slate-700 pt-2 text-center text-xs text-gray-400">
              © Tabasco Flood 3D — Datos SAR / Sentinel-1
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
