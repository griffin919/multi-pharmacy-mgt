<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="" @submit.prevent="handleSubmit(createExpense)">
        <table class="table">
          <thead>
            <tr>
              <th
                style="width: 20%"
                class="col-1 fw-normal text-primary"
                scope="col"
              >
                Expense Description
              </th>
              <th class="col-1 fw-normal text-primary" scope="col">
                Service Provider/Payee
              </th>
              <th class="col-1 fw-normal text-primary" scope="col">
                Receipt Details
              </th>
              <th class="col-1 fw-normal text-primary" scope="col">
                Expense Cost (GHS)
              </th>
              <th class="col-1 fw-normal text-primary" scope="col">
                Expense Date
              </th>
              <th class="col-1 fw-normal text-primary" scope="col">
                Expense Catergory
              </th>
            </tr>
          </thead>

          <tbody>
            <tr style="padding-top: 20px">
              <td>
                <ValidationProvider
                  name="product description"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="">
                    <input
                      v-model="formData.description"
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder=""
                    />
                  </div>

                  <div
                    id="ProductDescriptionHelp"
                    class="text-danger form-text mb-4"
                  >
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </td>

              <td>
                <ValidationProvider
                  class=""
                  name="product unit"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="">
                    <select
                      v-model="formData.payee"
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <!-- <option   v-for="supplier in supplierList" :key="supplier.supplierid" :value="supplier.id">{{supplier}}</option> -->
                      <option v-for="payee in payees" :key="payee.id">
                        {{ payee.name }}
                      </option>
                    </select>
                  </div>

                  <div id="ProductUnitHelp" class="text-danger form-text mb-4">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </td>

              <td>
                <ValidationProvider
                  class=""
                  name="product's strength"
                  rules=""
                  v-slot="{ errors }"
                >
                  <div class="">
                    <input
                      v-model="formData.details"
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder=""
                    />
                  </div>

                  <div
                    id="ProductStrengthHelp"
                    class="text-danger form-text mb-4"
                  >
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </td>

              <td>
                <ValidationProvider
                  class="col-6"
                  name="product's cost price"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="">
                    <input
                      v-model="formData.cost"
                      type="number"
                      step="0.01"
                      class="form-control"
                      id="floatingInput"
                      placeholder="1.00"
                    />
                  </div>

                  <div
                    id="ProductCostPriceHelp"
                    class="text-danger form-text mb-4"
                  >
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </td>

              <td>
                <ValidationProvider
                  class="col-6"
                  name="product's stock balance"
                  rules=""
                  v-slot="{ errors }"
                >
                  <div class="">
                    <input
                      v-model="formData.edate"
                      type="date"
                      class="form-control"
                      id="floatingInput"
                      placeholder=""
                    />
                  </div>

                  <div
                    id="ProductStockBalanceHelp"
                    class="text-danger form-text mb-4"
                  >
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </td>

              <td>
                <ValidationProvider
                  name="expense catergory"
                  rules=""
                  v-slot="{ errors }"
                >
                  <div class="">
                    <select
                      v-model="formData.cat"
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <!-- <option   v-for="supplier in supplierList" :key="supplier.supplierid" :value="supplier.id">{{supplier}}</option> -->
                      <option v-for="category in categories" :key="category.id">
                        {{ category.name }}
                      </option>
                    </select>
                  </div>

                  <div id="SupplierNameHelp" class="text-danger form-text mb-4">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="row"></div>

        <div class="row"></div>

        <div class="d-flex mt-2 justify-content-center">
          <!-- <input type="submit" class="col-5 text-white btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmProductSave" value="Add New Product"> -->
          <input
            @click="handleSubmit(createExpense)"
            type="submit"
            class="col-5 text-white btn btn-primary"
            value="Add New Expense"
          />
        </div>
      </form>

      <!-- Save product notification -->
      <div
        class="modal fade"
        id="confirmProductSave"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Product saved.</h5>
              <button
                type="button"
                class="btn btn-sm btn-success text-white"
                data-bs-dismiss="modal"
                aria-label=""
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  props: {
    expensesm: [],
  },
  data() {
    return {
      formData: {
        description: "",
        payee: "",
        details: "",
        cost: null,
        cat: "",
        edate: "",
        // userid: 0,
      },
      payees: [],
      categories: [],
    };
  },
  methods: {
    async createExpense() {
      let axios = this.$axios;
      let state = this.$store.state;

      let page = this;
      let info =
        "Are you sure you want to add " + this.formData.description + " ?";
      this.$store.commit("changeDialog", info);
      let func = {};
      func.yesfunc = async function () {
        try {
          page.$store.commit("changeDialog", "Please wait!");
          page.$store.commit("showWait");
          let response = await axios.post(
            state.urlBase + process.env.NUXT_ENV_ADD_EXPENSE,
            page.formData
          );
          let data = response.data;

          var expData = Object.assign({}, page.formData);
          expData.id = data.data;
          // await this.$store.commit('updateExpensesList', data.data)
          // console.log(data);

          if (data.sucessful) {
            page.expensesm.unshift(expData);

            page.formData.description = "";
            page.formData.payee = "";
            page.formData.details = "";
            page.formData.cost = 0;
            page.formData.cat = "";
            page.formData.edate = "";
          }

          $("#addexpensedialog").modal("hide");

          setTimeout(() => {
            $("#waitdailog").modal("hide");
            setTimeout(() => {
              page.$store.commit("showMessage", data.message);
            }, 200);
          }, 500);
          //
        } catch (error) {
          console.log(error);
          this.error = error.message;
        }
      };

      this.$store.commit("OpenYesOrNOClick", func);
    },
    //============Load Payees================//
    async loadPayees() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + "rest/allset/loadall/7"
        );

        this.payees = response.data.data;
        // console.log(this.shelves);
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },

    //============Load Category================//
    async loadCategory() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + "rest/allset/loadall/4"
        );

        this.categories = response.data.data;
        console.log(this.categories);
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    logDate2(event) {
      let val = event.target.value;
      // console.log(val);
      // val = val+'-01'
      // val = val + '-01'
      this.formData.productExpiry = val;
    },
  },
  computed: {},
  mounted() {
    this.loadCategory();
    this.loadPayees();
  },
};
</script>

<style></style>
