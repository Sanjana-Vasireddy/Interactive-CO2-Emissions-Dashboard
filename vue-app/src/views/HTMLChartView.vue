<template>
  <div class="htmlChart">
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">

      <h1 class="mt-3 green">HTML Chart Options API</h1>

      <div class="title">Top 10 COVID-19 confirmed in US, Aug 31 2020 (source Johns Hopkins University)</div>

      <!-- v-for directive to render a list of items based on an array -->
      <div class="item" v-for="(item, index) in covid" :key="index">
        <div class="label"> {{ item.label }} </div>

        <!-- :style is a short-hand for v-bind:style to allow data binding on component attributes -->
        <div class="bar" :style="'width:' + item.value / 1000 + 'px;'">
          <span class="value">{{ Number(item.value).toLocaleString() }}</span>
        </div>
      </div>

      <h2>Data</h2>

      <!-- data binding using text interpolation with the “Mustache” syntax -->
      {{ message }}
      <pre><code>{{ covid }}</code></pre>

      <!-- <h1 class="h2">Dashboard</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar" class="align-text-bottom"></span>
            This week
          </button>
        </div> -->
    </main>
  </div>
</template>

<script>

import { ref } from 'vue';
import { mapWritableState } from 'pinia'
import { useChartStore } from '../stores/useChartStore'
import axios from 'axios';

export default {
  name: 'htmlChart',
  data() {
    return {
      message: 'Data was set from store'
    }
  },
  computed: {
    //see https://pinia.vuejs.org/core-concepts/state.html#usage-with-the-options-api
    ...mapWritableState(useChartStore, ['covid'])
    // same as above but registers it as this.myData()
    //...mapActions(useCounterStore, { myData: 'covid' }),
  },
  mounted: function () {
    //Using .env variable to store some key...
    //see https://vitejs.dev/guide/env-and-mode.html
    console.log('VITE_SOME_KEY =', import.meta.env.VITE_SOME_KEY);

    // `this` points to the component instance
    //if htmlChartData is not in the store we fetch-it
    if (!this.covid) {
      axios.get('covid-19-confirmed-083120.json').then(result => {
        this.covid = result.data;
        this.message = `Data was loaded from file, contains ${this.covid.length} rows`
      });
    }
  }
}
</script>

<!-- "scoped" attribute limits CSS to this component -->
<style scoped>
.title {
  font-size: 1vw;
  color: hsla(160, 100%, 37%, 1);
}

pre {
  border: hsla(160, 100%, 37%, 1) 2px solid;
}

.item {
  text-align: left;
  margin-bottom: 5px;
}
.bar {
  display: inline-block;
  text-align: right;
  vertical-align: middle;
  background-color: hsla(160, 100%, 37%, 1);
  height: 20px;
}
.label {
  display: inline-block;
  text-align: right;
  vertical-align: middle;
  line-height: 20px;
  width: 20%;
  font-size: 12px;
  margin-right: 12px;
}
.value {
  color: #eee;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  vertical-align: middle;
  line-height: 20px;
  margin-right: 5px;
  font-size: 12px;
}
</style>
