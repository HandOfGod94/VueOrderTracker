<template>
  <div>
    <div class="headline">{{ title }}</div>
    <div class="body-1">
      Organization: {{ user.organizationName }}<br />
      Contact: {{ user.contact }}<br />
      Email: {{ user.defaultEmail }}<br />
      {{ user.address.street }},
      {{ user.address.city }}, 
      {{ user.address.country }} 
      {{ user.address.zip }} <br />
    </div>
  </div>
</template>

<script>
export default {
  name:'user-detail',
  props: ['user', 'title']
}
</script>

