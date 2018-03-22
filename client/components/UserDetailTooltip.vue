<template>
    <v-tooltip bottom>
        <a slot="activator" @mouseover="fetchData">
          {{ userId }} 
        </a> 
        <span v-if="!isLoading">
          {{ userDetail.organizationName }}<br/>
          {{ userDetail.address.city }} {{ userDetail.address.zip }} <br />
          {{ userDetail.defaultEmail }} <br />
          {{ userDetail.contact }}  <br />
        </span>
        <v-progress-circular indeterminate v-else></v-progress-circular>
    </v-tooltip>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'user-detail-tooltip',
  props: ['userId', 'userType'],
  data: function() {
    return {
      isLoading: true
    }
  },
  methods: {
    ...mapActions(['fetchUserByIdAndType']),
    fetchData: function() {
      this.isLoading = true
      this.fetchUserByIdAndType({ userId: this.userId, userType: this.userType }).then(()=> this.isLoading=false)
    }
  },
  computed: {
    userDetail: function() {
      return this.$store.getters.getUser
    }
  }
}
</script>
