<template>
  <v-container fluid>
    <v-card>
      <v-container >
    <v-layout row>
      <v-flex md6 class="text-md-center">
        <div class="headline">Order</div>
          <div class="body-1">
            Cretated Date: {{ order.createDateTime | formatDateTime }} <br />
            Last Updated: {{ order.lastUpdatedDateTime | formatDateTime }} <br />
            Supplier: {{ order.supplierDescription }} <br />
            Ship From: {{ order.logistics.shipFrom }} <br />
            Ship To: {{ order.logistics.shipTo }} <br />
            Ship Date Range:  {{order.logistics.requestedShipDateRange.startDate | formatDate}} to {{order.logistics.requestedShipDateRange.endDate | formatDate}}  <br />
            Delivery Date Range:  {{order.logistics.requestedDeliveryDateRange.startDate | formatDate}} to {{order.logistics.requestedDeliveryDateRange.endDate | formatDate}} <br />
          </div>
      </v-flex>
      <v-flex md6 class="text-md-center">
        <div class="headline">Line Item</div>
          <div class="body-1">
            Robotic camera<br />
            Contact: 79854<br />
            Default Email: asdsf@asdf.com<br />
            Address: Street Address, Bengaluru<br />
          </div>
      </v-flex>
    </v-layout>
   </v-container>
    <v-divider />
    <v-container class="text-md-center">
      <div class="headline">Integration detail</div>
      <div v-for="item in order.integrationDetails" :key="item.DocumentId">
        <code>Status={{item.Status}}, Action={{item.orderAction}}, Direction={{item.Direction}}, Soruce={{item.sourceComp.ComponentName}}, Destination={{item.destComp.ComponentName}}</code>
      </div>
    </v-container>
    <v-divider />
    <v-container >
      <v-layout>
      <v-flex xs6 class="text-md-center">
        <div class="headline">Supplier</div>
          <div class="body-1" v-if="order.supplier.id != undefined">
            Organization: {{ order.supplier.organizationName }}<br />
            Contact: {{ order.supplier.contact }}<br />
            Default {{ order.supplier.defaultEmail }}<br />
            Address:
            {{ order.supplier.address.street }},
            {{ order.supplier.address.city }}, 
            {{ order.supplier.address.country }} 
            {{ order.supplier.address.zip }} <br />
          </div>
          <div v-else> <v-progress-circular indeterminate color="primary"></v-progress-circular> </div>
      </v-flex>
        <v-flex xs6 class="text-md-center">
          <div class="headline">Carrier detail</div>
          <div class="body-1">
            Organization Name: JDA<br />
            Contact: 79854<br />
            Default Email: asdsf@asdf.com<br />
            Address: Street Address, Bengaluru<br />
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'status-detail',
  props: ['order']
}
</script>

