import Vue from 'vue'
import VueTimers from 'vue-timers'
import VueSession from 'vue-session'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css' 
import App from './components/App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import './fitlers'

Vue.use(VueSession)
Vue.use(Vuetify)
Vue.use(VueTimers)
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
