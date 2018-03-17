<template>
  <div id="app">
    <v-app v-if="isLoggedIn">
    <m-top-bar></m-top-bar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    </v-app>
    <login v-else></login>
  </div>
</template>

<script>
import MTopBar from './TopBar.vue'
import Login from '../views/Login.vue'

export default {
  name: 'App',
  data: function() {
    return({
      isLoggedIn: true //get it from session
    })
  },
  components: {
    MTopBar,
    Login
  }
}
</script>
