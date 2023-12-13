<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form class="" @submit.prevent="handleSubmit(submitProduct)">
      <div>
        <table class="table table-borderless">
          <thead>
            <tr>
              <th class="col fw-normal text-primary" scope="col">
                Product Barcode
              </th>
              <th
                style="width: 20%"
                class="col-1 fw-normal text-primary"
                scope="col"
              >
                Product Description
              </th>
              <th class="col-1 fw-normal text-primary" scope="col">
                Product Unit
              </th>
              <th class="col fw-normal text-primary" scope="col">
                Product Strength
              </th>
              <th class="col-1 fw-normal text-primary" scope="col">
                Stock Bal.
              </th>
              <th class="col-1 fw-normal text-primary" scope="col">
                Cost Price
              </th>
              <th class="col-1 fw-normal text-primary" scope="col">
                Sell. Price
              </th>
              <th class="col-1 fw-normal text-primary" scope="col">Expiry</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <input
                  v-model="formData.barcode"
                  type="text"
                  class="form-control formCon"
                  id="barcode"
                  placeholder="barcode"
                />
              </td>

              <td>
                <input
                  v-model="formData.productDescription"
                  type="text"
                  class="form-control formCon"
                  id="floatingInput"
                  placeholder="Coartem 80/480"
                />
              </td>

              <td>
                <select
                  v-model="formData.unit"
                  class="form-control formCon"
                  id="floatingInput"
                >
                  <option value="" disabled>Select unit</option>
                  <option
                    v-for="unit in buyUnits"
                    :key="unit.id"
                    :value="unit.name"
                  >
                    {{ unit.name }}
                  </option>
                </select>
              </td>

              <td>
                <input
                  v-model="formData.strength"
                  type="text"
                  class="form-control formCon"
                  id="floatingInput"
                  placeholder="10mg/ml"
                />
              </td>

              <td>
                <input
                  v-model="formData.stockQty"
                  type="text"
                  class="form-control formCon"
                  id="floatingInput"
                  placeholder="2500"
                  disabled
                />
              </td>

              <td>
                <input
                  v-model="formData.costPrice"
                  type="text"
                  class="form-control formCon"
                  id="floatingInput"
                  placeholder="2500"
                />
              </td>

              <td>
                <input
                  v-model="formData.sellingPrice"
                  type="text"
                  class="form-control formCon"
                  id="floatingInput"
                  placeholder="2500"
                />
              </td>

              <td>
                <input
                  :value="formData.productExpiry"
                  @input="logDate2($event)"
                  type="date"
                  name=""
                  id=""
                  class="me-2 form-control"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-block mt-3 text-align-last: center;">
        <div style="display: flex; justify-content: center">
          <button
            @click.prevent="toggleMore = !toggleMore"
            :class="{ on: toggleMore }"
          >
            {{ toggleMore ? "less" : "more" }}
          </button>
        </div>

        <!-- TOGGLE STARTS HERE -->
        <div v-if="toggleMore">
          <div style="width: 100%">
            <table class="table table-borderless">
              <thead>
                <tr
                  style="
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                  "
                >
                  <th class="tableColumn"></th>
                  <th class="tableColumn"></th>
                  <th class="tableColumn"></th>
                  <th class="tableColumn"></th>
                </tr>
              </thead>

              <tbody>
                <!-- row 1 -->
                <tr>
                  <!-- SUPPLIER -->
                  <td class="tableColumn">
                    <div>
                      <label class="form-label" for="floatingInput"
                        >Current Supplier</label
                      >
                      <div>
                        <select
                          v-model="formData.supplier"
                          class="form-select formCon"
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
                      </div>
                    </div>
                  </td>

                  <!--QR CODE  -->
                  <td class="tableColumn">
                    <div>
                      <label class="form-label" for="floatingInput"
                        >QR Code</label
                      >
                      <input
                        v-model="formData.qrCode"
                        type="text"
                        class="form-control formCon"
                        id="floatingInput"
                      />
                    </div>
                  </td>

                  <!-- BUYING UNIT -->
                  <td class="tableColumn">
                    <div>
                      <label class="form-label" for="floatingInput"
                        >Buying Unit</label
                      >
                      <select
                        v-model="formData.buyUnit"
                        class="form-control formCon"
                        id="floatingInput"
                      >
                        <option value="" disabled>Select a sell unit</option>
                        <option
                          v-for="unit in buyUnits"
                          :key="unit.id"
                          :value="unit.name"
                        >
                          {{ unit.name }}
                        </option>
                      </select>
                    </div>
                  </td>

                  <!-- SELLING UNIT -->
                  <td class="tableColumn">
                    <div>
                      <label class="form-label" for="floatingInput"
                        >Selling Unit</label
                      >
                      <select
                        v-model="formData.sellUnit"
                        class="form-control formCon"
                        id="floatingInput"
                      >
                        <option value="" disabled>Select a sell unit</option>
                        <option
                          v-for="unit in buyUnits"
                          :key="unit.id"
                          :value="unit.name"
                        >
                          {{ unit.name }}
                        </option>
                      </select>
                    </div>
                  </td>
                </tr>

                <!-- row 2 -->
                <tr>
                  <!-- OWNERSHIP -->
                  <td class="tableColumn">
                    <div>
                      <label class="form-label" for="floatingInput"
                        >Ownership</label
                      >
                      <input
                        v-model="formData.ownership"
                        type="text"
                        class="form-control formCon"
                        id="floatingInput"
                      />
                    </div>
                  </td>

                  <!--REORDER LVL  -->
                  <td class="tableColumn">
                    <div>
                      <label class="form-label" for="floatingInput"
                        >Reorder Level</label
                      >
                      <input
                        v-model="formData.reorder"
                        type="number"
                        class="form-control formCon"
                        id="floatingInput"
                      />
                    </div>
                  </td>

                  <!-- MULTIPLIER UNIT -->
                  <td class="tableColumn">
                    <div>
                      <label class="form-label" for="floatingInput"
                        >Multiplier</label
                      >
                      <input
                        v-model="formData.multi"
                        type="text"
                        class="form-control formCon"
                        id="floatingInput"
                      />
                    </div>
                  </td>

                  <!-- DISCOUNT UNIT -->
                  <td class="tableColumn">
                    <div>
                      <label class="form-label" for="floatingInput"
                        >Discount</label
                      >
                      <input
                        type="text"
                        v-model="formData.discount"
                        class="form-control formCon"
                        id="floatingInput"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="roleCon">
            <div>
              <!-- NEW CLASS -->
              <div style="display: flex; justify-content: center; margin: 20px">
                <div
                  style="
                    width: 40%;
                    display: flex;
                    flex-direction: column-reverse;
                  "
                >
                  <h5>Classification Group</h5>
                </div>
                <div
                  style="
                    width: 40%;
                    display: flex;
                    flex-direction: column-reverse;
                  "
                >
                  <div>
                    <label> Shelf </label>
                    <select
                      v-model="formData.shelves"
                      class="form-control formCon"
                      id="floatingInput"
                    >
                      <option value="" disabled>Select a shelf</option>
                      <option
                        v-for="unit in shelves"
                        :key="unit.id"
                        :value="unit.name"
                      >
                        {{ unit.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: center;
                  vertical-align: middle;
                  padding: 5px;
                "
              >
                <div class="grid-container">
                  <div
                    class="form-check"
                    v-for="(item, index) in classifications"
                    :key="index"
                  >
                    <label class="form-check-label fs-5">
                      <input
                        type="checkbox"
                        :id="'checkbox-' + index"
                        :value="item.name"
                        v-model="formData.selectedProdClass"
                      />
                      {{ item.name }}
                    </label>
                  </div>
                </div>
              </div>

              <!-- END NEW CLASS -->
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex mt-2 justify-content-center">
        <!-- <input type="submit" class="col-5 text-white btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmProductSave" value="Add New Product"> -->
        <input
          type="submit"
          class="col-5 text-white btn btn-primary"
          value="Add New Product"
          @click="handleSubmit(submitProduct)"
          :disabled="isSubmitButtonDisabled"
        />
      </div>
      <!-- data-bs-dismiss="modal" -->
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
</template>

<script>
export default {
  data() {
    return {
      //product class
      prodClasses: ["Drug", "Antihistamine", "Antihypertensive"],
      newClass: "",

      toggleMore: false,
      formData: {
        brandName: "",
        productDescription: "",
        unit: "",
        barcode: "",
        strength: "",
        stockQty: 0,
        costPrice: 0,
        sellingPrice: 0,
        supplier: 0,
        productExpiry: "",
        productQty: 0,
        productTotalBill: 0,
        //new data
        selectedProdClass: [],
        discount: 0,
        multi: 0,
        reorder: 0,
        ownership: 0,
        sellUnit: "",
        buyUnit: "",
        shelves: "",
        qrCode: 0,
      },
      sellUnits: [],
      buyUnits: [],
      shelves: [],
      classifications: [],
    };
  },
  methods: {
    async loadClass() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + "rest/allset/loadall/2"
        );

        this.classifications = response.data.data;
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    async loadShelves() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + "rest/allset/loadall/1"
        );

        this.shelves = response.data.data;
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },

    async loadBuyUnits() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + "rest/allset/loadall/5"
        );

        this.buyUnits = response.data.data;
        console.log(this.buyUnits);
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
    async loadSellUnits() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + "rest/allset/loadall/6"
        );

        this.sellUnits = response.data.data;
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
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

    async submitProduct() {
      let dat = this;

      let payload = {};
      payload.info =
        "Are you sure you want to add " + dat.formData.productDescription + "?";
      payload.addfun = async function (state, page, axios) {
        console.log(dat.formData);

        try {
          let response = await axios.post(
            state.urlBase + process.env.NUXT_ENV_ADD_PRODUCT,
            dat.formData
          );
          let data = response.data;
          payload.message = response.data.message;
          $("#addProduct").modal("hide");
          console.log(data);
        } catch (error) {
          this.error = error.message;
        }
      };
      this.$store.commit("showSimpleYesOrNo2", payload);
    },
    logDate2(event) {
      let val = event.target.value;
      console.log(val);
      // val = val+'-01'
      // val = val + '-01'
      this.formData.productExpiry = val;
    },
  },
  mounted() {
    this.loadSellUnits();
    this.loadBuyUnits();
    this.loadShelves();
    this.loadClass();
  },
  computed: {
    isSubmitButtonDisabled() {
      return (
        this.formData.buyUnit.trim() === "" ||
        this.formData.sellUnit.trim() === ""
      );
    },
    supplierList() {
      return Object.keys(this.$store.state.suppliersList).map((k) => {
        let o = this.$store.state.suppliersList[k];
        return o;
      });
    },
  },
};
</script>


<style scoped>
button {
  color: #3700ff;
  background-color: transparent;
  padding: 4px 8px;
  border: none;
  border-radius: 10px;
  margin-left: 10px;
  font-size: normal;
  border: 1px solid #3700ff;
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
  padding: 8px 16px;
  font-size: 16px;
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
  padding: 8px 16px;
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