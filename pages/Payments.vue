<template>
  <div>
    <div class="container-fluid">
      <div class=" ">
        <div class="card h-100">
          <div class="card-body">
            <div class="">
              <div>
                <div class="d-flex justify-content-between align-items-end">
                  <h5 style="color: green" class="">Completed Payments</h5>

                  <div
                    class="col-7 d-flex justify-content-between align-items-end"
                  >
                    <div
                      class="col-12 align-items-center d-flex justify-content-between"
                    >
                      <label class="me-3 text-primary" for="">Suppliers</label>
                      <select
                        v-model="selectedName"
                        class="form-select"
                        aria-label="Select a name"
                        @change=filterBySupplierID(selectedName)
                      >
                        <option
                          v-for="name in uniqueNames"
                          :key="name"
                          :value="name"
                        >
                          {{ name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  class="border shadow-sm d-flex col-12 justify-content-around p-2 mb-4 mt-4"
                >
                  <span class="text-center">
                    Paid
                    <span class="fw-bold"> Today </span>
                    <br />
                    <span v-if="paymentSummary" class="fw-bold text-success">
                      <span v-if="paymentSummary.length > 0">
                        GHS {{ paymentSummary[0].todaypay }}
                      </span>
                    </span>
                    <!-- <span class="fw-bold text-success">
                  <span>
                    GHS {{paymentSummary[0].todaypay}}
                  </span>
                </span> -->
                  </span>

                  <span class="text-center">
                    Paid this
                    <span class="fw-bold"> Week </span>
                    <br />
                    <span v-if="paymentSummary" class="fw-bold text-primary">
                      <span v-if="paymentSummary.length > 0">
                        GHS {{ paymentSummary[0].weekpay }}
                      </span>
                    </span>
                    <!-- <span class="fw-bold text-primary">
                  <span>
                    GHS {{paymentSummary[0].weekpay}}
                  </span>
                </span> -->
                  </span>

                  <span class="text-center">
                    Paid this
                    <span class="fw-bold"> Month </span>
                    <br />
                    <span v-if="paymentSummary" class="fw-bold">
                      <span v-if="paymentSummary.length > 0">
                        GHS {{ paymentSummary[0].monthpay }}
                      </span>
                    </span>
                    <!-- <span class="fw-bold">
                  <span>
                    GHS {{paymentSummary[0].monthpay}}
                  </span>
                </span>  -->
                  </span>
                </div>
              </div>
              <div class="tableFixHead">
                <table class="tabCon table mt-2">
                  <thead>
                    <tr>
                      <th
                        style="width: 10%"
                        scope="col"
                        class="col-2 text-primary fw-normal"
                      >
                        Inv. #
                      </th>
                      <th
                        style="width: 25%"
                        scope="col"
                        class="col-2 text-primary fw-normal"
                      >
                        Supplier
                      </th>
                      <th
                        style="width: 10%"
                        scope="col"
                        class="col-1 text-primary fw-normal"
                      >
                        Amt.
                      </th>
                      <th
                        style="width: 10%"
                        scope="col"
                        class="col-1 text-primary fw-normal"
                      >
                        Amt. Paid
                      </th>
                      <th
                        style="width: 15%"
                        scope="col"
                        class="col-1 text-primary fw-normal"
                      >
                        Pmt. Date
                      </th>
                      <th
                        style="width: 15%"
                        scope="col"
                        class="col-1 text-primary fw-normal"
                      >
                        Method
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="payment in filteredPayments" :key="payment.id">
                      <td class="">
                        {{ payment.supplierinvoiceno }}
                      </td>
                      <td style="color: green" class="text-capitalize">
                        {{ payment.name }}
                      </td>
                      <td class="text-capitalize">
                        {{ payment.invoiceamount }}
                      </td>
                      <td class="">
                        {{ payment.amountpaid }}
                      </td>
                      <td class="">{{ payment.ddate }}</td>
                      <td v-if="payment.paymentmethod" class="">
                        <span v-if="payment.paymentmethod == 1"> CASH </span>
                        <span v-if="payment.paymentmethod == 2"> CREDIT </span>
                        <span v-if="payment.paymentmethod == 3"> CHEQUE </span>
                        <span v-if="payment.paymentmethod == 3"> BANK </span>
                        <span v-if="payment.paymentmethod == 5"> MOMO </span>
                        <!-- {{payment.paymentmethod}} -->
                      </td>
                      <!-- <td style="color : green"  class="">{{payment.paystatus}}</td> -->
                      <!-- <td>
                  <button @click="viewPayment(payment)" class="btn btn-sm disabled btn-outline-primary">
                    View
                  </button>
                </td> -->
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- View Invoice modal -->

          <div
            class="modal fade"
            id="exampleModal0002"
            tabindex="-1"
            aria-labelledby="exampleModalLabel-2"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Selected Invoice
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <p class="fw-bold fs-4 text-primary">
                    {{ invoiceSupplierName }}
                  </p>
                  <div
                    class="d-flex justify-content-between mb-3 col-10 mx-auto"
                  >
                    <span class="">Supplier Invoice ID:1111</span>
                    <span class="">Invoice Date:dd/mm/yyyy</span>
                    <span class="">Total Amt:10000</span>
                    <span class="">Pmt. Status:PAID</span>
                    <span class="">Pmt. Method:CASH</span>
                    <span class="">Due Date:dd/mm/yyyy</span>
                  </div>
                  <hr />
                  <div class="col-12">
                    <table class="table table-sm">
                      <thead>
                        <tr>
                          <th scope="col-1">Product Description</th>
                          <th scope="col-1">Unit</th>
                          <th scope="col-1">Qty</th>
                          <th scope="col-1">C. P</th>
                          <th scope="col-1">S. P</th>
                          <th scope="col-1">Expiry Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="product in selectedInvoice"
                          :key="product.id"
                        >
                          <td>{{ product.productDescription }}</td>
                          <td>{{ product.unit }}</td>
                          <td>{{ product.qty }}</td>
                          <td>{{ product.costPrice }}</td>
                          <td>{{ product.sellingPrice }}</td>

                          <td ref="" class="col-1">
                            {{ product.productExpiry }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invoiceSupplierName: "",
      filterBySupplier: null,
      confirmedPayments: [],
      selectedName: "All",
      paymentSummaries: [],
      nameToIDMap: {},
    };
  },

  methods: {
    filterBySupplierID(supplierName) {
      if (supplierName === "All") {
        this.loadPaymentSummary("all");
      } 
      else {
        let resultID = this.nameToIDMap[supplierName];
        console.log(resultID);
        this.loadPaymentSummary(resultID);
      }
    },

    async loadPage() {
      try {
        console.log(process.env.NUXT_ENV_LOAD_SETTLED_PAYMENTS);
        let response = await this.$axios.get(
          this.$store.state.urlBase + process.env.NUXT_ENV_LOAD_SETTLED_PAYMENTS
        );
        // console.log(response);
        this.confirmedPayments = response.data.data;
        console.log(this.confirmedPayments);
        // await this.$store.commit("setConfirmedPayments", confirmedPayments);
      } catch (error) {
        this.error = error.message;
      }
    },
    async viewPayment(invoice) {
      console.log(invoice);

      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase +
            process.env.NUXT_ENV_CREDIT_PAYMENT_DETAILS +
            "/" +
            invoice.orderid
        );
        let singleConfirmedInvoice = response.data.data;
        console.log(response);
      } catch (error) {
        this.error = error.message;
      }
    },
    async loadPaymentSummary(supplier) {
      try {
        let responseII = await this.$axios.get(
          this.$store.state.urlBase + "rest/stoc/paysheads/" + supplier
        );
        this.paymentSummaries = responseII.data.data;
        console.log(this.paymentSummaries);
        // await this.$store.commit("setPaymentSummary", paymentSummary);
      } catch (error) {
        this.error = error.message;
      }
    },
    buildMap() {
      for (let payment of this.confirmedPayments) {
        this.nameToIDMap[payment.name] = payment.supplier;
      }
      console.log(this.nameToIDMap);
    },
  },
  computed: {
    // Initialize with all
    uniqueNames() {
      const names = new Set(["All"]);
      this.confirmedPayments.forEach((payment) => {
        names.add(payment.name);
      });
      return Array.from(names);
    },
    filteredPayments() {
      if (this.selectedName === "All") {
        // if all is selected return all payments
        return this.confirmedPayments;
      }
      return this.confirmedPayments.filter(
        (payment) => payment.name === this.selectedName
      );
    },
    paymentsInfor() {
      return this.$store.state.confirmedPayments;
    },
    selectedInvoice() {
      return this.$store.state.singleConfirmedInvoice;
    },
    paymentSummary() {
      return this.paymentSummaries;
    },
    supplierList() {
      return Object.keys(this.$store.state.suppliersList).map((k) => {
        let o = this.$store.state.suppliersList[k];
        return o;
      });
    },
  },

  async mounted() {
    await this.loadPage();
    this.loadPaymentSummary("all");
    this.buildMap();
    try {
      const date = new Date();
      const year = date.toLocaleString("default", { year: "numeric" });
      const month = date.toLocaleString("default", { month: "2-digit" });
      const day = date.toLocaleString("default", { day: "2-digit" });

      this.tdate = year + "-" + month + "-" + day;
      this.fdate = year + "-" + month + "-" + day;
      this.stockDateFilter();
    } catch (error) {
      this.error = error.message;
    }
  },
};
</script>

<style scoped>
.tableFixHead {
  overflow-y: auto; /* make the table scrollable if height is more than 200 px  */
  height: 65vh;
  width: 100%; /* gives an initial height of 200px to the table */
}
.tableFixHead thead th {
  font-weight: 500;
  color: #53535394;
  position: sticky; /* make the table heads sticky */
  top: 0px; /* table head will be placed from the top of the table and sticks to it */
}
/* .trFoot {
        position: absolute;
      } */
table {
  border-collapse: collapse; /* make the table borders collapse to each other */
  width: 100%;
}
th,
td {
  padding: 10px 8px;
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
</style>