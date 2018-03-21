<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark>
                <v-toolbar-title>Sign In to continue</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-select :items="items" prepend-icon="person" item-value="value" v-model="accountType" label="Select Account Type"></v-select> 
                  <!-- <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field> -->
                  <v-text-field v-model="userId" prepend-icon="lock" name="userId" label="UserID" id="UserID" type="text"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark @click="saveToSession">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import { BUYER_USER_TYPE, SUPPLIER_USER_TYPE } from '../store/user'
import { SET_API_FILTERS } from '../store/ui'

export default {
  name: 'login',
  data: function() {
    return {
      userId: '',
      accountType: '',
      isLoggedIn: false,
      items: [
        { text: 'Buyer', value: BUYER_USER_TYPE },
        { text: 'Supplier', value: SUPPLIER_USER_TYPE }
      ]
    }
  },
  created: function() {
    if(this.$session.get('accountId') && this.$session.get('accountId')!='')
    {
      this.$router.push({ name:'OrderDetail' })
    } else {
      this.$session.clear()
      this.$session.destroy()
    }
  },
  methods: {
    saveToSession: function() {
      this.$session.set('accountId', this.userId)
      this.$session.set('accountType', this.accountType)
      this.isLoggedIn = true
      this.$session.set('isLoggedIn', this.isLoggedIn)

      //set api filters
      this.$store.commit(SET_API_FILTERS, {
        userAccountType: this.accountType,
        userId: this.userId
      })

      this.$router.push({name:'OrderDetail'})
    }
  }
}
</script>
