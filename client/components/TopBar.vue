<template>
  <v-toolbar app dark color="primary">
    <v-toolbar-title>jda.</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="logout" :disabled="accountName === null" ><v-icon left>account_circle</v-icon> {{accountName}} </v-btn>
      <v-btn flat><v-icon>info</v-icon></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { LOGOUT_CLEANUP } from "../store/ui";

export default {
  name: 'm-top-bar',
  methods: {
    ...mapMutations([ LOGOUT_CLEANUP ]),
    logout: function() {
      this.$session.destroy()
      this.$router.push({ name: 'index' }),
      this.LOGOUT_CLEANUP()
    }
  },
  computed: {
    ...mapState({
      accountName: state => state.ui.accountName
    })
  }
}
</script>

