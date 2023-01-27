// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM

// const { range } = require("d3");

// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoicHJpc2NpbGxhbCIsImEiOiJjbDl4ZDJ3NDkwNzhrM29tOHl6NjcyZXk3In0.5YDAKb77AJAroZiIRwCYsA';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v10',
    center: [31.4606, 20.7927],
    zoom: 1.7
});

const year_range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);
const years = (year_range(1991, 2008)).map(String);

function filterBy(year) {
    const filters = ['==', 'year', year];
    map.setFilter('earthquake-circles', filters);
    map.setFilter('earthquake-labels', filters);

    // Set the label to the month
    document.getElementById('year').textContent = years[year-1991];
}

map.on('load', () => {
    d3.json('./data/emissions.geojson').then(data => {
        // Create a month property value based on time
        // used to filter against.
        data.features = data.features.map((d) => {
            d.properties.year = new Date(d.properties.year).getFullYear()+1;
            return d;
        });

        map.addSource('earthquakes', {
            'type': 'geojson',
            data: data
        });

        map.addLayer({
            'id': 'earthquake-circles',
            'type': 'circle',
            'source': 'earthquakes',
            'paint': {
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
                'text-color': 'rgba(0,0,0,0.5)'
            }
        });

        // Set filter to first month of the year
        // 0 = January
        filterBy(1991);

        document.getElementById('slider').addEventListener('input', (e) => {
            const year = parseInt(e.target.value)+1991;
            filterBy(year);
        });
    });
});
