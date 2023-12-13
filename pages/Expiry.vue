<template>
  <div class="container-fluid">
    <ExpiryList/> 
  </div>
</template> 

<script>
export default {

  async mounted() {
 
  },

 
  methods: {
 
    
    async checkRole() {
      this.$store.commit('checkUserRoles',26)
    },
  },
}
</script>

<style>

</style>