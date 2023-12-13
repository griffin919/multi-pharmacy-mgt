<template>
  <div class="mainCon">
    <div class="">
      <div class="h-100">
        <div class="card-body mainCon">
          <div>
            <h5 class="">Confirmed Requests</h5>
          </div>
          <div class="dtableFixHead">
            <table style="color: hsl(264, 39%, 51%)" class="tabCon table mt-2">
              <thead class="">
                <tr class="">
                  <th scope="col" class="col-3 fw-normal">Product</th>
                  <th scope="col" class="col-1 fw-normal">Unit</th>
                  <th scope="col" class="col-1 fw-normal">Req. Qty</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  role="button"
                  v-for="product in this.$store.state.confirmedList"
                  :key="product.id"
                >
                  <td>
                    <div class="align-items-center d-flex">
                      <i
                        @click="removeFromPurchase1(product)"
                        class="bi btn btn-sm text-danger fs-6 bi-x-square-fill"
                      ></i>
                      <span class="text-capitalize">
                        {{ product.productDescription }}
                      </span>
                    </div>
                  </td>
                  <td class="">
                    <div class="text-capitalize">
                      {{ product.unit }}
                    </div>
                  </td>
                  <td>{{ product.productQty }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-end">
            <button @click="generatePOs" class="btn btn-outline-primary">
              Generate Purchase Order
            </button>
          </div>

          <!-- View Generated Purchase orders -->
          <!-- <div
            class="modal fade"
            id="modalPO"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Purchase Orders
                  </h5>
                  <i
                    data-bs-dismiss="modal"
                    class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"
                  ></i>
                </div>
                <div class="modal-body">
                  <table class="table table-hover table-responsive">
                    <thead class="">
                      <tr class="">
                        <th scope="col" class="col-1">Purchase Order ID</th>
                        <th scope="col" class="col-1">Supplier</th>
                        <th scope="col" class="col-1">Items</th>
                        <th scope="col" class="col-1">Date</th>
                        <th scope="col" class="col-1"></th>
                        <th scope="col" class="col-1"></th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        role="button"
                        v-for="purchaseOrder in this.$store.state
                          .allPurchaseOrders"
                        :key="purchaseOrder.id"
                      >
                        <td>
                          <div class="align-items-center d-flex">
                            <i
                              @click="removeFromPurchase(purchaseOrder)"
                              class="bi btn btn-sm text-danger fs-6 bi-x-square-fill me-2"
                            ></i>
                            <span
                              data-bs-toggle="modal"
                              data-bs-target="#modalSinglePO"
                              @click="viewSinglePurchaseOrder(purchaseOrder)"
                              class="text-capitalize text-primary"
                            >
                              {{ truncateText(purchaseOrder.invoiceid) }}
                            </span>
                          </div>
                        </td>
                        <td
                          data-bs-toggle="modal"
                          data-bs-target="#modalSinglePO"
                          @click="viewSinglePurchaseOrder(purchaseOrder)"
                          class=""
                        >
                          <div class="text-capitalize">
                            {{ purchaseOrder.name }}
                          </div>
                        </td>
                        <td
                          data-bs-toggle="modal"
                          data-bs-target="#modalSinglePO"
                          @click="viewSinglePurchaseOrder(purchaseOrder)"
                        >
                          {{ purchaseOrder.items }}
                        </td>
                        <td
                          data-bs-toggle="modal"
                          data-bs-target="#modalSinglePO"
                          @click="viewSinglePurchaseOrder(purchaseOrder)"
                        >
                          {{ purchaseOrder.ddate }}
                        </td>
                        <td>
                          <div>
                            <div class="dropdown">
                              <button
                                class="btn bi bi-download"
                                style=""
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              ></button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li
                                  @click="
                                    downloadSupplierFile('pdf', purchaseOrder)
                                  "
                                >
                                  <span class="dropdown-item">pdf file</span>
                                </li>
                                <li
                                  @click="
                                    downloadSupplierFile('pptx', purchaseOrder)
                                  "
                                >
                                  <span class="dropdown-item"
                                    >powerpoint file</span
                                  >
                                </li>
                                <li
                                  @click="
                                    downloadSupplierFile('xlsx', purchaseOrder)
                                  "
                                >
                                  <span class="dropdown-item">excel file</span>
                                </li>
                                <li
                                  @click="
                                    downloadSupplierFile('docx', purchaseOrder)
                                  "
                                >
                                  <span class="dropdown-item"
                                    >word document</span
                                  >
                                </li>
                                <li
                                  @click="
                                    downloadSupplierFile('csv', purchaseOrder)
                                  "
                                >
                                  <span class="dropdown-item">csv file</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            @click="receivePurchaseOrder(purchaseOrder)"
                            class="btn btn-primary"
                            >Receive</span
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> -->

          <!-- View Single Purchase Order -->
          <div
            class="modal fade"
            id="modalSinglePO"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="staticBackdropLabel1"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Purchase Order
                  </h5>
                  <i
                    data-bs-toggle="modal"
                    data-bs-target="#modalPO"
                    class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"
                  ></i>
                </div>
                <div class="modal-body">
                  <table class="table table-hover table-responsive">
                    <thead class="">
                      <tr class="">
                        <th scope="col" class="col-1">Product</th>
                        <th scope="col" class="col-1">Unit</th>
                        <th scope="col" class="col-1">Qty</th>
                        <th scope="col" class="col-1">Supplier</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        role="button"
                        v-for="product in this.$store.state.singlePurchaseOrder"
                        :key="product.id"
                      >
                        <td>
                          <div class="align-items-center d-flex">
                            <!-- <i @click="removeFromPurchase(product)" class="bi btn btn-sm text-danger fs-6 bi-x-square-fill"></i> -->
                            <span class="text-capitalize text-primary">
                              {{ product.productDescription }}
                            </span>
                          </div>
                        </td>
                        <td class="">
                          <div class="text-capitalize">
                            {{ product.unit }}
                          </div>
                        </td>
                        <td>{{ product.qty }}</td>
                        <td>{{ product.supplier }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Confirm Receive -->
          <div
            class="modal fade"
            id="confirmRequest"
            tabindex="-1"
            aria-labelledby="confirmRequest"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <span> Purchase Order Received To Pending Invoices </span>
                  <div>
                    <span
                      data-bs-dismiss="modal"
                      class="btn btn-sm btn-success text-white"
                      >OK</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Generate P.O Notification Modal -->
          <div
            class="modal fade"
            id="genPO"
            tabindex="-1"
            aria-labelledby="confirmRequest"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <span v-if="poChecked == true">{{ poChecked }}</span>
                  <span v-else>Nope</span>
                  <!-- <span v-if="poChecked = true"> -->
                  <!-- Purchase order generated successfully. -->
                  <!-- </span> -->
                  <div>
                    <span
                      data-bs-dismiss="modal"
                      @click="poCheckSwitch"
                      class="btn btn-sm btn-success text-white"
                      >OK</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Receive P.O Notification Modal -->
          <div
            class="modal fade"
            id="receivePO"
            tabindex="-1"
            aria-labelledby="confirmRequest"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <span v-if="(poChecked = true)">
                    Purchase order generated successfully.
                  </span>
                  <span v-else>
                    Confirm requested products to generate purchase order.
                  </span>
                  <div>
                    <span
                      data-bs-dismiss="modal"
                      @click="poCheckSwitch"
                      class="btn btn-sm btn-success text-white"
                      >OK</span
                    >
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
      searchTerm: "",
      selectedInvoice: "",
      poChecked: "",
    };
  },
  computed: {
    invoiceSearchResults() {
      return this.$store.getters.invoiceSearchResults;
    },
    invoicesInfor() {
      return this.$store.state.requestList;
    },
  },
  methods: {
    async sendInvoiceSearch() {
      if (this.searchTerm.length >= 1) {
        await this.$store.commit("receiveInvoiceSearch", this.searchTerm);
        this.enableStatus = "";
      }
    },
    onSubmit() {
      console.log(this.formData);
    },
    async generatePOs() {
      let confirmedList = this.$store.state.confirmedList;

      if (confirmedList.length > 0) {
        try {
          let fdata = [];
          confirmedList.forEach((product) => {
            let data2 = {};
            data2.id = 0;
            data2.invoiceid = 0;
            data2.productid = product.id;
            data2.qty = product.productQty;
            data2.supplierid = product.supplierid;
            fdata.push(data2);
          });

          // console.log('fdata:'+fdata);
          let response = await this.$axios.post(
            this.$store.state.urlBase +
              process.env.NUXT_ENV_GENERATE_PURCHASE_ORDER,
            fdata
          );
          console.log(response);
          if (response.data.sucessful == true) {
            this.poChecked = response.data.message;
            window.alert("Purchase order generated");
            this.$store.commit("clearConfirmedList");
          } else {
            this.poChecked = response.data.message;
            window.alert(response.data.message);
          }
        } catch (error) {
          this.error = error.message;
          console.log(error.message);
          this.poChecked = "Kindly check your internet connection.";
          window.alert(error.message);
        }
      } else if ((confirmedList.length = 0)) {
        this.poChecked = "No products confirmed.";
      }
    },
    poCheckSwitch() {
      this.poChecked = false;
    },
    downloadSupplierFile(type, a) {
      a.invoiceid;
      a.supplierid;
      var form = document.createElement("a");

      form.href =
        this.$store.state.urlBase +
        process.env.NUXT_ENV_DOWNLOAD_FILE +
        "type=" +
        type +
        "&id=" +
        a.invoiceid +
        "&sid=" +
        a.supplierid;
      form.click();
    },
    downloadOrderInvoicefile(type, invioceid) {
      var form = document.createElement("a");
      form.href =
        this.$store.state.urlBase +
        process.env.NUXT_ENV_DOWNLOAD_FILE +
        "type=" +
        type +
        "&id=" +
        invioceid;
      form.click();
    },
    async removeFromPurchase(product) {
      let delRes = await this.$store.commit("delObj2", [
        4,
        product,
        this.nextFunc2,
      ]);
    },
    async removeFromPurchase1(product) {
      this.$store.commit("removeFromPurchase1", product);
    },
    nextFunc2(product) {
      this.$store.commit("removeFromConfirmed", product);
    },
    truncateText(text) {
      if (text.length > 10) {
        return `${text.slice(23, 27)}...`;
      } else {
        return text;
      }
    },
    async viewPurchaseOrders() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + process.env.NUXT_ENV_VIEW_PURCHASE_ORDERS
        );
        let allPurchaseOrders = response.data.data;
        // console.log(allPurchaseOrders);
        await this.$store.commit("allPurchaseOrders", allPurchaseOrders);
      } catch (error) {
        this.error = error.message;
      }
      let currModal = document.getElementById("modalPO");
      currModal.classList.add("show");
    },
    async viewSinglePurchaseOrder(purchaseOrder) {
      let invoiceid = purchaseOrder.invoiceid;
      console.log("🚀invoiceid:", invoiceid);

      let supplierid = purchaseOrder.supplierid;
      console.log("🚀 supplierid:", supplierid);
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase +
            process.env.NUXT_ENV_VIEW_PURCHASE_ORDER +
            invoiceid +
            "/" +
            supplierid
        );
        let singlePurchaseOrder = response.data.data;

        await this.$store.commit(
          "viewSinglePurchaseOrder",
          singlePurchaseOrder
        );
      } catch (error) {
        this.error = error.message;
      }
      let currModal = document.getElementById("modalSinglePO");
      currModal.classList.add("show");
    },
    async receivePurchaseOrder(purchaseOrder) {
      let invoiceid = purchaseOrder.invoiceid;
      let supplierid = purchaseOrder.supplierid;
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase +
            process.env.NUXT_ENV_PURCHASE_ORDERS_TO_INVOICE +
            invoiceid +
            "/" +
            supplierid
        );
        let singlePurchaseOrder = response.data.sucessful;
        if (singlePurchaseOrder === true) {
          alert("Purchase Order Received");
          console.log("PRODUCT RECEIVED");
          await this.viewPurchaseOrders;
        } else {
          alert("Purchase Order Not Received");
        }
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
.mainCon {
  background-color: #faf9f6;
  color: hsl(264, 39%, 51%);
  border: 1px solid hsl(264, 39%, 51%);
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.dtableFixHead {
  overflow-x: hidden;
  overflow-y: auto; /* make the table scrollable if height is more than 200 px  */
  height: 75vh;
  margin-bottom: 10px; /* gives an initial height of 200px to the table */
}
.dtableFixHead thead th {
  background-color: #faf9f6;
  font-weight: 500;
  color: hsl(264, 39%, 51%);
  position: sticky; /* make the table heads sticky */
  top: 5px; /* table head will be placed from the top of the table and sticks to it */
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
  padding: 10px 16px;
  vertical-align: middle;
  /* border: 1px solid #ccc; */
}
th {
  background: #fff;
}
td {
  vertical-align: middle;
  font-size: 12px;
}
</style>
