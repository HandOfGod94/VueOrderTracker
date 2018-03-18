<template>
  <v-container fluid>
    <v-card>
      <v-container >
    <v-layout row>
      <v-flex md11 offset-md1>
        <div class="headline">Order</div>
          <div class="body-1" v-if="order.createDateTime != ''">
            <div class="subheading">{{order.orderNumber}}</div>
            Cretated Date: {{ order.createDateTime | formatDateTime }} <br />
            Last Updated: {{ order.lastUpdatedDateTime | formatDateTime }} <br />
            Supplier: {{ order.supplierDescription }} <br />
            Ship From: {{ order.logistics.shipFrom }} <br />
            Ship To: {{ order.logistics.shipTo }} <br />
            Ship Date Range:  {{order.logistics.requestedShipDateRange.startDate | formatDate}} to {{order.logistics.requestedShipDateRange.endDate | formatDate}}  <br />
            Delivery Date Range:  {{order.logistics.requestedDeliveryDateRange.startDate | formatDate}} to {{order.logistics.requestedDeliveryDateRange.endDate | formatDate}} <br /> <br />
            
            <div class="title"> Items: </div>
            <span class="body-2" v-for="item in order.orderLineItem" :key="item.lineItemNumber" >
              Name: {{item.transactionalTradeItem.ItemDetails}} <br /> 
              Qty: {{ item.requestedQuantity }} <br />
            </span>
          </div>
          <div v-else> <v-progress-circular indeterminate color="primary"></v-progress-circular> </div>
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
        <div class="body-1" v-if="order.contract.carrier != undefined">
            Organization: {{ order.contract.carrier.organizationName }}<br />
            Contact: {{ order.contract.supplier.contact }}<br />
            Default {{ order.contract.carrier.defaultEmail }}<br />
            Address:
            {{ order.contract.carrier.address.street }},
            {{ order.contract.carrier.address.city }}, 
            {{ order.contract.carrier.address.country }} 
            {{ order.contract.carrier.address.zip }} <br />
        </div>
        <div v-else> <v-progress-circular indeterminate color="primary"></v-progress-circular> </div>
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

