<template>
  <div class="htmlChartComp">

    <h1 class="mt-3 green">HTML Chart Composition API</h1>

    <div class="title">Top 10 COVID-19 confirmed in US, Aug 31 2020 (source Johns Hopkins University)</div>

    <!-- v-for directive to render a list of items based on an array -->
    <div class="item" v-for="(item, index) in store.planets" :key="index">
      <div class="label"> {{item.label}} </div>
      
      <!-- :style is a short-hand for v-bind:style to allow data binding on component attributes -->
      <div class="bar" :style="'width:' + item.dist / 15 + 'px;'">
        <span class="value">{{Number(item.dist).toLocaleString()}}</span>
      </div>
    </div>

    <h2>Data</h2>
    {{message}}
    <pre><code>{{store.planets}}</code></pre>

  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useChartStore } from '../stores/useChartStore';

const store = useChartStore();
const message = ref('Data was set from store');

onMounted(() => {
  if (!store.planets) {
    axios.get('planets.json').then(result => {
      store.planets = result.data;
      message.value = `Data was loaded from file, contains ${store.planets.length} rows`;
    });
  }
})
</script>

<style scoped>
.title {
  font-size: 1vw;
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
  background-color:hsla(160, 100%, 37%, 1);
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
  color:#eee;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  vertical-align: middle;
  line-height: 20px;
  margin-right: 5px;
  font-size: 12px;
}
</style>
