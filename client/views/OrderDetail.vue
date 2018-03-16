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
          <td>{{ props.item.createDateTime }}</td>
          <td>{{ props.item.lastUpdatedDateTime }}</td>
          <td>{{ filterResourceName(props.item.supplier) }}</td>
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
               <v-list-tile-sub-title>{{ props.item.logistics.requestedDeliveryDateRange.beginDate }} To {{ props.item.logistics.requestedDeliveryDateRange.endDate }} </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-content>
               <v-list-tile-title>Ship Date Range</v-list-tile-title>
               <v-list-tile-sub-title>{{ props.item.logistics.requestedShipDateRange.beginDate }} To {{ props.item.logistics.requestedShipDateRange.endDate }} </v-list-tile-sub-title>
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
import { mapActions } from 'vuex'

export default {
  name: "order-detail",
  data() {
    return {
      search: "",
      headers: [
        { text: "Order No.", value: "orderNumber" },
        { text: "Status", value: "orderStatus" },
        { text: "Created On.", value: "createDateTime" },
        { text: "Last Updated", value: "lastUpdatedDateTime" },
        { text: "Supplier", value: "supplier" }
      ],
    };
  },
  methods: {
    ...mapActions(['getOrder']),
    filterResourceName(resource) {
      return resource.split('#')[1]
    }
  },
  mounted: function() {
    this.getOrder()
  },
  computed: {
    items: function() {
      return this.$store.getters.getOrders
    }
  }
};
</script>