<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="d3ChartComp">
      <h1>CO<sub>2</sub> Emissions from Burning of Diesel (1965 - 2021)</h1>
      <div class="radioButton">
        <div class="form-check">
          <input class="form-check-input" type="radio" checked name="split" id="global" value="0" @click="chart(false)"
            autocomplete="off">
          <label class="form-check-label" for="global" style="font-size:25px">Global</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="split" id="continent" value="1" @click="chart(true)"
            autocomplete="off">
          <label class="form-check-label" for="continent" style="font-size:25px">Continents</label>
          <!-- <label style="font-size:25px"><input name="split" type="radio" value="0" checked="true"
            @click="chart(false)"><small>Global</small></label> -->
          <!-- <label style="font-size:25px"><input name="split" type="radio" value="1" @click="chart(true)"><small>By
            Continents</small></label> -->
        </div>
      </div>
      <div class="beeswarm">
        <svg width="960" height="960" id="co2_diseal"></svg>
      </div>
    </div>
  </main>
</template>

<script setup>
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';
import { useChartStore } from '../stores/useChartStore'

const store = useChartStore();
const message = ref('Data was set from store');

let margin = ({ top: 50, right: 100, bottom: 50, left: 200 })
let height = 400; // initial height
let width = 900;

// const svg = d3.select("#co2_diseal")
//   .attr("viewBox", [0, 0, width, height]);
let svg;
let yG;

var simulation, data_global;
var x, y, xAxis, yAxis, continents;

function beeswarm_diesel() {

  // let margin = ({ top: 50, right: 100, bottom: 50, left: 200 })
  // let height = 400; // initial height
  // let width = 900;

  svg = d3.select("#co2_diseal")
    .attr("viewBox", [0, 0, width, height]);

  // let yG, simulation, data_global;
  // let x, y, xAxis, yAxis, continents;

  data_global = store.co2_emission_by_diseal;
  //console.log(data_global)
  data_global.map((d, i) => ({ id: i + 1, ...d }))
  //console.log(data_global)

  continents = [...new Set(data_global.map(d => d.continent))]

  //x-axis

  x = d3.scaleLinear()
    .domain(d3.extent(data_global, d => d.year))
    .range([margin.left, width - margin.right])
  //y-axis
  y = d3.scaleBand()
    .domain(continents)
    .range([height / 2, height / 2])

  xAxis = g =>
    g
      .attr("transform", `translate(0, 0)`)
      .call(d3.axisTop(x).ticks(10))
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .append("text")
          .attr("x", width - margin.right)
          .attr("fill", "currentColor")
          .attr("text-anchor", "middle")
          .text("Years →")
      )

  yAxis = (g, scale = y, ticks = y.domain()) =>
    g
      .attr("transform", `translate(${30}, 0)`)
      .call(d3.axisLeft(scale).tickValues(ticks))
      .call(g => g.style("text-anchor", "start"))
      .call(g => g.select(".domain").remove())

  var r = d3.scaleSqrt()
    .domain(d3.extent(data_global, d => d.emission))
    .range([6, 20])

  var colour = d3.scaleSequential(d3.extent(data_global, d => d.year), d3.interpolatePlasma)

  svg.append("g").call(xAxis);
  yG = svg.append("g").attr('id', 'yG_select').attr("stroke-width", 0);

  let node = svg.append("g")
    .selectAll("circle")
    .data(data_global)
    .join("circle")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.continent) + y.bandwidth() / 2)
    .attr("r", d => r(d.emission))
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill", d => colour(d.year));

  simulation = d3.forceSimulation()
    .force("x", d3.forceX(d => x(d.year)))
    .force("y", d3.forceY(d => y(d.continent) + y.bandwidth() / 2))
    .force("collide", d3.forceCollide(d => r(d.emission) + 1).strength(0.3));

  simulation.on("tick", () => {
    node
      .transition()
      .delay((d, i) => d.x)
      .ease(d3.easeLinear)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
  });
}

function chart(split) {
  let height = split ? 800 : 400;

  y.domain(split ? continents : continents.concat("Global")); // workaround for updating the yAxis
  y.range(split ? [margin.top, height - margin.bottom] : [height / 2, height / 2]);
  let ticks = split ? continents : ["Global"];

  // svg = d3.select("co2_diseal");
  // yG = d3.select('yG_select');

  const t = svg.transition().duration(750);
  svg.transition(t).attr("viewBox", [0, 0, width, height]);
  yG.transition(t).call(yAxis, y, ticks);

  simulation.nodes(data_global); // update nodes
  simulation.alpha(1).restart(); // restart simulation
}


onMounted(() => {
  if (!store.co2_emission_by_diseal) {
    d3.json('co2_emission_by_diseal.json').then(result => {
      store.co2_emission_by_diseal = result;
      message.value = `Data was loaded from file, contains ${store.co2_emission_by_diseal.length} rows`;
      beeswarm_diesel();
      chart(false);
    });
  } else {
    beeswarm_diesel();
  }
});
</script>

<style scoped>
.beeswarm g {
  font-size: 12px;
}

.d3ChartComp {
  margin: 50px;
}

.radioButton {
  margin: 50px;
}

</style>