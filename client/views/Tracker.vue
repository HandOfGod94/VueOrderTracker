<template>
  <div>
    <v-layout row>
      <v-flex xs6 offset-xs3>
        <v-stepper alt-labels v-model="currentStep">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="currentStep > 1" editable edit-icon="shopping_cart"> Created </v-stepper-step>
            <v-divider />
            <v-stepper-step step="2" :complete="currentStep > 2" editable edit-icon="assignment"> Planning </v-stepper-step>
            <v-divider />
            <v-stepper-step step="3" :complete="currentStep > 3" editable edit-icon="assessment"> Planned </v-stepper-step>
            <v-divider />
            <v-stepper-step step="4" :complete="currentStep > 4" editable edit-icon="flight_takeoff"> In-Transit </v-stepper-step>
            <v-divider />
            <v-stepper-step step="5" :complete="currentStep > 5" editable> Arrived </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <status-detail :order="order" ></status-detail>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import StatusDetail from '../components/StatusDetail.vue'

export default {
  data: function() {
    return {
      orderStatus: 'STATUS_INITIAL',
      currentStep: 0
    }
  },
  methods: {
    ...mapActions(['fetchOrderById'])
  },
  beforeRouteUpdate: function(to, from, next){
    this.fetchOrderById(to.params.orderId)
    next()
  },
  mounted: function() {
    this.fetchOrderById(this.$route.params.orderId)
  },
  computed: {
    order: function() {
      return this.$store.getters.getOrder
    }
  },
  components: {
    StatusDetail
  }
}
</script>
