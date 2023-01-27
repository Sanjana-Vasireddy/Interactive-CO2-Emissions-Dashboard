<!-- <script setup>
// import TheWelcome from '../components/TheWelcome.vue'
</script> -->

<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h4 class="border border-light">CO<sub>2</sub> has been considered a major contributor to the increasing the global warming in Earth. According to the reports from NASA,
        various human activities have contributed to around 50% increase in the
        amount of CO<sub>2</sub>. Here we explore how various indicators contribute to CO<sub>2</sub> emissions.</h4>
      <div class="btn-toolbar mb-2 mb-md-0">
        <!-- <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
          </div> -->
        <!-- <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
          <span data-feather="calendar" class="align-text-bottom"></span>
          This week
        </button> -->
      </div>
    </div>

    <!-- <h2>Section title</h2> -->
    <div id="content">
      <div id="header">
        <div id="block"></div>
        <h1>Feature Overview</h1>
      </div>
      <div class="row">
        <div class="col-lg-9">
          <button type="button" class="btn btn-secondary me-2" @click="circle_packing">Circle Packing</button>
          <button type="button" class="btn btn-secondary me-2" @click="sunburst">Sunburst</button>
          <div class="homeChart">
            <svg id="bubble"></svg>
          </div>
        </div>

        <div class="col-lg-3 pt-5">
          <div class="card border-info mb-3" style="max-width: 18rem;">
            <div class="card-header">KPI</div>
            <div class="card-body text-info">
              <h5 id="feature" class="card-title">Feature: Value</h5>
              <p id="avg_value" class="card-text">Average Value</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- + <button type="button" class="btn btn-primary me-2" @click="reset">Reset</button> -->
    <div id="content" class="scatterplot">

      <div id="header">
        <div id="block"></div>
        <h1>GDP vs CO<sub>2</sub> emissions per capita and Population Growth</h1>
      </div>

      <div id="container">

        <div id="buttons">
          <button type="button" class="btn btn-secondary me-2" id="play">Play</button>
          <!-- <div class="button" id="play">Play<span class="fa fa-caret-right"></span></div> -->
        </div>

        <svg id="slider"></svg>

        <div id="countrybuttons">
          <button type="button" class="btn btn-secondary me-2 button selected" id="africa">Africa</button>
          <button type="button" class="btn btn-secondary me-2 button selected" id="asia">Asia</button>
          <button type="button" class="btn btn-secondary me-2 button selected" id="europe">Europe</button>
          <button type="button" class="btn btn-secondary me-2 button selected" id="latam">Latin America</button>
          <button type="button" class="btn btn-secondary me-2 button selected" id="northamerica">North America</button>
          <!-- <div class="button selected" id="africa"><span>Africa</span></div>
          <div class="button selected" id="asia"><span>Asia</span></div>
          <div class="button selected" id="europe"><span>Europe</span></div>
          <div class="button selected" id="latam"><span>Latin America</span></div>
          <div class="button selected" id="northamerica"><span>North America</span></div> -->
        </div>


        <svg id="chart"></svg>

        <!-- <p id="source">Source: World Bank, IMF</p> -->

      </div>

    </div>
  </main>
  <!-- <main>
    <TheWelcome />
  </main> -->
</template>


<style>
.scatterplot body,
.scatterplot h2,
.scatterplot h3,
.scatterplot p {
  margin: 0px;
  padding: 0px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5em;
  color: #4a4a4a;
}

.scatterplot #content {
  margin: 5px;
  padding: 0px 0px 150px 0px;
  width: 800px;
  text-align: left;
}

.scatterplot #container {
  padding: 15px;
  border: 1px solid #ccc;
  height: 550px;
  clear: both;
}

/* #header h1 {
  margin: 0px 0px 0px 10px;
  padding: 4px 0px 0px 7px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-weight: normal;
  color: #fff;
} */

.scatterplot p {
  margin: 0px;
  padding: 0px 0px 15px 0px;
  color: #4a4a4a;
  font-weight: normal;
  line-height: 1.5rem;
}

.scatterplot p.body {
  padding: 15px 0px 15px 0px;
}

.scatterplot #slides {
  margin: 0px;
  padding: 0px;
  background: #fff;
  height: 1000px;
  width: 700px;
  float: right;
}

.scatterplot #slides p {
  margin: 0px;
  padding: 0px 0px 13px 0px;
  color: #4a4a4a;
  font-weight: normal;
}

.scatterplot g.y.axis path.domain {
  stroke-width: 0px;
}

.scatterplot g.x.axis path.domain,
.scatterplot g.x.axis g.tick.major line,
.scatterplot g.x.axis g.tick line {
  stroke: #333;
  stroke-width: 1px;
  shape-rendering: crispEdges;
}

.scatterplot .axis path,
.scatterplot .axis line {
  fill: none;
  shape-rendering: crispEdges;
  border-width: 2px;
}

.scatterplot .axis line {
  stroke: #eee;
  stroke-width: 1;
  shape-rendering: crispEdges;
}

.scatterplot g.group text,
.scatterplot g.tick text,
.scatterplot .x.axis text {
  color: #4a4a4a;
  font-size: 12px;
}

.scatterplot #buttons,
.scatterplot #countrybuttons {
  margin: 0px 0px 0px 5px;
  padding: 0px;
}

.scatterplot #countrybuttons {
  margin: 5px 0px 0px 5px;
  padding: 0px;
}

.scatterplot .button {
  display: inline-block;
  margin: 0px 0px 3px 0px;
  padding: 4px 6px;
  line-height: 20px;
  background: #009dff;
  min-width: 70px;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}

.scatterplot #countrybuttons .button {
  min-width: 0px;
  background: #f4f4f4;
  color: #747474;
}

.scatterplot #countrybuttons .selected {
  background: #305e7e;
  color: #fff;
}

.scatterplot .button:hover {
  background: #0be38d;
  color: #fff;
  cursor: pointer;
}

.scatterplot .button span {
  margin: 0px;
  padding: 0px 3px;
}

.scatterplot #play {
  float: left;
}

.scatterplot .regLine {
  fill: none;
  stroke: #00a1ce;
  stroke-width: 2.5;
  opacity: 0;
}

/* #header {
  margin: 0px;
  padding: 0px;
  height: 34px;
  margin-bottom: 7px;
} */

.scatterplot #block {
  float: left;
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 10px;
  background: #00aeff;
}

.scatterplot .left.label {
  font-size: 12px;
  fill: #4a4a4a;
}

.scatterplot .right.label {
  font-size: 12px;
  fill: #772210;
}

.scatterplot #source {
  margin: 0px 0px 20px 0px;
  padding: 0px;
  font-size: 11px;
}

.scatterplot g.group text {
  opacity: 0;
}

.scatterplot circle {
  fill: rgb(79, 166, 193);
  stroke: #fff;
  stroke-width: 1.5;
}

.scatterplot .scatter {
  opacity: 0.6;
}

.scatterplot .timerCircle {
  stroke: #ccc;
  stroke-width: 2;
  fill: #fff;
}

.scatterplot rect {
  fill: #ccc;
}

.scatterplot #year {
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #4a4a4a;
  font-weight: bold;
}

.scatterplot div.tooltip {
  position: absolute;
  pointer-events: none;
  margin: 0px;
  padding: 7px;
  width: 255px;
  height: 75px;
  background: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  opacity: 0;
}

.scatterplot div.tooltip p {
  margin: 0px;
  padding: 0px;
  line-height: 1.2rem;
  color: #4a4a4a;
  text-align: left;
}

.scatterplot .legend circle {
  fill: none;
  stroke: #ccc;
  stroke-width: 1;
}

.scatterplot .legend text {
  fill: #747474;
  font: 10px Arial, sans-serif;
  text-anchor: middle;
}
</style>

<script setup>
import { parse } from '@vue/compiler-dom';
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useChartStore } from '../stores/useChartStore'

const store = useChartStore();
const message = ref('Data was set from store');

let avg_value = 0, counter = 0, feature_name;
let avg_energy = 0, pop_urban = 0, nat_terrestrial = 0, gni = 0, pop_growth = 0;

function circle_packing() {
  var margin = {
    top: 50,
    right: 0,
    bottom: 40,
    left: 200
  },
    width = 900,
    height = 875;

  var color = d3.scaleLinear()
    .domain([0, 3])
    .range(["hsl(220,80%,80%)", "hsl(120,30%,30%)"])
    .interpolate(d3.interpolateHcl)

  var pack = data => d3.pack()
    .size([width, height])
    .padding(4)
    (d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value))

  var root = pack(store.co2_data_hierarchical);
  let focus = root;
  let view;

  d3.select("#bubble").remove();

  var svg = d3.create("svg")
    .attr('id', "bubble")
    .style("display", "block")
    .style("margin", "0 -14px")
    //.style("background", color(0))
    .style("cursor", "pointer")
    .attr('width', width)
    .attr('height', height)
    .on("click", (event) => zoom(event, root));

  var node = svg.append("g")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .selectAll("circle")
    .data(root.descendants().slice(1))
    .join("circle")
    .attr("fill", d => d.children ? color(d.depth) : "white")
    .attr("pointer-events", d => !d.children ? "none" : null)
    .on("mouseover", function () { d3.select(this).attr("stroke", "#000"); })
    .on("mouseout", function () { d3.select(this).attr("stroke", null); })
    .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

  var label = svg.append("g")
    .style("font", "bold 15px sans-serif")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
    .style("fill-opacity", d => d.parent === root ? 1 : 0)
    .style("display", d => d.parent === root ? "inline" : "none")
    .text(d => d.data.name)
    .attr('padding', '10px')
    .attr("x", 170)
    .attr("y", 55);

  zoomTo([root.x, root.y, root.r * 2]);

  function zoomTo(v) {
    var k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${250 + (d.x - v[0]) * k},${350 + (d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${250 + (d.x - v[0]) * k},${350 + (d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(event, d) {
    focus = d;
    avg_value = 0;
    counter = 0;

    var transition = svg.transition()
      .duration(event.altKey ? 7500 : 750)
      .tween("zoom", d => {
        var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
        return t => zoomTo(i(t));
      });

    label
      .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
      .style("fill-opacity", d => d.parent === focus ? 1 : 0)
      .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
      .on("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });

    //console.log(d.data.name);
    //console.log(store.KPI_modelling_Dashboard);

    store.KPI_modelling_Dashboard.forEach(function (element) {
      if (element.Series_name == d.data.name) {
        avg_value += parseFloat(element.Average);
        counter++;
        //console.log(avg_value);
        feature_name = d.data.name;
      } else if ((element.Country_name == d.data.name) && (element.Series_name == d.parent.data.name)) {
        avg_value += parseFloat(element.Average);
        counter++;
        feature_name = d.parent.data.name + ' : ' + d.data.name
      } else if (d.data.name == "Co2 emission") {
        if (element.Series_name == 'Energy use per capita (kilograms of oil equivalent)') {
          avg_energy += parseFloat(element.Average);
        }

        if (element.Series_name == 'Population in urban agglomerations >1million (%)') {
          pop_urban += parseFloat(element.Average);
        }

        if (element.Series_name == 'Nationally terrestrial protected areas (% of total land area)') {
          nat_terrestrial += parseFloat(element.Average);
        }

        if (element.Series_name == 'GNI per capita (Atlas $)') {
          gni += parseFloat(element.Average);
        }

        if (element.Series_name == 'Population growth (annual %)') {
          pop_growth += parseFloat(element.Average);
        }
      }
    });

    if (d.data.name == "Co2 emission") {
      document.getElementById("avg_value").innerHTML = 'Energy use per capita ' + ' : ' + (avg_energy / 10).toFixed(3) + ', Population in urban agglomerations' + ' : ' + (pop_urban / 10).toFixed(3) + ', \xa0 Nationally terrestrial protected areas' + ' : ' + (nat_terrestrial / 10).toFixed(3) + ', \xa0\xa0\xa0\xa0\xa0 GNI per capita' + ' : ' + (gni / 10).toFixed(3) + ', \xa0\xa0\xa0\xa0 Population growth' + ' : ' + (pop_growth / 10).toFixed(3);
      document.getElementById("feature").innerHTML = 'Feature: Value';
      //document.getElementsByClassName("homeChart")[0].appendChild(svg.node());

    } else {
      document.getElementById("feature").innerHTML = feature_name;
      document.getElementById("avg_value").innerHTML = (avg_value / counter).toFixed(3);
    }
  }

  store.KPI_modelling_Dashboard.forEach(function (element) {
    if (element.Series_name == 'Energy use per capita (kilograms of oil equivalent)') {
      avg_energy += parseFloat(element.Average);
    }

    if (element.Series_name == 'Population in urban agglomerations >1million (%)') {
      pop_urban += parseFloat(element.Average);
    }

    if (element.Series_name == 'Nationally terrestrial protected areas (% of total land area)') {
      nat_terrestrial += parseFloat(element.Average);
    }

    if (element.Series_name == 'GNI per capita (Atlas $)') {
      gni += parseFloat(element.Average);
    }

    if (element.Series_name == 'Population growth (annual %)') {
      pop_growth += parseFloat(element.Average);
    }
  });

  //document.getElementById("feature").innerHTML = "Average Co2 Emission";
  document.getElementById("avg_value").innerHTML = 'Energy use per capita ' + ' : ' + (avg_energy / 10).toFixed(3) + ', Population in urban agglomerations' + ' : ' + (pop_urban / 10).toFixed(3) + ', \xa0 Nationally terrestrial protected areas' + ' : ' + (nat_terrestrial / 10).toFixed(3) + ', \xa0\xa0\xa0\xa0\xa0 GNI per capita' + ' : ' + (gni / 10).toFixed(3) + ', \xa0\xa0\xa0\xa0 Population growth' + ' : ' + (pop_growth / 10).toFixed(3);
  document.getElementById("feature").innerHTML = 'Feature: Value';
  document.getElementsByClassName("homeChart")[0].appendChild(svg.node());

}

function sunburst() {
  var partition = data => {
    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    return d3.partition()
      .size([2 * Math.PI, root.height + 1])
      (root);
  }

  var color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, store.co2_data_hierarchical.children.length + 1))

  var format = d3.format(",d")

  var width = 900
  var height = 925

  var radius = width / 6

  var arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

  const root = partition(store.co2_data_hierarchical);

  root.each(d => d.current = d);

  d3.select("#bubble").remove();

  const svg = d3.create("svg")
    .attr('id', "bubble")
    .attr('width', width)
    .attr('height', height)
    .style("font", "10px sans-serif");

  const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${width / 2})`);

  const path = g.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
    .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
    .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")

    .attr("d", d => arc(d.current));

  path.filter(d => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);

  path.append("title")
    .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  const label = g.append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
    .attr("dy", "0.35em")
    .attr("fill-opacity", d => +labelVisible(d.current))
    .attr("transform", d => labelTransform(d.current))
    .text(d => d.data.name);

  const parent = g.append("circle")
    .datum(root)
    .attr("r", radius)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("click", clicked);

  function clicked(event, p) {
    parent.datum(p.parent || root);

    root.each(d => d.target = {
      x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      y0: Math.max(0, d.y0 - p.depth),
      y1: Math.max(0, d.y1 - p.depth)
    });

    const t = g.transition().duration(750);

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    path.transition(t)
      .tween("data", d => {
        const i = d3.interpolate(d.current, d.target);
        return t => d.current = i(t);
      })
      .filter(function (d) {
        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
      })
      .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none")

      .attrTween("d", d => () => arc(d.current));

    label.filter(function (d) {
      return +this.getAttribute("fill-opacity") || labelVisible(d.target);
    }).transition(t)
      .attr("fill-opacity", d => +labelVisible(d.target))
      .attrTween("transform", d => () => labelTransform(d.current));
  }

  function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }

  //-------------------------------

  document.getElementsByClassName("homeChart")[0].appendChild(svg.node());

}

function scatter() {
  var margin = { top: 100, right: 115, bottom: 40, left: 25 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var parseYear = d3.timeParse("%Y"),
    parseDate = d3.timeParse("%Y%m"),
    parseMonth = d3.timeParse("%m-%Y"),
    numberFormat = d3.format(",.0f"),
    numberFormatDetailed = d3.format(",.1f");

  var x = d3.scaleLinear()
    .range([0, width]);

  var y = d3.scaleLinear()
    .range([height, 0]);

  // var xAxis = d3.svg.axis()
  //     .scale(x)
  //     .orient("bottom")
  //     .tickFormat(numberFormatDetailed);

  var xAxis = d3.axisBottom(x)
    .tickFormat(numberFormatDetailed);

  // var yAxis = d3.svg.axis()
  // 	.scale(y)
  // 	.orient("left")
  // 	.tickFormat(numberFormatDetailed)
  // 	.tickSize(-width);

  var yAxis = d3.axisLeft(y)
    .tickFormat(numberFormatDetailed)
    .tickSize(-width);

  var svg = d3.select("#chart")//.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var group;
  var selectedGDP;
  var selectedCO2pc;
  var selectedCO2;
  var selectedGDP2;
  var selectedCO2pc2;



  var selectedClass;
  var duration = 250;
  var year = 1980;
  var count = 0;
  var timerWidth = 200;
  var timerHeight = 5;
  var timerMargin = 2;
  var radius = 7;
  var buffer = 12;
  var increment = (timerWidth - 2 * timerMargin - 5) / 30;

  var slidersvg = d3.select("#slider")//.append("svg")
    .attr("width", 250)
    .attr("height", 23);

  var rect = slidersvg.append("rect")
    .attr("width", timerWidth)
    .attr("height", timerHeight)
    .attr("x", buffer - 5)
    .attr("y", buffer);

  var timerCircle = slidersvg.append("circle")
    .attr("class", "timerCircle")
    .attr("cx", buffer + (count * increment) + timerMargin)
    .attr("cy", buffer + timerMargin)
    .attr("r", radius);


  d3.select("#play").on("click", function () {
    setup();
  });


  function setup() {
    d3.select("#play")
      .html("Play<span class='fa fa-caret-right'></span>")
      .on('click', null);
    year = 1980;
    count = 0;
    updateScatter();
    startTimer();
  };



  function startTimer() {

    if (year == 2010) {
      d3.select("#play").on("click", function () {
        setup();
      });

      setTimeout(function () {
        d3.select("#play").html("Replay<span class='fa fa-repeat'></span>");
      }, 500);

    } else {

      setTimeout(updateKnob, duration);
      setTimeout(updateScatter, duration);
      setTimeout(startTimer, duration);

      year = year + 1;
      count = count + 1;

    }
  }



  function updateKnob() {
    timerCircle
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attr("cx", buffer + (count * increment) + timerMargin - 5);
  }

  selectedCO2 = "co2" + year;
  selectedGDP = "loggdppc" + year;
  selectedCO2pc = "logco2pc" + year;
  selectedGDP2 = "gdppc" + year;
  selectedCO2pc2 = "co2pc" + year;

  store.data_scatterplot.forEach(function (d) {
    d.loggdppc1980 = +d.loggdppc1980;
    d.logco2pc1980 = +d.logco2pc1980;
  });

  x.domain([5.3, 11.5]);
  y.domain([-1.3, 4.3]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("dy", "2.8em")
    .attr("dx", width / 1.6)
    .style("text-anchor", "end")
    .attr("class", "xlabel")
    .text("GDP per capita, log");

  svg.append("g")
    .attr("class", "left axis")
    .call(yAxis);

  svg.append("text")
    .attr("id", "year")
    .attr("dy", height - 20)
    .attr("dx", width / 2 - 20)
    .text("1980");

  svg.append("text")
    .attr("class", "left label")
    .text("Metric tons CO2 emissions per capita, log")
    .attr("x", -margin.left + 5)
    .attr("y", -12);

  group = svg.selectAll(".group")
    .data(store.data_scatterplot)
    .enter().append("g")
    .attr("class", "group");

  group.append("circle")
    .attr("class", function (d) { return d.region; })
    .classed("scatter", true)
    .attr("id", function (d) { return d.country; })
    .attr("r", function (d) { return 20 * (Math.pow((d.co21980 / 1000000 / 3.14), 0.5)); })
    .attr("cx", function (d) { return x(d.loggdppc1980); })
    .attr("cy", function (d) { return y(d.logco2pc1980); });

  var legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + (width - 50) + "," + (height - 20) + ")")
    .selectAll("g")
    .data([1e6, 5e6, 1e7])
    .enter().append("g");

  legend.append("circle")
    .attr("cy", function (d) { return -20 * (Math.pow(((d) / 1000000 / 3.14), 0.5)); })
    .attr("r", function (d) { return 20 * (Math.pow(((d) / 1000000 / 3.14), 0.5)); });
  // .attr("fill", "none")
  // .attr("stroke", "#ccc")
  // .attr("stroke-width", 1);

  legend.append("text")
    .attr("y", function (d) { return -40 * (Math.pow(((d) / 1000000 / 3.14), 0.5)); })
    .attr("dy", "1.3em")
    .text(d3.format(".1s"));

  legend.append("text")
    .attr("dy", "-80px")
    .text("Population Growth (annual %)");

  d3.selectAll(".scatter")
    .on("mouseover", function (event, d) {
      d3.select(this)
        .style("fill", "#006E9B")
        .style("opacity", 1);

      tooltip
        .html(
          "<p><strong>" + d.country + ", " + year + "</strong></p>" +
          "<p>CO<sub>2</sub> emissions: <strong>" + numberFormatDetailed(d[selectedCO2] / 1000000) + " million kilotons</strong></p>" +
          "<p>GDP per capita: <strong>$" + numberFormat(d[selectedGDP2]) + "</strong></p>" +
          "<p>CO<sub>2</sub> per capita: <strong>" + numberFormatDetailed(d[selectedCO2pc2]) + " metric tons</strong></p>"
        )
        .style("left", (event.pageX - 15) + "px")
        .style("top", (event.pageY - 100) + "px")
        .transition()
        .duration(250)
        .style("opacity", 1);
    })
    .on("mouseout", function (d) {
      tooltip
        .transition()
        .duration(250)
        .style("opacity", 0);

      d3.selectAll(".scatter")
        .style("fill", "#00a1ce")
        .style("opacity", 0.6);

    });



  d3.selectAll("#countrybuttons .button").on("click", function () {

    selectedClass = d3.select(this).attr("id");

    if (d3.select(this).classed("selected")) {
      d3.select(this).classed("selected", false);

      d3.selectAll("." + selectedClass)
        .style("opacity", 0)
        .style("display", "none");
    } else {
      d3.select(this).classed("selected", true);
      d3.selectAll("." + selectedClass)
        .style("opacity", 0.6)
        .style("display", "inline");
    }

  });



  function updateScatter() {

    selectedCO2 = "co2" + year;
    selectedGDP = "loggdppc" + year;
    selectedCO2pc = "logco2pc" + year;
    selectedGDP2 = "gdppc" + year;
    selectedCO2pc2 = "co2pc" + year;

    d3.selectAll(".scatter")
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attr("r", function (d) { return 20 * (Math.pow((d[selectedCO2] / 1000000 / 3.14), 0.5)); })
      .attr("cx", function (d) { return x(d[selectedGDP]); })
      .attr("cy", function (d) { return y(d[selectedCO2pc]); });

    d3.select("#year")
      .text(year);



    d3.selectAll(".scatter")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .style("fill", "#006E9B")
          .style("opacity", 1);

        tooltip
          .html(
            "<p><strong>" + d.country + ", " + year + "</strong></p>" +
            "<p>CO<sub>2</sub> emissions: <strong>" + numberFormatDetailed(d[selectedCO2] / 1000000) + " million kilotons</strong></p>" +
            "<p>GDP per capita: <strong>$" + numberFormat(d[selectedGDP2]) + "</strong></p>" +
            "<p>CO<sub>2</sub> per capita: <strong>" + numberFormatDetailed(d[selectedCO2pc2]) + " metric tons</strong></p>"
          )
          .style("left", (event.pageX - 15) + "px")
          .style("top", (event.pageY - 100) + "px")
          .transition()
          .duration(250)
          .style("opacity", 1);
      })
      .on("mouseout", function (d) {
        tooltip
          .transition()
          .duration(250)
          .style("opacity", 0);

        d3.selectAll(".scatter")
          .style("fill", "#00a1ce")
          .style("opacity", 0.6);

      });


  }

  d3.select(self.frameElement).style("height", "625px");
}

onMounted(() => {
  if (!store.co2_data_hierarchical & !store.KPI_modelling_Dashboard) {
    d3.json('co2_data_hierarchical.json').then(result => {
      d3.csv('KPI_modelling_Dashboard.csv').then(KPI_data => {
        store.co2_data_hierarchical = result;
        store.KPI_modelling_Dashboard = KPI_data;
        message.value = `Data was loaded from file, contains ${store.co2_data_hierarchical.length} rows`;
        circle_packing();
      });
    });
  } else {
    circle_packing();
  }

  if (!store.data_scatterplot) {
    d3.csv("data_scatterplot.csv").then(result => {
      store.data_scatterplot = result;
      message.value = `Data was loaded from file, contains ${store.data_scatterplot.length} rows`;
      scatter();
    });
  } else {
    scatter();
  }
});
</script>
