<template>
  <div class="rootDiv">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex justify-content-between dateField">
        <div>
          <label for="week">Start Date:</label>
          <input type="date" name="" id="" class="" />
        </div>
        <div>
          <label for="week">End Date:</label>
          <input type="date" name="" id="" class="" />
        </div>
      </div>
      <div style="display: flex; justify-content: center">
        <div
          style="
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin: auto 1rem;
          "
        >
          Select Outlets:&nbsp;
        </div>
        <div
          style="
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin: 0 1rem;
          "
        >
          <select class="form-select">
            <option>Pharm 1</option>
            <option>Pharm 2</option>
            <option>Pharm 3</option>
          </select>
        </div>
      </div>
    </div>
    <!-- <div id="wrapper"> -->
    <!-- <div class="scrollbar" id="style-1"> -->
    <!-- <div class="row summariesContainer force-overflow"> -->
    <div class="row summariesContainer d-flex flex-colums">
      <!-- SALES SUMMARY TABLE -->
      <div class="col-lg summaryFields">
        <div class="">
          <label> Sales summary</label>
          <table class="tabCon table mt-2">
            <thead>
              <tr>
                <th style="width: 30%">Branch</th>
                <th style="width: 20%">Cash Sales</th>
                <th style="width: 20%">Credit Given</th>
                <th style="width: 15%">Insurance</th>
                <th style="width: 15%">Totals</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Pharm 1</td>
                <td></td>

                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Pharm 2</td>
                <td></td>

                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- SALES SUMMARY TABLE END -->

      <!-- CASH IN HAND SUMMARY TABLE -->
      <div class="col-lg summaryFields">
        <label>Cash in hand summary</label>
        <div>
          <table class="tabCon table mt-2">
            <thead>
              <tr>
                <th style="width: 30%">Branch</th>
                <th style="width: 20%">Cash Sales</th>
                <th style="width: 20%">Credit Given</th>
                <th style="width: 15%">Insurance</th>
                <th style="width: 15%">Totals</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pharm 1</td>
                <td></td>

                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Pharm 2</td>
                <td></td>

                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- DETAILS CASH IN HAND -->
      <!-- SALES SUMMARY TABLE -->
      <div v-if="showSalesDetails === true" class="col-lg summaryFields">
        <div class="">
          <label> Pharm 1 (Sales) </label>
          <table class="tabCon table mt-2">
            <thead>
              <tr>
                <th style="width: 20%">Cash Sales</th>
                <th style="width: 20%">Credit Given</th>
                <th style="width: 15%">Insurance</th>
                <th style="width: 15%">Totals</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- SALES SUMMARY TABLE END -->

      <!-- CASH IN HAND SUMMARY TABLE -->
      <div v-if="showSalesDetails === true" class="col-lg summaryFields">
        <label>Pharm 1 (Cash in hand) </label>
        <div>
          <table class="tabCon table mt-2">
            <thead>
              <tr>
                <th style="width: 30%">Branch</th>
                <th style="width: 20%">Cash Sales</th>
                <th style="width: 20%">Credit Given</th>
                <th style="width: 15%">Insurance</th>
                <th style="width: 15%">Totals</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button
        type="button"
        class="btn btn-primary"
        @click="showSalesDetails = !showSalesDetails"
      >
        Toggle Records Per Branch
      </button>
    </div>

    <div class="w-90 cashFlow">
      <label>Cash Flow</label>
      <table class="tabCon table mt-2">
        <thead>
          <tr>
            <th style="width: 30%"></th>
            <th style="width: 15%">Pharm 1</th>
            <th style="width: 20%">Pharm 2</th>
            <th style="width: 15%">Pharm 3</th>
            <th style="width: 15%">Pharm 4</th>
            <th style="width: 15%">Total</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Sales</td>
            <td></td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Overages and Shortages (Cash)</td>
            <td></td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Gross Profit</td>
            <td></td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Customer Returns</td>
            <td></td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td></td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Damages and expiries</td>
            <td></td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Overages and Shortages (stock)</td>
            <td></td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Net Profit</td>
            <td></td>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSalesDetails: false,
    };
  },
};
</script>

<style scoped>
.card {
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
}

.cashFlow {
  background-color: #fff;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  margin-top: 0.7rem;
  border-radius: 10px;
}

.dateField {
  width: 35%;
  margin: 0.7em 0em;
}

.dateField input {
  background-color: transparent;
  border: none;
}

.summaryFields {
  height: 300px;
  background-color: #fff;
  width: 49%;
  margin: 5px;
  display: inline-flex;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; */
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.summaryFields label,
.cashFlow label {
  /* color: hsl(264, 39%, 51%); */
  font-weight: 700;
  /* text-align: center; */
}

.summariesContainer {
  padding: 0px;

  /* overflow: auto; */
  /* overflow-x: hidden; */
  margin: 0 2px 5px;
}

table {
  border-collapse: collapse; /* make the table borders collapse to each other */
  width: 100%;
}
th,
td {
  padding: 10px 16px;
  vertical-align: middle;
  /* border: 1px solid #ccc; */
}
th {
  background: #fff;
}
td {
  vertical-align: middle;
  font-size: 11px;
}

thead th {
  font-weight: 500;
  color: #53535394;
  position: sticky; /* make the table heads sticky */
  top: 0px; /* table head will be placed from the top of the table and sticks to it */
}
</style>
