<template>
  <div class="container-fluid mt-2">
    <!-- <SearchProductList/> -->
    <div class="">
      <div class="row mb-2">
        <div class="col-4"><h5>Inventory</h5></div>
        <div class="col-4">
          <div
            style="
              display: flex;
              justify-content: space-between;
              color: hsl(264, 39%, 51%);
            "
          >
            <p style="margin: auto 10px">
              Stock Value(ALL):
              <span style="font-size: medium; color: red">{{
                stockvalue.stockwithqty + stockvalue.stockwithoutqty
              }}</span>
            </p>
            <p style="margin: auto 10px">
              Stock Value(-ve):
              <span style="font-size: medium; color: red">{{
                stockvalue.stockwithoutqty
              }}</span>
            </p>
            <p style="margin: auto 10px">
              Stock Value(+ve):
              <span style="font-size: medium; color: red">{{
                stockvalue.stockwithqty
              }}</span>
            </p>
          </div>
        </div>
        <div class="col-4 d-flex justify-content-end">
          <BranchesDropDown />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <div class="col-4">
              <div class="input-group">
                <i
                  class="input-group-text bg-primary text-white bi bi-search"
                ></i>
                <input
                  autofocus="autofocus"
                  @keyup="
                    sendProductSearch();
                    toggleRequest();
                  "
                  @keyup.enter="
                    sendProductSearch2();
                    toggleRequest();
                  "
                  v-model="searchTerm"
                  type="text"
                  class="form-control me-3"
                  placeholder="Search for product here"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />

                <!-- <button :class="enableStatus" class="btn rounded-1 btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal3">Request New Product</button> -->
              </div>
            </div>

            <div class="col-4 d-flex justify-content-between">
              <button
                class="btn rounded btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#addProduct"
              >
                Add Product
              </button>

              <button
                data-bs-toggle="dropdown"
                class="btn rounded btn-outline-danger d-flex align-items-center"
              >
                Download Product List

                <div class="dropdown">
                  <button
                    class="btn btn-sm bi bi-download"
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
                    <li @click="downloadprodutsFile('pdf')">
                      <span class="dropdown-item">pdf file</span>
                    </li>
                    <li @click="downloadprodutsFile('pptx')">
                      <span class="dropdown-item">powerpoint file</span>
                    </li>
                    <li @click="downloadprodutsFile('xlsx')">
                      <span class="dropdown-item">excel file</span>
                    </li>
                    <li @click="downloadprodutsFile('docx')">
                      <span class="dropdown-item">word document</span>
                    </li>
                    <li @click="downloadprodutsFile('csv')">
                      <span class="dropdown-item">csv file</span>
                    </li>
                  </ul>
                </div>
              </button>
            </div>
          </div>

          <div class="mb-2 ps-4 ms-3">
            <div v-if="searchTerm">
              <div v-if="!productsInfor">
                <p class="text-danger form-text">
                  Product not found. Please search for another medication or
                  enter full name of product and request.
                </p>
              </div>
            </div>
          </div>

          <!-- Request New Product Modal -->
          <div
            class="modal fade"
            id="exampleModal3"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Request New Product
                  </h5>
                  <i
                    data-bs-dismiss="modal"
                    class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"
                  ></i>
                  <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                </div>
                <div class="modal-body">
                  <ValidationObserver v-slot="{ handleSubmit }">
                    <form class="" @submit.prevent="handleSubmit(onSubmit)">
                      <ValidationProvider
                        name="new product's name"
                        rules="required|alpha|min4:4"
                        v-slot="{ errors }"
                      >
                        <div class="">
                          <label class="form-label" for="floatingInput"
                            >New Product Name</label
                          >
                          <input
                            v-model="formData.newProductName"
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="Eg. New pain killer"
                          />
                        </div>

                        <div
                          id="NewProductNameHelp"
                          class="text-danger form-text mb-4"
                        >
                          {{ errors[0] }}
                        </div>
                      </ValidationProvider>

                      <div class="d-flex mt-2 justify-content-center">
                        <input
                          type="submit"
                          class="col-5 text-white btn btn-primary"
                          value="Submit Request For New Product"
                        />
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
              </div>
            </div>
          </div>

          <!-- Add new product modal -->
          <div
            class="modal fade"
            id="addProduct"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Add New Product
                  </h5>
                  <i
                    data-bs-dismiss="modal"
                    class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"
                  ></i>
                  <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                </div>
                <div class="modal-body">
                  <AddProductForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th style="40%" class="fw-normal text-primary" scope="col">
            Product Description
          </th>
          <th style="10%" class="fw-normal text-primary" scope="col">Unit</th>
          <th style="10%" class="fw-normal text-primary" scope="col">
            Supplier
          </th>
          <th style="10%" class="fw-normal text-primary" scope="col">
            Stock Balance
          </th>
          <th style="10%" class="fw-normal text-primary" scope="col">C. P</th>
          <th style="10%" class="fw-normal text-primary" scope="col">S. P</th>
          <th style="10%" class="fw-normal text-primary" scope="col">Expiry</th>
          <th style="10%" class="fw-normal text-primary" scope="col">Edit</th>
        </tr>
      </thead>

      <tbody v-if="this.serachedItems">
        <tr v-for="product in this.serachedItems" :key="product.id">
          <td class="text-capitalize">
            <div class="d-flex justify-content-between align-items-baseline">
              <span v-if="editPdtState === false" class="">
                {{ product.productDescription }}
              </span>
              <div v-else class="">
                <!-- <label class="form-label" for="floatingInput">First Name</label> -->
                <input
                  type="text"
                  class="form-control"
                  @keyup="editPdt($event, product, 'name')"
                  id="floatingInput"
                  :placeholder="product.productDescription"
                />
              </div>
              <!-- <span @click="activateEdit" class="btn btn-sm btn-outline-primary small me-3">
                Edit
              </span> -->
            </div>
          </td>
          <td class="text-capitalize">{{ product.unit }}</td>
          <td>{{ product.supplier }}</td>
          <td>
            <!-- {{product.stockQty}} -->
            <div class="d-flex justify-content-between align-items-baseline">
              <span v-if="editStock === false" class="">
                {{ product.stockQty }}
              </span>
              <div v-else class="">
                <!-- <label class="form-label" for="floatingInput">First Name</label> -->
                <input
                  type="text"
                  class="form-control"
                  @keyup="editPdt($event, product, 'sb')"
                  id="floatingInput"
                  :placeholder="product.stockQty"
                />
              </div>
              <!-- <span @click="activateEditStockQty" class="btn btn-sm btn-outline-primary small me-3">
                Edit
              </span> -->
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-between align-items-baseline">
              <span v-if="editCP === false" class="">
                {{ product.costPrice }}
              </span>
              <div v-else class="">
                <!-- <label class="form-label" for="floatingInput">First Name</label> -->
                <input
                  type="text"
                  @keyup="editPdt($event, product, 'cp')"
                  class="form-control"
                  id="floatingInput"
                  :placeholder="product.costPrice"
                />
              </div>
              <!-- <span @click="activateEditCP" class="btn btn-sm btn-outline-primary small me-3">
                Edit
              </span> -->
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-between align-items-baseline">
              <span v-if="editSP === false" class="">
                {{ product.sellingPrice }}
              </span>
              <div v-else class="">
                <!-- <label class="form-label" for="floatingInput">First Name</label> -->
                <input
                  type="text"
                  class="form-control"
                  @keyup="editPdt($event, product, 'sp')"
                  id="floatingInput"
                  :placeholder="product.sellingPrice"
                />
              </div>
              <!-- <span @click="activateEditSP" class="btn btn-sm btn-outline-primary small me-3">
                Edit
              </span> -->
            </div>
          </td>
          <td>{{ product.productExpiry }}</td>

          <td @click="updatePdt(product)">
            <input
              type="button"
              class="text-white btn btn-primary"
              value="Edit"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Product Modal -->
    <div
      class="modal fade"
      id="editPdtModal1"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>

            <i
              data-bs-dismiss="modal"
              class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"
            ></i>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
          </div>
          <div class="modal-body">
            <EditProduct :selectedProduct="selectedProduct" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BranchesDropDown from "./UtilityComps/BranchesDropDown.vue";

export default {
  components: {
    BranchesDropDown,
  },
  data() {
    return {
      //product class
      prodClasses: ["Drug", "Antihistamine", "Antihypertensive"],
      selectedProdClass: [],
      newClass: "",

      //supplier dropdown
      isDropdownOpen: false,
      selectedOption: null,
      options: ["Option 1", "Option 2", "Option 3"],
      selectedClass: null,

      toggleMore: false,
      editPdtState: false,
      editSP: false,
      editCP: false,
      editStock: false,
      editExp: false,

      // currPdt: {},
      newSupplier: "",
      filterBySupplier: null,
      selectedProduct: {},
      serachedItems: [],
      searchTerm: "",
      enableStatus: "disabled",
      formData: {
        newProductName: "",
      },
      calcCost: 0,
      calcMarkup: 0,
      calcUnitPrice: 0,
      stockvalue: {
        stockwithoutqty: 0,
        stockwithqty: 0,
      },
    };
  },

  methods: {
    truncateText(text) {
      if (text.length > 16) {
        return `${text.slice(0, 16)}...`;
      } else {
        return text;
      }
    },

    addItem() {
      this.prodClasses.push(this.newClass);
      this.newClass = "";
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
    },

    async sendProductSearch() {
      // console.log(ProductList)
      if (this.searchTerm.length >= 3) {
        try {
          let response = await this.$axios.get(
            this.$store.state.urlBase +
              process.env.NUXT_ENV_SEARCH_PRODUCT_API +
              this.searchTerm
          );

          let resList = response.data.data;
          // console.log(response.data.data);
          // await this.$store.commit('setProducts', resList)

          this.searchDone = true;
          this.serachedItems = resList;
        } catch (error) {
          this.error = error.message;
          console.error(error);
        }
      }
    },
    async sendProductSearch2() {
      if (this.searchTerm.length >= 1) {
        try {
          let response = await this.$axios.get(
            this.$store.state.urlBase +
              process.env.NUXT_ENV_SEARCH_PRODUCT_API +
              this.searchTerm
          );

          let resList = response.data.data;
          // console.log(response.data.data);
          await this.$store.commit("setProducts", resList);

          this.searchDone = true;
        } catch (error) {
          this.error = error.message;
        }
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
    runCalc() {
      if (this.calcCost && this.calcMarkup) {
        let actualPdtMarkup = this.calcMarkup / 100;

        let SP = actualPdtMarkup * this.calcCost;
        let nSP = Number(this.calcCost) + SP;

        this.calcUnitPrice = nSP;
      }
    },
    async downloadProductsFile(type, a) {
      // a.invoiceid
      // a.supplierid
      var form = document.createElement("a");

      form.href =
        this.$store.state.urlBase +
        process.env.NUXT_ENV_DOWNLOAD_ALL_PRODUCTS +
        "type=" +
        type;
      form.click();
    },
    async downloadprodutsFile(type) {
      try {
        var form = document.createElement("a");

        form.href = this.$store.state.urlBase + "allproducts?" + "type=" + type;
        form.click();
      } catch (err) {}
    },

    async currPdt() {
      let d = await this.$store.state.updatedPdt;
      return d;
    },
    async supplierFilter() {
      if (this.filterBySupplier == null) {
        console.log("No supplier selected");
      } else {
        let selectedSupplier = this.filterBySupplier;
        console.log(selectedSupplier);
        // this.currPdt = selectedSupplier.name
        // console.log(this.currPdt);

        await this.$store.commit("setSelectedSupplierProd", selectedSupplier);
        // let filteredList = this.pendingPayments.filter( supplier => supplier.name === selectedSupplier )
        // this.pendingPayments = filteredList
      }
    },
    logDate1(event) {
      let val = event.target.value;
      // val = val + '-01'

      let newproductExpiry = val;
      this.$store.commit("logDate1", newproductExpiry);
    },
    activateEdit() {
      this.editPdtState = !this.editPdtState;
      console.log(this.editPdtState);
    },
    activateEditSP() {
      this.editSP = !this.editSP;
      console.log(this.editSP);
    },
    activateEditCP() {
      this.editCP = !this.editCP;
      console.log(this.editCP);
    },
    activateEditStockQty() {
      this.editStock = !this.editStock;
      console.log(this.editStock);
    },
    activateEditExp() {
      this.editExp = !this.editExp;
      console.log(this.editExp);
    },
    sendPdtEdit() {
      console.log("Save Product");
    },
    editPdt(event, product, attr) {
      let change = event.target.value;
      this.$store.commit("editPdt", [product, change, attr]);
    },
    savePdt() {
      // console.log(this.$store)
      this.$store.commit("changeDialog", "Done");
      this.$store.commit("savePdt", this.selectedProduct);
    },
    async updatePdt(product) {
      this.selectedProduct = product;
      console.log(this.selectedProduct);
      // this.$store.commit("updatePdt", product)
      // data-bs-toggle="modal" data-bs-target="#editPdtModal1" role="button"
      $("#editPdtModal1").modal("show");
    },
    async fetchSuppliers() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + process.env.NUXT_ENV_SUPPLIER
        );
        let suppliers = response.data.data;
        this.$store.commit("setSuppliers", suppliers);
      } catch (error) {
        this.error = error.message;
      }
    },
    async getstockValue() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + "rest/pro/stockvalue"
        );
        let sdata = response.data.data;
        console.log("stock ");

        this.stockvalue = sdata[0];
        console.log(this.stockvalue);

        // this.$store.commit('setSuppliers', suppliers)
      } catch (error) {
        this.error = error.message;
      }
    },
  },
  computed: {
    productSearchResults() {
      return this.$store.getters.productSearchResults;
    },
    productsInfor() {
      return this.$store.state.productsInfor;
    },

    productSearchResults() {
      return this.$store.getters.productSearchResults;
    },

    allProductsInfor() {
      return this.$store.state.allProductsInfor;
    },
    supplierList() {
      return Object.keys(this.$store.state.suppliersList).map((k) => {
        let o = this.$store.state.suppliersList[k];
        console.log(o);
        return o;
      });
    },
  },
  async mounted() {
    this.fetchSuppliers();

    try {
      this.getstockValue();
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
button {
  color: #3700ff;
  background-color: transparent;
  /* padding: 0.5rem; */
  border: none;
  border-radius: 10px;
  margin-left: 10px;
  font-size: normal;
  border: 1px solid #3700ff;
  font-size: 0.9rem;
}

button.on {
  color: #ec1b1b;
  background-color: transparent;
  border: 1px solid #ec1b1b;
}

.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown .btn {
  background-color: #ffffff;
  color: #333333;
  /* padding: 0.5rem; */
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  list-style: none;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
  border: 1px solid #cccccc;
}
.dropdown-menu li {
  /* padding: 8px 16px; */
  cursor: pointer;
}
.dropdown-menu li:hover {
  background-color: #f2f2f2;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  grid-auto-rows: minmax(40px, auto);
}
.roleCon {
  display: flex;
  margin: 10px;
  justify-content: space-evenly;
}

#dateBkg {
  background-color: #b8b8b831;
  border: 1px solid #3030302c;
  border-radius: 8px;
}

#dateBkg:focus {
  background-color: #b8b8b831;
  border-radius: 10px;
}

.formCon {
  border-radius: 10px;
  background-color: #b8b8b831;
}
.tableColumn {
  width: 20%;
}
</style>
