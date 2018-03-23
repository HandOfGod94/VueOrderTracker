<template>
  <v-card>
    <v-card-title>
      <h3>Orders</h3>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      item-key="orderNumber"
      :search="search">
      <template slot="items" slot-scope="props">
       <tr @click="props.expanded = !props.expanded">
          <td> <a> <router-link :to="{ name:'Tracker', params: {orderId: props.item.orderNumber } }" class="routerLink"> {{ props.item.orderNumber }} </router-link> </a> </td>
          <td>
            <v-chip :color="getStatusColor(props.item.orderStatus)" text-color="white">{{ props.item.orderStatus }}</v-chip>
          </td>
          <td>{{ props.item.createDateTime | formatDateTime }}</td>
          <td>{{ props.item.lastUpdatedDateTime | formatDateTime }}</td>
          <td v-if="accountType === 'SUPPLIER_USER_TYPE' || accountType == 'CARRIER_USER_TYPE'"> 
              <user-detail-tooltip :userId="props.item.buyer | stripResourceName" userType="BUYER_USER_TYPE">
              </user-detail-tooltip>
          </td>
          <td v-if="accountType === 'BUYER_USER_TYPE' || accountType === 'CARRIER_USER_TYPE'"> 
              <user-detail-tooltip :userId="props.item.supplier | stripResourceName" userType="SUPPLIER_USER_TYPE">
              </user-detail-tooltip>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <v-card-text>
            <v-list>
             <v-list-tile>
              <v-list-tile-content>
               <v-list-tile-title>Ship From</v-list-tile-title>
               <v-list-tile-sub-title>{{ props.item.logistics.shipFrom }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-content>
               <v-list-tile-title>Ship To</v-list-tile-title>
               <v-list-tile-sub-title>{{ props.item.logistics.shipTo }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-content>
               <v-list-tile-title>Delivery Date Range</v-list-tile-title>
               <v-list-tile-sub-title>{{ props.item.logistics.requestedDeliveryDateRange.beginDate | formatDate }} To {{ props.item.logistics.requestedDeliveryDateRange.endDate | formatDate }} </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-content>
               <v-list-tile-title>Ship Date Range</v-list-tile-title>
               <v-list-tile-sub-title>{{ props.item.logistics.requestedShipDateRange.beginDate | formatDate }} To {{ props.item.logistics.requestedShipDateRange.endDate | formatDate }} </v-list-tile-sub-title>
             </v-list-tile-content>
           </v-list-tile>
          </v-list>
          </v-card-text>
        </v-card>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import UserDetailTooltip from '../components/UserDetailTooltip'
import {
  STATUS_PLANNING,
  STATUS_PLANNED,
  STATUS_IN_TRANSIT,
  STATUS_ARRIVED,
STATUS_CANCELED
} from '../store/order'
import { BUYER_USER_TYPE, SUPPLIER_USER_TYPE, CARRIER_USER_TYPE } from '../store/user';

export default {
  name: 'order-list',
  timers: {
    fetchOrders: {
      time: 10000,
      autostart: true,
      immediate: true,
      repeat: true
    }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions(['fetchOrders']),
    getStatusColor(status) {
      let color = 'primary'
      switch (status) {
        case STATUS_PLANNING:
          color = 'orange'
          break
        case STATUS_PLANNED:
          color = 'brown'
          break
        case STATUS_IN_TRANSIT:
          color = 'teal'
          break
        case STATUS_ARRIVED:
          color = 'green'
          break
        case STATUS_CANCELED:
          color = 'red'
          break
      }
      return color
    }
  },
  computed: {
    headers: function() {
      let heads = [
        { text: 'Order No.', value: 'orderNumber' },
        { text: 'Status', value: 'orderStatus' },
        { text: 'Created On.', value: 'createDateTime' },
        { text: 'Last Updated', value: 'lastUpdatedDateTime' }
      ]
      if (this.accountType === BUYER_USER_TYPE || this.accountType === CARRIER_USER_TYPE) 
        heads.push({ text: 'Buyer', value: 'buyer' })
      if (this.accountType === SUPPLIER_USER_TYPE || this.accountType === CARRIER_USER_TYPE) 
        heads.push({ text: 'Supplier', value: 'supplier' })
      
      return heads
    }, 
    items: function() {
      return this.$store.getters.getOrders
    },
    accountType: function() {
      return this.$store.state.ui.accountType
    }
  },
  components: {
    UserDetailTooltip
  }
}
</script>

<style>
.routerLink {
  text-decoration: none
}
</style>
