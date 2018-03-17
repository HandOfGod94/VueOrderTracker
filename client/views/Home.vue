<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="e1 > 1" editable>Planning</v-stepper-step>
      <v-stepper-step step="2" :complete="e1 > 2" editable>In-Transit</v-stepper-step>
      <v-stepper-step step="3" editable>Arrived</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1" >
        <h3>Planning</h3>
        Transaction Data <br />
        <pre>
        <code>{{currentMessage}}</code>
        </pre>
        <v-btn color="primary" @click="e1 = 2">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <h3>In-Transit</h3>
        Current State  <br />
        <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <h3>Arrived</h3>
        Final Data <br />
        <v-btn color="primary" @click="e1 = 1">Continue</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: function() {
    return {
      e1: 0
    }
  },
  methods: {
    ...mapActions(['getOrderById'])
  },
  mounted: function() {
    this.getOrderById('Order8000')
  },
  computed: {
    currentMessage: function() {
      return this.$store.getters.getCurrentMessage
    }
  }
}
</script>
