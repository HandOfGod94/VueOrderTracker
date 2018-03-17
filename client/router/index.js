import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import OrderDetail from '../views/OrderDetail'
import Tracker from '../views/Tracker'
import CustomTracker from '../views/CustomTracker'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/OrderDetail',
      component: OrderDetail 
    },
    {
      path: '/Tracker/:orderId',
      component: Tracker
    },
    {
      path: '/CustomTracker',
      component: CustomTracker
    }
  ]
})
