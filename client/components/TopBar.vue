<template>
  <v-toolbar app dark color="primary">
    <v-toolbar-title>jda.</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="logout" ><v-icon>account_circle</v-icon></v-btn>
      <v-btn flat><v-icon>info</v-icon></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'm-top-bar',
  methods: {
    logout: function() {
      this.$session.destroy()
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

