import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//set-up bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import 'bootstrap-icons/font/bootstrap-icons.css';

import "https://cdn.jsdelivr.net/npm/vega@5";
import "https://cdn.jsdelivr.net/npm/vega-lite@5";
import "https://cdn.jsdelivr.net/npm/vega-embed@6";

//vue+vite boiler-plate css
// import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
