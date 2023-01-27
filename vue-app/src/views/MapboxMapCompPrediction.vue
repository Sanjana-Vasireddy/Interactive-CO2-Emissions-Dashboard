<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
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
  </main>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { onMounted } from "vue";
import { useChartStore } from '../stores/useChartStore';
import * as d3 from 'd3';

const store = useChartStore();

const ZOOM_LEVEL = 1.7;
const CNT_LON_LAT = [36.079108, 74.943215];//[48.0196, 66.9237];

function MapboxMap() {
  const map = new mapboxgl.Map({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: CNT_LON_LAT,
    zoom: ZOOM_LEVEL
  });

  const year_range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const years = (year_range(1991, 2008)).map(String);

  function filterBy(year) {
    const filters = ['==', 'year', year];
    map.setFilter('earthquake-circles', filters);
    map.setFilter('earthquake-labels', filters);

    // Set the label to the month
    document.getElementById('year').textContent = years[year - 1991];
  }

  map.on('load', () => {

    // store.emissions.features = store.emissions.features.map((d) => {
    //   d.properties.year = new Date(d.properties.year).getFullYear() + 1;
    //   return d;
    // });

    map.addSource('earthquakes', {
      'type': 'geojson',
      data: store.emissions
    });

    map.addLayer({
      'id': 'earthquake-circles',
      'type': 'circle',
      'source': 'earthquakes',
      'paint': {
        'circle-color': [
          'interpolate',
          ['exponential', 1.5],
          ['get', 'emissions'],
          8,
          '#c55573',
          13,
          '#440117'
        ],
        'circle-opacity': 0.95,
        'circle-radius': [
          'interpolate',
          ['exponential', 1.5],
          ['get', 'emissions'],
          8,
          20,
          13,
          40
        ]
      }
    });

    map.addLayer({
      'id': 'earthquake-labels',
      'type': 'symbol',
      'source': 'earthquakes',
      'layout': {
        'text-field': ['concat', ['to-string', ['get', 'emissions']], 'mt'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 12
      },
      'paint': {
        'text-color': 'rgba(0,0,0,0.95)'
      }
    });

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
      store.emissions.features = store.emissions.features.map((d) => {
        d.properties.year = new Date(d.properties.year).getFullYear() + 1;
        return d;
      });

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
  top: 75px;
  bottom: 0;
  width: 100%;
}

.map-overlay {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  position: absolute;
  width: 25%;
  top: 60px;
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
  background: linear-gradient(to right, #c55573, #440117);
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