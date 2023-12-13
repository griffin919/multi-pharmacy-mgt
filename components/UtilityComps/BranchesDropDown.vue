<template>
  <div class="position-relative mr-5" style="z-index: 1">
    <div class="d-flex">
      <button
        @click="toggleBranches = !toggleBranches"
        class="btn btn-sm d-flex"
        style="background: hsl(264, 39%, 51%); color: #fff"
      >
        Select branches <i class="bi bi-chevron-down ml-2"></i>
      </button>
    </div>
    <div
      class="position-absolute z-index-100 w-200 mt-2"
      v-if="toggleBranches"
      style="background: hsl(264, 39%, 51%); color: #fff; width: 200px"
    >
      <div
        class="row p-2"
        v-for="(branch, index) in Object.keys(branches)"
        :key="index"
      >
        <span
          class="col-12 d-flex justify-content-between"
          @click="toggleSelectState(branch)"
          style="cursor: pointer"
        >
          {{ branch }}
          <i v-show="branches[branch]" class="bi bi-check-lg"></i
        ></span>
      </div>
      <!-- <button @click="refilterByBranch">Search</button> -->
      <div style="width: 100%" class="d-flex justify-content-end">
        <button class="btn btn-search btn-sm bg-light m-2">
          <i style="color: hsl(264, 39%, 51%)" class="bi bi-search"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { pharmacies } from "../../store/sampledb";

export default {
  data() {
    return {
      branches: pharmacies,
      toggleBranches: false,
    };
  },

  methods: {
    toggleSelectState(branch) {
      console.log("hello");
      console.log("🚀 ~ branch:", branch);
      this.branches[branch] = !this.branches[branch];
      console.log(this.branches);
    },

    round(n) {
      if (n) {
        return Number(n).toFixed(2);
      }
      return 0;
    },
  },
};
</script>
