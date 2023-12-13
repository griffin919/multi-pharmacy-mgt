<template>
  <div class="">
    <div class="row">
      <div class="col">
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
                We could not find product. Please search for another product.
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
                    <th scope="col" class="text-capitalize col-1">Unit</th>
                    <th scope="col" class="text-capitalize col-1">Qty</th>
                    <!-- <th scope="col" class="text-capitalize col-2"></th> -->
                  </tr>
                </thead>
                <tbody>
                  <!-- @click="requestQty(product.id)" -->
                  <tr
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
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      enableStatus: "disabled",
      formData: {
        newProductName: "",
      },
      searchStart: false,
    };
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
  },
};
</script>

<style></style>
