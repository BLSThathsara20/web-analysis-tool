import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Add Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

//Add Stylesheet
import './assets/css/style.css'

//Add Smooth Scrolling
import VueScrollTo from 'vue-scrollto';

createApp(App).use(store)
.use(router).use(VueScrollTo, {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: -60,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
  }).mount('#app')
