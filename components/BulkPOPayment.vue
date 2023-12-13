<template>
  <div class="">
    <div>
      <div class="container">
        <div class="row row1">
          <div class="input-group col-6">
            <div class="input-group-prepend">
              <button
                class="btn btn-sm btn-outline-light"
                type="button"
                style="font-size: 0.8rem"
              >
                Organization
              </button>
            </div>
            <select class="custom-select" id="inputGroupSelect03">
              <!-- v-model="filterByCategory" -->
              <option
                v-for="(branch, index) in Object.keys(pharmacies)"
                :key="index"
                :value="branch"
              >
                {{ branch }}
              </option>
            </select>
          </div>
          <div class="col-3">
            <span>
              <ul>
                <li>Total Debt:</li>
                <li></li>
              </ul>
            </span>
          </div>
          <div class="col-3">
            <span>
              <ul>
                <li>Account Balance:</li>
                <li></li>
              </ul>
            </span>
          </div>
        </div>
        <div class="row row2 d-flex justify-content-center">
          <div class="col-4"># of invoices:</div>
          <div class="col-4">Paid invoices:</div>
          <div class="col-4">Due invoices:</div>
        </div>
        <div class="d-flex justify-content-center">
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

    <!-- ======== Details Table ========== -->
    <div class="container mt-2">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Invoice ID</th>
            <th scope="col">Total Cost</th>
            <th scope="col">Paid</th>
            <th scope="col">Balance</th>
            <th scope="col">Due date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-11-18</td>
            <td>INV12345</td>
            <td>150.00</td>
            <td>100.00</td>
            <td>50.00</td>
            <td>2023-12-01</td>
          </tr>
          <!-- Row 2 -->
          <tr>
            <td>2023-11-19</td>
            <td>INV12346</td>
            <td>200.00</td>
            <td>150.00</td>
            <td>50.00</td>
            <td>2023-12-02</td>
          </tr>

          <!-- Row 3 -->
          <tr>
            <td>2023-11-20</td>
            <td>INV12347</td>
            <td>120.00</td>
            <td>80.00</td>
            <td>40.00</td>
            <td>2023-12-03</td>
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
.row2 {
  padding: 0.5rem;
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.row1 {
  background: hsl(264, 39%, 51%);
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0.4rem;
}

table td {
  font-size: 0.7rem;
}
</style>

<script>
import { pharmacies } from "../store/sampledb";

export default {
  data() {
    return {
      pharmacies,
    };
  },
};
</script>
