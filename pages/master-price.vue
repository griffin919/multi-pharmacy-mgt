<template>
  <div class="ml-4 mr-4 mt-2">
    <div class="mt-3 mb-2 row d-flex align-items-center">
      <div class="col-3 pageTitleText w-50">
        <h3>Manage product prices</h3>
      </div>
      <div class="col-5">
        <div class="input-group">
          <i class="input-group-text bi bi-search"></i>
          <input
            autofocus="autofocus"
            @keyup.enter="sendProductSearch()"
            @input="sendProductSearch($event)"
            v-model="searchTerm"
            type="text"
            class="form-control input-sm"
            id="inputsm"
            placeholder="Search for product here"
            aria-label="Username"
            aria-describedby="basic-addon1"
            style="font-size: small"
          />
        </div>
      </div>

      <div class="col-4 d-flex align-items-center justify-content-end">
        <div>&nbsp; &nbsp; &nbsp;</div>
        <div class="w-60">
          <button
            type="button"
            :class="BSClassCombos.btnClass"
            @click="showChangedPriceTable = !showChangedPriceTable"
          >
            {{
              showChangedPriceTable
                ? "Completed Price Changes"
                : "Changed Price Table"
            }}
          </button>
        </div>
      </div>
    </div>

    <!-- product search for price change -->
    <div class="gridContainer mt-3">
      <div class="priceChangeTable d-flex flex-column gridCol1">
        <div>
          <div>
            <div style="overflow-y: auto">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" class="text-capitalize col-8">
                      Product name
                    </th>
                    <th scope="col" class="text-capitalize col-1">Unit</th>
                    <th scope="col" class="text-capitalize col-1">
                      Selling Price
                    </th>
                    <th scope="col" class="text-capitalize col-1"></th>
                    <!-- <th scope="col" class="text-capitalize col-2"></th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    role="button"
                    class="align-middle"
                    v-for="product in this.productsInfor"
                    :key="product.id"
                    @click="
                      showOrCloseModal('changePriceModal', 'show'),
                        pickSelectedProduct(product)
                    "
                  >
                    <td class="text-capitalize py-2">
                      {{ product.productDescription }}
                    </td>
                    <td>{{ product.unit }}</td>
                    <td>{{ formatMoney(product.sellingPrice) }}</td>
                    <td>
                      <button
                        class="btn btn-sm"
                        style="
                          font-size: 0.7rem !important;
                          color: blueviolet;
                          background: none;
                        "
                        @click="
                          showOrCloseModal('changePriceModal', 'show'),
                            pickSelectedProduct(product)
                        "
                      >
                        Change
                      </button>
                    </td>
                    <!-- <td><button class="btn btn-sm btn-primary" @click="requestQty(product.id)">Request</button></td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!--  Changed Price table -->
      <div class="priceChangeTable gridCol2">
        <div v-if="showChangedPriceTable">
          <changedPriceTable />
        </div>
        <div v-else>
          <completedPriceChanges :tdValArr="sPriceChangeHistory" />
        </div>
      </div>
    </div>

    <!-- Change Price Modal -->
    <div
      class="modal fade changePrice-modal-lg"
      tabindex="-1"
      role="dialog"
      id="changePriceModal"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content d-flex flex-columns">
          <div class="m-3 editPriceContainer">
            <div class="mb-2 d-flex justify-content-end">
              <button
                style="background: transparent !important"
                class="btn btn-danger btn-sm btn-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <!-- @click="showOrCloseModal('changePriceModal', 'hide')" -->
                <i style="color: red" class="bi bi-x-lg"></i>
              </button>
            </div>
            <div
              class="editPriceCol editPriceCol1 d-flex justify-content-between ml-5 mr-5"
            >
              <span
                >Product:&nbsp;&nbsp;<span class="pageTitleText">
                  {{ this.clickedProduct.productDescription }}
                </span></span
              >
              <span class="ml-8"
                >Unit:&nbsp;&nbsp;
                <span class="pageTitleText">{{
                  this.clickedProduct.unit
                }}</span></span
              >
              <span class="ml-5"
                >Strength:&nbsp;&nbsp;
                <span class="pageTitleText">{{
                  this.clickedProduct.strength
                }}</span></span
              >
            </div>
            <div class="editPriceCol editPriceCol2">
              <span>
                <table class="table">
                  <thead>
                    <tr>
                      <th class="col-5">Pharmacy</th>
                      <th class="col-1">Cost Price</th>
                      <th class="col-1">Selling Price</th>
                      <th class="col-1">Mark up</th>
                      <th class="col-1">New SP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="">
                      <td>Main Street Pharmacy</td>
                      <td>12.00</td>
                      <td>15.00</td>
                      <td>20%</td>
                      <td>
                        <input
                          class="BSClassCombos.inputClass"
                          style="width: 5rem"
                          placeholder="New Price"
                        />
                      </td>
                    </tr>
                    <tr class="">
                      <td>Main Street Pharmacy</td>
                      <td>12.00</td>
                      <td>15.00</td>
                      <td>20%</td>
                      <td>
                        <input
                          class="BSClassCombos.inputClass"
                          style="width: 5rem"
                          placeholder="New Price"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </span>
            </div>
            <div class="editPriceCol editPriceCol3 d-flex justify-content-end">
              <button :class="BSClassCombos.btnClass">Add Price Change</button>
            </div>
            <div class="editPriceCol editPriceCol4"></div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade changePrice-modal-lg"
      tabindex="-1"
      role="dialog"
      id="changedPriceDetailsModal"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content d-flex flex-columns">
          <changedPriceTable />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editPriceCol1 {
  margin: 1rem 0;
}
button {
  background: hsl(264, 39%, 51%);
}

.priceChangeTable {
  background-color: #fff;
  padding: 1rem;
  height: 80vh;
  overflow-y: auto;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 10px;
}
.priceChangeTable table td {
  font-size: small;
  padding: 0.4rem 0.2rem;
  vertical-align: middle;
}

.priceChangeTable label {
  font-weight: 700;
  text-align: center;
}

.gridContainer {
  display: grid;
  column-gap: 10px;
  min-height: 80vh;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

.gridCol1 {
  /* grid-row: span 1; */
  /* border: 2px hsl(264, 39%, 51%) solid; */
  overflow-y: auto;
  overflow-x: hidden;
  grid-column: span 1;
}
.gridCol2 {
  grid-column: span 2;
  /* grid-row: span 2; */
  /* border: 2px hsl(264, 39%, 51%) solid; */
  overflow-y: auto;
  overflow-x: hidden;
  /* height: 100%; */
}

thead {
  position: sticky; /* make the table heads sticky */
  top: 0px; /* table head will be placed from the top of the table and sticks to it */
}
</style>

<script>
import { BSClassCombos } from "../assets/BSclasses";
import CompletedPriceChanges from "../components/CompletedPriceChanges.vue";
import { sPriceChangeHistory } from "../store/sampledb";

export default {
  mounted() {
    console.log("sPriceChangeHistory", sPriceChangeHistory);
  },
  data() {
    return {
      BSClassCombos: BSClassCombos,
      searchTerm: "",
      showChangedPriceTable: false,
      enableStatus: "disabled",
      formData: {
        newProductName: "",
      },
      showChangePriceModal: false,
      searchStart: false,
      clickedProduct: {},
      changedPricesObj: {},
      sPriceChangeHistory: sPriceChangeHistory,
    };
  },
  computed: {
    buttonClass() {
      return "btn btn-sm";
    },
    productsInfor() {
      return this.$store.state.productsInfor;
    },
  },
  methods: {
    showOrCloseModal(id, state) {
      $(`#${id}`).modal(`${state}`);
    },
    pickSelectedProduct(product) {
      this.clickedProduct = product;
      console.log("this.clickedProduct:", this.clickedProduct);
    },
    formatMoney(amount) {
      return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },
    async sendProductSearch() {
      console.log("Hello", process.env.NUXT_ENV_SEARCH_PRODUCT_API);
      if (this.searchTerm.length >= 1) {
        try {
          let response = await this.$axios.get(
            this.$store.state.urlBase +
              process.env.NUXT_ENV_SEARCH_PRODUCT_API +
              this.searchTerm
          );

          let resList = response.data.data;
          console.log("🚀 ~ resList:", resList);
          // console.log(response.data.data);
          this.$store.commit("setProducts", resList);

          this.searchDone = true;
          this.searchStart = true;
        } catch (error) {
          this.error = error.message;
        }
      }
    },
  },
};
</script>
