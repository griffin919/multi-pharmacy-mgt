<template>
  <div class="d-flex flex-column">
    <!-- ======== HEADER SECTION========= -->

    <!-------------- FIRST ROW  -------------->

    <div class="row1">
      <div class="row">
        <div class="col-3 flexStartCenter">
          <label style="font-weight: 400; font-size: medium">
            Request Payment Summary
          </label>
        </div>
        <div class="col-9 d-flex justify-content-between" style="width: 100%">
          <div>
            <BranchesDropDown />
          </div>
          <div>
            <button
              class="custom-btn-outline"
              data-bs-toggle="modal"
              data-bs-target="#bulkInvoicePayment"
            >
              Make Bulk Payment
            </button>
          </div>
          <!-- <div
            class="d-flex justify-content-end align-items-center"
            style="width: 70%"
          >
            <div class="d-flex align-items-center dateDiv">
              <div class="mr-2">
                <label class="mb-0">Period:</label>
              </div>

              <div class="dateField">
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
     
          </div> -->
          <div>
            <DateComp filterLabel="Period" :tDate="tdate" :fDate="fdate" />
          </div>
        </div>
      </div>
    </div>

    <!-- ------------ END OF FIRST ROW ------------>

    <!-- ========== TABLE SECTION ============== -->

    <div class="">
      <div class="row w-100">
        <!-- ======== CREDIT BOX ======= -->
        <div class="col m-1 p-2">
          <div class="summaryFigBar">
            <ul>
              <span>
                <li style="font-weight: 600; font-size: 1rem">CREDIT</li>
              </span>
              <span>
                <li>Overdue:</li>
                <li>2</li>
              </span>
              <span>
                <li>Due date:</li>
                <li>2</li>
              </span>
              <span>
                <li>Due in 1 week:</li>
                <li>2</li>
              </span>
              <span>
                <li>Due in 1 Month:</li>
                <li>2</li>
              </span>
              <span>
                <li>Due in Period:</li>
                <li>2</li>
              </span>
            </ul>
          </div>
          <div class="cardLining">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>ID</th>
                  <th>Receiving Pharmacy</th>
                  <th>Val</th>
                  <th>Disc</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Balance</th>
                  <th>Due date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="credit in creditData" :key="credit.ID">
                  <td>{{ credit.Date }}</td>
                  <td>{{ credit.ID }}</td>
                  <td>{{ credit.ReceivingPharmacy }}</td>
                  <td>{{ credit.Val }}</td>
                  <td>{{ credit.Disc }}</td>
                  <td>{{ credit.Total }}</td>
                  <td>{{ credit.Paid }}</td>
                  <td>{{ credit.Balance }}</td>
                  <td>{{ credit.DueDate }}</td>
                  <td>
                    <Button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target=".viewDetails-modal-lg"
                      >Details
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ======== SECOND BOX ======= -->
        <div class="col m-1 p-2">
          <div class="summaryFigBar">
            <ul>
              <span>
                <li style="font-weight: 600; font-size: 1rem">PAID</li>
              </span>
              <span>
                <li>Paid today:</li>
                <li>3</li>
              </span>
              <span>
                <li>Paid this month:</li>
                <li>3</li>
              </span>
              <span>
                <li>Paid this period:</li>
                <li>3</li>
              </span>
            </ul>
          </div>
          <div class="cardLining">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Pharmacy</th>
                  <th>Amount paid</th>
                  <th>Balance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bill</td>
                  <td>Bill</td>
                  <td>Bill</td>
                  <td>Bill</td>
                  <td>
                    <Button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target=".viewDetails-modal-lg"
                      >Details</Button
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== END OF TABLE SECTION ============== -->

    <!-- ========== VIEW DETAILS MODAL ============== -->
    <div
      class="modal fade viewDetails-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content d-flex flex-columns">
          <div class="align-self-end mt-3 mr-4">
            <button
              id="closeBtn"
              type="button"
              class="btn-close btn-danger"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i style="color: white" class="bi bi-x-lg"></i>
            </button>
          </div>
          <POpayment />
        </div>
      </div>
    </div>

    <!--Bulk invoice payment -->
    <div
      class="modal fade"
      id="bulkInvoicePayment"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="bulkInvoicePayment">
              Bulk Debt Payment
            </h5>
            <button
              type="button"
              class="btn-close btn-light"
              style="
                color: red;
                background: transparent !important;
                border: none;
              "
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div class="modal-body">
            <BulkPOPayment />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormSelect from "./UtilityComps/FormSelect.vue";
import ResizableGrid from "./UtilityComps/ResizableGrid.vue";
import ReusableTable from "./UtilityComps/ReusableTable.vue";
import { creditData } from "../store/sampledb.js";
import BranchesDropDown from "./UtilityComps/BranchesDropDown.vue";
import DateComp from "./UtilityComps/DateComp.vue";

export default {
  components: {
    FormSelect,
    ResizableGrid,
    ReusableTable,
    BranchesDropDown,
    DateComp,
  },

  computed: {
    payDebt() {
      // will probably be impl on the backend
    },
  },

  methods: {
    testFunction() {
      console.log("Hello", this.creditData);
    },
  },

  data() {
    return {
      creditData: creditData,
      paidCredit: [],
      fdate: null,
      tdate: null,
    };
  },
};
</script>

<style scoped>
table td {
  font-size: 0.7rem;
}
.summaryFigBar {
  background: #fff;
  border-radius: 0.4rem;
  padding: 0.5rem;
  margin-bottom: 5px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.summaryFigBar * {
  color: hsl(264, 39%, 51%);
}
.row2 {
  margin: 0.3rem 0.5rem;
  /* background: #f6f5f5; */
  padding: 0.3rem 1.5rem;
  width: 100%;
  border: 1px grey solid;
  border-radius: 0.8rem;
}

ul {
  display: flex;
  justify-content: space-around;
}

ul span {
  display: flex;
  flex-direction: columns;
}

button {
  border: 1px solid hsl(264, 39%, 51%);
  height: 30px;
  font-size: 0.7rem;
  color: hsl(264, 39%, 51%);
}

#closeBtn {
  background: red;
  border: none;
  height: 25px;
  font-size: 0.7rem;
  color: #fff;
}

button:hover {
  background: none;
  color: hsl(264, 39%, 51%);
  border: 1px solid hsl(264, 39%, 51%);
}

ul span li {
  margin: 0 5px;
  font-weight: 400;
  color: #fff;
  display: flex;
  align-items: center;
}

.cardLining {
  /* border: 2px solid hsl(264, 39%, 51%); */
  padding: 0.7rem;
  border-radius: 0.6rem;
  height: 400px;
  /* background: #f6f5f5; */
  overflow: hidden;
  /* border: 2px solid hsl(264, 39%, 51%); */
  overflow-y: auto;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.dateField {
  padding: 0.2em;
  background: #eeebeb;
  border-radius: 5px;
  margin-left: 0.3rem;
}

.dateDiv input {
  background-color: transparent;
  border: none;
}

.dateDiv button {
  background: hsl(264, 39%, 51%);
}
</style>
