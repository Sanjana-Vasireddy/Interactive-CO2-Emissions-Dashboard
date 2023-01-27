<template>
  <div class="maps">
    <h1 class="mt-4 green">Mapbox Map Options API</h1>

    USC map with footprints loaded via MapboxGL
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { onMounted } from "vue";

const ZOOM_LEVEL = 14;
const UPC_LON_LAT = [-118.286336, 34.021564];

function MapboxMap() {
  const map = new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: UPC_LON_LAT,
    zoom: ZOOM_LEVEL
  });

  map.on('load', () => {
    map.addSource('footprints', { //load footprints
      type: 'geojson',
      data: 'upc.geojson'
    });

    map.addLayer({ //add building footprints
      id: 'footprints',
      type: 'fill',
      source: 'footprints',
      layout: {
      },
      paint: {
        'fill-color': '#088',
        'fill-opacity': 0.8
      }
    });

    map.addLayer({ //add building name
      'id': 'poi-labels',
      'type': 'symbol',
      'source': "footprints",
      'layout': {
        'text-field': ['get', 'aname'],
        'text-variable-anchor': ['center'],
        'text-radial-offset': 0,
        'text-justify': 'auto',
      },
      paint: {
        'text-color': '#ffffff',
      }
    });
  });
}

export default {
  setup() {

    onMounted(() => {
      MapboxMap();
    });

    return {};
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 350px;
}
</style>