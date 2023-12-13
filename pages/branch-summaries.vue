<template>
  <div class="rootDiv">
    <div class="d-flex justify-content-between align-items-center mt-2">
      <div class="w-30 pageTitleText">
        <h4>Branch Summaries</h4>
      </div>
      <div class="d-flex align-items-center">
        <!-- Branch dropdown -->
        <div>
          <BranchesDropDown />
        </div>
        <div class="d-flex justify-content-end align-items-center">
          <button
            type="button"
            class="btn btn-sm btn-primary"
            @click="showSalesDetails = !showSalesDetails"
            style="
              height: 30px;
              vertical-align: middle;
              margin-right: 30px;
              background: hsl(264, 39%, 51%);
            "
            data-bs-toggle="modal"
            data-bs-target="#summaryPerBranch"
          >
            Click to see all pharmacies
          </button>
        </div>

        <div class="d-flex justify-centent-end">
          <!-- <FormSelect title="Branch"></FormSelect> -->

          <!-- =========================================== -->
          <div class="d-flex align-items-center dateDiv">
            <div class="mr-2">
              <label class="mb-0">Period:</label>
            </div>

            <div class="mr-2 dateField">
              <label for="week" class="mb-0">From: </label>
              <input type="date" id="dInpt" class="dateBkg" v-model="fdate" />
            </div>

            <div class="mr-2 dateField">
              <label for="week" class="mb-0">To: </label>
              <input type="date" id="dInpt" class="dateBkg" v-model="tdate" />
            </div>

            <div>
              <button
                class="btn btn-search btn-sm"
                @click="querySalesData, populateBranches"
              >
                <i style="color: #fff" class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div id="wrapper"> -->
    <!-- <div class="scrollbar" id="style-1"> -->
    <!-- <div class="row summariesContainer force-overflow"> -->
    <div class="row summariesContainer">
      <!-- SALES SUMMARY TABLE -->
      <div class="summaryFields card">
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
              <tr v-for="(sale, index) in filteredDailySales" :key="index">
                <td style="font-weight: 500">
                  {{ sale.branchname }}
                </td>
                <td>{{ sumFilteredField(sale.sales, "CashSales") }}</td>
                <td>{{ sumFilteredField(sale.sales, "CreditSales") }}</td>
                <td>{{ sumFilteredField(sale.sales, "InsuranceSales") }}</td>
                <td>{{ sumFilteredField(sale.sales, "TotalSales") }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- SALES SUMMARY TABLE END -->

      <!-- CASH IN HAND SUMMARY TABLE -->
      <div class="summaryFields card">
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
              <tr v-for="(sale, index) in filteredDailySales" :key="index">
                <td style="font-weight: 500">
                  {{ sale.branchname }}
                </td>
                <td>{{ sumFilteredField(sale.sales, "CashSales") }}</td>
                <td>{{ sumFilteredField(sale.sales, "CreditSales") }}</td>
                <td>{{ sumFilteredField(sale.sales, "InsuranceSales") }}</td>
                <td>{{ sumFilteredField(sale.sales, "TotalSales") }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ================== DETAILS CASH IN HAND MODAL======================= -->
    <!--  -->
    <div
      class="modal fade"
      id="summaryPerBranch"
      tabindex="-1"
      aria-labelledby="summaryPerBranch"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
        <div class="modal-content" style="width: 100vw">
          <div class="modal-header">
            <h5 class="modal-title" id="summaryPerBranch">
              Individual Branch Transaction Summary
            </h5>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div class="modal-body">
            <div
              v-for="(branch, index) in filteredDailySales"
              :key="index"
              class="d-flex"
              style="width: 100%"
            >
              <div
                v-if="showSalesDetails === true"
                class="d-flex"
                style="width: 100%"
              >
                <div class="div1 card" style="width: 100%">
                  <div
                    style="
                      display: flex;
                      flex-direction: column-reverse;
                      margin-top: 1rem;
                    "
                  >
                    <h5 style="text-align: center">
                      {{ branch.branchname }}'s Sales
                    </h5>
                  </div>

                  <div class="tableFixHead">
                    <table class="tabCon table mt-2">
                      <thead>
                        <tr>
                          <th style="width: 30%">
                            Sort by
                            <button
                              @click="toggleShift = !toggleShift"
                              :class="{ on: toggleShift }"
                              style="
                                padding: 0.4em 0.8em;
                                color: #fff;
                                border-radius: 0.2rem;
                              "
                            >
                              {{ toggleShift ? "user" : "shift" }}
                            </button>
                          </th>
                          <th style="width: 15%">Cash Sales</th>
                          <th style="width: 15%">Credit Given</th>
                          <th style="width: 15%">Insurance</th>
                          <th style="width: 15%">Totals</th>
                        </tr>
                      </thead>

                      <tbody v-if="toggleShift">
                        <!-- ROW FOR USER -->
                        <tr v-for="shiftRep in shiftReport" :key="shiftRep.id">
                          <td>{{ shiftRep.shifttype }}</td>

                          <td>
                            {{
                              round(
                                shiftRep.sales -
                                  (shiftRep.credit + shiftRep.insur)
                              )
                            }}
                          </td>
                          <td>{{ round(shiftRep.credit) }}</td>
                          <td>{{ round(shiftRep.insur) }}</td>
                          <td>{{ round(shiftRep.sales) }}</td>
                        </tr>
                      </tbody>

                      <tbody v-else>
                        <!-- ROW FOR SHIFT -->
                        <tr v-for="user in userReport" :key="user.id">
                          <td>{{ user.username }}</td>
                          <td>
                            {{ round(user.sales - (user.credit + user.insur)) }}
                          </td>

                          <td>{{ round(user.credit) }}</td>
                          <td>{{ round(user.insur) }}</td>
                          <td>{{ round(user.sales) }}</td>
                        </tr>
                      </tbody>

                      <tfoot v-if="toggleShift">
                        <tr class="trFoot">
                          <td>Total</td>
                          <td>
                            {{
                              round(salesTotal - (creditTotal + insuranceTotal))
                            }}
                          </td>
                          <td>{{ round(creditTotal) }}</td>
                          <td>{{ round(insuranceTotal) }}</td>

                          <td>{{ round(salesTotal) }}</td>
                        </tr>
                      </tfoot>

                      <tfoot v-else>
                        <tr class="trFoot">
                          <td>Total</td>
                          <td>
                            {{
                              round(
                                usalesTotal - (ucreditTotal + uinsuranceTotal)
                              )
                            }}
                          </td>
                          <td>{{ round(ucreditTotal) }}</td>
                          <td>{{ round(uinsuranceTotal) }}</td>

                          <td>{{ round(usalesTotal) }}</td>
                        </tr>
                      </tfoot>
                    </table>
                    <div style="padding: 30px" id="scrollHere"></div>
                  </div>
                </div>

                <!-- SALES SUMMARY TABLE END -->

                <!-- CASH IN HAND SUMMARY TABLE -->

                <div class="div2 card" style="width: 100%">
                  <div
                    style="
                      display: flex;
                      flex-direction: column-reverse;
                      margin-top: 1rem;
                    "
                  >
                    <h5 style="text-align: center">
                      {{ branch.branchname }}'s Cash In Hand
                    </h5>
                  </div>
                  <div>
                    <!-- TABLE HEADER -->
                    <div class="tableFixHead">
                      <table class="tabCon table mt-2">
                        <thead>
                          <tr>
                            <th style="width: 20%">
                              <button
                                @click="toggleShift = !toggleShift"
                                :class="{ on: toggleShift }"
                                style="
                                  padding: 0.4em 0.8em;
                                  color: #fff;
                                  border-radius: 0.2rem;
                                "
                              >
                                {{ toggleShift ? "user" : "shift" }}
                              </button>
                            </th>
                            <th style="width: 20%">Cash Sales</th>
                            <th style="width: 25%">Credit Received</th>

                            <th style="width: 15%">Returns</th>
                            <th style="width: 15%">Cash In</th>
                          </tr>
                        </thead>

                        <tbody v-if="toggleShift">
                          <!-- ROW FOR USER -->
                          <tr
                            v-for="shiftRep in shiftReport"
                            :key="shiftRep.id"
                          >
                            <td>{{ shiftRep.shifttype }}</td>
                            <td>
                              {{
                                round(
                                  shiftRep.sales -
                                    shiftRep.credit -
                                    shiftRep.insur
                                )
                              }}
                            </td>
                            <td>{{ round(shiftRep.creditpaid) }}</td>
                            <td>{{ round(shiftRep.ramt) }}</td>
                            <td>
                              {{
                                round(
                                  shiftRep.sales -
                                    shiftRep.credit -
                                    shiftRep.insur +
                                    shiftRep.creditpaid -
                                    shiftRep.ramt
                                )
                              }}
                            </td>
                          </tr>
                        </tbody>

                        <tbody v-else>
                          <!-- ROW FOR SHIFT -->
                          <tr v-for="user in userReport" :key="user.id">
                            <td>{{ user.username }}</td>
                            <td>
                              {{ round(user.sales - user.credit - user.insur) }}
                            </td>
                            <td>{{ round(user.creditpaid) }}</td>
                            <td>{{ round(user.ramt) }}</td>

                            <td>
                              {{
                                round(
                                  user.sales -
                                    user.credit -
                                    user.insur +
                                    user.creditpaid -
                                    user.ramt
                                )
                              }}
                            </td>
                          </tr>
                        </tbody>

                        <tfoot v-if="toggleShift">
                          <tr class="trFoot">
                            <td>Total</td>
                            <td>
                              {{
                                round(salesTotal - creditTotal - insuranceTotal)
                              }}
                            </td>
                            <td>{{ round(creditpaidTotal) }}</td>
                            <td>{{ round(returnsTotal) }}</td>

                            <td>
                              {{
                                round(
                                  salesTotal -
                                    creditTotal -
                                    insuranceTotal +
                                    creditpaidTotal -
                                    returnsTotal
                                )
                              }}
                            </td>
                          </tr>
                        </tfoot>

                        <tfoot v-else>
                          <tr class="trFoot">
                            <td>Total</td>
                            <td>
                              {{
                                round(
                                  usalesTotal - ucreditTotal - uinsuranceTotal
                                )
                              }}
                            </td>
                            <td>{{ round(ucreditpaidTotal) }}</td>
                            <td>{{ round(ureturnsTotal) }}</td>

                            <td>
                              {{
                                round(
                                  usalesTotal -
                                    ucreditTotal -
                                    uinsuranceTotal +
                                    ucreditpaidTotal -
                                    ureturnsTotal
                                )
                              }}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                      <div style="padding: 30px" id="scrollHere"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-90 cashFlow">
      <label>Cash Flow</label>
      <table class="tabCon table mt-2">
        <thead>
          <tr>
            <th style="width: 15%">Branch</th>
            <th>Sales</th>
            <th>Overages and Shortages (Cash)</th>
            <th>Gross Profit</th>
            <th>Customer Returns</th>
            <th>Expenses</th>
            <th>Damages and Expiries</th>
            <th>Overages and Shortages (Stock)</th>
            <th>Net Profit</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <!-- Rows for each category -->
          <tr v-for="(branch, index) in Object.keys(branches)" :key="index">
            <td>{{ branch }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <!-- Totals row -->
          <tr
            style="border-top: 2px solid hsl(264, 39%, 51%); position: sticky"
          >
            <td>Totals</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>0.00</td>
          </tr>
        </tbody>

        <tfoot style="border-top: hsl(264, 39%, 51%) solid 2px">
          <!-- Another totals row, if needed -->
          <!-- <tr>
        <td>Totals</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>0.00</td>
        <td>0.00</td>
      </tr> -->
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import FormSelect from "../components/UtilityComps/FormSelect.vue";
import { dailySales } from "../store/sampledb.js";
import BranchesDropDown from "../components/UtilityComps/BranchesDropDown.vue";

export default {
  components: {
    FormSelect,

    BranchesDropDown,
  },

  mounted() {
    try {
      const date = new Date();
      const year = date.toLocaleString("default", { year: "numeric" });
      const month = date.toLocaleString("default", { month: "2-digit" });
      const day = date.toLocaleString("default", { day: "2-digit" });

      this.tdate = year + "-" + month + "-" + day;
      this.fdate = year + "-" + "01" + "-" + day;
    } catch (error) {
      this.error = error.message;
    }
  },

  computed: {
    querySalesData() {
      let fromDate = new Date(this.fdate);
      let toDate = new Date(this.tdate);

      this.filteredDailySales = [];

      this.dailySales.map((branch) => {
        let filteredSales = Object.values(branch.sales).filter((sale) => {
          let salesDate = new Date(sale.Date);

          return salesDate >= fromDate && salesDate <= toDate;
        });

        // console.log("filteredSales", filteredSales);

        let filteredData = {
          branchname: branch.branchname,
          sales: [filteredSales],
        };
        this.filteredDailySales.push(filteredData);
        console.log("🚀 filteredDailySales:", this.filteredDailySales);
      });
    },

    refilterByBranch() {
      let arr = [];
      for (const [key, value] of Object.entries(this.selectedBranchStates))
        if (value == true) arr.push(key);

      if (arr.length > 0) {
        this.filteredDailySales = this.filteredDailySales.filter((sale) => {
          for (const branchname of arr)
            if (sale.branchname == branchname) return true;
        });
      }
      console.log("this.filteredDailySales", this.filteredDailySales);
    },

    populateBranches() {
      if (Object.keys(this.branches).length < 1) {
        this.filteredDailySales.forEach((branch) => {
          this.branches[branch.branchname] = false;
        });
        console.log("this.branches", this.branches);
      }
    },
  },

  methods: {
    toggleSelectState(branch) {
      this.branches[branch] = !this.branches[branch];
      console.log(this.branches);
    },

    round(n) {
      if (n) {
        return Number(n).toFixed(2);
      }
      return 0;
    },

    createBranchCheckboxObj(branches) {
      // console.log("Branches", branches);
      branches.forEach((branch) => {
        this.selectedBranchStates[branch.branchname] = false;
      });
      console.log("this.selectedBranchStates", this.selectedBranchStates);
    },

    sumFilteredField(arr, sumItem) {
      // console.log("🚀sumFilteredField ~ arr:", arr);
      let sumTotal = 0;
      arr.forEach((el) => {
        for (const obj in el) {
          for (const objField in el[obj]) {
            if (objField === sumItem) {
              // console.log(sumItem, el[obj][objField]);
              sumTotal += el[obj][objField];
            }
          }
        }
      });
      return sumTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      // console.log("this.cashSalesSum:", this.cashSalesSum);
    },

    sumBranchField(arr, sumItem) {
      console.log("🚀sumFilteredField ~ arr:", arr);
      let sumTotal = 0;
      arr.forEach((el) => {
        console.log(el);
      });
      // return sumTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      // console.log("this.cashSalesSum:", this.cashSalesSum);
    },
  },

  data() {
    return {
      showSalesDetails: false,
      dailySales: dailySales,
      filteredDailySales: [],
      fdate: null,
      tdate: null,
      activeBranch: false,
      selectedBranchStates: {},
      branches: {},
      filteredDailySales: [],
      toggleShift: false,
    };
  },
};
</script>

<style scoped>
button.on {
  background-color: #4caf50;
}

.div1,
.div2 {
  margin: 0.2rem;
  padding: 0.2rem;
}
.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.z-index-100 {
  z-index: 100;
}

.bg-light {
  background: #eeebeb;
}

.w-200 {
  width: 200px;
}
.rootDiv {
  margin: 0 1.5em;
}

.card {
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 10px;
  /* border: hsl(264, 39%, 51%) solid 2px; */
}

.cashFlow {
  background-color: #fff;
  flex-direction: column;
  overflow-x: auto;
  padding: 1rem;
  width: 100%;
  min-height: 40vh;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  margin-top: 0.7rem;
  border-radius: 10px;
  /* border: hsl(264, 39%, 51%) solid 2px; */
}

.dateField {
  padding: 0.5em;
  background: #fff;
  border-radius: 5px;
}

.dateDiv input {
  background-color: transparent;
  border: none;
}

.dateDiv button {
  background: hsl(264, 39%, 51%);
}

.summaryFields {
  min-height: 40vh;
  width: 49%;
  background-color: #fff;
  overflow-y: scroll;
  margin: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.summaryFields label,
.cashFlow label {
  /* color: hsl(264, 39%, 51%); */
  font-weight: 500;
  /* text-align: center; */
}

.summariesContainer {
  padding: 0px;
  width: 100%;
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
  color: hsl(264, 39%, 51%);
  font-weight: 500;
}
td {
  vertical-align: middle;
  font-size: 11px;
}

thead th {
  font-weight: 500;
  position: sticky; /* make the table heads sticky */
  top: 0px; /* table head will be placed from the top of the table and sticks to it */
}

.dateFilterContainer {
  /* background-color: #eeebeb; */
  /* padding: 3px 5px 3px 15px; */
  border-radius: 5px;
  /* margin: 0 10px; */
  /* color: aliceblue; */
}

.dateFilterContainer input {
  background: transparent;
  border: none;
}

.modal {
  padding: 0 !important;
}
.modal .modal-dialog {
  width: 100%;
  max-width: none;
  height: 100%;
  margin: 0;
}
.modal .modal-content {
  height: 100%;
  border: 0;
  border-radius: 0;
}
.modal .modal-body {
  overflow-y: auto;
}
</style>
