<template>
  <v-container fluid>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex lg11 offset-lg1>
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
                  Name: {{item.transactionalTradeItem.ItemID}} <br /> 
                  Qty: {{ item.requestedQuantity }} <br />
                </span>
              </div>
              <div v-else> <v-progress-circular indeterminate color="primary"></v-progress-circular> </div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider />
      <template v-if="accountType != 'CARRIER_USER_TYPE'">
        <v-container class="text-md-center">
          <div class="headline">Integration detail</div>
          <span v-if="order.integrationDetails != undefined && order.integrationDetails.length > 0">
            <div v-for="item in order.integrationDetails" :key="item.DocumentId">
              <code>Status={{item.Status}}, Action={{item.orderAction}}, Direction={{item.Direction}}, Soruce={{item.sourceComp.ComponentName}}, Destination={{item.destComp.ComponentName}}</code>
            </div>
          </span>
          <div v-else> <v-progress-circular indeterminate color="primary"></v-progress-circular> </div>
        </v-container>
      </template>
      <v-divider />
      <v-container >
        <v-layout>
        <v-flex xs6 class="text-md-center">
          <slot name="bottom-left" slot-scope="user1">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </slot>
        </v-flex>
        <v-flex xs6 class="text-md-center">
          <slot name="bottom-right" slot-scope="user2">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </slot>
        </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'tracker-detail',
  props: ['order', 'accountType']
}
</script>

