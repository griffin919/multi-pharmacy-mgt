<template>
  <div>
    <!-- <SearchCustomer/>   -->
    <div style="width: 100%">
      <div class="h-100">
        <div>
          <div class="d-flex justify-content-between mt-3 align-items-center">
            <div class="w-50">
              <!-- <SearchProductInPurchaseOrders /> -->
              <!-- SEARCH PRODUCT -->

              <div class="row">
                <div class="col">
                  <div class="input-group mb-2">
                    <i
                      class="input-group-text text-primary bg-white bi bi-search"
                    ></i>
                    <input
                      autofocus="autofocus"
                      @keyup.enter="sendProductSearch()"
                      @input="sendProductSearch($event)"
                      v-model="searchTerm"
                      type="text"
                      class="form-control me-3"
                      placeholder="Search for product here"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>

                  <div
                    v-if="searchTerm"
                    style="position: absolute; z-index: 2"
                    class="mb-2 bg-secondary col-5 border border-gray"
                  >
                    <div v-if="(searchStart = true && searchTerm.length > 0)">
                      <div v-if="!productsInfor">
                        <p class="text-danger form-text">
                          We could not find product. Please search for another
                          product.
                        </p>
                      </div>
                      <div
                        v-else-if="productsInfor"
                        style="height: 50vh; overflow-y: auto"
                      >
                        <table class="table table-hover table-responsive">
                          <thead>
                            <tr>
                              <th scope="col" class="text-capitalize col-5">
                                Product name
                              </th>
                              <th scope="col" class="text-capitalize col-1">
                                Unit
                              </th>
                              <th scope="col" class="text-capitalize col-1">
                                Qty
                              </th>
                              <!-- <th scope="col" class="text-capitalize col-2"></th> -->
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              @click="requestQty(product.id)"
                              role="button"
                              class="align-middle"
                              v-for="product in this.productsInfor"
                              :key="product.id"
                            >
                              <td class="text-capitalize py-2">
                                {{ product.productDescription }}
                              </td>
                              <td>{{ product.unit }}</td>
                              <td>{{ product.stockQty }}</td>
                              <!-- <td><button class="btn btn-sm btn-primary" @click="requestQty(product.id)">Request</button></td> -->
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="mb-2 ps-4 ms-3">
          <div v-if="searchTerm">
            <div v-if="!salesProductSearchResults">
              <p class="text-danger form-text">Product not found. Please search for another medication or enter full name of product and request.</p>
            </div>
          </div>
        </div> -->
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <button @click="loadPage" class="btn btn-outline-primary">
                Refresh Requests
              </button>

              <button
                @click="downloadSupplierFile('pdf', purchaseOrder)"
                class="btn btn-outline-primary"
                style="margin: 0 10px 0 10px"
              >
                Download Supplier Request
              </button>

              <div class="dropdown">
                <button
                  class="btn bi bi-download"
                  style=""
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li @click="downloadSupplierFile('pdf', purchaseOrder)">
                    <span class="dropdown-item">pdf file</span>
                  </li>
                  <li @click="downloadSupplierFile('pptx', purchaseOrder)">
                    <span class="dropdown-item">powerpoint file</span>
                  </li>
                  <li @click="downloadSupplierFile('xlsx', purchaseOrder)">
                    <span class="dropdown-item">excel file</span>
                  </li>
                  <li @click="downloadSupplierFile('docx', purchaseOrder)">
                    <span class="dropdown-item">word document</span>
                  </li>
                  <li @click="downloadSupplierFile('csv', purchaseOrder)">
                    <span class="dropdown-item">csv file</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            class="p-2"
            style="background-color: rgba(184, 184, 184, 0.19216)"
          >
            <!--  Products requested -->
            <div class="d-flex justify-content-between align-items-center">
              <div
                id="pageTop"
                class="d-flex justify-content-center align-items-center"
              >
                <span class=""
                  >Products Selected
                  <span class="mx-2">:</span>
                </span>
                <span class="text-primary fw-bold">{{
                  changeGenSuppListLength.length
                }}</span>
              </div>

              <!-- Filter sales by date -->
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <label>Sales</label>
                </div>

                <div
                  class="d-flex justify-content-between align-items-center dateFilterContainer"
                >
                  <div style="margin-right: 20px">
                    <label for="week">From :&nbsp;&nbsp;</label>
                    <input
                      type="date"
                      name=""
                      id="dInpt"
                      class="dateBkg"
                      v-model="fdate"
                    />
                  </div>
                  <div>
                    <label for="week">To :&nbsp;&nbsp;</label>
                    <input
                      type="date"
                      name=""
                      id="dInpt"
                      class="bg-"
                      v-model="tdate"
                    />
                  </div>

                  <div style="margin-left: 10px">
                    <button
                      style="
                        background-color: hsl(331, 100%, 50%);
                        color: #fff;
                        border-radius: 50%;
                        padding: 5px 10px;
                      "
                      class="btn bi bi-search"
                    ></button>
                  </div>
                </div>

                <!-- <p>Change Supplier</p> -->
              </div>
              <div class="d-flex justify-content-between">
                <span
                  >Supplier:
                  <span style="color: hsl(331, 100%, 50%)">{{
                    newGenSupplier.name
                  }}</span>
                </span>
                <div>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#editGenSupplierModal"
                    class="btn btn-sm btn-outline-danger me-3"
                  >
                    Change Supplier
                  </button>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#confirmMultipleModal"
                    class="btn btn-sm btn-outline-primary"
                  >
                    Confirm Selected Products
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="rtableFixHead">
            <table style="color: hsl(264, 39%, 51%)" class="tabCon table mt-2">
              <thead class="">
                <tr class="">
                  <th style="width: 25%" scope="col" class="col-4 fw-normal">
                    Product
                  </th>
                  <th scope="col" class="col-1 fw-normal">Unit</th>
                  <th
                    style="width: 5%"
                    scope="col"
                    class="col-1 text-center fw-normal"
                  >
                    Stock Qty
                  </th>
                  <th
                    style="width: 5%"
                    scope="col"
                    class="col-1 text-center fw-normal"
                  >
                    Cost Price
                  </th>
                  <th
                    style="width: 15%"
                    scope="col"
                    class="col-2 text-center fw-normal"
                  >
                    Req. Qty
                  </th>
                  <!-- <th scope="col" class="col-2 text-center fw-normal">Last Purchase Qty</th> -->
                  <th scope="col" class="col-2 text-center fw-normal">
                    Qty Sold
                  </th>
                  <th
                    style="text-align: left"
                    scope="col"
                    class="col-1 text-center fw-normal"
                  >
                    <input
                      v-model="selectAllChecked"
                      type="checkbox"
                      @change="toggleSelectAll"
                    />
                    <span>Supplier</span>
                  </th>

                  <th style="width: 10%" scope="col" class="col-1 fw-normal">
                    Last Stockout
                  </th>
                  <th style="width: 10%" scope="col" class="col-1 fw-normal">
                    Action
                  </th>
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

          <!-- Change supplier modal -->
          <div
            class="modal fade"
            id="editSupplierModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edit Supplier Modal
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <span>Previous Supplier: {{ editedProduct.supplier }}</span
                  ><br /><br />
                  <label for="exampleInputEmail1" class="form-label"
                    >New Supplier: {{ newSupplier.name }}</label
                  >
                  <select
                    v-model="newSupplier"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option
                      v-for="supplier in supplierList"
                      :key="supplier.supplierid"
                      :value="supplier.name"
                    >
                      {{ supplier.name }}
                    </option>
                  </select>
                  <br />
                  <span
                    @click="confirmEditSupplier(editedProduct)"
                    data-bs-dismiss="modal"
                    class="btn btn-primary"
                    >Confirm</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Change general supplier modal -->
          <div
            class="modal fade"
            id="editGenSupplierModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edit General Supplier
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <!-- <span>Previous Supplier: {{editedProduct.supplier}}</span><br><br> -->
                  <label for="exampleInputEmail1" class="form-label"
                    >New Supplier: {{ newGenSupplier.name }}</label
                  >
                  <select
                    v-model="newGenSupplier"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option
                      v-for="supplier in supplierList"
                      :key="supplier.supplierid"
                      :value="supplier"
                    >
                      {{ supplier.name }}
                    </option>
                  </select>
                  <br />
                  <span
                    @click="selectGenSupplier(newGenSupplier)"
                    data-bs-dismiss="modal"
                    class="btn btn-primary"
                    >Confirm</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Confirm modal -->
          <div
            class="modal fade"
            id="confirmMultipleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Confirm Multiple Products
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <table class="table table-hover table-responsive">
                    <thead>
                      <tr class="text-primary">
                        <th scope="col" class="col-1 fw-normal">#</th>
                        <th scope="col" class="col-4 fw-normal">Product</th>
                        <th scope="col" class="col-1 text-center fw-normal">
                          Qty
                        </th>
                        <th scope="col" class="col-2 text-center fw-normal">
                          Supplier
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      v-for="product in changeGenSuppListLength"
                      :key="product.productDescription"
                    >
                      <tr>
                        <td>
                          {{ changeGenSuppListLength.indexOf(product) + 1 }}
                        </td>
                        <td>
                          <span class="text-capitalize">
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
                                product.productDescription.substring(0, 25) +
                                "...."
                              }}
                            </div>
                          </span>
                        </td>
                        <td class="text-center">{{ product.unit }}</td>
                        <td class="text-center">{{ product.productQty }}</td>
                        <td>{{ product.supplier }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="modal-footer col-12">
                  <button
                    data-bs-dismiss="modal"
                    @click="sendAllToConfirm"
                    class="btn text-center mx-auto btn-primary col-5"
                  >
                    Confirm Products
                  </button>
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
import SearchPurchaseOrders from "./SearchProductInPurchaseOrders.vue";
export default {
  data() {
    return {
      requestQty: 0,
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
.dateFilterContainer {
  background-color: #fff;
  padding: 3px 10px;
  border-radius: 20px;
  margin: 0 10px;
}
.mainCon {
  background-color: #fff;
  color: hsl(264, 39%, 51%);
  border: 2px solid #fff;
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.rtableFixHead {
  overflow-x: hidden;
  overflow-y: auto; /* make the table scrollable if height is more than 200 px  */
  height: 62vh;
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
  background: #fff;
  text-align: center;
  font-weight: bold;
}
td {
  vertical-align: middle;
  font-size: 12px;
  text-align: center;
}
</style>
