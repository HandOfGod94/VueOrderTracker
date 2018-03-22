import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import OrderList from '../views/OrderList'
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
      path: '/OrderList',
      name:'OrderList',
      component: OrderList 
    },
    {
      path: '/Tracker/:orderId',
      name: 'Tracker',
      component: Tracker
    }
  ]
})
