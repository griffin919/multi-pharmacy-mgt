<template>
  <div class="h-90">
    <div class="d-flex flex-rows" style="margin: 10px 20px 0px 20px">
      <ul class="nav nav-tabs">
        <li
          style="cursor: pointer"
          :style="{
            backgroundColor:
              clickedTab === 'RequestsTable' ? 'hsl(264, 39%, 51%)' : '',
            color: clickedTab === 'RequestsTable' ? '#fff' : '',
          }"
          :class="{
            'nav-link': true,
            active: clickedTab === 'RequestsTable',
          }"
          @click="(clickedTab = 'RequestsTable'), testMethod(clickedTab)"
        >
          <a>Requests and Shortages </a>
        </li>
        <li
          style="cursor: pointer"
          :class="{
            'nav-link': true,
            active: clickedTab === 'ConfirmRequest',
          }"
          @click="(clickedTab = 'ConfirmRequest'), testMethod(clickedTab)"
          :style="{
            backgroundColor:
              clickedTab === 'ConfirmRequest' ? 'hsl(264, 39%, 51%)' : '',
            color: clickedTab === 'ConfirmRequest' ? '#fff' : '',
          }"
        >
          <a> Confirm Requests</a>
        </li>
      </ul>
    </div>
    <div class="d-flex flex-rows card-container">
      <div v-if="clickedTab === 'RequestsTable'" class="card">
        <RequestsTable />
      </div>
      <div v-else-if="clickedTab === 'ConfirmRequest'" class="d-flex w-100">
        <div class="card1">
          <PurchaseTable />
        </div>
        <div class="card2" style="flex-basis: 45%">
          <ViewPurchaseOrders />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RequestsTable from "~/components/RequestsTable.vue";
import PurchaseTable from "~/components/PurchaseTable.vue";
import ViewPurchaseOrders from "~/components/ViewPurchaseOrders.vue";

export default {
  async mounted() {
    await this.fetchSuppliers();
  },

  components: {
    RequestsTable,
    PurchaseTable,
    ViewPurchaseOrders,
  },

  data() {
    return {
      clickedTab: "RequestsTable",
    };
  },

  methods: {
    testMethod(wtl) {
      console.log(wtl);
    },
    async fetchSuppliers() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + process.env.NUXT_ENV_SUPPLIER
        );
        let suppliers = response.data.data;
        this.$store.commit("setSuppliers", suppliers);
      } catch (error) {
        this.error = error.message;
      }
    },
    async checkRole() {
      this.$store.commit("checkUserRoles", 4);
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.card {
  background-color: #fff;
  width: 100%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 10px 20px;
  border-radius: 10px;
  height: 94vh;
}
.card1 {
  flex-basis: 55%;
  background-color: #fff;
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, */
  /* rgba(60, 64, 67, 0.15) 0px 2px 6px 2px; */
  /* padding: 15px; */
  border-radius: 10px;
  height: 94vh;
  margin-right: 10px;
}

.card2 {
  flex-basis: 45%;
  background-color: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  /* padding: 5px; */
  border-radius: 10px;
  height: 94vh;
  margin-left: 10px;
}
</style>
