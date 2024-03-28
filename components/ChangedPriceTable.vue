<template>
  <div style="width: 100%" class="w-90 changedPricesTable d-flex">
    <span>
      <label> Price Change ID: </label>
    </span>
    <span>
      <table class="tabCon table mt-2">
        <thead>
          <tr>
            <th style="width: 25%">Product(s)</th>
            <th style="width: 15%">Unit</th>
            <th style="width: 20%">Pharmacy</th>
            <th style="width: 15%">Cost Price</th>
            <th style="width: 15%">Current SP</th>
            <th style="width: 15%">Mark Up</th>
            <th style="width: 15%">New SP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </span>
    <span class="align-self-end">
      <button type="button" :class="BSClassCombos.btnClass">
        Send Price Changes
      </button>
    </span>
  </div>
</template>
<script>
import { BSClassCombos } from "../assets/BSclasses";

export default {
  data() {
    return {
      BSClassCombos: BSClassCombos,
    };
  },
};
</script>

<style scoped>
.table-container {
  margin: 20px;
}

/* Style the table header */
.table thead th {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

/* Style the table rows */
.table tbody tr {
  border: 1px solid #ddd;
}

/* Alternate row colors for better readability */
.table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Style the cells */
.table td {
  padding: 10px;
}

/* Style the "Change" button */
.table button {
  font-size: 0.8rem;
  color: #fff;
  background-color: hsl(264, 39%, 51%);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.changedPricesTable {
  background-color: #fff;
  flex-direction: column;
  padding: 1rem;
  height: 50%;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 10px;
}
</style>
