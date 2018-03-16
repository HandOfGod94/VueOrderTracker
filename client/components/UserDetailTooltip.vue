<template>
    <v-tooltip bottom>
        <a slot="activator">
          {{ userId }} 
        </a> 
        <span>
          {{ userDetail.organizationName }}<br/>
          {{userDetail.address.city}} {{userDetail.address.zip}} <br />
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
    ...mapActions(['getUserByIdAndType'])
  },
  mounted: function() {
    this.getUserByIdAndType({ userId: this.userId, userType: this.userType })
  },
  computed: {
    userDetail: function() {
      return this.$store.getters.getUser
    }
  }
}
</script>
