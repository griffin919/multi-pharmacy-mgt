<template>
  <div class="">
    <div class="row">
      <div class="col">
        <div class="input-group mb-1">
          <i class="input-group-text bg-primary text-white bi bi-search"></i>

          <input
            autofocus="autofocus"
            v-model="searchTerm"
            type="text"
            class="form-control me-3"
            placeholder="Search for product here"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div class="mb- ps-4 ms-3">
          <div v-if="searchTerm">
            <div v-if="!productsInfor">
              <p class="text-danger form-text">
                Product not found. Please search for another medication or enter
                full name of product and request.
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
</template>

<script>
import "boxicons";

export default {
  data() {
    return {
      searchTerm: "",
      enableStatus: "disabled",
      formData: {
        newProductName: "",
      },
    };
  },
  computed: {
    productSearchResults() {
      return this.$store.getters.productSearchResults;
    },
    productsInfor() {
      return this.$store.state.productsInfor;
    },
  },
  methods: {
    async sendProductSearch() {
      if (this.searchTerm.length >= 3) {
        try {
          let response = await this.$axios.get(
            this.$store.state.urlBase +
              process.env.NUXT_ENV_SEARCH_PRODUCT_API +
              this.searchTerm
          );

          let resList = response.data.data;
          console.log(response.data.data);
          await this.$store.commit("setProducts", resList);

          this.searchDone = true;
        } catch (error) {
          this.error = error.message;
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
          console.log(response.data.data);
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
  },
  onSubmit() {
    console.log(this.formData);
  },
};
</script>

<style></style>
