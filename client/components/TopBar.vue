<template>
  <v-toolbar app dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>jda</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat><v-icon left>account_circle</v-icon> System</v-btn>
      <v-btn flat><v-icon>info</v-icon></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'm-top-bar'
}
</script>

