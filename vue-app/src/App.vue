<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
// const router = useRouter();

const rootPath = ref('');

onMounted(() => {
  // path.value = route.path;
  console.log(route.path);
  rootPath.value = route.path.split('/')[1];
});

</script>

<template>
  <div>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#"><img src="quad_squad.jpg" width="50" height="40"
          alt="" class="d-inline-block align-middle mr-2"> Quad Squad</a>
      <span class="navbar-text d-flex justify-content-center col-lg-10">Visualizing and Predicting CO2 Emissions</span>
      <!-- <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button> -->
      <!-- <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"> -->
      <!-- <div class="navbar-nav">
    <div class="nav-item text-nowrap">
      <a class="nav-link px-3" href="#">Sign out</a>
    </div>
  </div> -->
    </header>

    <div class="container-fluid">

      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="position-sticky pt-3 sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <RouterLink :class="'nav-link ' + (rootPath === '' ? 'active' : '')" to="/" @click="rootPath = ''">
                  <i class="bi bi-house-fill"></i> Home
                </RouterLink>
              </li>
              <!-- <li class="nav-item">
                <RouterLink :class="'nav-link ' + (rootPath === 'barchart' ? 'active' : '')" to="/barchart"
                  @click="rootPath = 'barchart'">
                  <i class="bi bi-layers-fill"></i>
                  Bar chart
                </RouterLink>
              </li> -->
              <li class="nav-item">
                <RouterLink :class="'nav-link ' + (rootPath === 'd3areachart' ? 'active' : '')" to="/d3areachart"
                  @click="rootPath = 'd3areachart'">
                  <i class="bi bi-sun-fill"></i>
                  Energy Footprint and GNI
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink :class="'nav-link ' + (rootPath === 'd3beeswarm' ? 'active' : '')" to="/d3beeswarm"
                  @click="rootPath = 'd3beeswarm'">
                  <i class="bi bi-fuel-pump-fill"></i>
                  Fossil Fuel Usage
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink :class="'nav-link ' + (rootPath === 'mapcomp' ? 'active' : '')" to="/mapcomp"
                  @click="rootPath = 'mapcomp'">
                  <i class="bi bi-patch-question-fill"></i>
                  Prediction
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink :class="'nav-link ' + (rootPath === 'about' ? 'active' : '')" to="/about"
                  @click="rootPath = 'about'">
                  <i class="bi bi-info-circle-fill"></i>
                  About
                </RouterLink>
              </li>

            </ul>
          </div>
        </nav>

      </div>
    </div>
  </div>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/htmlchart">HTML Chart</RouterLink>
        <RouterLink to="/htmlchartcomp">HTML Chart Comp</RouterLink>
        <RouterLink to="/d3chart">D3 Chart</RouterLink>
        <RouterLink to="/d3chartcomp">D3 Chart Comp</RouterLink>
        <RouterLink to="/smallmultiples">Small Multiples</RouterLink>
        <RouterLink to="/map">Mapbox Map</RouterLink>
        <RouterLink to="/mapcomp">Mapbox Map Comp</RouterLink>
        <RouterLink to="/deckmapcomp">Mapbox + Deck.gl Map Comp</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView /> -->

  <RouterView />

</template>

<style scoped>
body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  /* rtl:raw:
  right: 0;
  */
  bottom: 0;
  /* rtl:remove */
  left: 0;
  z-index: 100;
  /* Behind the navbar */
  padding: 48px 0 0;
  /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  height: calc(100vh - 48px);
  overflow-x: hidden;
  overflow-y: auto;
  /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  color: #2470dc;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
  height: 55px;
}

.navbar .navbar-toggler {
  top: .25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: .75rem 1rem;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>
