<template>
  <div class="">
    <div class="w-90 changedPricesTable d-flex">
      <label>Completed Price Changes </label>
      <span>
        <table class="tabCon table mt-2">
          <thead>
            <tr>
              <th style="width: 15%">Date</th>
              <th style="width: 15%">Price Change ID</th>
              <th style="width: 15%">No.of Products</th>
              <th style="width: 15%">No. of Pharmacies</th>
              <th style="width: 15%">User</th>
              <th style="width: 15%">New SP</th>
              <th style="width: 15%"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(princeChange, index) in tdValArr" :key="index">
              <td>{{ princeChange.Date }}</td>
              <td>{{ princeChange.PriceChangeID }}</td>
              <td>{{ princeChange.NoOfProducts }}</td>
              <td>{{ princeChange.NoOfPharmacies }}</td>
              <td>{{ princeChange.User }}</td>
              <td>{{ princeChange.NewSP }}</td>
              <td>
                <Button
                  type="button"
                  class="btn btn-light btn-sm"
                  @click="
                    showOrCloseModal('ChangedPriceTableModal', 'show'),
                      testFunc(sPriceChangeArr)
                  "
                  style="font-size: 0.7rem !important"
                  >Details</Button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </span>
    </div>

    <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      id="ChangedPriceTableModal"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content p-3">
          <div class="mb-2 d-flex justify-content-end">
            <button
              class="btn btn-light btn-sm"
              @click="showOrCloseModal('changePriceModal', 'hide')"
            >
              <i style="color: red" class="bi bi-x-lg"></i>
            </button>
          </div>
          <div>
            <ChangedPriceTable />
          </div>
        </div>
      </div>
    </div>

    <!-- Large modal -->

    <!-- <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="m-4 d-flex align-items-center justify-content-between">
            <span>
              <label class="mb-2"> ID: </label>
            </span>
            <span>
              <label class="mb-2"> Date: </label>
            </span>
            <span>
              <label class="mb-2"> User: </label>
            </span>
            <div
              style="
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                margin: 0 1rem;
              "
            >
              <select class="form-select">
                <option>Pharm 1</option>
                <option>Pharm 2</option>
                <option>Pharm 3</option>
              </select>
            </div>
          </div>
          <div class="w-90 princeChangeTable d-flex flex-column">
            <span>
              <table class="tabCon table mt-2">
                <thead>
                  <tr>
                    <th style="width: 25%">Product(s)</th>
                    <th style="width: 15%">Unit</th>
                    <th style="width: 15%">Cost Price</th>
                    <th style="width: 15%">Mark Up</th>
                    <th style="width: 15%">Current SP</th>
                    <th style="width: 15%">New SP</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <input type="text" class="form-control w-50 h-50" />
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <input type="text" class="form-control w-50 h-50" />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <input type="text" class="form-control w-50 h-50" />
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <input type="text" class="form-control w-50 h-50" />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <input type="text" class="form-control w-50 h-50" />
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <input type="text" class="form-control w-50 h-50" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </span>
            <span class="align-self-end m-4">
              <button type="button" class="btn btn-primary">
                Send Price Changes
              </button>
            </span>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
table td {
  padding: 0.4rem !important;
  text-align: center;
  vertical-align: middle;
}

table th {
  padding: 0.6rem !important;
  text-align: center;
  vertical-align: middle;
  position: sticky;
}
.changedPricesTable {
  background-color: #fff;
  flex-direction: column;
  padding: 1rem;
  height: 50%;
  overflow: hidden;
  overflow-y: auto;
  border-radius: 10px;
}

.changedPricesTable label {
  /* color: hsl(264, 39%, 51%); */
  font-weight: 600;
  /* text-align: center; */
}
</style>

<script>
export default {
  props: ["tdValArr"],
  mounted() {
    console.log("tdValArr", this.tdValArr);
  },
  data() {
    return {};
  },
  methods: {
    showOrCloseModal(id, state) {
      $(`#${id}`).modal(`${state}`);
    },
    testFunc(param) {
      console.log("test:", param);
    },
  },
};
</script>
