import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import OrderDetail from '../views/OrderDetail'
import Tracker from '../views/Tracker'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Login
    },
    {
      path: '/OrderDetail',
      name:'OrderDetail',
      component: OrderDetail 
    },
    {
      path: '/Tracker/:orderId',
      name: 'Tracker',
      component: Tracker
    }
  ]
})
