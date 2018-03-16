<template>
  <div id="app">
    <v-app>
    <m-top-bar></m-top-bar>
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

export default {
  name: 'App',
  components: {
    MTopBar
  }
}
</script>
