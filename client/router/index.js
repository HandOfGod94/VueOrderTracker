import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import OrderDetail from '../views/OrderDetail'

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
    }
  ]
})
