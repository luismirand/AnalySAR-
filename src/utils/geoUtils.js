import area from "@turf/area";

export function calcularAreaTotal(geojson) {
  if (!geojson || !geojson.features) return 0;

  let total = 0;
  for (const feature of geojson.features) {
    try {
      total += area(feature);
    } catch (e) {
      console.warn("Error calculando área:", e);
    }
  }

  return total / 1_000_000; // m² → km²
}
