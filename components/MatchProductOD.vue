<template>
    <div class="row ">
      <div class="col-sm-6 mt-2 mb-sm-0 py-0">
        <div class="" style="height: 82vh">
          <div class="">
            <div>
              <div class="row mt-3">
                <div class="col-sm-6">
                  <div class="p-1 shadow-sm product-card">
                    <div class="card-body">
                      <h5>SELECTED PRODUCT:</h5>
                      <form>
                        <div class="mb-1">
                          <label for="productName" class="form-label"
                            >Product Name</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="productName"
                            v-model="selectedMatchProduct.productDescription"
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="manufacturer" class="form-label"
                            >Unit</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="manufacturer"
                            v-model="unitML"
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="manufacturer" class="form-label"
                            >Buying Unit</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="manufacturer"
                            v-model="buyingUnit"
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="activeIngredient" class="form-label"
                            >Selling Unit</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="activeIngredient"
                            v-model="sellingUnit"
                            readonly
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="p-1 master-card">
                    <div class="card-body">
                      <h5>MATCHED TO:</h5>
                      <form>
                        <div class="mb-1">
                          <label for="productName" class="form-label"
                            >Product Name</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="productName"
                            v-model="selectedProduct"
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="strength" class="form-label">Unit</label>
                          <div
                            class="btn-toolbar mb-1"
                            role="toolbar"
                            aria-label="Toolbar with button groups"
                            v-if="currentBasicUnit || currentUnits"
                          >
                            <div
                              class="btn-group"
                              role="group"
                              aria-label="First group"
                            >
                              <button
                                @click="assignUnits(currentBasicUnit, 1)"
                                v-if="currentBasicUnit"
                                type="button"
                                class="btn btn-outline-dark"
                              >
                                {{ currentBasicUnit }}
                              </button>
                              <button
                                @click="assignUnits(unit.name, unit.noofunits)"
                                v-if="currentUnits"
                                type="button"
                                class="btn btn-outline-dark"
                                v-for="(unit, index) in currentUnits"
                                :key="index"
                              >
                                {{ unit.name }}
                              </button>
                            </div>
                          </div>
                          <input
                            v-else
                            type="text"
                            class="form-control"
                            id="strength"
                            style="
                              background-color: #a8eab8;
                              border-color: #a8eab8;
                            "
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="manufacturer" class="form-label"
                            >Buying Unit</label
                          >
                          <div
                            class="btn-toolbar mb-1"
                            role="toolbar"
                            aria-label="Toolbar with button groups"
                            v-if="currentBasicUnit || currentUnits"
                          >
                            <div
                              class="btn-group"
                              role="group"
                              aria-label="First group"
                            >
                              <button
                                @click="buyingUnit = currentBasicUnit"
                                v-if="currentBasicUnit"
                                type="button"
                                class="btn btn-outline-dark"
                              >
                                {{ currentBasicUnit }}
                              </button>
                              <button
                                @click="buyingUnit = unit.name"
                                v-if="currentUnits"
                                type="button"
                                class="btn btn-outline-dark"
                                v-for="(unit, index) in currentUnits"
                                :key="index"
                              >
                                {{ unit.name }}
                              </button>
                            </div>
                          </div>
                          <input
                            v-else
                            type="text"
                            class="form-control"
                            id="strength"
                            style="
                              background-color: #a8eab8;
                              border-color: #a8eab8;
                            "
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="activeIngredient" class="form-label"
                            >Selling Unit</label
                          >
                          <div
                            class="btn-toolbar mb-1"
                            role="toolbar"
                            aria-label="Toolbar with button groups"
                            v-if="currentBasicUnit || currentUnits"
                          >
                            <div
                              class="btn-group"
                              role="group"
                              aria-label="First group"
                            >
                              <button
                                @click="sellingUnit = currentBasicUnit"
                                v-if="currentBasicUnit"
                                type="button"
                                class="btn btn-outline-dark"
                              >
                                {{ currentBasicUnit }}
                              </button>
                              <button
                                @click="sellingUnit = unit.name"
                                v-if="currentUnits"
                                type="button"
                                class="btn btn-outline-dark"
                                v-for="(unit, index) in currentUnits"
                                :key="index"
                              >
                                {{ unit.name }}
                              </button>
                            </div>
                          </div>
                          <input
                            v-else
                            type="text"
                            class="form-control"
                            id="strength"
                            style="
                              background-color: #a8eab8;
                              border-color: #a8eab8;
                            "
                            readonly
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center mt-3">
                <button
                  class="btn text-white"
                  style="background-color: #2fe159"
                  :disabled="!selectedProduct"
                  @click="matchProduct()"
                >
                  CONFIRM MATCH
                </button>
              </div>
              <div class="d-flex justify-content-center mt-2">
                <div class="me-3">
                  <p class="text-center">
                    Can't find a Matching Product? Send the
                    <span class="text-primary">product's name</span>,
                    <span class="text-primary">simplest unit</span> and a
                    <span class="text-primary"
                      >picture of the front and back</span
                    >
                    to WhatsApp no. <strong>0552587974</strong> (
                    <a
                      :href="`https://wa.me/233552587974?text=${encodeURIComponent(
                        `Hello, I want you to add ${selectedMatchProduct.productDescription} to the master list.`
                      )}`"
                      target="_blank"
                    >
                      Send Directly
                    </a>
                    )
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 mt-2 mb-sm-0 py-0">
        <div class="" style="height: 82vh">
          <div class="card-body">
            <div class="mt-1 table-responsive" style="max-height: 75vh">
              <table
                v-if="showMLTable"
                class="table table-hover table-responsive"
              >
                <thead class="thead-fixed">
                  <tr>
                    <th scope="col" class="text-capitalize col-5">
                      <div class="d-flex justify-content-start">
                        <span class="me-2 mt-2">Product name</span>
                        <div class="input-group w-50">
                          <input
                            ref="productRefineInput"
                            autofocus="autofocus"
                            @keyup.enter="searchMasterList2()"
                            v-model="searchRefineTerm"
                            type="text"
                            class="form-control"
                            placeholder="Refine Search"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </div>
                    </th>
                    <!-- <th scope="col" class="text-capitalize col-1">Strength</th> -->
                    <th scope="col" class="text-capitalize col-1 text-center">
                      Manufacturer
                    </th>
                    <th scope="col" class="text-capitalize col-2 text-center">
                      Active Ingredients
                    </th>
                    <!-- <th scope="col" class="text-capitalize col-2"></th> -->
                    <th scope="col" class="text-capitalize col-2 text-center">
                      Match Status
                    </th>
                  </tr>
                </thead>
                <tbody class="tbody-scrollable">
                  <!-- Loop through the products -->
              
                    <tr v-for="product in masterList"
                      :key="product.id"
                      class="align-middle"
                      @click="selectProduct(product)"
                      role="button"
                    >
                      <td>{{ product.name }}</td>
                      <td class="text-center">{{ product.manufacturer }}</td>
                      <td class="text-center">
                        {{ product.activeIngredient }}
                      </td>
                      <!-- <td>
                        <button class="btn btn-sm btn-outline-primary">
                          Details
                        </button>
                      </td> -->
                      <td class="text-center">
                        <div v-if="matchedIDs[product.id.toString()]">
                          Matched!<button
                            class="btn btn-sm btn-outline-primary"
                            @click.stop="findMatchedProducts(product)"
                          >
                            View
                          </button>
                        </div>
                        <div v-else>Unmatched</div>
                      </td>
                    </tr>
                    <tr v-if="isSelected(product)">
                      <td colspan="4">
                        Units:
                        <span v-if="productDetails[product.id.toString()]">
                          <span class="text-danger"
                            >{{ productDetails[product.id.toString()].basiunit
                            }}<span class="text-dark">{{
                              noUnits(
                                productDetails[product.id.toString()]
                                  .productunitCollection
                              )
                                ? ""
                                : " | "
                            }}</span></span
                          >
                          <span
                            v-for="(unit, index) in productDetails[
                              product.id.toString()
                            ].productunitCollection"
                            :key="unit.id"
                            class="text-danger"
                          >
                            {{ unit.name }} x {{ unit.noofunits
                            }}<span class="text-dark">{{
                              isLastUnit(
                                index,
                                productDetails[product.id.toString()]
                                  .productunitCollection
                              )
                                ? ""
                                : " | "
                            }}</span>
                          </span>
                        </span>
                      </td>
                    </tr>
                 
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="matchedModal"
        tabindex="-2"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div
            class="modal-content"
            style="background-color: rgb(221, 218, 218)"
          >
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel">
                View Matched Products
              </h4>
              <i
                data-bs-dismiss="modal"
                class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"
              ></i>
            </div>
            <div class="modal-body mt-0">
              <div class="row mt-3">
                <div class="col-sm-6">
                  <div class="card shadow-sm" style="border-radius: 20px">
                    <div class="card-body">
                      <h5>MASTER PRODUCT:</h5>
                      <form v-if="masterProduct">
                        <div class="mb-1">
                          <label for="productName" class="form-label"
                            >Product Name</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="productName"
                            v-model="masterProduct.name"
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="strength" class="form-label"
                            >Strength</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="strength"
                            v-model="masterProduct.strength"
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="manufacturer" class="form-label"
                            >Manufacturer</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="manufacturer"
                            v-model="masterProduct.manufacturer"
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="manufacturer" class="form-label"
                            >Active Ingredients</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="manufacturer"
                            v-model="masterProduct.activeIngredient"
                            readonly
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="card shadow-sm" style="border-radius: 20px">
                    <div class="card-body">
                      <h5>MATCHED TO:</h5>
                      <form v-if="localProduct">
                        <div class="mb-1">
                          <label for="productName" class="form-label"
                            >Product Name</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="productName"
                            v-model="localProduct.productDescription"
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="strength" class="form-label"
                            >Strength</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="strength"
                            v-model="localProduct.strength"
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="manufacturer" class="form-label"
                            >Manufacturer</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="manufacturer"
                            v-model="localProduct.manufacturer"
                            readonly
                          />
                        </div>
                        <div class="mb-1">
                          <label for="manufacturer" class="form-label"
                            >Active Ingredients</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="manufacturer"
                            v-model="localProduct.activeIngredient"
                            readonly
                          />
                        </div>
                      </form>
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
      showMLTable: true,
      newUnit: "",
      strengthML: "",
      unitML: "",
      buyingUnit: "",
      sellingUnit: "",

      searchItem: null,
      searchTerm: null,
      searchTermD: null,
      searchRefineTerm: null,
      selectedSearchTerm: null,
      searchTermID: null,
      selectedProduct: null,
      selectedProductID: null,
      masterName: null,
      masterStrength: null,
      selectedObject: null,

      productsInfor: [],
      productMatches: [],
      masterList: [],
      matchedProducts: [],

      enableStatus: "disabled",
      formData: {
        newProductName: "",
      },
      searchStart: false,

      matchedProducts: [],
      unmatchedProducts: [],

      requestedProduct: "",
      matchedProduct: "",
      matchedTo: null,

      selectedProducts: [],
      matchedIDs: {},
      masterProductInfo: null,
      currentBasicUnit: "",
      currentMultiplier: "",
      productDetails: {},
      currentUnits: null,

      masterProduct: {},
      localProduct: {},
      productIsSelected: {},
    };
  },
  props: {
    selectedMatchProduct: Object,
  },
  computed: {
    requiredMatches() {
      return this.$store.state.requiredMatches;
    },

    filteredBySearch() {
      return this.productHistoryData.filter((data) =>
        data.productName.includes(this.searchItem)
      );
    },
    salesProductSearchResults() {
      return this.$store.getters.salesProductSearchResults;
    },
    clearSearch() {
      if (this.$store.state.salesProductSearchTerm === "") {
        this.searchTerm = "";
      }
    },
  },

  async mounted() {
    // this.selectedProduct = this.selectedMatchProduct;
    $("#matchProduct").on("shown.bs.modal", () => {
      this.loadMatchedProducts();
      this.searchMasterList();
      this.searchRefineTerm = "";
      this.showMLTable = true;
      this.selectedProduct = "";
      this.currentBasicUnit = "";
      this.currentUnits = [];
      this.unitML = "";
      this.buyingUnit = "";
      this.sellingUnit = "";
    });
  },

  methods: {
    changeUnit() {
      this.unit = this.newUnit;
    },

    assignUnits(unit, multiplier) {
      this.unitML = unit;
      this.currentMultiplier = multiplier;
    },

    matchProduct() {
      let axios = this.$axios;
      let state = this.$store.state;
      let page = this;

      let data = {
        id: page.masterProductInfo,
        productid: page.selectedMatchProduct.id,
        multiplier: Number(page.currentMultiplier),
        masterunit: page.unitML,
        masterstrength: "",
      };

      console.log(data);

      // if (this.strength != this.strengthML) {
      //   alert(
      //     "The two products do not have matching strengths. Select Another product from the master list please."
      //   );
      //   return;
      // }
      let info =
        "Are you sure you want to match " +
        page.selectedMatchProduct.productDescription +
        " to " +
        page.selectedProduct +
        " ?";
      page.$store.commit("changeDialog", info);
      let func = {};
      func.yesfunc = async function () {
        try {
          page.$store.commit("changeDialog", "Please wait!");
          page.$store.commit("showWait");

          let matchCheck = await axios.post(
            state.urlBase + "rest/pro/assignpro/",
            data
          );

          setTimeout(() => {
            $("#waitdailog").modal("hide");
            setTimeout(() => {
              page.$store.commit("showMessage", matchCheck.data.message);
            }, 200);
          }, 500);
          $("#matchProduct").modal("hide");
        } catch (error) {
          console.log(error);
          this.error = error.message;
        }
      };

      this.$store.commit("OpenYesOrNOClick", func);
    },

    async selectMLProduct(product) {
      this.selectedProduct = product.productDescription;
      this.selectedProductID = product.id;

      this.sendProductSearch();

      this.showMLTable = false;
      this.searchTerm = "";
      this.strengthML = product.strength;
      //   this.unitML = product.unit;
      this.showTable = true;
      this.searchTermD = "";

      $("#searchFromMaster").modal("show");
    },

    async selectProduct(product) {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase +
            "rest/company/masterproductsingle/" +
            product.id
        );

        let resList = response.data.data;
        console.log(resList);
        this.masterProductInfo = resList[0];
        this.productDetails[product.id.toString()] = resList[0];
        this.currentBasicUnit = resList[0].basiunit;
        this.currentUnits = resList[0].productunitCollection;
      } catch (error) {
        this.error = error.message;
      }

      const index = this.selectedProducts.findIndex((p) => p.id === product.id);
      if (index === -1) {
        this.selectedProducts.push(product);
      }

      this.selectedProduct = product.name;
      this.selectedProductID = product.id;
      console.log(this.selectedProduct);
      // this.searchTermID = product.id;
      // this.strength = product.strength;
      // this.searchRefineTerm = "";
    },

    async sendProductSearch() {
      if (
        this.selectedMatchProduct &&
        this.selectedMatchProduct.productDescription.length >= 5
      ) {
        try {
          let searchTerm =
            this.selectedMatchProduct.productDescription.substring(0, 5); // Extract the first 5 characters
          let response = await this.$axios.get(
            this.$store.state.urlBase +
              process.env.NUXT_ENV_SEARCH_PRODUCT_API +
              searchTerm
          );

          let resList = response.data.data;
          console.log(resList);
          this.productsInfor = resList;
        } catch (error) {
          this.error = error.message;
        }
      }
    },
    async sendProductSearch2() {
      if (this.searchRefineTerm.length >= 3) {
        try {
          let response = await this.$axios.get(
            this.$store.state.urlBase +
              process.env.NUXT_ENV_SEARCH_PRODUCT_API +
              this.searchRefineTerm
          );

          let resList = response.data.data;
          console.log(resList);
          this.productsInfor = resList;
        } catch (error) {
          this.error = error.message;
        }
      }
    },

    async searchMasterList() {
      if (
        this.selectedMatchProduct &&
        this.selectedMatchProduct.productDescription.length >= 5
      ) {
        try {
          let searchTerm =
            this.selectedMatchProduct.productDescription.substring(0, 5); // Extract the first 5 characters
          let response = await this.$axios.get(
            this.$store.state.urlBase +
              "rest/company/masterproduct/" +
              searchTerm
          );

          let resList = response.data.data;
          console.log(resList);
          this.masterList = resList;
        } catch (error) {
          this.error = error.message;
        }
      }
    },

    async searchMasterList2() {
      console.log("logo");
      if (
        this.selectedMatchProduct &&
        this.selectedMatchProduct.productDescription.length >= 5
      ) {
        try {
          console.log(this.searchRefineTerm) // Extract the first 5 characters
          let response = await this.$axios.get(
            this.$store.state.urlBase +
              "rest/company/masterproduct/" +
              this.searchRefineTerm
          );

          let resList = response.data.data;
          console.log(resList);
          this.masterList = resList;
        } catch (error) {
          this.error = error.message;
        }
      }
    },

    isSelected(product) {
      return this.selectedProducts.some((p) => p.id === product.id);
    },

    findMatchedProducts(product) {
      $("#matchedModal").modal("show");
      this.masterProduct = product;

      for (let prod of this.matchedProducts) {
        if (Number(prod.uniqid) === Number(product.id)) {
          this.localProduct = prod;
        }
      }
    },

    async loadMatchedProducts() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + "rest/pro/producttransfer/matched"
        );

        let res = response.data.data;
        console.log(res);
        this.matchedProducts = res;

        for (let product of this.matchedProducts) {
          this.matchedIDs[product.uniqid.toString()] = true;
        }
        console.log(this.matchedIDs);
      } catch (error) {
        this.error = error.message;
      }
    },

    isLastUnit(index, unitCollection) {
      return index === unitCollection.length - 1;
    },

    noUnits(unitCollection) {
      if (unitCollection.length === 0) {
        return true;
      }
    },

    openAddProduct() {
      $("#addToMasterList").modal("show");
    },

    onSubmit() {
      console.log(this.formData);
    },
  },
};
</script>

<style>
input[type="file"]::file-selector-button {
  margin-right: 20px;
  border: none;
  background: #084cdf;
  padding: 5px 15px;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}

input[type="file"]::file-selector-button:hover {
  background: #0d45a5;
}

#formFile {
  width: 59em;
  border-radius: 3px;
}

.unit-input {
  border: 1px solid #ced4da;
  background-color: transparent;
  border-radius: 3px;
}

.unit-input:focus {
  border-radius: 3px;
}

.thead-fixed {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}

/* .tbody-scrollable {
  overflow-y: scroll;
  max-height: 80vh;
} */

.product-card {
  background-color: #ededed;
  border-radius: 20px;
  height: 100%;
}

.master-card {
  background-color: #a8eab8;
  border-radius: 20px;
  height: 100%;
}
</style>
