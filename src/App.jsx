import React, { useState } from "react";
import Map3D from "./components/Map3D";
import DashboardPanel from "./components/DashboardPanel";

export default function App() {
  console.log("Renderizando App con DashboardPanel");
  const [year, setYear] = useState(2019);
  const [stage, setStage] = useState("Antes");
  const [opacity, setOpacity] = useState(0.6);
  const [is3D, setIs3D] = useState(true);

  return (
    <div className="h-screen w-screen relative bg-slate-900 text-slate-100 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Map3D year={year} stage={stage} is3D={is3D} opacity={opacity} />
      </div>

      <div id="dashboard-wrapper" className="absolute top-0 right-0 z-50 p-4">
        <DashboardPanel
          year={year}
          setYear={setYear}
          stage={stage}
          setStage={setStage}
          opacity={opacity}
          setOpacity={setOpacity}
          is3D={is3D}
          setIs3D={setIs3D}
        />
      </div>
    </div>
  );
}
