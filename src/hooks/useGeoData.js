import { useState, useEffect } from "react";

export default function useGeoData(year, stage) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const path = `/data/Agua_${stage}_Tabasco_${year}.geojson`;
        const res = await fetch(path);
        if (!res.ok) throw new Error("Archivo no encontrado");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.warn(`No se pudo cargar ${stage} ${year}:`, err);
        setData(null);
      }
    };
    loadData();
  }, [year, stage]);

  return data;
}
