<template>
  <div class="barchart">
    <div class="title">{{ title }}</div>
    <svg class="chart" ref="svgRef" width="400" height="300"></svg>
  </div>
</template>

<script setup>
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';

const props = defineProps({
  title: String,
  data: Array
});

//need to use a ref otherwise when creating multiple charts they will 
//have the same id and only one will plot
const svgRef = ref(null);

function barChart() {
  var svg = d3.select(svgRef.value);
  var enter = svg.selectAll('rect')
    .data(props.data)
    .enter();
  
  enter.append('rect')
    .attr('x', 100)
    .attr('y', (d, i) => 20 + i * 25)
    .attr('width', d => d.value / 1000)
    .attr('class', 'bar');

  enter.append('text')
    .attr('x', 90)
    .attr('y', (d, i) => 30 + i * 25)
    .attr('class', 'label')
    .text(d => d.label);

  enter.append('text')
    .attr('x', d => 90 + d.value / 1000)
    .attr('y', (d, i) => 30 + i * 25)
    .attr('class', 'value')
    .text(d => Number(d.value).toLocaleString());
}

onMounted(() => {
  barChart();
});
</script>

<style scoped>
.title {
  font-size: 1vw;
}

pre {
  border: hsla(160, 100%, 37%, 1) 2px solid;
}

/* :deep(svg.chart) {
  background-color: aliceblue;
} */

:deep(text.label) {
  text-anchor: end;
  alignment-baseline: middle;
  font-size: 12px;
  fill: #eee;
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
  text-align: right;  /* pull value text to the end of the bar */
  vertical-align: middle;  /* align value text with middle of the bar */
  fill: hsla(160, 100%, 37%, 1);
  height: 20px;  /* bar height, this can stay fixed */
}
</style>
