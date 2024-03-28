<template>
  <div id="parent-container">
    <!-- Header -->
    <div class="div1 col-12">
      <div class="subdiv1 col-5">
        <!-- product search box -->
        <div class="input-group">
          <i class="input-group-text bi bi-search"></i>
          <!-- autofocus="autofocus" -->
          <input
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

        <!-- product search display tablr-->
        <div
          class="product-search d-flex flex-column"
          v-if="searchTerm.length > 1"
          style="width: 100%"
        >
          <div>
            <div>
              <div
                class="prdtSearchTable"
                style="overflow-y: auto; font-size: 0.8rem"
              >
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" class="text-capitalize col-8">
                        Product name
                      </th>
                      <th scope="col" class="text-capitalize col-1">Unit</th>
                      <th scope="col" class="text-capitalize col-1  text-center">
                        Cost Price
                      </th>
                      <th scope="col" class="text-capitalize col-1 text-center">
                        Selling Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      role="button"
                      class="align-middle"
                      v-for="product in searchData"
                      :key="product.id"
                      @click="addProductToList(product), (searchTerm = '')"
                    >
                    <!-- @click="
                      changePriceList.products.push(product),
                        (searchTerm = '')
                    " -->
                      <!-- data-bs-toggle="modal"
                      data-bs-target="#changePriceModal" -->
                      <!-- @click="pickSelectedProduct(product), searchTerm = ''" -->
                      <td class="text-capitalize py-2">
                        {{ product.productDescription }}
                      </td>
                      <td>{{ product.unit }}</td>
                      <td>{{formatMoney(product.costPrice)}}</td>
                      <td>{{ formatMoney(product.sellingPrice) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="subdiv2 col-5"></div>
      <div class="subdiv3 col-3">
        <label style="font-weight: 500">
          Price Change ID: {{ changePriceList.id }}
        </label>
        <!-- <button style="margin: 0 5px; padding: 5px;" @click="generateId">generate</button> -->
      </div>
    </div>
    <div class="div2">
      <div style="width: 100%" class="priceTable d-flex">
        <div class="tableContainer" style="height: 70vh">
          <table class="tabCon table mt-2;">
            <thead>
              <tr>
                <th style="width: 2%"></th>
                <th style="width: 30%">Product(s)</th>
                <th style="width: 10%" class="text-center">Unit</th>
                <th style="width: 10%" class="text-center">Strength</th>
                <th style="width: 10%" class="text-center">Cost Price</th>
                <th style="width: 5%" class="text-center">Mark Up</th>
                <th style="width: 5%" class="text-center">New SP</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="editedProduct in changePriceList.products">
                <td @click="removeProductFromList(editedProduct)">
                  <i class="bi bi-x-lg"></i>
                </td>
                <td>{{ editedProduct.productDescription }}</td>
                <td class="text-center">{{ editedProduct.unit }}</td>
                <td class="text-center">{{ editedProduct.strength }}</td>
                <td class="text-center">{{ editedProduct.costPrice }}</td>
                <td class="">
                  <input
                    type="number"
                    class="form-control form-control-sm changePrice"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    @input="calcMarkupPrice(editedProduct)"
                  />
                </td>
                <td class="">
                  <input
                    type="number"
                    class="form-control form-control-sm changePrice"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    v-model="editedProduct.sellingPrice"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="align-self-end">
          <!-- <cbutton  :clickHandler="logSom" label="Send Price Change" /> -->
          <button id="buttonid" @click="sendPriceChange" >
            Send Price Change
          </button>
        </div>
      </div>
    </div>

    <!-- BS TOAST -->
    <div
      class="toast"
      style="position: absolute; top: 15%; right: 0"
      id="selectBranch"
    >
      <div
        class="toast-header dangerToastHeader"
        style="display: flex; justify-content: space-between"
      >
        <div>
          <img
            src="../../assets/rigellogo.png"
            style="width: 25px"
            class="rounded mr-2"
            alt="..."
          />
          <strong class="mr-auto">Rigel OS</strong>
        </div>
        <!-- <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button> -->
      </div>
      <div class="toast-body">
        <h6>Please select branches and add products!</h6>
      </div>
    </div>


     <!-- Change Price Modal -->
     <div
      class="modal fade changePrice-modal-lg"
      tabindex="-1"
      role="dialog"
      id="matchPrdtPrompt"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-sm">
        <div class="modal-header" style="margin: 0; background-color: #8e44ad">
          <button
            type="button"
            class="close"
            data-bs-dismiss="modal"
            style="color: #fff"
          >
            ×
          </button>
        </div>
        <div class="modal-content d-flex" style="padding: 10px">
          <h6>Product not matched! </h6>
          <button class="btn" data-bs-toggle="modal" data-bs-target="#matchPrdt">Match</button>
        </div>
      </div>
    </div>


    
     <!-- Match Product Modal -->
     <div
      class="modal fade changePrice-modal-lg"
      tabindex="-1"
      role="dialog"
      id="matchPrdt"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-header" style="margin: 0; background-color: #8e44ad">
          <button
            type="button"
            class="close"
            data-bs-dismiss="modal"
            style="color: #fff"
          >
            ×
          </button>
        </div>
        <div class="modal-content d-flex">
          <MatchProduct :selectedMatchProduct="pickedProduct"/>
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
        <div class="modal-header" style="margin: 0; background-color: #8e44ad">
          <button
            type="button"
            class="close"
            data-bs-dismiss="modal"
            style="color: #fff"
          >
            ×
          </button>
        </div>

        <div class="modal-content d-flex flex-columns">
          <div
            class="editPriceCol editPriceCol1 d-flex justify-content-between"
            style="padding: 15px 30px"
          >
            <span
              >Product:&nbsp;&nbsp;<span class="pageTitleText">
                {{ this.clickedProduct.productDescription }}
              </span>
            </span>
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
          <div class="m-3 editPriceContainer">
            <div class="editPriceCol editPriceCol2">
              <span>
                <table class="table">
                  <thead>
                    <tr>
                      <th class="col-3">Pharmacy</th>
                      <th class="col-1 text-center">Cost Price</th>
                      <th class="col-1 text-center">Selling Price</th>
                      <th class="col-1 text-center">
                        <input
                          type="number"
                          class="form-control form-control-sm changePrice"
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                          placeholder="Mark Up"
                          style="width: 70%"
                        />
                      </th>
                      <th class="col-1 text-center">
                        <input
                          type="number"
                          class="form-control form-control-sm changePrice"
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                          placeholder="New Price"
                          style="width: 70%"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="" v-for="branch in selectedBranches">
                      <td class="text-center">{{ branch.name }}</td>
                      <td class="text-center"></td>
                      <td class="text-center"></td>
                      <td class="text-center">
                        <input
                          type="number"
                          class="form-control form-control-sm changePrice"
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                          style="width: 70%"
                        />
                      </td>
                      <td class="text-center">
                        <input
                          type="number"
                          class="form-control form-control-sm changePrice"
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                          style="width: 70%"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </span>
            </div>
            <div class="editPriceCol editPriceCol3 d-flex justify-content-end">
              <cbutton :clickHandler="logSom" label="Ok" />
            </div>
            <div class="editPriceCol editPriceCol4"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- <button @click="logSom">Log</button> -->
  </div>
</template>

<style>
#buttonid {
  padding: 7px 10px;
}

#parent-container {
  display: flex;
  flex-direction: column;
}

#parent-container .div1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

#parent-container .div1 .subdiv1 {
  position: relative;
  padding: 0;
}

#parent-container .div1 .product-search {
  position: absolute;
  background-color: #8e44ad;
  padding: 5px;
  color: #fff;
  overflow-y: auto;
  height: 50vh;
  z-index: 1;
}

#parent-container .div1 .product-search table thead th,
#parent-container .div1 .product-search table tbody td,
#parent-container .div1 .product-search table tbody td button {
  color: #fff;
}

#parent-container .div2 {
  margin-top: 15px;
  /* height: 90vh; */
}

#parent-container tableContainer {
  height: 80vh;
}

.priceTable table thead th {
  position: sticky;
  top: 0px;
  vertical-align: middle !important;
  color: black !important;
  padding: 0.7rem !important;
  font-size: 0.8rem;
  font-weight: 400 !important;
  color: #797989;
}

#parent-container .div2 .priceTable {
  display: flex;
  flex-direction: column;
}

#inputsm {
  font-size: small;
  background-color: transparent;
  border: none !important;
  border-bottom: 1px solid red;
  border-radius: 0;
}

.tabCon {
  /* min-height: 70vh; */
  overflow-y: auto;
}
</style>

<script>
import cbutton from "../elements/cbutton.vue";
import { branches } from "../../store/sampledb";
// import { eventBus } from "../main";

export default {
  components: { cbutton },
  data() {
    return {
      searchStart: false,
      clickedProduct: {},
      searchTerm: "",
      searchData: {},
      receivedData: null,
      branches: branches,
      changePriceList: {
        id: "",
        selectbranches: [],
        datecreated: "",
        user: "",
        products: [],
        status,
      },
      updatedProducts: {},
      pickedProduct: {},
    };
  },

  mounted() {
    this.generateId();
  },

  computed: {
    isDisabled() {
      return this.selectedBranches.length > 0 ? "" : "disabled";
    },
    selectedBranches() {
      let sbid = this.$store.state.selectedBranches;
      let sb = this.branches.filter((b) => {
        return sbid.includes(b.id);
      });

      return sb;
    },
    currentDate() {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${day}-${month}-${year}`;
      return currentDate; // "17-6-2022"
    },
  },

  methods: {
    addProductToList(product) {
      this.pickedProduct = product
    if(product.uniqid === 0){
        $("#matchPrdtPrompt").modal('show')
    }else{
      this.changePriceList.products.push(product);
    }
    },

    generateId() {
      let alphabet = String.fromCharCode(97 + Math.floor(Math.random() * 26));
      let numbers = Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0");
      this.changePriceList.id = alphabet + numbers;
      console.log(
        "🚀 ~ generateId ~ this.changePriceList.id:",
        this.changePriceList.id
      );
    },

    removeProductFromList(product) {
      const index = this.changePriceList.products.findIndex(
        (p) => p.id === product.id
      );

      if (index !== -1) {
        this.changePriceList.products.splice(index, 1);
      }
    },

    calcMarkupPrice(product) {
      let markup = event.target.value;
      if (!this.updatedProducts.hasOwnProperty(product.id)) {
        this.updatedProducts[product.id] = product.costPrice;
      }
      let currentCostPrice = this.updatedProducts[product.id];
      let newSellingPrice = currentCostPrice * (1 + markup / 100);
      product.sellingPrice = newSellingPrice;
    },

    logSom() {
      console.log("Hello");
      console.log("🚀 ~ logSom ~ selectedBranches:", this.selectedBranches);
      console.log("🚀 ~ logSom ~ changePriceList:", this.changePriceList);
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
          this.searchData = resList;
          console.log(
            "🚀 ~ sendProductSearch ~ this.searchData:",
            this.searchData
          );
          //   this.$store.commit("setProducts", resList);

          this.searchDone = true;
          this.searchStart = true;
        } catch (error) {
          this.error = error.message;
        }
      }
    },

    async sendPriceChange() {
      let axios = this.$axios;
      let state = this.$store.state;
      let page = this;
      let info = "Are you sure you want to send this price update?";
      this.$store.commit("changeDialog", info);
      let func = {};

      // let outgoingList = JSON.parse(window.localStorage.getItem('outgoingList')) || [];
      if (page.selectedBranches.length > 0 && this.changePriceList.products.length > 0) {
        func.yesfunc = async function () {
          try {
            // $("#waitdailog").modal('show')
            // page.$store.commit("changeDialog", "Please wait!");
            // page.$store.commit("showWait");

            page.changePriceList.selectbranches = page.selectedBranches;
            page.changePriceList.datecreated = page.currentDate;
            page.changePriceList.user = page.$store.state.user.user.lname;

            // let response = await axios.post(
            //   state.urlBase +
            //   send
            // );
            // let data = response.data;

            console.log("🚀 ~ page.changePriceList:", page.changePriceList);

            page.$store.commit("setOutgoing", page.changePriceList);

            // outgoingList.push(page.changePriceList);

            // Save the updated outgoingList array to localStorage
            window.localStorage.setItem(
              "outgoingList",
              JSON.stringify(outgoingList)
            );

            // console.log(JSON.parse(window.localStorage.getItem('outgoingList')));
            console.log("🚀 ~ outgoing:", page.$store.state.outgoing);

            setTimeout(() => {
              $("#waitdailog").modal("hide");
              setTimeout(() => {
                // data.message
                page.$store.commit("showMessage", "Done dummy");
                page.changePriceList = [];
                // page.$store.commit("showMessage", data.message);
              }, 200);
            }, 500);
            //
          } catch (error) {
            console.log(error);
            this.error = error.message;
            $("#waitdailog").modal("hide");
          }
        };

        func.nofunc = async function () {};
        this.$store.commit("OpenYesOrNOClick", func);
      } else {
        $("#selectBranch").toast("show");
      }
    },
  },
};
</script>
