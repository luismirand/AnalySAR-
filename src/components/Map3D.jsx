import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";

// Coordenadas de Tabasco (aproximadas)
const TABASCO_BOUNDS = [
  [-94.5, 17.0],
  [-90.8, 18.9],
];

export default function Map3D({ year, stage, is3D, opacity }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [info, setInfo] = useState(null);

  const buildPath = (stage, year) => {
    const s = stage.charAt(0).toUpperCase() + stage.slice(1).toLowerCase();
    return `/data/Agua_${s}_Tabasco_${year}.geojson`;
  };

  // 🔹 Inicialización principal
  useEffect(() => {
    if (!containerRef.current) return;

    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [-92.93, 17.84],
      zoom: 7.2,
      pitch: 60,
      bearing: -15,
      antialias: true,
      projection: "globe",
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("style.load", () => {
      console.log("✅ Estilo cargado, configurando terreno...");

      // Evita errores si se reinicia el estilo
      if (!map.getSource("terrain-dem")) {
        map.addSource("terrain-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }

      // Hillshade separado (mejor detalle)
      if (!map.getSource("hillshade-dem")) {
        map.addSource("hillshade-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }

      // Terreno 3D
      map.setTerrain({ source: "terrain-dem", exaggeration: 1.5 });

      // Capa de sombreado
      if (!map.getLayer("hillshading")) {
        map.addLayer({
          id: "hillshading",
          source: "hillshade-dem",
          type: "hillshade",
          paint: { "hillshade-exaggeration": 0.7 },
        });
      }

      // Fuente vacía inicial
      if (!map.getSource("agua")) {
        map.addSource("agua", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
      }

      // Capa de agua (relleno 3D)
      if (!map.getLayer("agua-fill")) {
        map.addLayer({
          id: "agua-fill",
          type: "fill-extrusion",
          source: "agua",
          paint: {
            "fill-extrusion-color": [
              "case",
              ["==", ["get", "class"], 1],
              "#3b82f6",
              "#60a5fa",
            ],
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              0,
              10,
              60,
              13,
              100,
            ],
            "fill-extrusion-opacity": opacity,
          },
        });
      }

      // Contorno del agua
      if (!map.getLayer("agua-outline")) {
        map.addLayer({
          id: "agua-outline",
          type: "line",
          source: "agua",
          paint: { "line-color": "#0ea5e9", "line-width": 0.5 },
        });
      }

      // Luz ambiental (v2 compatible)
      map.setLight({
        anchor: "viewport",
        color: "#ffffff",
        intensity: 0.5,
      });

      // Ajuste inicial
      map.fitBounds(TABASCO_BOUNDS, { padding: 30 });
      setMapLoaded(true);

      updateData(stage, year);
    });

    // 🔹 Movimiento automático opcional
    map.on("idle", () => {
      if (is3D && map.isStyleLoaded()) {
        map.setBearing((map.getBearing() + 0.02) % 360);
      }
    });

    return () => {
      console.log("🧹 Limpiando mapa...");
      map.remove();
    };
  }, []);

  // 🔹 Cargar datos dinámicamente
  const updateData = async (s, y) => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const path = buildPath(s, y);
    const src = map.getSource("agua");
    if (!src) return;

    try {
      const r = await fetch(path);
      if (!r.ok) {
        console.warn(`Archivo no encontrado: ${path}`);
        src.setData({ type: "FeatureCollection", features: [] });
        setInfo(null);
        return;
      }

      const geo = await r.json();
      src.setData(geo);

      const areaKm2 = turf.area(geo) / 1e6;
      const volumenLitros = areaKm2 * 0.1 * 1e9;

      setInfo({
        area: areaKm2.toFixed(2),
        volumen: volumenLitros.toLocaleString("es-MX"),
        features: geo.features.length,
        year: y,
        stage: s,
      });
    } catch (err) {
      console.error("❌ Error cargando datos:", err);
      setInfo(null);
    }
  };

  // 🔹 Actualizar al cambiar año o etapa
  useEffect(() => {
    if (mapLoaded) updateData(stage, year);
  }, [stage, year, mapLoaded]);

  // 🔹 Opacidad dinámica
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;
    if (map.getLayer("agua-fill")) {
      map.setPaintProperty("agua-fill", "fill-extrusion-opacity", opacity);
    }
  }, [opacity, mapLoaded]);

  // 🔹 Cambiar entre 2D / 3D
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (is3D) {
      map.setTerrain({ source: "terrain-dem", exaggeration: 1.5 });
      map.easeTo({ pitch: 60, bearing: -15, duration: 1200 });
    } else {
      map.setTerrain(null);
      map.easeTo({ pitch: 0, bearing: 0, duration: 1200 });
    }
  }, [is3D, mapLoaded]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0b1225] text-blue-300 text-sm z-[5]">
          Cargando relieve y datos de Tabasco...
        </div>
      )}

      {info && (
        <div className="absolute top-4 left-4 bg-blue-950/70 backdrop-blur-md p-4 rounded-2xl border border-blue-500/40 shadow-lg text-gray-200 text-sm z-[10]">
          <h2 className="text-blue-300 font-semibold mb-1">
            Datos de {info.stage} ({info.year})
          </h2>
          <ul className="list-disc list-inside">
            <li>Polígonos: {info.features}</li>
            <li>Área total: {info.area} km²</li>
            <li>Volumen estimado: {info.volumen} L</li>
          </ul>
        </div>
      )}

      <div ref={containerRef} className="absolute inset-0 z-0 h-full w-full" />
    </div>
  );
}
