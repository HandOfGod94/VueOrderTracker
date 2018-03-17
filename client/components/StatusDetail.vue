<template>
  <v-container fluid>
    <v-card>
      <v-container >
    <v-layout row>
      <v-flex md6 class="text-md-center">
        <div class="headline">Order</div>
          <div class="body-1">
            Cretated Date: {{ order.createDateTime }} <br />
            Last Updated: {{ order.lastUpdatedDateTime }} <br />
            Supplier: {{ order.supplierDescription }} <br />
            Ship From: {{ order.logistics.shipFrom }} <br />
            Ship To: {{ order.logistics.shipTo }} <br />
            Ship Date Range:  to  <br />
            Delivery Date Range: to <br />
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
      Some information from wharehouse to tM <br/>
      Some other infor from tm to wharehouse
    </v-container>
    <v-divider />
    <v-container >
      <v-layout>
      <v-flex xs6 class="text-md-center">
        <div class="headline">Supplier</div>
          <div class="body-1">
            Organization Name: JDA<br />
            Contact: 79854<br />
            Default Email: asdsf@asdf.com<br />
            Address: Street Address, Bengaluru<br />
          </div>
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

