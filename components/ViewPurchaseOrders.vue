<template>
  <div class="">
    <div class="">
      <div class="">
        <div class="card-body">
          <div>
            <h5 class="">Purchase Orders</h5>
          </div>
          <div class="dtableFixHead">
            <table style="color: hsl(264, 39%, 51%)" class="tabCon table mt-2">
              <thead class="">
                <tr class="">
                  <th scope="col" class="col-2">Purchase Order ID</th>
                  <th scope="col" class="col-1">Supplier</th>
                  <th scope="col" class="col-1">Items</th>
                  <th scope="col" class="col-1">Date</th>
                  <th scope="col" class="col-1"></th>
                  <th scope="col" class="col-1"></th>
                </tr>
              </thead>

              <tbody>
                <tr
                  role="button"
                  v-for="purchaseOrder in this.allPurchaseOrders"
                  :key="purchaseOrder.id"
                >
                  <td>
                    <div class="align-items-center d-flex">
                      <i
                        @click="removeFromPurchase(purchaseOrder)"
                        class="bi btn btn-sm text-danger fs-6 bi-x-square-fill me-2"
                      ></i>
                      <span
                        data-bs-toggle="modal"
                        data-bs-target="#modalSinglePO"
                        @click="viewSinglePurchaseOrder(purchaseOrder)"
                        class="text-capitalize text-primary"
                      >
                        {{ truncateText(purchaseOrder.invoiceid) }}
                      </span>
                    </div>
                  </td>
                  <td
                    data-bs-toggle="modal"
                    data-bs-target="#modalSinglePO"
                    @click="viewSinglePurchaseOrder(purchaseOrder)"
                    class=""
                  >
                    <div class="text-capitalize">
                      {{ purchaseOrder.name }}
                    </div>
                  </td>
                  <td
                    data-bs-toggle="modal"
                    data-bs-target="#modalSinglePO"
                    @click="viewSinglePurchaseOrder(purchaseOrder)"
                  >
                    {{ purchaseOrder.items }}
                  </td>
                  <td
                    data-bs-toggle="modal"
                    data-bs-target="#modalSinglePO"
                    @click="viewSinglePurchaseOrder(purchaseOrder)"
                  >
                    {{ purchaseOrder.ddate }}
                  </td>
                  <td>
                    <div>
                      <div class="dropdown">
                        <button
                          class="btn bi bi-download"
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
                          <li
                            @click="downloadSupplierFile('pdf', purchaseOrder)"
                          >
                            <span class="dropdown-item">pdf file</span>
                          </li>
                          <li
                            @click="downloadSupplierFile('pptx', purchaseOrder)"
                          >
                            <span class="dropdown-item">powerpoint file</span>
                          </li>
                          <li
                            @click="downloadSupplierFile('xlsx', purchaseOrder)"
                          >
                            <span class="dropdown-item">excel file</span>
                          </li>
                          <li
                            @click="downloadSupplierFile('docx', purchaseOrder)"
                          >
                            <span class="dropdown-item">word document</span>
                          </li>
                          <li
                            @click="downloadSupplierFile('csv', purchaseOrder)"
                          >
                            <span class="dropdown-item">csv file</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      @click="receivePurchaseOrder(purchaseOrder)"
                      class="btn btn-primary"
                      >Receive</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex justify-content-end">
              <button
                @click="loadPurchaseOrders"
                class="btn btn-outline-primary"
              >
                Reload Purchase Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.loadPurchaseOrders();
  },

  data() {
    return {
      allPurchaseOrders: [],
    };
  },

  methods: {
    async removeFromPurchase(product) {
      let delRes = await this.$store.commit("delObj2", [
        4,
        product,
        this.nextFunc2,
      ]);
    },

    truncateText(text) {
      if (text.length > 10) {
        return `${text.slice(23, 27)}...`;
      } else {
        return text;
      }
    },
    async receivePurchaseOrder(purchaseOrder) {
      let invoiceid = purchaseOrder.invoiceid;
      let supplierid = purchaseOrder.supplierid;
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase +
            process.env.NUXT_ENV_PURCHASE_ORDERS_TO_INVOICE +
            invoiceid +
            "/" +
            supplierid
        );
        let singlePurchaseOrder = response.data.sucessful;
        if (singlePurchaseOrder === true) {
          alert("Purchase Order Received");
          console.log("PRODUCT RECEIVED");
          this.viewPurchaseOrders;
        } else {
          alert("Purchase Order Not Received");
        }
      } catch (error) {
        this.error = error.message;
      }
    },

    async loadPurchaseOrders() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + process.env.NUXT_ENV_VIEW_PURCHASE_ORDERS
        );
        this.allPurchaseOrders = response.data.data;
        console.log("🚀 response.data.data:", response.data.data);
        console.log("allPurchaseOrders", allPurchaseOrders);
        // await this.$store.commit("allPurchaseOrders", allPurchaseOrders);
      } catch (error) {
        this.error = error.message;
      }
      // let currModal = document.getElementById("modalPO");
      // currModal.classList.add("show");
    },

    async viewSinglePurchaseOrder(purchaseOrder) {
      let invoiceid = purchaseOrder.invoiceid;
      console.log("🚀invoiceid:", invoiceid);

      let supplierid = purchaseOrder.supplierid;
      console.log("🚀 supplierid:", supplierid);
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase +
            process.env.NUXT_ENV_VIEW_PURCHASE_ORDER +
            invoiceid +
            "/" +
            supplierid
        );
        let singlePurchaseOrder = response.data.data;

        await this.$store.commit(
          "viewSinglePurchaseOrder",
          singlePurchaseOrder
        );
      } catch (error) {
        this.error = error.message;
      }
      let currModal = document.getElementById("modalSinglePO");
      currModal.classList.add("show");
    },
  },
};
</script>

<style scoped>
.mainCon {
  /* background-color: #faf9f6; */
  color: hsl(264, 39%, 51%);
  border: 1px solid hsl(264, 39%, 51%);
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
table {
  border-collapse: collapse;
  width: 100%;
}
</style>
