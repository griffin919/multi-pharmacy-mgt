<template>
  <div class="container-fluid">
    <!-- <SearchProductList/> -->

    <div class="">
      <div class="m-2">
        <div class="d-flex justify-content-between">
          <div>
            <h3 style="text-align: left">Expenses</h3>
          </div>
          <!-- class="border shadow-sm d-flex col-3 justify-content-around p-1" -->
          <div style="margin-left: 100px">
            <span class="ms-1 text-center d-flex">
              <span class="fw-bold"> Total Expense Amount:</span>
              <br />
              <span class="fw-bold text-info">
                <span> {{ totalExpense.toLocaleString() }} </span>
              </span>
            </span>
          </div>
          <div class="">
            <span
              style="
                height: 30px;
                vertical-align: middle;
                margin-right: 30px;
                background: hsl(264, 39%, 51%);
                font-size: 0.8rem;
              "
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addexpensedialog"
              >New Expense</span
            >
          </div>
        </div>
        <div class="">
          <div class="expCon">
            <div class="filCon">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    type="button"
                    style="font-size: 0.7rem"
                  >
                    Category
                  </button>
                </div>
                <select
                  class="custom-select"
                  id="inputGroupSelect03"
                  v-model="filterByCategory"
                >
                  <option
                    v-for="(category, index) in categories"
                    :key="index"
                    :value="category"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="input-group ml-3">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    type="button"
                    style="font-size: 0.7rem"
                  >
                    Payee/Service Provider
                  </button>
                </div>
                <select
                  class="custom-select"
                  id="inputGroupSelect03"
                  v-model="filterByPayee"
                >
                  <option
                    v-for="(payee, index) in payees"
                    :key="index"
                    :value="payee"
                  >
                    {{ payee }}
                  </option>
                </select>
              </div>
            </div>

            <div class="fCon">
              <div class="d-flex align-items-center">
                <div>
                  <label for="">From: &nbsp;</label>
                </div>
                <div>
                  <input
                    class="form-control rounded"
                    id="dInpt"
                    v-model="fdate"
                    type="date"
                    style="font-size: 0.8rem"
                  />
                </div>
              </div>

              <div class="d-flex align-items-center">
                <div>
                  <label for="">&nbsp;To: &nbsp;</label>
                </div>
                <div>
                  <input
                    class="form-control rounded"
                    id="dInpt"
                    v-model="tdate"
                    type="date"
                    style="font-size: 0.8rem"
                  />
                </div>
              </div>

              <div>
                <button
                  class="btn btn-search btn-sm"
                  style="background: hsl(264, 39%, 51%)"
                  @click="dateFilter"
                >
                  <i style="color: #fff" class="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th class="col fw-normal text-primary" scope="col">
                  Expense Description
                </th>
                <th class="col fw-normal text-primary" scope="col">
                  Expense Catergory
                </th>
                <th class="col fw-normal text-primary" scope="col">
                  Expense Amount(GHS)
                </th>
                <th class="col fw-normal text-primary" scope="col">
                  Service Provider/Payee
                </th>
                <th class="col fw-normal text-primary" scope="col">
                  Expense Details
                </th>
                <th class="col fw-normal text-primary" scope="col">Date</th>
                <th class="col fw-normal text-primary" scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="expense in filteredExpensesm" :key="expense.id">
                <td>{{ expense.description }}</td>
                <td>{{ expense.cat }}</td>
                <td>{{ expense.cost }}</td>
                <td>{{ expense.payee }}</td>
                <td>{{ expense.details }}</td>
                <td>{{ expense.edate }}</td>
                <td>
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Action
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <span
                          @click="editExpense(expense)"
                          class="dropdown-item"
                          >Edit</span
                        >
                      </li>
                      <li>
                        <span
                          class="dropdown-item"
                          @click="deleteExpense(expense)"
                          >Delete</span
                        >
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div>
      <!-- ADD EXPENSE -->
      <div
        class="modal fade"
        id="addexpensedialog"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add New Expense
              </h5>
              <i
                data-bs-dismiss="modal"
                class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"
              ></i>
              <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            </div>
            <div class="modal-body">
              <AddExpenseForm :expensesm="expensesm" />
            </div>
          </div>
        </div>
      </div>

      <!-- Edit expense -->
      <div
        class="modal fade"
        id="editExpense"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Expense</h5>
              <i
                data-bs-dismiss="modal"
                class="bi btn btn-sm text-danger fs-4 bi-x-square-fill"
              ></i>
              <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            </div>
            <div class="modal-body">
              <ValidationObserver v-slot="{ handleSubmit }">
                <form class="" @submit.prevent="handleSubmit(updateExpense)">
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
                            name="expense description"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div class="">
                              <input
                                v-model="selectedExpense.description"
                                type="text"
                                class="form-control"
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
                            name="Service Provider/Payee"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div class="">
                              <input
                                v-model="selectedExpense.payee"
                                type="text"
                                class="form-control"
                                placeholder=""
                              />
                            </div>

                            <div
                              id="ProductUnitHelp"
                              class="text-danger form-text mb-4"
                            >
                              {{ errors[0] }}
                            </div>
                          </ValidationProvider>
                        </td>

                        <td>
                          <ValidationProvider
                            class=""
                            name="expense details"
                            rules=""
                            v-slot="{ errors }"
                          >
                            <div class="">
                              <input
                                v-model="selectedExpense.details"
                                type="text"
                                class="form-control"
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
                            name="cost of expense"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <div class="">
                              <input
                                v-model="selectedExpense.cost"
                                type="number"
                                step="0.01"
                                class="form-control"
                                placeholder=""
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
                            name="expense Date"
                            rules=""
                            v-slot="{ errors }"
                          >
                            <div class="">
                              <input
                                type="date"
                                class="form-control"
                                v-model="selectedExpense.edate"
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
                                v-model="selectedExpense.cat"
                                class="form-select"
                                aria-label="Default select example"
                              >
                                <option
                                  v-for="category in categories"
                                  :key="category.id"
                                >
                                  {{ category.name }}
                                </option>
                              </select>
                            </div>

                            <div
                              id="SupplierNameHelp"
                              class="text-danger form-text mb-4"
                            >
                              {{ errors[0] }}
                            </div>
                          </ValidationProvider>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div class="d-flex mt-2 justify-content-center">
                    <input
                      type="submit"
                      class="col-5 text-white btn btn-primary"
                      value="Update Expense"
                      @click="handleSubmit(updateExpense)"
                    />
                  </div>
                </form>
              </ValidationObserver>
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
      editPdtState: false,
      editSP: false,
      tdate: "",
      fdate: "",
      edate: "",
      selectedExpense: {},
      receivedExpensesm: [],
      expensesm: [],
      categoryFilteredData: [],
      payeeFilteredData: [],
      selectedExpenseholder: {},

      filterByCategory: "All",
      filterByPayee: "All",

      categories: [],
    };
  },
  methods: {
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
    editExpense(expense) {
      this.selectedExpense = expense;
      // console.log(expense)
      var expData = Object.assign({}, expense);
      this.selectedExpenseholder = expData;
      $("#editExpense").modal("show");
    },
    submitEditExpense() {
      // handleSubmit(submitProduct)
    },

    activateEdit() {
      console.log(this.editPdtState);
      this.editPdtState = !this.editPdtState;
    },
    activateEditSP() {
      console.log(this.editSP);
      this.editSP = !this.editSP;
    },

    async dateFilter() {
      try {
        // console.log(this.fdate)
        // console.log(this.tdate)
        let response = await this.$axios.get(
          this.$store.state.urlBase +
            "rest/exp/exp/" +
            encodeURIComponent(this.fdate) +
            "/" +
            encodeURIComponent(this.tdate)
        );
        let data = response.data.sucessful;
        console.log(response.data.data);
        if (data) {
          //  this.$store.commit('updateExpensesList',response.data.data)
          this.expensesm = response.data.data;
          this.receivedExpensesm = response.data.data;
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    loadOldExpense() {
      try {
        for (var i in this.selectedExpenseholder) {
          // console.log(i+"    ===  "+this.selectedExpenseholder[i])
          this.selectedExpense[i] = this.selectedExpenseholder[i];
        }
      } catch (error) {
        console.log(error);
        this.error = error.message;
      }
    },

    async updateExpense() {
      let axios = this.$axios;
      let state = this.$store.state;
      let item = this.selectedExpense;
      let page = this;
      let info =
        "Are you sure you want to update " +
        this.selectedExpenseholder.description +
        " ?";
      this.$store.commit("changeDialog", info);
      let func = {};
      func.yesfunc = async function () {
        try {
          // $("#waitdailog").modal('show')
          page.$store.commit("changeDialog", "Please wait!");
          page.$store.commit("showWait");
          let response = await axios.post(
            state.urlBase + process.env.NUXT_ENV_UPDATE_EXPENSE,
            item
          );
          let data = response.data;

          await $("#editExpense").modal("hide");
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

      func.nofunc = async function () {};

      this.$store.commit("OpenYesOrNOClick", func);
    },
    async deleteExpense(expense) {
      let axios = this.$axios;
      let state = this.$store.state;

      let page = this;
      let info =
        "Are you sure you want to delete " + expense.description + " ?";
      this.$store.commit("changeDialog", info);
      let func = {};
      func.yesfunc = async function () {
        try {
          page.$store.commit("changeDialog", "Please wait!");
          page.$store.commit("showWait");

          let response = await axios.post(
            state.urlBase +
              process.env.NUXT_ENV_DELETE_EXPENSE +
              "/" +
              expense.id
          );
          let data = response.data;

          page.expensesm.splice(expense, 1);
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
  },
  computed: {
    filteredExpensesm() {
      if (this.filterByCategory === "All" && this.filterByPayee === "All") {
        // If both "All" options are selected, return all payments
        return this.expensesm;
      }

      return this.expensesm.filter((expense) => {
        // Check both filters
        const categoryFilter =
          this.filterByCategory === "All" ||
          expense.cat === this.filterByCategory;
        const payeeFilter =
          this.filterByPayee === "All" || expense.payee === this.filterByPayee;
        return categoryFilter && payeeFilter;
      });
    },
    payees() {
      const payeeList = new Set(["All"]);
      this.expensesm.forEach((expense) => {
        payeeList.add(expense.payee);
      });
      return Array.from(payeeList);
    },

    categories() {
      const categoryList = new Set(["All"]);
      this.expensesm.forEach((expense) => {
        categoryList.add(expense.cat);
      });
      return Array.from(categoryList);
    },

    productSearchResults() {
      return this.$store.getters.productSearchResults;
    },
    productsInfor() {
      return this.$store.state.productsInfor;
    },
    allProductsInfor() {
      return this.$store.state.allProductsInfor;
    },
    totalExpense() {
      let total = 0;
      for (let expense of this.filteredExpensesm) {
        total += Number(expense.cost);
      }
      return total;
    },
  },

  async mounted() {
    try {
      const date = new Date();
      const year = date.toLocaleString("default", { year: "numeric" });
      const month = date.toLocaleString("default", { month: "2-digit" });
      const day = date.toLocaleString("default", { day: "2-digit" });

      this.tdate = year + "-" + month + "-" + day;
      this.fdate = year + "-" + month + "-" + day;
      this.dateFilter();
      this.loadCategory();
    } catch (error) {
      this.error = error.message;
    }
  },
};
</script>

<style>
.expCon {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 10px;
}

.filCon {
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  width: 50%;
}

.fCon {
  display: flex;
  justify-content: flex-end;
  align-content: flex-start;
  width: 40%;
}

#dInpt {
  padding: 5px 5px;
  text-align: center;
  display: flex;
  flex-direction: row;
}

#sbtn {
  background: hsl(264, 39%, 51%);
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
}
</style>
