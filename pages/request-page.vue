<!-- =========== GENEREL PURCHASE REQUEST PAGE =========== -->

<!-- 
          Reference Components
-----------------------------------
-> MasterRequestTable
-> BranchRequestsTable
-> suppliedPaymentSummary
-----------------------------------
 -->

<template>
  <div class="h-90">
    <!-- =========== NAVIGATION TAB =========== -->
    <div class="d-flex flex-rows" style="margin: 10px 20px 0px 20px">
      <ul class="nav nav-tabs">
        <!-- ---------- TAB 1  ---------- -->
        <li
          style="cursor: pointer"
          :class="{
            'nav-link': true,
            active: clickedTab === 'BranchRequest',
          }"
          @click="clickedTab = 'BranchRequest'"
          :style="{
            backgroundColor:
              clickedTab === 'BranchRequest' ? 'hsl(264, 39%, 51%)' : '',
            color: clickedTab === 'BranchRequest' ? '#fff' : '',
          }"
        >
          <a> Branch Requests </a>
        </li>

        <!-- ---------- TAB 2 ---------- -->
        <li
          style="cursor: pointer"
          :style="{
            backgroundColor:
              clickedTab === 'MasterRequestsTable' ? 'hsl(264, 39%, 51%)' : '',
            color: clickedTab === 'MasterRequestsTable' ? '#fff' : '',
          }"
          :class="{
            'nav-link': true,
            active: clickedTab === 'MasterRequestsTable',
          }"
          @click="clickedTab = 'MasterRequestsTable'"
        >
          <a>All Requests </a>
        </li>

        <!-- ----------------- TAB 3 ----------------- -->
        <li
          style="cursor: pointer"
          :class="{
            'nav-link': true,
            active: clickedTab === 'SuppliedPaymentSummary',
          }"
          @click="clickedTab = 'SuppliedPaymentSummary'"
          :style="{
            backgroundColor:
              clickedTab === 'SuppliedPaymentSummary'
                ? 'hsl(264, 39%, 51%)'
                : '',
            color: clickedTab === 'SuppliedPaymentSummary' ? '#fff' : '',
          }"
        >
          <a> Payment Summary</a>
        </li>
        <!-- ----------------- TAB 3 END ------------------ -->
        <!-- ----------------- TAB 4 ----------------- -->
      </ul>
    </div>

    <!-- ============== NAV TAB ENDS HERE ============== -->

    <!-- Dynamically rendering components -->
    <!-- ========================================================= -->
    <div class="d-flex flex-rows card-container">
      <div v-if="clickedTab === 'BranchRequest'" style="width: 100%">
        <BranchRequests />
      </div>
      <div
        v-else-if="clickedTab === 'MasterRequestsTable'"
        class="d-flex w-100"
      >
        <div class="card">
          <MasterRequestsTable />
        </div>
      </div>
      <div v-else-if="clickedTab === 'SuppliedPaymentSummary'" class="w-100">
        <div class="card">
          <SuppliedPaymentSummary />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.fetchSuppliers();
  },

  data() {
    return {
      clickedTab: "BranchRequest",
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
  padding: 0 10px;
}

.card {
  background-color: #fff;
  width: 100%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 10px 20px;
  border-radius: 10px;
  min-height: 550px;
}
.card1 {
  /* flex-basis: 55%; */
  background-color: #f7f5f5;
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, */
  /* rgba(60, 64, 67, 0.15) 0px 2px 6px 2px; */
  /* padding: 15px; */
  border-radius: 10px;
  min-height: 94vh;
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
