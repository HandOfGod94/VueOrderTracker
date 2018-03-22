<template>
  <div id="app">
    <v-app>
    <m-top-bar ref="topBar"></m-top-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    </v-app>
  </div>
</template>

<script>
import MTopBar from './TopBar.vue'
import Login from '../views/Login.vue'

export default {
  name: 'App',
  created: function() {
    if(this.$session.get('accountId') && this.$session.get('accountId')!='') {
      this.$router.push({name:'OrderList'})
    } else {
      this.$router.push({name: 'index'})
    }
  },
  computed: {
    isLoggedIn() {
      if(this.$session.get('isLoggedIn'))
        return true
      return false
    }
  },
  components: {
    MTopBar,
    Login
  }
}
</script>
