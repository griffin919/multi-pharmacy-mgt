<template>
  <div>
    <!-- SECOND ROW -->
    <div class="row2">
      <div class="row d-flex justify-content-center w-100">
        <div class="col-2">
          <ul>
            <li>
              <span class=""># of Products: </span>
            </li>
            <li>
              <span class="text-primary fw-bold">{{
                changeGenSuppListLength.length
              }}</span>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <li>Discount:</li>
            <li></li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <li>Payment Status:</li>
            <li></li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <li>Payment Method:</li>
            <li></li>
          </ul>
        </div>
        <div class="col-2 d-flex justify-content-end m-1">
          <button
            @click="downloadSupplierFile('pdf', purchaseOrder)"
            class="btn btn-outline-primary btn-sm"
            style="color: #fff; border: 1px solid #fff"
          >
            Download Request
          </button>
        </div>
      </div>
    </div>

    <!--  TABLE  -->
    <div style="width: 100%">
      <div class="h-100">
        <div class="card">
          <div class="rtableFixHead">
            <div>
              <label for="">Confirmed Product</label>
            </div>
            <table style="color: hsl(264, 39%, 51%)" class="tabCon table mt-2">
              <thead class="">
                <tr class="">
                  <th style="width: 25%" scope="col" class="col-4 fw-normal">
                    Product
                  </th>
                  <th scope="col" class="col-1 fw-normal">Unit</th>
                  <th scope="col" class="col-1 text-center fw-normal">
                    Basic Unit
                  </th>
                  <th scope="col" class="col-1 text-center fw-normal">
                    Total Qty
                  </th>
                  <th scope="col" class="col-1 text-center fw-normal">
                    Stock Qty (P)
                  </th>
                  <th scope="col" class="col-1 text-center fw-normal">
                    Stock Qty
                  </th>

                  <!-- <th scope="col" class="col-2 text-center fw-normal">Last Purchase Qty</th> -->
                  <th scope="col" class="col-1 text-center fw-normal">
                    Req. Qty
                  </th>
                  <th
                    style="text-align: left"
                    scope="col"
                    class="col-1 text-center fw-normal"
                  >
                    <span>Qty Supplied</span>
                  </th>

                  <th scope="col" class="col-1 fw-normal">Parent CP</th>
                  <th scope="col" class="col-1 fw-normal">Mark up</th>
                  <th scope="col" class="col-1 fw-normal">Branch SP</th>
                  <th scope="col" class="col-1 fw-normal">New SP</th>
                  <th scope="col" class="col-1 fw-normal">Total Cost</th>
                </tr>
              </thead>

              <tbody class="cartTable fs-6">
                <tr
                  class="cartTableRow align-middle"
                  v-for="product in this.purchaseOrders"
                  :key="product.id"
                >
                  <td style="width: 25%">
                    <div class="align-items-center d-flex">
                      <i
                        @click="removeFromReq(product)"
                        class="bi btn btn-sm text-danger fs-6 bi-x-square-fill"
                      ></i>
                      <span class="text-capitalize text-primary">
                        <div v-if="product.productDescription.length < 40">
                          {{ product.productDescription }}
                        </div>
                        <div
                          v-else
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          role="button"
                          :title="product.productDescription"
                        >
                          {{
                            product.productDescription.substring(0, 25) + "...."
                          }}
                        </div>
                      </span>
                    </div>
                  </td>

                  <td style="width: 5%" class="text-center">
                    {{ product.unit }}
                  </td>
                  <td style="width: 5%" class="text-center">
                    {{ product.stockqty }}
                  </td>
                  <td style="width: 5%" class="text-center">
                    {{ product.costprice }}
                  </td>
                  <td style="width: 15%" class="">
                    <div class="d-flex justify-content-center">
                      <div class="d-flex align-items-center">
                        <i
                          @click="decreaseReqQty(product)"
                          class="bi fs-6 btn text-primary btn-sm bi-dash-square"
                        ></i>
                        <input
                          :value="product.productQty"
                          @input="sendReqProductQty($event, product)"
                          class="reqFormLength text-center form-control form-control-sm"
                          type="number"
                          name=""
                          id=""
                        />
                        <i
                          @click="increaseReqQty(product)"
                          class="bi fs-6 btn text-primary btn-sm bi-plus-square"
                        ></i>
                      </div>
                    </div>
                  </td>

                  <td style="width: 10%">Qty Sold</td>
                  <td style="width: 25%" class="">
                    <!-- <div class=""> -->
                    <div
                      class="d-flex justify-content-between align-items-center col-12"
                    >
                      <!-- INDIVIDUAL CHECKBOX -->
                      <span>
                        <input
                          v-model="selected[product.id]"
                          :value="product.productDescription"
                          @change="changeGenSupp(product)"
                          class="form-check-input"
                          type="checkbox"
                          id="addGenCheck"
                        />
                      </span>
                      <span class="col-8 flex-wrap">{{
                        product.supplier
                      }}</span>
                      <span class="col-1">
                        <select
                          v-model="newSupplier"
                          class="form-select form-select-sm"
                          aria-label="Default select example"
                          @change="
                            setSupplier(product),
                              confirmEditSupplier(editedProduct)
                          "
                        >
                          <option
                            v-for="supplier in supplierList"
                            :key="supplier.supplierid"
                            :value="supplier"
                          >
                            {{ supplier.name }}
                          </option>
                        </select>
                      </span>
                    </div>
                  </td>
                  <td style="width: 5%" class="text-center">Date</td>
                  <td style="width: 10%">
                    <button
                      @click="sendToConfirm(product)"
                      class="btn btn-sm btn-outline-primary"
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          class="rtableFixHead card mt-3 d-flex align-items-between gridContainer"
        >
          <div class="gridItem gridItem1">
            <div>
              <label for="">Requested Products</label>
            </div>
            <table style="color: hsl(264, 39%, 51%)" class="tabCon table mt-2">
              <thead class="">
                <tr class="">
                  <th style="width: 25%" scope="col" class="col-4 fw-normal">
                    Product
                  </th>
                  <th scope="col" class="col-1 fw-normal">Unit</th>
                  <th scope="col" class="col-1 text-center fw-normal">
                    Basic Unit
                  </th>
                  <th scope="col" class="col-1 text-center fw-normal">
                    Total Qty
                  </th>
                  <th scope="col" class="col-1 text-center fw-normal">
                    Stock Qty (P)
                  </th>
                  <th scope="col" class="col-1 text-center fw-normal">
                    Stock Qty
                  </th>

                  <!-- <th scope="col" class="col-2 text-center fw-normal">Last Purchase Qty</th> -->
                  <th scope="col" class="col-1 text-center fw-normal">
                    Req. Qty
                  </th>
                  <th
                    style="text-align: left"
                    scope="col"
                    class="col-1 text-center fw-normal"
                  >
                    <span>Qty Supplied</span>
                  </th>

                  <th scope="col" class="col-1 fw-normal">Parent CP</th>
                  <th scope="col" class="col-1 fw-normal">Mark up</th>
                  <th scope="col" class="col-1 fw-normal">Branch SP</th>
                  <th scope="col" class="col-1 fw-normal">New SP</th>
                  <th scope="col" class="col-1 fw-normal">Total Cost</th>
                  <th scope="col" class="col-1 fw-normal"></th>
                </tr>
              </thead>

              <tbody class="cartTable fs-6">
                <tr
                  class="cartTableRow align-middle"
                  v-for="product in this.purchaseOrders"
                  :key="product.id"
                >
                  <td style="width: 25%">
                    <div class="align-items-center d-flex">
                      <i
                        @click="removeFromReq(product)"
                        class="bi btn btn-sm text-danger fs-6 bi-x-square-fill"
                      ></i>
                      <span class="text-capitalize text-primary">
                        <div v-if="product.productDescription.length < 40">
                          {{ product.productDescription }}
                        </div>
                        <div
                          v-else
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          role="button"
                          :title="product.productDescription"
                        >
                          {{
                            product.productDescription.substring(0, 25) + "...."
                          }}
                        </div>
                      </span>
                    </div>
                  </td>

                  <td style="width: 5%" class="text-center">
                    {{ product.unit }}
                  </td>
                  <td style="width: 5%" class="text-center">
                    {{ product.stockqty }}
                  </td>
                  <td style="width: 5%" class="text-center">
                    {{ product.costprice }}
                  </td>
                  <td style="width: 15%" class="">
                    <div class="d-flex justify-content-center">
                      <div class="d-flex align-items-center">
                        <i
                          @click="decreaseReqQty(product)"
                          class="bi fs-6 btn text-primary btn-sm bi-dash-square"
                        ></i>
                        <!-- @input="sendReqProductQty($event, product)" -->
                        <input
                          :value="product.productQty"
                          class="reqFormLength text-center form-control form-control-sm"
                          type="number"
                          name=""
                          id=""
                        />
                        <i
                          @click="increaseReqQty(product)"
                          class="bi fs-6 btn text-primary btn-sm bi-plus-square"
                        ></i>
                      </div>
                    </div>
                  </td>

                  <td style="width: 10%">Qty Sold</td>
                  <td style="width: 25%" class="">
                    <!-- <div class=""> -->
                    <div
                      class="d-flex justify-content-between align-items-center col-12"
                    >
                      <!-- INDIVIDUAL CHECKBOX -->
                      <span>
                        <input
                          v-model="selected[product.id]"
                          :value="product.productDescription"
                          @change="changeGenSupp(product)"
                          class="form-check-input"
                          type="checkbox"
                          id="addGenCheck"
                        />
                      </span>
                      <span class="col-8 flex-wrap">{{
                        product.supplier
                      }}</span>
                      <span class="col-1">
                        <select
                          v-model="newSupplier"
                          class="form-select form-select-sm"
                          aria-label="Default select example"
                          @change="
                            setSupplier(product),
                              confirmEditSupplier(editedProduct)
                          "
                        >
                          <option
                            v-for="supplier in supplierList"
                            :key="supplier.supplierid"
                            :value="supplier"
                          >
                            {{ supplier.name }}
                          </option>
                        </select>
                      </span>
                    </div>
                  </td>
                  <td style="width: 5%" class="text-center">Date</td>
                  <td style="width: 10%">
                    <button
                      @click="sendToConfirm(product)"
                      class="btn btn-sm btn-outline-primary"
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flex justify-content-end gridItem gridItem2">
            <button class="custom-btn-filled p-2">
              Generate Purchase Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchPurchaseOrders from "./SearchProductInPurchaseOrders.vue";

export default {
  components: {},
  data() {
    return {
      // requestQty: 0,
      editedProduct: {},
      newSupplier: "",
      newGenSupplier: "",
      modal: "editSupplierModal",
      genSupplier: "",
      changeGenSuppList: [],
      selected: {},
      selectAllChecked: false,
      previouslySelected: {},
      fdate: null,
      tdate: null,
      requestedProducts: [],

      // ======================
      searchTerm: "",
      enableStatus: "disabled",
      formData: {
        newProductName: "",
      },
      searchStart: false,
    };
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

    this.loadPage();
  },

  methods: {
    async sendProductSearch() {
      if (this.searchTerm.length >= 1) {
        try {
          let response = await this.$axios.get(
            this.$store.state.urlBase +
              process.env.NUXT_ENV_SEARCH_PRODUCT_API +
              this.searchTerm
          );

          let resList = response.data.data;
          // console.log(response.data.data);
          this.$store.commit("setProducts", resList);

          this.searchDone = true;
          this.searchStart = true;
        } catch (error) {
          this.error = error.message;
        }
      }
    },

    async loadPage() {
      console.log("loadPage:");
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + process.env.NUXT_ENV_PULL_REQ
        );
        let systemPurchaseOrders = response.data.data;
        console.log("🚀systemPurchaseOrders:", systemPurchaseOrders);
        await this.$store.commit("setPurchaseOrders", systemPurchaseOrders);
      } catch (error) {
        this.error = error.message;
      }
    },
    async requestQty(productID) {
      console.log("requestQty:");

      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase +
            process.env.NUXT_ENV_INVOICE_TABLE +
            productID
        );
        this.responseMessage = response.data.message;
        this.searchStart = false;
        this.searchTerm = "";
        this.loadPage();
      } catch (error) {
        this.error = error.message;
      }
    },
    toggleRequest() {
      if (this.searchTerm) {
        this.enableStatus = "";
      } else {
        this.enableStatus = "disabled";
      }
    },
    onSubmit() {
      console.log(this.formData);
    },
    changeGenSupp(product) {
      console.log("🚀changeGenSupp ~ product:", product);
      this.$store.commit("changeGenSupp", product);
      const isSelected = this.$store.state.changeGenSuppList.some(
        (item) => item.productDescription === product.productDescription
      );

      this.$set(this.selected, product.id, isSelected);
    },
    toggleSelectAll() {
      // Toggle the state of all checkboxes based on the master checkbox's status
      for (const product of this.purchaseOrders) {
        this.$set(this.selected, product.id, this.selectAllChecked);
      }

      // Call the changeGenSupp function for each selected product
      for (const product of this.purchaseOrders) {
        this.changeGenSupp(product);
      }
    },
    //TEST
    logTableLength() {
      console.log(this.purchaseOrders);
    },

    async removeFromReq(product) {
      let delRes = await this.$store.commit("delObj", [
        3,
        product,
        this.nextFunc,
      ]);
    },
    nextFunc(product) {
      this.$store.commit("removeFromReq", product);
      console.log("2");
      console.log("changeGenSuppListLength", changeGenSuppListLength);
    },
    async increaseReqQty(product) {
      await this.$store.commit("increaseReqProductQty", product);
    },
    async decreaseReqQty(product) {
      await this.$store.commit("decreaseReqProductQty", product);
    },
    async sendReqProductQty(event, product) {
      await this.$store.commit("editReqProductQty", [
        product,
        event.target.value,
      ]);
    },
    async loadPage() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + process.env.NUXT_ENV_PULL_REQ
        );
        let systemPurchaseOrders = response.data.data;
        console.log("🚀 systemPurchaseOrders:", systemPurchaseOrders);

        systemPurchaseOrders.sort(function (a, b) {
          var textA = a.productDescription.toUpperCase();
          var textB = b.productDescription.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        await this.$store.commit("setPurchaseOrders", systemPurchaseOrders);
      } catch (error) {
        this.error = error.message;
      }
    },
    async sendToConfirm(product) {
      await this.$store.commit("sendToConfirm", product);
      this.$store.commit("removeFromReq", product);
    },
    async sendAllToConfirm() {
      await this.$store.commit("sendAllToConfirm");
      this.$store.commit("removeAllFromReq");
    },
    async setSupplier(product) {
      this.editedProduct = product;
    },

    async confirmEditSupplier(payload) {
      console.log("payload", payload);

      let product = this.editedProduct;
      console.log("🚀this.editedProduct:", this.editedProduct);
      let newSupplier = this.newSupplier;

      this.$store.commit("confirmEditSupplier", [product, newSupplier]);
      // Reload the page
      //location.reload();
    },

    async selectGenSupplier(supplier) {
      this.$store.commit("selectGenSupplier", supplier);
    },

    async downloadSupplierFile(type, a) {
      var form = document.createElement("a");

      form.href =
        this.$store.state.urlBase +
        process.env.NUXT_ENV_DOWNLOAD_REQUESTS +
        "type=" +
        type;
      form.click();
    },
  },
  computed: {
    salesProductSearchResults() {
      return this.$store.getters.salesProductSearchResults;
    },
    clearSearch() {
      if (this.$store.state.salesProductSearchTerm === "") {
        this.searchTerm = "";
      }
    },
    productsInfor() {
      return this.$store.state.productsInfor;
    },

    requestsPage() {
      if (this.$store.state.requestList) {
        let storeRequests = this.$store.state.requestList;
        let pageRequests = storeRequests;
        pageRequests.forEach((product) => {
          product.reqQty = product.stockQty;
        });
        return pageRequests;
      }
    },

    purchaseOrderSearchResults() {
      return this.$store.getters.purchaseOrderSearchResults;
    },

    purchaseOrders() {
      return this.$store.state.purchaseOrders;
    },

    supplierList() {
      return Object.keys(this.$store.state.suppliersList).map((k) => {
        let o = this.$store.state.suppliersList[k];
        return o;
      });
    },

    changeGenSuppListLength() {
      return this.$store.state.changeGenSuppList;
    },

    selectAll: {
      get: function () {
        return this.purchaseOrders
          ? this.selected.length == this.purchaseOrders.length
          : false;
      },

      set: function (value) {
        var selected = [];

        if (value) {
          this.purchaseOrders.forEach(function (product) {
            selected.push(product.productDescription);
          });
        }

        this.selected = selected;
        // this.$store.commit("changeGenSupp", selected);
        console.log(selected);
      },
    },
  },
  components: { SearchPurchaseOrders },
};
</script>

<style scoped>
.gridContainer {
  grid-template-columns: auto 30px;
}

.gridItem1 {
  grid-column: span 1;
}
.gridItem2 {
  grid-column: span 2;
}

.row1,
.row2 {
  padding: 0 20px;
}

.row1,
.row2,
.row3 {
  font-weight: 500;
}

.dateFilterContainer {
  background-color: #faf9f6;
  padding: 3px 10px;
  border-radius: 20px;
  margin: 0 10px;
}

ul {
  display: flex;
  margin: 10px 0;
}

.row2 {
  /* background: #faf9f6; */
  background: hsl(264, 39%, 51%);
  color: #fff;
  border-radius: 5px;
  /* margin-top: 5px; */
  /* padding: 3px 20px; */
}
.mainCon {
  background-color: #fff;
  color: hsl(264, 39%, 51%);
  border: 2px solid #fff;
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.card {
  background-color: #fff;
  width: 100%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 10px 20px;
  border-radius: 10px;
  min-height: 200px;
}

.rtableFixHead {
  overflow-x: hidden;
  overflow-y: auto; /* make the table scrollable if height is more than 200 px  */
  margin-bottom: 10px; /* gives an initial height of 200px to the table */
}
.rtableFixHead thead th {
  /* background-color: #faf9f6; */
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

td {
  padding: 10px 16px;
  vertical-align: middle;
  /* border: 1px solid #ccc; */
}
th {
  padding: 5px 16px;
  /* background: #fff; */
  text-align: center;
  font-weight: bold;
  font-size: 0.7rem;
}
td {
  vertical-align: middle;
  font-size: 12px;
  text-align: center;
}
</style>
