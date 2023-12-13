<template>
  <div class="container-fluid">
    <ProductList/> 
  </div>
</template> 

<script>
export default {
  async mounted() {
    
    await this.fetchAllProducts()
  },
 
  methods: {
 
     async fetchAllProducts() {
      try {
        console.log('HERE');
                let response = await this.$axios.get(this.$store.state.urlBase+process.env.NUXT_ENV_ALL_PRODUCTS_API);
                let allProducts = response.data.data
                // console.log(allProducts);
                await this.$store.commit('setAllProducts', allProducts)
            }
            catch (error) {
                // this.error = error.message;
                console.log(this.error);
            }
    },
    async checkRole() {
      this.$store.commit('checkUserRoles',20)
    },
  },
}
</script>

<style>

</style>