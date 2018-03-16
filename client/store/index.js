import Vue from 'vue'
import Vuex from 'vuex'
import order from './order'
import ui from './ui'
import user from './user'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    order,
    user,
    ui
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
