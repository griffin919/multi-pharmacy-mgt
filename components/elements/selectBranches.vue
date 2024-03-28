<template>
  <div>
    <div style="position: relative">
      <cbutton :clickHandler="handleShowBranchTab" label="Select Branches" />
    </div>
    <div
      v-if="showBranchTab"
      class="branchDropdown"
      style="position: absolute; z-index: 1"
    >
      <ul>
        <li @click="selectAllBranches" >
          <div class="liDiv1">Select All</div>
          <div class="liDiv2">
            <input type="checkbox" v-model="selectAll" />
          </div>
        </li>
        <li
          v-for="branch in branches"
          :key="branch.id"
          @click="handleBranchSelect(branch.id)"
         
        >
          <div class="liDiv1">{{ branch.name }}</div>
          <div class="liDiv2">
            <input
              type="checkbox"
              :value="branch.id"
              v-model="selectedBranches"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import cbutton from "./cbutton.vue";
import { branches } from "../../store/sampledb";

export default {
  data() {
    return {
      showBranchTab: false,
      selectAll: false,
      branches: branches,
    };
  },
  
  components: { cbutton },
  computed: {
    selectedBranches(){
      return this.$store.state.selectedBranches
    }
  },
  methods: {
    sendData() {
      // Emit an event with some data
      eventBus.$emit('data-sent', { message: 'Hello from Component A' });
    },
    logSomefin() {
      // Toggle the visibility of the branch dropdown
      this.showBranchTab = !this.showBranchTab;
    },

    handleBranchSelect(value) {
      const index = this.selectedBranches.indexOf(value);
      if (index !== -1) {
        this.$store.commit('removeBranch', index)
      } else {
        this.$store.commit('addBranch', value)
      }

      console.log(
        "this.$store.state.selectedBranches",
        this.$store.state.selectedBranches
      );
    },

    selectAllBranches() {
      this.$store.commit('setAllBranches', [this.selectAll, this.branches])
      console.log(
        "this.$store.state.selectedBranches",
        this.$store.state.selectedBranches
      );
    },

    handleShowBranchTab() {
      this.showBranchTab = !this.showBranchTab;
      console.log(
        "🚀 ~ handleShowBranchTab ~  this.showBranchTab:",
        this.showBranchTab
      );
    },
  },
};
</script>

<style>
/* Hide the default dropdown arrow */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M19 9l-7 7-7-7"></path></svg>');
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}

/* Style the selected options */
select[multiple] option:checked {
  background-color: lightblue; /* Change background color as needed */
}

.branchDropdown {
  width: 50%;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #8e44ad;
}

.branchDropdown ul li {
  padding: 5px 0;
  border-bottom: 1px solid rgba(60, 64, 67, 0.3);
  display: flex;
}

.branchDropdown ul li .liDiv1 {
  width: 80%;
}

.branchDropdown ul li .liDiv2 input {
  width: 20px;
  height: 20px;
}
</style>

