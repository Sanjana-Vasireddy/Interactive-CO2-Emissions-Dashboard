<template>
  <div class="maps">
    <h1 class="mt-4 green">Mapbox Map Composition API</h1>

    USC map with footprints loaded via MapboxGL
    <div id="map"></div>
  </div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { ScatterplotLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import { onMounted } from "vue";

const ZOOM_LEVEL = 11;
const MAP_CENTER_LON_LAT = [-118.2542436048327, 34.04512579569334];
const UPC_LON_LAT = [-118.286336, 34.021564];
const HSC_LON_LAT = [-118.205681, 34.061355];
    
function MapboxMap() {
    // see https://deck.gl/docs/api-reference/mapbox/mapbox-layer
    const deckLayer = new MapboxLayer({
      id: "my-scatterplot",
      type: ScatterplotLayer,
      opacity: 0.3,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 3,
      data: [
        { position: UPC_LON_LAT, size: 100 },
        { position: HSC_LON_LAT, size: 100 }
      ],
      getPosition: d => d.position,
      getRadius: d => d.size,
      getFillColor: [255, 140, 0],
      getLineColor: [255, 255, 255]
    });

    let map = new mapboxgl.Map({
      accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      center: MAP_CENTER_LON_LAT,
      zoom: ZOOM_LEVEL
    });

    map.on('load', () => {
      map.addLayer(deckLayer);
    });
}

onMounted(() => {
  MapboxMap();
});
</script>

<style>
#map {
  width: 100%;
  height: 350px;
}
</style>