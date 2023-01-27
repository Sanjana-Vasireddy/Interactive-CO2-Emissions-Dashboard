<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="maps">
      <h1 class="mt-4 green">Mapbox Map Composition API</h1>

      USC map with footprints loaded via MapboxGL
      <div id="map"></div>

      <div class="map-overlay top">
        <div class="map-overlay-inner">
          <h2>CO2 Emissions around the world</h2>
          <label id="year"></label>
          <input id="slider" type="range" min="0" max="17" step="1" value="0">
        </div>
        <div class="map-overlay-inner">
          <div id="legend" class="legend">
            <div class="bar"></div>
            <div>Emissions in metric tons (mt)</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { ScatterplotLayer } from "@deck.gl/layers";
import { MapboxLayer } from "@deck.gl/mapbox";
import { onMounted } from "vue";
import { useChartStore } from '../stores/useChartStore';
import * as d3 from 'd3';

const store = useChartStore();
//const message = ref('Data was set from store');

const ZOOM_LEVEL = 1.7;
const MAP_CENTER_LON_LAT = [31.4606, 20.7927];

function MapboxMap() {
  // see https://deck.gl/docs/api-reference/mapbox/mapbox-layer
  const year_range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const years = (year_range(1991, 2008)).map(String);

  function filterBy(year) {
    const filters = ['==', 'year', year];
    map.setFilter('earthquake-circles', filters);
    //map.setFilter('earthquake-labels', filters);

    // Set the label to the month
    document.getElementById('year').textContent = years[year - 1991];
  }

  const deckLayer = new MapboxLayer({
    id: "earthquake-circles",
    type: ScatterplotLayer,
    source: 'earthquakes',
    paint: {
      'circle-color': [
        'interpolate',
        ['linear'],
        ['get', 'emissions'],
        6,
        '#FCA107',
        8,
        '#7F3121'
      ],
      'circle-opacity': 0.75,
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', 'emissions'],
        6,
        20,
        8,
        40
      ]
    }
  });

  // const labelLayer = new MapboxLayer({
  //   id: "earthquake-labels",
  //   type: ScatterplotLayer,
  //   source: 'earthquakes',
  //   layout: {
  //     'text-field': ['concat', ['to-string', ['get', 'emissions']], 'mt'],
  //     'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
  //     'text-size': 12
  //   },
  //   paint: {
  //     'text-color': 'rgba(0,0,0,0.5)'
  //   }
  // });

  let map = new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: MAP_CENTER_LON_LAT,
    zoom: ZOOM_LEVEL
  });

  map.on('load', () => {
    store.emissions.features = store.emissions.features.map((d) => {
      d.properties.year = new Date(d.properties.year).getFullYear() + 1;
      return d;
    });

    map.addSource('earthquakes', {
      'type': 'geojson',
      data: store.emissions
    });

    map.addLayer(deckLayer);
    //map.addLayer(labelLayer);

    filterBy(1991);

    document.getElementById('slider').addEventListener('input', (e) => {
      const year = parseInt(e.target.value) + 1991;
      filterBy(year);
    });
  });
}

onMounted(() => {
  if (!store.emissions) {
    d3.json('emissions.geojson').then(result => {
      store.emissions = result;
      //message.value = `Data was loaded from file, contains ${store.emissions.length} rows`;
      MapboxMap();
    });
  } else {
    MapboxMap();
  }
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.map-overlay {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  position: absolute;
  width: 25%;
  top: 50px;
  padding: 10px;
}

.map-overlay .map-overlay-inner {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
}

.map-overlay h2 {
  line-height: 24px;
  display: block;
  margin: 0 0 10px;
}

.map-overlay .legend .bar {
  height: 10px;
  width: 100%;
  background: linear-gradient(to right, #fca107, #7f3121);
}

.map-overlay input {
  background-color: transparent;
  display: inline-block;
  width: 100%;
  position: relative;
  margin: 0;
  cursor: ew-resize;
}
</style>