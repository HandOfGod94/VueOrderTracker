<template>
  <div>
    <v-layout row>
      <v-flex xs6 offset-xs3>
        <v-stepper alt-labels v-model="currentTrackerStep" class="roundedStepper">
          <v-stepper-header>
            <template v-for="(stepper,index) in steppers">
              <v-stepper-step
                :key="index"
                :step="index + 1" 
                :complete="currentTrackerStep > index + 1"
                :complete-icon="stepper.icon"> {{ stepper.text }} </v-stepper-step>
                <v-divider v-if="index < 4" />
            </template>
          </v-stepper-header>
        </v-stepper>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <tracker-detail :order="order">
          <user-detail 
            slot="bottom-left" 
            :user="bottomLeftUser" 
            :title="bottomLeftTitle"
            v-if="bottomLeftUser && bottomLeftUser.organizationName"></user-detail>
          <user-detail 
            slot="bottom-right" 
            :user="bottomRightUser" 
            :title="bottomRightTitle"
            v-if="bottomRightUser && bottomRightUser.organizationName"></user-detail>
        </tracker-detail>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import TrackerDetail from '../components/TrackerDetail.vue'
import { UPDATE_TRACKER_STEP } from '../store/ui'
import {
  STATUS_CREATED,
  STATUS_PLANNING,
  STATUS_PLANNED,
  STATUS_IN_TRANSIT,
  STATUS_ARRIVED,
  STATUS_CANCELED
} from '../store/order'
import UserDetail from '../components/UserDetail'
import {
  BUYER_USER_TYPE,
  SUPPLIER_USER_TYPE,
  CARRIER_USER_TYPE
} from '../store/user'

export default {
  data: function() {
    return {
      orderStatus: 'STATUS_INITIAL',
      currentStep: 0,
      bottomLeftTitle: '',
      bottomRightTitle: '',
      steppers: [
        { icon: 'shopping_cart', text: STATUS_CREATED },
        { icon: 'assignment', text: STATUS_PLANNING },
        { icon: 'assessment', text: STATUS_PLANNED },
        { icon: 'flight_takeoff', text: STATUS_IN_TRANSIT },
        { icon: 'check', text: STATUS_ARRIVED }
      ]
    }
  },
  timers: {
    checkOrderStatus: {
      time: 5000,
      autostart: true,
      immediate: true,
      repeat: true
    }
  },
  methods: {
    ...mapActions(['fetchOrderById']),
    ...mapMutations([`${UPDATE_TRACKER_STEP}`]),
    checkOrderStatus: function() {
      let prevOrderState = JSON.parse(JSON.stringify(this.order))
      this.fetchOrderById(this.$route.params.orderId).then(res => {
        let newOrderState = JSON.parse(JSON.stringify(res.data))
        if (newOrderState.orderStatus != prevOrderState.orderStatus) {
          let newStep = -1
          switch (newOrderState.orderStatus) {
            case STATUS_CREATED:
              newStep = 1
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
              this.$timer.stop('checkOrderStatus')
              break
            case STATUS_CANCELED:
              newStep = 6
              this.$timer.stop('checkOrderStatus')
              break
          }
          this.UPDATE_TRACKER_STEP(newStep)
        }
      }) // fetch new order
    }
  },
  beforeRouteUpdate: function(to, from, next) {
    //fetchin records will be handeled by timer
    this.UPDATE_TRACKER_STEP(1) //reset tracker on change of order
    next()
  },
  computed: {
    ...mapState({
      order: state => state.order.order,
      accountType: state => state.ui.accountType
    }),
    bottomLeftUser: function() {
      switch (this.accountType) {
        case BUYER_USER_TYPE:
        case CARRIER_USER_TYPE:
          this.bottomLeftTitle = 'Supplier'
          return this.order.supplier
        case SUPPLIER_USER_TYPE:
          this.bottomLeftTitle = 'Buyer'
          return this.order.buyer
      }
    },
    bottomRightUser: function() {
      switch (this.accountType) {
        case BUYER_USER_TYPE:
        case SUPPLIER_USER_TYPE:
          this.bottomRightTitle = 'Carrier'
          return this.order.carrier
        case CARRIER_USER_TYPE:
          this.bottomRightTitle = 'Supplier'
          return this.order.supplier
      }
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
    TrackerDetail,
    UserDetail
  }
}
</script>

<style>
.roundedStepper {
  border-radius: 100px;
}
</style>

