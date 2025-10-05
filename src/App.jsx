import React, { useState } from "react";
import Map3D from "./components/Map3D";
import Controls from "./components/Controls";

export default function App() {
  const [year, setYear] = useState(2020);
  const [stage, setStage] = useState("Durante");
  const [is3D, setIs3D] = useState(true);
  const [opacity, setOpacity] = useState(0.8);

  return (
    <div className="flex h-screen w-full bg-[#0b1225] text-white">
      <aside className="w-[360px] min-w-[280px] p-4 border-r border-blue-800 overflow-y-auto">
        <h1 className="text-2xl font-bold text-blue-300 mb-4">
          Tabasco 2019–2025
        </h1>
        <Controls
          year={year}
          setYear={setYear}
          stage={stage}
          setStage={setStage}
          is3D={is3D}
          setIs3D={setIs3D}
          opacity={opacity}
          setOpacity={setOpacity}
        />
      </aside>
      <main className="flex-1">
        <Map3D year={year} stage={stage} is3D={is3D} opacity={opacity} />
      </main>
    </div>
  );
}
