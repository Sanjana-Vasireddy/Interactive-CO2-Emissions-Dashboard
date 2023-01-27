<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4" id="barChart">
    <h1 style="margin: 25px;">GNI per capita (Atlas $)</h1>
    <div class="d3areachart">
      <div id="areachart" width="850px" height="450px"></div>
    </div>
    <h1 style="margin: 25px;">Energy usage per capita (kg in oil equivalent)</h1>
    <div class="d3barChart">
      <div class="text-center mb-2">
        Show <span class="button filter" id="usa">United States</span>
        <span class="button filter" id="canada">Canada</span>
        <span class="button filter" id="austria">Austria</span>
        <span class="button filter" id="germany">Germany</span>
        <span class="button filter" id="italy">Italy</span>
        <span class="button filter" id="uk">United Kingdom</span>
        <span class="button filter" id="japan">Japan</span>
        <span class="button filter" id="india">India</span>
        <span class="button filter" id="china">China</span>
        <span class="button filter" id="saudi_arabia">Saudi Arabia</span>
      </div>

      <svg id="chart"></svg>
    </div>
  </main>

</template>
  
<script setup>
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useChartStore } from '../stores/useChartStore'

const store = useChartStore();
const message = ref('Data was set from store');
var data;
var usa, canada, austria, germany, uk, japan, china, italy, india, saudi_arabia;
var current, sortMode, filterMode;

var x = d3.scaleBand();
var y = d3.scaleLinear();


function areaChart() {
  const spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "Area charts of emissions, with an interactive overview and filtered detail views.",
    "width": 800,
    "height": 600,
    "padding": 5,

    "data": [
      {
        "name": "co2Emission_GDP",
        "url": 'public/USA_CO2_GDP.csv',
        "format": { "type": "csv", "parse": { "emission": "number", "year": "date" } }
      }
    ],

    "signals": [
      {
        "name": "detailDomain"
      }
    ],

    "marks": [
      {
        "type": "group",
        "name": "detail",
        "encode": {
          "enter": {
            "height": { "value": 650 },
            "width": { "value": 800 }
          }
        },
        "scales": [
          {
            "name": "xDetail",
            "type": "time",
            "range": "width",
            "domain": { "data": "co2Emission_GDP", "field": "year" },
            "domainRaw": { "signal": "detailDomain" }
          },
          {
            "name": "yDetail",
            "type": "linear",
            "range": [650, 0],
            "domain": { "data": "co2Emission_GDP", "field": "emission" },
            "nice": true, "zero": true
          }
        ],
        "axes": [
          { "orient": "bottom", "scale": "xDetail" },
          { "orient": "left", "scale": "yDetail" }
        ],
        "marks": [
          {
            "type": "group",
            "encode": {
              "enter": {
                "height": { "field": { "group": "height" } },
                "width": { "field": { "group": "width" } },
                "clip": { "value": true }
              }
            },
            "marks": [
              {
                "type": "area",
                "from": { "data": "co2Emission_GDP" },
                "encode": {
                  "update": {
                    "x": { "scale": "xDetail", "field": "year" },
                    "y": { "scale": "yDetail", "field": "emission" },
                    "y2": { "scale": "yDetail", "value": 0 },
                    "fill": { "value": "steelblue" }
                  }
                }
              }
            ]
          }
        ]
      },

      {
        "type": "group",
        "name": "overview",
        "encode": {
          "enter": {
            "x": { "value": 0 },
            "y": { "value": 675 },
            "height": { "value": 70 },
            "width": { "value": 720 },
            "fill": { "value": "transparent" }
          }
        },
        "signals": [
          {
            "name": "brush", "value": 0,
            "on": [
              {
                "events": "@overview:mousedown",
                "update": "[x(), x()]"
              },
              {
                "events": "[@overview:mousedown, window:mouseup] > window:mousemove!",
                "update": "[brush[0], clamp(x(), 0, width)]"
              },
              {
                "events": { "signal": "delta" },
                "update": "clampRange([anchor[0] + delta, anchor[1] + delta], 0, width)"
              }
            ]
          },
          {
            "name": "anchor", "value": null,
            "on": [{ "events": "@brush:mousedown", "update": "slice(brush)" }]
          },
          {
            "name": "xdown", "value": 0,
            "on": [{ "events": "@brush:mousedown", "update": "x()" }]
          },
          {
            "name": "delta", "value": 0,
            "on": [
              {
                "events": "[@brush:mousedown, window:mouseup] > window:mousemove!",
                "update": "x() - xdown"
              }
            ]
          },
          {
            "name": "detailDomain",
            "push": "outer",
            "on": [
              {
                "events": { "signal": "brush" },
                "update": "span(brush) ? invert('xOverview', brush) : null"
              }
            ]
          }
        ],
        "scales": [
          {
            "name": "xOverview",
            "type": "time",
            "range": "width",
            "domain": { "data": "co2Emission_GDP", "field": "year" }
          },
          {
            "name": "yOverview",
            "type": "linear",
            "range": [70, 0],
            "domain": { "data": "co2Emission_GDP", "field": "emission" },
            "nice": true, "zero": true
          }
        ],
        "axes": [
          { "orient": "bottom", "scale": "xOverview" }
        ],
        "marks": [
          {
            "type": "area",
            "interactive": false,
            "from": { "data": "co2Emission_GDP" },
            "encode": {
              "update": {
                "x": { "scale": "xOverview", "field": "year" },
                "y": { "scale": "yOverview", "field": "emission" },
                "y2": { "scale": "yOverview", "value": 0 },
                "fill": { "value": "steelblue" }
              }
            }
          },
          {
            "type": "rect",
            "name": "brush",
            "encode": {
              "enter": {
                "y": { "value": 0 },
                "height": { "value": 70 },
                "fill": { "value": "#333" },
                "fillOpacity": { "value": 0.2 }
              },
              "update": {
                "x": { "signal": "brush[0]" },
                "x2": { "signal": "brush[1]" }
              }
            }
          },
          {
            "type": "rect",
            "interactive": false,
            "encode": {
              "enter": {
                "y": { "value": 0 },
                "height": { "value": 70 },
                "width": { "value": 1 },
                "fill": { "value": "firebrick" }
              },
              "update": {
                "x": { "signal": "brush[0]" }
              }
            }
          },
          {
            "type": "rect",
            "interactive": false,
            "encode": {
              "enter": {
                "y": { "value": 0 },
                "height": { "value": 70 },
                "width": { "value": 1 },
                "fill": { "value": "firebrick" }
              },
              "update": {
                "x": { "signal": "brush[1]" }
              }
            }
          }
        ]
      }
    ]
  };
  const result = vegaEmbed("#areachart", spec);
  // result.view provides access to the Vega View API
  console.log(result.view);
}

function barChart() {
  var margin = { top: 20, left: 75, bottom: 50, right: 50 },
    width = 850 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

  var svg = d3.select('#chart')//.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  data = store.energy_per_cap;


  // d3.json('./data/energy_per_cap.json', d => {
  //     return {
  //         country: d.country,
  //         en_per_cap: +d.en_per_cap,
  //         year: +d.year
  //     };
  // }).then(data => {
  //initialize data variables
  austria = data.slice(0, 18);
  canada = data.slice(18, 36);
  china = data.slice(36, 54);
  germany = data.slice(54, 72);
  uk = data.slice(72, 90);
  india = data.slice(90, 108);
  italy = data.slice(108, 126);
  japan = data.slice(126, 144);
  saudi_arabia = data.slice(144, 162);
  usa = data.slice(162, 180);

  //set initial state
  filter('#usa');
  toggleFilter('#usa');
  draw();
  // });

  ///////////////////////////////////////////////////////////////
  // Controls
  ///////////////////////////////////////////////////////////////



  //filter event handlers
  d3.select('#usa')
    .on('click', () => {
      filter('#usa');

      toggleFilter('#usa');

      redraw();
    });

  d3.select('#canada')
    .on('click', () => {
      filter('#canada');

      toggleFilter('#canada');

      redraw();
    });

  d3.select('#austria')
    .on('click', () => {
      filter('#austria');

      toggleFilter('#austria');

      redraw();
    });

  d3.select('#germany')
    .on('click', () => {
      filter('#germany');

      toggleFilter('#germany');

      redraw();
    });

  d3.select('#italy')
    .on('click', () => {
      filter('#italy');

      toggleFilter('#italy');

      redraw();
    });

  d3.select('#uk')
    .on('click', () => {
      filter('#uk');

      toggleFilter('#uk');

      redraw();
    });

  d3.select('#japan')
    .on('click', () => {
      filter('#japan');

      toggleFilter('#japan');

      redraw();
    });

  d3.select('#india')
    .on('click', () => {
      filter('#india');

      toggleFilter('#india');

      redraw();
    });

  d3.select('#china')
    .on('click', () => {
      filter('#china');

      toggleFilter('#china');

      redraw();
    });

  d3.select('#saudi_arabia')
    .on('click', () => {
      filter('#saudi_arabia');

      toggleFilter('#saudi_arabia');

      redraw();
    });



  function filter(mode) {
    if (mode === '#usa') {
      current = JSON.parse(JSON.stringify(usa));
    } else if (mode === '#canada') {
      current = JSON.parse(JSON.stringify(canada));
    } else if (mode === '#austria') {
      current = JSON.parse(JSON.stringify(austria));
    } else if (mode === '#germany') {
      current = JSON.parse(JSON.stringify(germany));
    } else if (mode === '#italy') {
      current = JSON.parse(JSON.stringify(italy));
    } else if (mode === '#uk') {
      current = JSON.parse(JSON.stringify(uk));
    } else if (mode === '#japan') {
      current = JSON.parse(JSON.stringify(japan));
    } else if (mode === '#india') {
      current = JSON.parse(JSON.stringify(india));
    } else if (mode === '#china') {
      current = JSON.parse(JSON.stringify(china));
    } else if (mode === '#saudi_arabia') {
      current = JSON.parse(JSON.stringify(saudi_arabia));
    }
    filterMode = mode;
  }

  function toggleFilter(id) {
    //🚧 write code to toggle buttons with class .filter here
    d3.selectAll('.filter')
      .style('background-color', '#eee');
    d3.select(id)
      .style('background-color', 'lightblue'); // #add8e6 is hex code for lightblue
  }

  ///////////////////////////////////////////////////////////////
  // draw the chart
  ///////////////////////////////////////////////////////////////

  var delay = function (d, i) {
    return i * 50;
  };

  function redraw() {
    console.log(current)
    //update scale
    x.domain(current.map(d => d.year));

    ////////////////////////////////
    // DATA JOIN FOR BARS.
    var bars = svg.selectAll('.bar')
      .data(current, d => d.year);

    // UPDATE.
    bars.transition()
      .duration(750)
      .delay(delay)
      .attr('x', d => x(d.year))
      .attr('y', d => y(d.en_per_cap))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.en_per_cap));

    // ENTER.
    bars.enter()
      .append('rect')
      .attr('x', d => x(d.year))
      .attr('y', d => y(0))
      .attr('width', x.bandwidth())
      .attr('fill', '#add8e677')
      .transition()
      .duration(750)
      .attr('class', 'bar')
      .attr('x', d => x(d.year))
      .attr('y', d => y(d.en_per_cap))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.en_per_cap));

    // EXIT.
    bars.exit()
      .transition()
      .duration(750)
      .style('opacity', 0)
      .remove();

  }

  function transition() {
    var transition = svg.transition()
      .duration(750);

    transition.selectAll('.bar')
      .delay(delay)
      .attr('x', d => x(d.year));

    transition.selectAll('.name')
      .delay(delay)
      .attr('x', d => x(d.year) + x.bandwidth() / 2);
  }

  function draw() {
    x.domain(current.map(d => d.year))
      .range([0, width])
      .paddingInner(0.2);

    y.domain([0, d3.max(current, d => d.en_per_cap)])
      .range([height, 0]);

    svg.selectAll('.bar')
      .data(current, d => d.year)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.year))
      .attr('y', d => y(d.en_per_cap))
      .attr('fill', '#add8e677')
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.en_per_cap));

    var xAxis;
    xAxis = d3.axisBottom()
      .scale(x)
      .ticks(18, 'd');

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    var yAxis = d3.axisLeft()
      .scale(y)
      .ticks(5, 'd');

    svg.append('g')
      .attr('class', 'axis')
      .call(yAxis);

    svg.append('text')
      .attr('x', -250)
      .attr('y', -53)
      .attr('transform', 'rotate(-90)')
      .attr('class', 'label')
      .append('tspan').text('Energy per capita (kg of Oil equ.)')
  }
}

onMounted(() => {
  if (!store.USA_CO2_GDP) {
    d3.csv('USA_CO2_GDP.csv').then(result => {
      store.USA_CO2_GDP = result;
      message.value = `Data was loaded from file, contains ${store.USA_CO2_GDP.length} rows`;
      areaChart();
    });
  } else {
    areaChart();
  }

  if (!store.energy_per_cap) {
    d3.json('energy_per_cap.json', d => {
      return {
        country: d.country,
        en_per_cap: +d.en_per_cap,
        year: +d.year
      };
    }).then(result => {
      store.energy_per_cap = result;
      message.value = `Data was loaded from file, contains ${store.energy_per_cap.length} rows`;
      barChart();
    });
  } else {
    barChart();
  }
});
</script>

<style scoped>
.axis path,
.axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;
}

.axis text {
  font-family: Courier;
  font-size: 0.85em;
}

text {
  font-family: Courier;
  font-size: 0.65em;
}

svg {
  display: block;
  margin: auto;
  background-color: #fafafa;
}

.d3barChart {
  margin: 50px;
}

.d3areachart {
  margin: 100px;
}

text.label {
  text-anchor: middle;
  alignment-baseline: central;
}

text.name {
  font-weight: bold;
  text-anchor: middle;
  alignment-baseline: central;
}

.button {
  border-radius: 3px;
  background-color: #eee;
  padding: 5px;
  margin: 5px;
  cursor: default;
  font-family: Courier;
  font-size: 0.85em;
  font-weight: bold;
  cursor: default;
  user-select: none;
}
</style>