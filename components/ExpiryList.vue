<template>
  <div class="container-fluid">
    <div class="">
      <div>
        <div id="dateDiv">
          <div>
            <label for="">From: &nbsp;</label>
            <input id="dInpt" v-model="fdate" type="date" />
          </div>

          <div>
            <label for="">To: &nbsp;</label>
            <input id="dInpt" v-model="tdate" type="date" />
          </div>

          <div style="margin-right: 20px">
            <label for="">&nbsp;</label>
            <button id="sbtn" @click="dateFilter">Search</button>
          </div>

          <div>
            <button
              style="color: #fff"
              :class="[
                showstock
                  ? 'btn rounded-1 btn-success'
                  : 'btn rounded-1 btn-danger',
              ]"
              @click="changeShowstock"
            >
              {{
                showstock
                  ? "Showing All Expired Stock"
                  : "Showing Only Products In Stock"
              }}
            </button>
          </div>

          <div style="margin-right: 10px">
            <button
              class="btn rounded-1 btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#addProduct"
            >
              Add Product
            </button>
          </div>

          <div>
            <button
              style="padding-top: 0px; padding-bottom: 0px"
              data-bs-toggle="dropdown"
              class="btn rounded-1 btn-outline-danger d-flex align-items-center"
            >
              Download Expired Products
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
                  <li @click="downloadProductsFile('pdf')">
                    <span class="dropdown-item">pdf file</span>
                  </li>
                  <li @click="downloadProductsFile('pptx')">
                    <span class="dropdown-item">powerpoint file</span>
                  </li>
                  <li @click="downloadProductsFile('xlsx')">
                    <span class="dropdown-item">excel file</span>
                  </li>
                  <li @click="downloadProductsFile('docx')">
                    <span class="dropdown-item">word document</span>
                  </li>
                  <li @click="downloadProductsFile('csv')">
                    <span class="dropdown-item">csv file</span>
                  </li>
                </ul>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col">
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
            <div class="modal-dialog modal-lg">
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
          <th class="col fw-normal text-primary" scope="col">
            Product Description
          </th>
          <th class="col-1 fw-normal text-primary" scope="col">Unit</th>
          <th class="col fw-normal text-primary" scope="col">Supplier</th>
          <th class="col-1 fw-normal text-primary" scope="col">
            Stock Balance
          </th>
          <th class="col-1 fw-normal text-primary" scope="col">C. P</th>
          <th class="col-1 fw-normal text-primary" scope="col">S. P</th>
          <th class="col-1 fw-normal text-primary" scope="col">Expiry</th>
        </tr>
      </thead>

      <tbody v-if="this.serachedItems">
        <tr
          v-for="product in this.serachedItems"
          :key="product.id"
          @click="updatePdt(product)"
        >
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
      <div class="modal-dialog modal-lg">
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
            <!-- <h5 class="mt-2 mb-2 text-center col-12">{{currPdt.productDescription}}</h5> -->
            <!-- <ValidationObserver v-slot="{ handleSubmit }"> -->
            <!-- @submit.prevent="handleSubmit(onSubmit)" -->
            <form class="">
              <div class="">
                <label class="form-label" for="barcode">Product Barcode</label>
                <input
                  v-model="selectedProduct.barcode"
                  type="text"
                  id="barcode"
                  class="form-control"
                  placeholder="barcode"
                />
              </div>
              <ValidationProvider
                name="product name"
                rules=""
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="floatingInput"
                    >Product Name</label
                  >
                  <input
                    v-model="selectedProduct.productDescription"
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    :placeholder="currPdt.productDescription"
                  />
                </div>

                <div id="NewProductNameHelp" class="text-danger form-text mb-4">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>

              <ValidationProvider
                name="product strength"
                rules=""
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="floatingInput"
                    >Product Strength</label
                  >
                  <input
                    v-model="selectedProduct.strength"
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    :placeholder="currPdt.productDescription"
                  />
                </div>

                <div id="NewProductNameHelp" class="text-danger form-text mb-4">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>

              <ValidationProvider
                name="product expiry"
                rules=""
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="floatingInput"
                    >Product Expiry</label
                  >
                  <input
                    v-model="selectedProduct.productExpiry"
                    type="date"
                    @input="logDate1($event)"
                    class="form-control"
                  />
                </div>

                <div id="NewProductNameHelp" class="text-danger form-text mb-4">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>

              <ValidationProvider
                name="product unit"
                rules=""
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="floatingInput"
                    >Product Unit</label
                  >
                  <input
                    v-model="selectedProduct.unit"
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    :placeholder="currPdt.unit"
                  />
                </div>

                <div id="NewProductNameHelp" class="text-danger form-text mb-4">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>

              <ValidationProvider
                name="product stock balance"
                rules=""
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="floatingInput"
                    >Product Stock Balance</label
                  >
                  <input
                    type="number"
                    v-model="selectedProduct.stockQty"
                    class="form-control"
                    id="floatingInput"
                    :placeholder="currPdt.stockQty"
                  />
                </div>

                <div id="NewProductNameHelp" class="text-danger form-text mb-4">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>

              <ValidationProvider
                name="product cost price"
                rules=""
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="floatingInput"
                    >Cost Price</label
                  >
                  <input
                    type="text"
                    v-model="selectedProduct.costPrice"
                    class="form-control"
                    id="floatingInput"
                    :placeholder="currPdt.costPrice"
                  />
                </div>

                <div id="NewProductNameHelp" class="text-danger form-text mb-4">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>

              <ValidationProvider
                name="product selling price"
                rules=""
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="floatingInput"
                    >Selling Price</label
                  >
                  <input
                    type="text"
                    v-model="selectedProduct.sellingPrice"
                    class="form-control"
                    id="floatingInput"
                    :placeholder="currPdt.sellingPrice"
                  />
                </div>

                <div id="NewProductNameHelp" class="text-danger form-text mb-4">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>

              <!-- <ValidationProvider name="product supplier" rules="" v-slot="{  }">
                    <div class="d-flex justify-content-between">
                      <div class="col-5">
                        <label class="form-label" for="floatingInput">Supplier</label>
                        <input type="text" v-model="currPdt.supplier" class="form-control" id="floatingInput" :placeholder="currPdt.sellingPrice">
                      </div>

                      <div class="col-5">
                        <label class="form-label" for="floatingInput">Select New Supplier</label>
                        <div class="col-12 d-flex justify-content-between align-items-end">
                          <div class="col-12 align-items-end d-flex justify-content-between">
                            <select  v-model="filterBySupplier" class="form-select" aria-label="Default select example">
                              <option  v-for="supplier in supplierList" :key="supplier.supplierid" :value="supplier">{{supplier.name}}</option>
                            </select>
                            
                            <div @click="supplierFilter()" class="ms-4 btn btn-outline-primary">Update</div>
                          </div>
                    </div>
                      </div>
                    </div>

                   <div id="NewProductNameHelp" class="text-danger form-text mb-4">{{errors[0]}}</div>
                  
                  
                  
                  </ValidationProvider> -->

              <div class="d-flex mt-5 justify-content-center">
                <input
                  type="button"
                  @click="savePdt"
                  class="col-5 text-white btn btn-primary"
                  value="Update Product"
                />
              </div>
            </form>
            <!-- </ValidationObserver> -->
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
      fdate: "",
      tdate: "",
      showstock: true,
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
    };
  },

  methods: {
    changeShowstock() {
      this.showstock = !this.showstock;
      this.dateFilter();
    },
    async dateFilter() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase +
            "rest/pro/expired/" +
            this.showstock +
            "/" +
            encodeURIComponent(this.fdate) +
            "/" +
            encodeURIComponent(this.tdate)
        );

        let resList = response.data.data;
        console.log(response.data.data);
        // await this.$store.commit('setProducts', resList)

        this.searchDone = true;
        this.serachedItems = resList;
      } catch (error) {
        this.error = error.message;
        console.error(error);
      }
    },

    onSubmit() {
      // console.log(this.formData);
    },
    runCalc() {
      if (this.calcCost && this.calcMarkup) {
        let actualPdtMarkup = this.calcMarkup / 100;

        let SP = actualPdtMarkup * this.calcCost;
        let nSP = Number(this.calcCost) + SP;

        this.calcUnitPrice = nSP;
      }
    },
    async downloadProductsFile(type) {
      // a.invoiceid
      // a.supplierid
      var form = document.createElement("a");

      form.href =
        this.$store.state.urlBase +
        "expiredallproducts?" +
        "type=" +
        type +
        "&fdate=" +
        encodeURIComponent(this.fdate) +
        "&tdate=" +
        encodeURIComponent(this.tdate) +
        "&allow=" +
        encodeURIComponent(this.showstock);
      console.log(form.href);
      form.click();
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
    try {
      this.fetchSuppliers();
      const date = new Date();
      let year = date.toLocaleString("default", { year: "numeric" });
      let month = date.toLocaleString("default", { month: "2-digit" });
      let day = date.toLocaleString("default", { day: "2-digit" });

      this.fdate = year + "-" + month + "-" + day;
      let today = day + 30;
      if (today > 30) {
        month++;
        if (month < 10) {
          month = "0" + month++;
        }
        if (month > 12) {
          year++;
          month = "01";
        }
        // day=today-30
      }
      this.tdate = year + "-" + month + "-" + day;
      //  console.log(this.tdate)
      this.dateFilter();
    } catch (error) {
      this.error = error.message;
    }
  },
};
</script>

<style scoped>
#dateDiv {
  display: flex;
  justify-content: space-evenly;
  margin: 30px 0px;
}
</style>