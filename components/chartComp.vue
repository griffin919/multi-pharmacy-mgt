<template>
  <div>
    <canvas
      height="200"
      :chart-data="chartData"
      :options="chartOptions"
    ></canvas>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import Chart from "chart.js/auto";
import BranchesDropDown from "./UtilityComps/BranchesDropDown.vue";

export default {
  extends: Line,
  props: ["chartData", "options"],
  mounted() {
    // this.renderChart(this.chartData, this.options);
  },
};
</script>

<style>
#canvasId {
}
</style>
