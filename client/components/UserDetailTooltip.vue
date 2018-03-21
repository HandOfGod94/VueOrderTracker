<template>
    <v-tooltip bottom>
        <a slot="activator" @mouseover="fetchData" @mouseout="resetLoading">
          {{ userId }} 
        </a> 
        <span>
          {{ userDetail.organizationName }}<br/>
          {{ userDetail.address.city }} {{ userDetail.address.zip }} <br />
          {{ userDetail.defaultEmail }} <br />
          {{ userDetail.contact }}  <br />
        </span>
    </v-tooltip>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'user-detail-tooltip',
  props: ['userId', 'userType'],
  methods: {
    ...mapActions(['fetchUserByIdAndType'])
  },
  data: {
    isLoading: true
  },
  methods: {
    fetchData: function() {
      let self = this
      this.fetchUserByIdAndType({ userId: this.userId, userType: this.userType }).then(() => self.isLoading = true)
    },
    resetLoading: function() {
      this.isLoading = true
    }
  },
  computed: {
    userDetail: function() {
      return this.$store.getters.getUser
    }
  }
}
</script>
