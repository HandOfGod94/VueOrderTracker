<template>
  <div>
    <v-layout row>
      <v-flex xs6 offset-xs3>
        <v-stepper alt-labels v-model="currentTrackerStep">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="currentTrackerStep > 1" editable edit-icon="shopping_cart"> Created </v-stepper-step>
            <v-divider />
            <v-stepper-step step="2" :complete="currentTrackerStep > 2" editable edit-icon="assignment"> Planning </v-stepper-step>
            <v-divider />
            <v-stepper-step step="3" :complete="currentTrackerStep > 3" editable edit-icon="assessment"> Planned </v-stepper-step>
            <v-divider />
            <v-stepper-step step="4" :complete="currentTrackerStep > 4" editable edit-icon="flight_takeoff"> In-Transit </v-stepper-step>
            <v-divider />
            <v-stepper-step step="5" :complete="currentTrackerStep > 5" editable> Arrived </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <status-detail :order="order" ></status-detail>
      </v-flex>
    </v-layout>
    <!-- <v-btn @click="checkOrderStatus($route.params.orderId)" >Update Order</v-btn> -->
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import StatusDetail from '../components/StatusDetail.vue'
import { UPDATE_TRACKER_STEP } from '../store/ui'
import {
  STATUS_CREATED,
  STATUS_PLANNING,
  STATUS_PLANNED,
  STATUS_IN_TRANSIT,
  STATUS_ARRIVED,
  STATUS_CANCELED
} from '../store/order'

export default {
  data: function() {
    return {
      orderStatus: 'STATUS_INITIAL',
      currentStep: 0
    }
  },
  timers: {
    checkOrderStatus: {
      time: 8000,
      autostart: true,
      immediate: true,
      repeat: true
    }
  },
  methods: {
    ...mapActions(['fetchOrderById']),
    ...mapMutations([`${UPDATE_TRACKER_STEP}`]),
    checkOrderStatus: function(orderId) {
      let prevOrderState = JSON.parse(JSON.stringify(this.order))
      let self = this
      this.fetchOrderById(this.$route.params.orderId).then(res => {
        let newOrderState = JSON.parse(JSON.stringify(res.data))
        if (newOrderState.orderStatus != prevOrderState.orderStatus) {
          let newStep = -1
          switch (newOrderState.orderStatus) {
            case STATUS_CREATED:
              newStep = 1
              break
              break
            case STATUS_PLANNING:
              newStep = 2
              break
            case STATUS_PLANNED:
              newStep = 3
              break
            case STATUS_IN_TRANSIT:
              newStep = 4
              break
            case STATUS_ARRIVED:
              newStep = 5
              self.$timer.stop('checkOrderStatus')
              break
            case STATUS_CANCELED:
              newStep = 6
              self.$timer.stop('checkOrderStatus')
              break
          }
          self.UPDATE_TRACKER_STEP(newStep)
        }
      }) // fetch new order
    }
  },
  beforeRouteUpdate: function(to, from, next) {
    this.fetchOrderById(to.params.orderId)
    this.UPDATE_TRACKER_STEP(1) //reset tracker on change of order
    next()
  },
  computed: {
    order: function() {
      return this.$store.getters.getOrder
    },
    currentTrackerStep: {
      get() {
        return this.$store.state.ui.currentTrackerStep
      },
      set(step) {
        return this.UPDATE_TRACKER_STEP(step)
      }
    }
  },
  components: {
    StatusDetail
  }
}
</script>
