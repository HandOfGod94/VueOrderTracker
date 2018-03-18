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
          <td>{{ props.item.orderNumber }}</td>
          <td>
            <v-chip color="primary" text-color="white">{{ props.item.orderStatus }}</v-chip>
          </td>
          <td>{{ props.item.createDateTime | formatDateTime }}</td>
          <td>{{ props.item.lastUpdatedDateTime | formatDateTime }}</td>
          <td> 
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

export default {
  name: 'order-detail',
  data() {
    return {
      search: '',
      headers: [
        { text: 'Order No.', value: 'orderNumber' },
        { text: 'Status', value: 'orderStatus' },
        { text: 'Created On.', value: 'createDateTime' },
        { text: 'Last Updated', value: 'lastUpdatedDateTime' },
        { text: 'Supplier', value: 'supplier' }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchOrders']),
    filterResourceName: function(resource) {
      return resource.split('#')[1]
    }
  },
  mounted: function() {
    this.fetchOrders()
  },
  computed: {
    items: function() {
      return this.$store.getters.getOrders
    }
  },
  components: {
    UserDetailTooltip
  }
}
</script>