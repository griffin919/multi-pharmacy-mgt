<template>
  <div class="p-4">
    <div>
      <div class="container">
        <div class="row">
          <div class="col-8 col1">
            <span>
              <ul>
                <li>Purchase Order ID:</li>
                <li></li>
              </ul>
            </span>
          </div>
          <div class="col-2 col1">
            <span>
              <ul>
                <li>Date:</li>
                <li></li>
              </ul>
            </span>
          </div>
          <div class="col-2 col1">
            <span>
              <ul>
                <li>User:</li>
                <li></li>
              </ul>
            </span>
          </div>
          <div class="col-3 col2"># of products:</div>
          <div class="col-3 col2">Total:</div>
          <div class="col-3 col2">Discount:</div>
          <div class="col-2 col2">Amount Paid:</div>
          <div class="col-3 col3">Balance:</div>
          <div class="col-9 col3 d-flex">
            <div class="input-group">
              <button type="button" class="btn btn-outline-secondary btn-sm">
                Make payment
              </button>
              <input
                type="text"
                class="form-control form-control-sm"
                aria-label="Text input with segmented dropdown button"
              />

              <button
                type="button"
                class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split btn-sm"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="visually-hidden">Payment method</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">Cash</a></li>
                <li>
                  <a class="dropdown-item" href="#">Momo</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Cheque</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Bank tranfer</a>
                </li>
              </ul>
            </div>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary ml-2 payBtn"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ======== Details Table ========== -->
    <div class="container mt-2">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Unit</th>
            <th scope="col">Req. Qty</th>
            <th scope="col">Qty Supplied</th>
            <th scope="col">Cost Price</th>
            <th scope="col">Mark Up</th>
            <th scope="col">New SP</th>
            <th scope="col">Total Cost</th>
            <th scope="col">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Product A</td>
            <td>Box</td>
            <td>100</td>
            <td>90</td>
            <td>50.00</td>
            <td>20%</td>
            <td>60.00</td>
            <td>5,400.00</td>
            <td>2023-12-31</td>
          </tr>
          <tr>
            <td>Product B</td>
            <td>Bottle</td>
            <td>50</td>
            <td>45</td>
            <td>30.00</td>
            <td>15%</td>
            <td>34.50</td>
            <td>1,552.50</td>
            <td>2024-05-15</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ========== PAYMENT MODAL ============== -->
    <div
      class="modal fade Payment-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content d-flex flex-columns">
          <div class="align-self-end mt-3 mr-4">
            <button
              id="closeBtn"
              type="button"
              class="btn-close btn-danger"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i style="color: white" class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col1,
.col2,
.col3 {
  padding: 0.7rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.col3 button,
li {
  font-size: small;
}

.col1 {
  background: hsl(264, 39%, 51%);
  color: #fff;
}

table td {
  font-size: 0.7rem;
}
</style>
