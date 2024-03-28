<template>
      <div class="d-flex flex-direction">
       
    <div class=" changedPricesTable d-flex flex-column">
      <div class="p-1  d-flex justify-content-between">
        <div>
          <label>Price Changes History</label>
        </div>
        <div>
          <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          align-items: center;
        "
      >
        <div style="width: 200px;">
          <label>Filter by user:</label>
          <select class="form-select" aria-label="Default select example" style="border-radius: 2px; padding: 7px 15px; border: 1px solid #DEE2E6;">
            <option
              v-for="(outgoing, index) in outgoingList"
              :key="index"
              :value="outgoing.user"
            >
              {{ outgoing.user }}
            </option>
          </select>
        </div>
        <div class="d-flex justify-content-start me-5">
          <div class="me-3 d-flex align-items-center">
            <label for="week">From:&nbsp;</label>
            <input
              type="date"
              name=""
              id="dInpt"
              style="border-radius: 2px; padding: 7px 15px; border: 1px solid #DEE2E6;"
              class="dateBkg"
              v-model="fdate"
              @change="filterList"
            />
          </div>
          <div class="me-3 d-flex align-items-center">
            <label for="week">To:&nbsp;</label>
            <input
              type="date"
              name=""
              id="dInpt"
              class="dateBkg"
              style="border-radius: 2px; padding: 7px 15px; border: 1px solid #DEE2E6;"
              v-model="tdate"
              @change="filterList"
            />
          </div>
        </div>
      </div>
        </div>
      </div>
      <div>
        <table class="tabCon table mt-2">
          <thead>
            <tr>
              <tr>
                <th style="width: 10%">Date Created</th> 
                <th class="text-center" style="width: 10%">Date Received</th> 
                <th class="text-center" style="width: 10%">Price Change ID</th>
                <th class="text-center" style="width: 10%"># Products</th>
                <th class="text-center" style="width: 10%"># Branches</th>
                <th class="text-center" style="width: 10%">Created by</th>
                <th class="text-center" style="width: 20%"> Branches</th>
                <th class="text-center" style="width: 10%"></th>
              </tr>
            </tr>
          </thead>

          <tbody>
            <tr v-for="outgoing in outgoingList">
            <td>{{ outgoing.datecreated }}</td>
            <td></td>
            <td class="text-center">{{ outgoing.id }}</td>
            <td class="text-center">{{ outgoing.products.length + 1 }}</td>
            <td class="text-center">
              {{ outgoing.selectbranches.length + 1 }}
            </td>
            <td class="text-center">{{ outgoing.user }}</td>
            <td class="text-center">
              <!-- <ul v-for="branch in outgoing.selectbranches" :key="branch.id">
                <li>{{ branch.name }}</li>
              </ul> -->
              <select
                style="
                  border-radius: 2px;
                  padding: 7px 15px;
                  border: 1px solid #dee2e6;
                "
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>Check branches</option>
                <option
                  v-for="branch in outgoing.selectbranches"
                  :key="branch.id"
                >
                  <span style="width:70%">{{ branch.name }}</span> | <span style="color:red; width:20%"> pending</span>
                </option>
              </select>
            </td>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-light btn-sm"
                @click="handleListSelect(outgoing)"
                data-bs-toggle="modal"
                data-bs-target="#viewOutGoingDetails"
                style="font-size: 0.7rem !important"
              >
                Details
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- View product details modal -->
    <div
      class="modal fade"
      id="viewOutGoingDetails"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between align-items-center">
            <h5 class="modal-title" id="exampleModalLabel">
              Selected price change list details
            </h5>
            <button
              type="button"
              class="btn btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="modal-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center">
              <label>Price Change ID: {{selectedPriceList.id}}</label>
              <select
                style="
                  border-radius: 2px;
                  padding: 7px 15px;
                  border: 1px solid #dee2e6;
                "
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>Check Branches Status</option>
                <option
                  v-for="branch in selectedPriceList.selectbranches"
                  :key="branch.id"
                >
                  <span style="width:70%">{{ branch.name }}</span> | <span style="color:red; width:20%"> pending</span>
                </option>
              </select>
             
                <div>
                <select
                  class="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  style="padding:5px; border:1px solid #8e44ad; border-radius:3px; "
                >
                  <option selected>Filter by branch</option>
                  <option
                    value="1"
                    v-for="branch in selectedPriceList.selectbranches"
                    :key="branch.id"
                    :value="branch.name"
                  >
                    {{ branch.name }}
                  </option>
                </select>
                <button class="btn"><i class="bi bi-printer"></i></button>
              </div>
            </div>
            <div>
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 40%">Product</th>
                    <th style="width: 10%" class="text-center">Unit</th>
                    <th style="width: 10%" class="text-center">Strength</th>
                    <th style="width: 10%" class="text-center">Cost Price</th>
                    <th style="width: 10%" class="text-center">New SP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="editedProduct in selectedPriceList.products">
                    <td>{{ editedProduct.productDescription }}</td>
                    <td class="text-center">{{ editedProduct.unit }}</td>
                    <td class="text-center">{{ editedProduct.strength }}</td>
                    <td class="text-center">{{ editedProduct.costPrice }}</td>
                    <td class="text-center">
                      {{ editedProduct.sellingPrice }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
.changedPricesTable {
    display: flex;
    flex-direction: column;
    width: 100%
}


.changedPricesTable table thead th {
    position: sticky;
    top: 0px; 
    vertical-align: middle !important;
    color: black !important;
    padding: 0.7rem !important;
    font-size: 0.8rem;
    font-weight: 400 !important;
    color: #797989;
}
</style>

<script>
  export default {
    data() {
      return {
        selectedPriceList: {},
        fdate: null,
        tdate: null,
      };
    },
    mounted() {
      try {
        const date = new Date();
        const year = date.toLocaleString("default", { year: "numeric" });
        const month = date.toLocaleString("default", { month: "2-digit" });
        const day = date.toLocaleString("default", { day: "2-digit" });
  
        this.tdate = year + "-" + month + "-" + day;
        this.fdate = year + "-" + month + "-" + day;
      } catch (error) {
        this.error = error.message;
      }
    },
    computed: {
      outgoingList() {
        return this.$store.state.outgoing;
      },
    },
    methods: {
      handleListSelect(list) {
        this.selectedPriceList = list;
      },
      filterList() {
        console.log("Filter");
      },
    },
  };
  </script>
  