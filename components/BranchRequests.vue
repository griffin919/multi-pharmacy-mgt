<template>
  <div>
    <div class="gridContainer">
      <div class="gridItem gridItem1 card">
        <div class="d-flex justify-content-between m-3">
          <div>
            <h4>Pending Purchase Orders</h4>
          </div>
          <div class="d-flex justify-content-center"></div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th style="width: 15%">Date</th>
              <th style="width: 35%">Pharmacy</th>
              <th style="width: 15%">PO ID</th>
              <th style="width: 10%"># of products</th>
              <th style="width: 10%">Total cost</th>
              <th style="width: 10%">Req. by</th>
              <th style="width: 10%"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              data-bs-toggle="modal"
              data-bs-target="#PODetails"
              style="cursor: pointer"
            >
              <td>12/11/23</td>
              <td>Main Street Pharmacy</td>
              <td>PO123</td>
              <td>15</td>
              <td>15,000</td>
              <td>Doe</td>
              <td>
                <button
                  class="custom-btn-outline"
                  data-bs-toggle="modal"
                  data-bs-target="#PODetails"
                >
                  <!-- @click="showOrCloseModal('PODetails', 'show')" -->
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="modal fade"
      id="PODetails"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen modal-dialog-scrollable">
        <div class="modal-content" style="width: 100vw">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Purchase Order ID:
            </h5>
            <h5 class="modal-title" id="exampleModalLabel">Pharmacy:</h5>
            <h5 class="modal-title" id="exampleModalLabel">Request Date:</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              X
            </button>
          </div>
          <div class="modal-body">
            <BranchRequestsTable />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    showOrCloseModal(id, state) {
      $(`#${id}`).modal(`${state}`);
    },
  },
};
</script>

<style scoped>
.gridContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 5px;
  width: 100%;
}

.gridItem1 {
  grid-column: span 3;
  /* border: hsl(264, 39%, 51%) solid 2px; */
  overflow-y: auto;
  /* height: 60vh; */
  height: 80vh;
}

table th,
td {
  text-align: center;
  font-size: 0.8rem;
}

.card {
  background-color: #fff;
  width: 100%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 10px 20px;
  border-radius: 10px;
  min-height: 550px;
}

.modal {
  padding: 0 !important;
}
.modal .modal-dialog {
  width: 100%;
  max-width: none;
  height: 100%;
  margin: 0;
}
.modal .modal-content {
  height: 100%;
  border: 0;
  border-radius: 0;
}
.modal .modal-body {
  overflow-y: auto;
}
</style>
