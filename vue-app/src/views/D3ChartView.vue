<template>
  <div class="d3Chart">

    <h1 class="mt-3">D3 Chart Options API</h1>

    <div class="title">Top 10 COVID-19 confirmed in US, Aug 31 2020 (source Johns Hopkins University)</div>
    <svg width="400" height="300" id="chart"></svg>

    <h2>Data</h2>
    {{message}}
    <pre><code>{{covid}}</code></pre>

  </div>
</template>

<script>

import { mapWritableState } from 'pinia'
import { useChartStore } from '../stores/useChartStore'
import * as d3 from 'd3';

export default {
  name: 'd3Chart',
  data: function () {
    return {
      message: 'Data was set from store'
    }
  },
  computed: {
    ...mapWritableState(useChartStore, ['covid'])
  },
  methods: {
    barChart() {
      var svg = d3.select('#chart');
      var enter = svg.selectAll('rect')
        .data(this.covid)
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
  },
  mounted: function () {
    if (!this.covid) {
      d3.json('covid-19-confirmed-083120.json').then(result => {
        this.covid = result;  
        this.message = `Data was loaded from file, contains ${this.covid.length} rows`
        this.barChart();
      });
    } else {
      this.barChart();
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 1vw;
  color:hsla(160, 100%, 37%, 1);
}

pre {
  border: hsla(160, 100%, 37%, 1) 2px solid;
}

:deep(text.label) {  /* deep lets the framework know about dynamic CSS set by d3 */
  text-anchor: end;
  alignment-baseline: middle;
  font-size: 12px;
  fill: whitesmoke;
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
