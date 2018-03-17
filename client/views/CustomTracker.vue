<template>
  <v-card>
    <v-container>
    <v-layout wrap justify-space-around align-center>
      <v-avatar color="grey" class="elevation-3"> <v-icon>shopping_cart</v-icon> </v-avatar>
      <span> </span>
      <v-divider />
      <v-avatar color="yellow" class="elevation-3"> <v-icon>shopping_cart</v-icon> </v-avatar>
      <v-divider />
      <v-avatar color="yellow" class="elevation-3"> <v-icon>shopping_cart</v-icon> </v-avatar>
      <v-divider />

      <v-avatar color="yellow" class="elevation-3"> <v-icon>shopping_cart</v-icon> </v-avatar>
      <v-divider />

    </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import {
  STATUS_CREATED,
  STATUS_PLANNING,
  STATUS_PLANNED,
  STATUS_IN_TRANSIT,
  STATUS_ARRIVED,
  STATUS_CANCELED
} from '../actions/order'

export default {
  data: function() {
    return {
      orderStatus: 'STATUS_INITIAL',
      currentStep: 0,
      STATUS_CREATED: STATUS_CREATED,
      STATUS_PLANNING: STATUS_PLANNING,
      STATUS_PLANNED: STATUS_PLANNED,
      STATUS_IN_TRANSIT: STATUS_IN_TRANSIT,
      STATUS_ARRIVED: STATUS_ARRIVED,
      STATUS_CANCELED: STATUS_CANCELED
    }
  },
  methods: {
    ...mapActions(['getOrderById'])
  },
  // mounted: function() {
  //   this.getOrderById(this.$route.params.orderId) //get it from rotuer id.
  // },
  computed: {
    currentMessage: function() {
      return this.$store.getters.getCurrentMessage
    }
  }
}
</script>
