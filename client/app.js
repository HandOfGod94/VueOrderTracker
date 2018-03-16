import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css' 
import App from './components/App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
 
Vue.use(Vuetify)
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
