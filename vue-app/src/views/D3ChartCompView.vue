<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d3ChartComp">

      <h1 class="mt-3">D3 Chart Composition API</h1>

      <div class="title">Top 10 COVID-19 confirmed in US, Aug 31 2020 (source Johns Hopkins University)</div>
      <div class="centered" style="padding-top: 25px">
        <div class="measure-group" data-toggle="buttons-radio">
          <button type="button" class="measure mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            @click="measure(Count.total)">Total Emissions</button>
          <button type="button" class="measure mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            @click="measure(Count.perCap)">Per Capita Emissions</button>
        </div>
        <div class="scale-group" data-toggle="buttons-radio">
          <button type="button" class="scale mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            @click="scale(Scales.lin)">Linear Scale</button>
          <button type="button" class="scale mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
            @click="scale(Scales.log)">Log Scale</button>
        </div>
      </div>
      <div id="svganchor" class="graph centered">
      </div>
      <div id="checkboxes" class="centered">
        <span style="position:relative; top: 3px">Toggle Continents:&nbsp;&nbsp;</span>
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" value="africa" class="mdl-checkbox__input continent" checked="">Africa
          <span class="mdl-checkbox__label" id="africaColor"
            style="font-size: 20px; color: #1976D2;">&#9679;&nbsp;&nbsp;</span>
        </label>
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" value="northAmerica" class="mdl-checkbox__input continent" checked="">North America
          <span class="mdl-checkbox__label" id="northAmericaColor"
            style="font-size: 20px; color: #388E3C;">&#9679;&nbsp;&nbsp;</span>
        </label>
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" value="southAmerica" class="mdl-checkbox__input continent" checked="">South America
          <span class="mdl-checkbox__label" id="southAmericaColor"
            style="font-size: 20px; color: #E64A19;">&#9679;&nbsp;&nbsp;</span>
        </label>
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" value="asia" class="mdl-checkbox__input continent" checked="">Asia
          <span class="mdl-checkbox__label" id="asiaColor"
            style="font-size: 20px; color: #D81B60;">&#9679;&nbsp;&nbsp;</span>
        </label>
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" value="europe" class="mdl-checkbox__input continent" checked="">Europe
          <span class="mdl-checkbox__label" id="europeColor"
            style="font-size: 20px; color: #FBC02D;">&#9679;&nbsp;&nbsp;</span>
        </label>
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
          <input type="checkbox" value="oceania" class="mdl-checkbox__input continent" checked="">Oceania
          <span class="mdl-checkbox__label" id="oceaniaColor"
            style="font-size: 20px; color: #455A64;">&#9679;&nbsp;&nbsp;</span>
        </label>
      </div>
      <!-- <h2>Data</h2>
      {{ message }}
      <pre><code>{{ store.co2_data_hierarchical }}</code></pre> -->

    </div>
  </main>
</template>

<script setup>
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useChartStore } from '../stores/useChartStore'

const store = useChartStore();
const message = ref('Data was set from store');

let height = 700;
let width = 1000;
let margin = ({ top: 0, right: 40, bottom: 34, left: 80 });

// Data structure describing chart scales
let Scales = {
  lin: "scaleLinear",
  log: "scaleLog"
};

// Data structure describing volume of displayed data
let Count = {
  total: "total",
  perCap: "perCapita"
};

// Data structure describing legend fields value
let Legend = {
  total: "Total Emissions kilotonnes",
  perCap: "Per Capita Emissions"
};

let chartState = {};

chartState.measure = Count.total;
chartState.scale = Scales.lin;

chartState.legend = Legend.total;


// Colors used for circles depending on continent
let colors = d3.scaleOrdinal()
  .domain(["asia", "africa", "northAmerica", "europe", "southAmerica", "oceania"])
  .range(['#D81B60', '#1976D2', '#388E3C', '#FBC02D', '#E64A19', '#455A64']);

let xScale = d3.scaleLinear()
  .range([margin.left, width - margin.right]);

let xLine, tooltip, dataSet, svg;

function measure(value) {
  chartState.measure = value;
  if (value === Count.total) {
    chartState.legend = Legend.total;
  }
  if (value === Count.perCap) {
    chartState.legend = Legend.perCap;
  }
  redraw();
}

function scale(value) {
  chartState.scale = value;
  redraw(chartState.measure);
}

function redraw() {

  // Set scale type based on button clicked
  if (chartState.scale === Scales.lin) {
    xScale = d3.scaleLinear().range([margin.left, width - margin.right])
  }

  if (chartState.scale === Scales.log) {
    xScale = d3.scaleLog().range([margin.left, width - margin.right]);
  }

  xScale.domain(d3.extent(dataSet, function (d) {
    return +d[chartState.measure];
  }));

  let xAxis;
  // Set X axis based on new scale. If chart is set to "per capita" use numbers with one decimal point
  if (chartState.measure === Count.perCap) {
    xAxis = d3.axisBottom(xScale)
      .ticks(10, ".1f")
      .tickSizeOuter(0);
  }
  else {
    xAxis = d3.axisBottom(xScale)
      .ticks(10, ".1s")
      .tickSizeOuter(0);
  }

  d3.transition(svg).select(".x.axis")
    .transition()
    .duration(1000)
    .call(xAxis);

  // Create simulation with specified dataset
  let simulation = d3.forceSimulation(dataSet)
    // Apply positioning force to push nodes towards desired position along X axis
    .force("x", d3.forceX(function (d) {
      // Mapping of values from total/perCapita column of dataset to range of SVG chart (<margin.left, margin.right>)
      return xScale(+d[chartState.measure]);  // This is the desired position
    }).strength(2))  // Increase velocity
    .force("y", d3.forceY((height / 2) - margin.bottom / 2))  // // Apply positioning force to push nodes towards center along Y axis
    .force("collide", d3.forceCollide(9)) // Apply collision force with radius of 9 - keeps nodes centers 9 pixels apart
    .stop();  // Stop simulation from starting automatically

  // Manually run simulation
  for (let i = 0; i < dataSet.length; ++i) {
    simulation.tick(10);
  }

  // Create country circles
  let countriesCircles = svg.selectAll(".countries")
    .data(dataSet, function (d) { return d.country });

  countriesCircles.exit()
    .transition()
    .duration(1000)
    .attr("cx", 0)
    .attr("cy", (height / 2) - margin.bottom / 2)
    .remove();

  countriesCircles.enter()
    .append("circle")
    .attr("class", "countries")
    .attr("cx", 0)
    .attr("cy", (height / 2) - margin.bottom / 2)
    .attr("r", 6)
    .attr("fill", function (d) { return colors(d.continent) })
    .merge(countriesCircles)
    .transition()
    .duration(2000)
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; });

  // Show tooltip when hovering over circle (data for respective country)
  d3.selectAll(".countries").on("mousemove", function (event, d) {
    tooltip.html(`Country: <strong>${d.country}</strong><br>
                  ${chartState.legend.slice(0, chartState.legend.indexOf(","))}: 
                  <strong>${d3.format(",")(d[chartState.measure])}</strong>
                  ${chartState.legend.slice(chartState.legend.lastIndexOf(" "))}`)
      .style('top', event.pageY - 12 + 'px')
      .style('left', event.pageX + 25 + 'px')
      .style("opacity", 0.9);

    xLine.attr("x1", d3.select(this).attr("cx"))
      .attr("y1", d3.select(this).attr("cy"))
      .attr("y2", (height - margin.bottom))
      .attr("x2", d3.select(this).attr("cx"))
      .attr("opacity", 1);

  }).on("mouseout", function (_) {
    tooltip.style("opacity", 0);
    xLine.attr("opacity", 0);
  });

}

// Filter data based on which checkboxes are ticked
function filter() {

  function getCheckedBoxes(checkboxName) {

    let checkboxes = d3.selectAll(checkboxName).nodes();
    let checkboxesChecked = [];
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].defaultValue);
      }
    }
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
  }

  let checkedBoxes = getCheckedBoxes(".continent");

  let newData = [];

  if (checkedBoxes == null) {
    dataSet = newData;
    redraw();
    return;
  }

  for (let i = 0; i < checkedBoxes.length; i++) {
    let newArray = data.filter(function (d) {
      return d.continent === checkedBoxes[i];
    });
    Array.prototype.push.apply(newData, newArray);
  }

  dataSet = newData;
  redraw();
}


function beeswarm1() {

  d3.select("#asiaColor").style("color", colors("asia"));
  d3.select("#africaColor").style("color", colors("africa"));
  d3.select("#northAmericaColor").style("color", colors("northAmerica"));
  d3.select("#southAmericaColor").style("color", colors("southAmerica"));
  d3.select("#europeColor").style("color", colors("europe"));
  d3.select("#oceaniaColor").style("color", colors("oceania"));

  d3.select("#beeswarm1").remove();

  svg = d3.select("#svganchor")
    .append("svg")
    .attr('id', "beeswarm1")
    .attr("width", width)
    .attr("height", height);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")");

  // Create line that connects circle and X axis
  xLine = svg.append("line")
    .attr("stroke", "rgb(96,125,139)")
    .attr("stroke-dasharray", "1,2");

  // Create tooltip div and make it invisible
  tooltip = d3.select("#svganchor").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  dataSet = store.Data_Co2;

  // Set chart domain max value to the highest total value in data set
  xScale.domain(d3.extent(store.Data_Co2, function (d) {
    return +d.total;
  }));

  redraw();

  // Listen to click on "total" and "per capita" buttons and trigger redraw when they are clicked
  // d3.selectAll(".measure").on("click", function () {
  //   let thisClicked = this.value;
  //   chartState.measure = thisClicked;
  //   if (thisClicked === Count.total) {
  //     chartState.legend = Legend.total;
  //   }
  //   if (thisClicked === Count.perCap) {
  //     chartState.legend = Legend.perCap;
  //   }
  //   redraw();
  // });

  // Listen to click on "scale" buttons and trigger redraw when they are clicked
  // d3.selectAll(".scale").on("click", function () {
  //   chartState.scale = this.value;
  //   redraw(chartState.measure);
  // });

  // Trigger filter function whenever checkbox is ticked/unticked
  d3.selectAll("input").on("change", filter);

}

onMounted(() => {
  if (!store.Data_Co2) {
    d3.csv('Data_Co2.csv').then(result => {
      store.Data_Co2 = result;
      message.value = `Data was loaded from file, contains ${store.Data_Co2.length} rows`;
      beeswarm1();
    });
  } else {
    beeswarm1();
  }
});
</script>

<style scoped>
.title {
  font-size: 1vw;
  color: hsla(160, 100%, 37%, 1);
}

pre {
  border: hsla(160, 100%, 37%, 1) 2px solid;
}

:deep(text.label) {
  text-anchor: end;
  alignment-baseline: middle;
  font-size: 12px;
  fill: black;
}

:deep(text.value) {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  font-size: 12px;
  text-anchor: end;
  alignment-baseline: middle;
  fill: #eee;
}

:deep(rect.bar) {
  text-align: right;
  vertical-align: middle;
  fill: hsla(160, 100%, 37%, 1);
  height: 20px;
}

body {
  width: 100%
}

.centered {
  display: table;
  margin: 20px auto;
}

.graph {
  width: 50%;
  margin: 0 auto;
}

#checkboxes>* {
  font-size: 14px;
  display: inline;
  padding-top: 3px;
}

.measure-group {
  display: inline;
}

.scale-group {
  padding-left: 40px;
  display: inline;
}

button {
  margin: 0 auto;
  display: block;
}

.measure,
.scale {}

svg {
  background-color: white;
}

.cells path {
  fill: none;
  pointer-events: all;
}

div.tooltip {
  position: absolute;
  text-align: left;
  color: white;
  white-space: normal;
  padding: 6px;
  font-size: 14px;
  background: rgb(96, 125, 139);
  border: 1px solid rgb(96, 125, 139);
  border-radius: 2px;
  pointer-events: none;
  cursor: none;
}

.axis path,
.axis line {
  fill: none;
  stroke: rgb(96, 125, 139);
  shape-rendering: crispEdges;
}

.axis text {
  font: 10px sans-serif;
}

.continent {}

.legend {
  fill: rgba(0, 0, 0, .87);
}

.article {
  position: fixed;
  top: 20px;
  left: 15px;
  font-size: 35px;
  color: rgb(96, 125, 139);
}

.article-tt {
  font-size: 14px;
  background: rgb(96, 125, 139);
  border: 1px solid rgb(96, 125, 139);
  border-radius: 2px;
  pointer-events: none;
}
</style>
