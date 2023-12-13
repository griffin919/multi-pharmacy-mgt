<template>
  <div style="">
    <div class="expenseCard">
      <div class="d-flex justify-content-between">
        <PaidExpenses class="col h-100 flex-fill" />
        <!-- :expensesm="expensesm" -->
      </div>
    </div>
  </div>
</template>

<script>
import PaidExpenses from "../components/PaidExpenses.vue";
export default {
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    async checkRole() {
      this.$store.commit("checkUserRoles", 12);
    },
  },
  components: { PaidExpenses },
};
</script>

<style>
.expenseCard {
  background-color: #fff;
  padding: 1rem;
  margin: 1rem;

  height: 80vh;
  overflow-y: auto;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 10px;
}
</style>
