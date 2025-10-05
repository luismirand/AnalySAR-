import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "";

// Coordenadas aproximadas de Tabasco
const TABASCO_BOUNDS = [[-94.5, 17.0], [-90.8, 18.9]];

export default function Map3D({ year, stage, is3D, opacity }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const buildPath = (stage, year) => {
    const s = stage.charAt(0).toUpperCase() + stage.slice(1).toLowerCase();
    return `/data/Agua_${s}_Tabasco_${year}.geojson`;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    mapboxgl.accessToken = TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12", 
      center: [-92.93, 17.84],
      zoom: 7.2,
      pitch: 65,
      bearing: -15,
      antialias: true,
      projection: "globe", 
    });

    mapRef.current = map;

    // Controles
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Efecto de luz solar dinámico
    map.on("style.load", () => {
      // Fuente DEM (modelo de elevación)
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });

      // Asignar terreno al mapa 🌋
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      // Añadir capa de relieve sombreado para montañas
      map.addLayer({
        id: "hillshading",
        source: "mapbox-dem",
        type: "hillshade",
        layout: { visibility: "visible" },
        paint: {
          "hillshade-exaggeration": 0.7,
        },
      });

      // Fuente para datos de agua
      map.addSource("agua", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      // Capa de agua
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
            "interpolate", ["linear"], ["zoom"],
            7, 0,
            10, 60,
            13, 100,
          ],
          "fill-extrusion-opacity": opacity,
        },
      });

      // Borde del agua
      map.addLayer({
        id: "agua-outline",
        type: "line",
        source: "agua",
        paint: {
          "line-color": "#0ea5e9",
          "line-width": 0.5,
        },
      });

      // Luz del sol realista (según hora)
      map.setLight({ anchor: "map", color: "#ffffff", intensity: 0.7 });

      map.fitBounds(TABASCO_BOUNDS, { padding: 30 });
      setMapLoaded(true);

      updateData(stage, year);
    });

    map.on("idle", () => {
      if (!is3D) return;
      const bearing = (map.getBearing() + 0.05) % 360;
      map.setBearing(bearing);
    });

    return () => map.remove();
  }, []);

  // Cargar nuevos datos de inundación
  useEffect(() => {
    if (mapLoaded) updateData(stage, year);
  }, [stage, year, mapLoaded]);

  // Cambiar opacidad
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;
    if (map.getLayer("agua-fill")) {
      map.setPaintProperty("agua-fill", "fill-extrusion-opacity", opacity);
    }
  }, [opacity, mapLoaded]);

  // Cambiar modo 3D/2D
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (is3D) {
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      map.easeTo({ pitch: 65, bearing: -15, duration: 1000 });
    } else {
      map.setTerrain(null);
      map.easeTo({ pitch: 0, bearing: 0, duration: 1000 });
    }
  }, [is3D, mapLoaded]);

  const updateData = (s, y) => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const path = buildPath(s, y);
    const src = map.getSource("agua");
    if (!src) return;

    fetch(path)
      .then((r) => {
        if (!r.ok) throw new Error(`No se pudo cargar ${path}`);
        return r.json();
      })
      .then((geo) => src.setData(geo))
      .catch((e) => console.error("Error cargando datos:", e));
  };

  return (
    <div className="relative h-full w-full">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0b1225] text-blue-300 text-sm">
          Cargando relieve y datos de Tabasco...
        </div>
      )}
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
