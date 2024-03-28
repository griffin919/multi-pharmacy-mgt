<template>
  <div class="ml-4 mr-4 parent">
    <!-- Header -->
    <div class="mt-3 mb-2 row d-flex align-items-center">
      <div class="col-3 pageTitleText w-50">
        <p>Manage Branch Pricing</p>
      </div>
      <div class="col-5 tabBar"  >
        <ul>
          <li @click="tab = 1" :class="{'active': tab === 1}" style="border-radius: 3px;">Create</li>
          <li @click="tab = 2" :class="{'active': tab === 2}" style="border-radius: 3px;">Outgoing</li>
          <li @click="tab = 3" :class="{'active': tab === 3}" style="border-radius: 3px;">History</li>
        </ul>
      </div>

      <div class="col-4 d-flex align-items-center justify-content-end">
        <div>&nbsp; &nbsp; &nbsp;</div>
        <div class="w-60 d-flex" style="padding-right: 150px;">
          <selectBranches  :clickHandler="logSomefin1" label="Select Branches"/>
        </div>
      </div>
    </div>



    <!-- product search for price change -->
    <div id="pageBody" style="" class="smooth-transition">
      <transition name="fade">
      <div v-if="tab === 1">
        <createPriceChange />
      </div>
      <div v-else-if="tab === 2" class="smooth-transition">
        <OutgoingPriceChange/>
      </div>
      <div v-else-if="tab === 3" class="smooth-transition">
        <div><PriceChangeHistory/></div>
      </div>
    </transition>
   
      <!--  Changed Price table -->
      <!-- <div class="priceChangeTable gridCol2">
        <div v-if="showChangedPriceTable">
          <changedPriceTable />
        </div>
        <div v-else>
          <completedPriceChanges :tdValArr="sPriceChangeHistory" />
        </div>
      </div> -->
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.smooth-transition {
    transition: all 0.3s ease-in-out;
}

#pageBody{
  border: 1px solid rgba(60, 64, 67, 0.3); 
  padding: 10px; 
  border-radius: 10px; 
  min-height: 80vh ;
}
.parent .tabBar {
  font-size: 0.8rem;
}

.parent .tabBar ul  {
  display: flex;
  list-style-type: none;
}

.parent .tabBar ul li {
  cursor: pointer;
  padding: 8px 5px;
  width: 100%;
  text-align: center;
  margin: 0px 1px;
  border: 1px solid rgba(60, 64, 67, 0.3);
}

.parent .tabBar ul li:hover{
  border-bottom:3px solid #8e44ad;
}

.active{
  background-color:#8e44ad;
  color:#fff;
}
.changePrice {
  width: 4rem;
  height: 1.8rem;
}
.editPriceCol1 {
  margin: 1rem 0;
}
button {
  background: hsl(264, 39%, 51%);
}

.priceChangeTable {
  background-color: #fff;
  padding: 0.5rem;
  height: 80vh;
  overflow-y: auto;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 10px;
}

.priceChangeTable label {
  font-weight: 700;
  text-align: center;
}
/* 
.gridContainer {
  display: grid;
  column-gap: 10px;
  min-height: 80vh;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

.gridCol1 {

  overflow-y: auto;
  overflow-x: hidden;
  grid-column: span 1;
}
.gridCol2 {
  grid-column: span 2;
  overflow-y: auto;
  overflow-x: hidden;

} */

thead {
  position: sticky; /* make the table heads sticky */
  top: 0px; /* table head will be placed from the top of the table and sticks to it */
}

.table-container {
  margin: 20px;
}

/* Style the table header */
.table thead th {
  background-color: hsl(264, 39%, 51%);
  color: #fff;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

/* Style the table rows */
.table tbody tr {
  border: 1px solid #ddd;
}

/* Alternate row colors for better readability */
.table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Style the cells */
.table td {
  padding: 10px;
}

/* Style the "Change" button */
.table button {
  font-size: 0.8rem;
  color: #fff;
  background-color: #8e44ad;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>

<script>
import { BSClassCombos } from "../assets/BSclasses";
import { sPriceChangeHistory } from "../store/sampledb";
import createPriceChange from "../components/price-change/createPriceChange.vue";
import selectBranches from '../components/elements/selectBranches.vue'
import PriceChangeHistory from "../components/price-change/priceChangeHistory.vue";
import OutgoingPriceChange from "../components/price-change/outgoingPriceChange.vue";

export default {
  components: { createPriceChange, selectBranches, PriceChangeHistory, OutgoingPriceChange },
 
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
            tab: 1,
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
        logSomefin1(){
          console.log("🚀 ~ logSomefin ~ logSomefin:")
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
                    let response = await this.$axios.get(this.$store.state.urlBase +
                        process.env.NUXT_ENV_SEARCH_PRODUCT_API +
                        this.searchTerm);
                    let resList = response.data.data;
                    console.log("🚀 ~ resList:", resList);
                    // console.log(response.data.data);
                    this.$store.commit("setProducts", resList);
                    this.searchDone = true;
                    this.searchStart = true;
                }
                catch (error) {
                    this.error = error.message;
                }
            }
        },
    },

};
</script>
