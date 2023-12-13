<template>
  <div style="width: 100%" class="d-flex flex-column align-items-between">
    <span>
      <label class="mb-2 pageTitleText"> Price Change ID: </label>
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
