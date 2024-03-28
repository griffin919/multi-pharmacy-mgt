<template>
  <div class="m-3" style="overflow: hidden">
    <div class="gridContainer">
      <div class="gridItem gridItem1 innerGridContainer">
        <div class="noteCard" @click="showAddBranch = !showAddBranch">
          <!--  -->
          <DashCard
            value="3"
            description=" Branches"
            iconName="bi bi-buildings"
            topLeft="bi bi-plus-lg"
          />
        </div>
        <div class="noteCard">
          <NuxtLink to="/branch-summaries">
            <!--  -->
            <DashCard
              value="11,200.00"
              description="Todays sales"
              iconName="bi bi-bar-chart-line-fill"
            />
          </NuxtLink>
        </div>
        <div class="noteCard">
          <NuxtLink to="/expenses">
            <DashCard
              value="2,281.00"
              description="Expenses"
              iconName="bi bi-pie-chart"
            />
          </NuxtLink>
        </div>

        <div class="noteCard">
          <DashCard
            value="1,200.00"
            description="Todays Loses"
            iconName="bi bi-arrow-bar-down"
          />
        </div>
        <div class="noteCard">
          <NuxtLink to="/request-page">
            <DashCard
              value="51,200.00"
              description="Total requests "
              iconName="bi
          bi-box-seam"
            />
          </NuxtLink>
        </div>
      </div>

      <div class="p-2 gridItem gridItem2">
        <div class="d-flex justify-content-between">
          <div>
            <span><i style="font-size: 1.3rem" class="bi bi-bell"></i> </span>
            <span>2</span>
          </div>
          <div class="">
            <button class="customBtn" @click="showAddBranch = !showAddBranch">
              Add Branch
            </button>

            <NuxtLink to="/branch-login">
              <button class="customBtn">Login to branch</button>
            </NuxtLink>
          </div>
        </div>
        <div><label> new requests</label></div>
      </div>
      <div class="gridItem gridItem3 m-1 d-flex p-2">
        <div class="chartSection">
          <chartComp :chartData="chartData" :options="chartOptions" />
        </div>
        <div class="p-2">
          <div
            class="btn-group-sm d-flex flex-column"
            role="group"
            aria-label="Small button group"
          >
            <button type="button" class="btn btn-sm chartBtn">Sales</button>
            <button type="button" class="btn btn-sm chartBtn">Expenses</button>
            <button type="button" class="btn btn-sm chartBtn">Loses</button>
          </div>
        </div>
      </div>
      <div
        style="background-color: #343541; overflow-y: auto"
        class="gridItem gridItem4 p-3"
      >
        <!-- <chatComp /> -->

        <div>
          <div
            style="
              margin-bottom: 10px;
              padding-bottom: 10px;
              border-bottom: 2px solid #fff;
            "
          >
            <h1 style="color: #fff">Price Change Logs</h1>
          </div>
          <ul>
            <li
              style="
                display: block;
                width: 100%;
                height: 40px;
                margin-bottom: 5px;
                color: #fff;
                border-bottom: 0.1rem solid #866c6c;
                font-size: 0.8rem;
              "
              v-for="(log, index) in priceChangeLogs"
              :key="index"
            >
              <span style="font-weight: 400">{{ log.timestamp }}: </span>
              {{ log.user }} {{ log.action }} of {{ log.product }} from
              {{ log.old_price }} to {{ log.new_price }}
            </li>
          </ul>
        </div>
      </div>
      <div class="gridItem gridItem5">
        <div class="trendingProdClass">
          <div class="pb-2" style="font-size: 0.9rem; font-weight: 600">
            <label>Top Selling Products</label>
          </div>
          <div>
            <!-- checkboxes -->
            <!-- today, this week, month, 6 month, 1 year -->
          </div>
          <table class="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit</th>
                <th>Qty Sold</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Paracetamol</td>
                <td>tablet</td>
                <td>90</td>
              </tr>
              <tr>
                <td>Paracetamol</td>
                <td>tablet</td>
                <td>90</td>
              </tr>
              <tr>
                <td>Paracetamol</td>
                <td>tablet</td>
                <td>90</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="gridItem gridItem6"></div>
    </div>

    <!-- <div
      class="modal fade"
      id="loginToBranchModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Login branch</h5>
          <button
            type="button"
            class="btn btn-sm btn-success text-white"
            data-bs-dismiss="modal"
            aria-label=""
          >
            OK
          </button>
        </div>
        <div class="modal-content">
          <BranchLogin />
        </div>
      </div>
    </div> -->
    <transition name="fade">
      <div
        v-if="showAddBranch"
        class="animated-container d-flex justify-content-end w-100s"
      >
        <div class="">
          <button class="btn btn-sm" @click="showAddBranch = !showAddBranch">
            <i style="color: #fff" class="bi bi-x-lg"></i>
          </button>
        </div>
        <div style="height: 90%">
          <div class="" style="margin-top: 20%">
            <AddBranch />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import chartComp from "../components/chartComp.vue";
import LoginForm from "../components/LoginForm.vue";
import DashCard from "../components/UtilityComps/DashCard.vue";
import AddBranch from "../components/AddBranch.vue";
import { priceChangeLogs } from "../store/sampledb";
import { chartSampleData } from "../store/sampledb";

export default {
  components: { DashCard, LoginForm, LoginForm, AddBranch },
  computed: {},
  methods: {
    testF() {
      console.log("priceChangeLogs:", priceChangeLogs);
    },
  },
  mounted() {
    console.log("chartSampleData", chartSampleData);
  },
  data() {
    return {
      showAddBranch: false,
      priceChangeLogs: priceChangeLogs,

      chartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          ...chartSampleData,
          // {
          //   data: [100, 200, 80, 150, 300],
          //   backgroundColor: "#f87979",
          //   label: "Main Street",
          //   brderColor: "#f87979",
          // },
          // {
          //   data: [50, 150, 200, 40, 100],
          //   label: "Campus Branch",
          //   backgroundColor: "red",
          //   brderColor: "red",
          // },
          // {
          //   data: [150, 0, 70, 40, 250],
          //   label: "Madina Branch",
          //   backgroundColor: "green",
          //   brderColor: "green",
          // },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        responsive: false,
        // aspectRatio: 2,
      },
    };
  },
};
</script>
<style scoped>
.gridContainer {
  display: grid;
  height: 100%;
  grid-template-rows: 10% 60% 30%;
  grid-template-columns: 70% 30%;
  row-gap: 0.3rem;
  column-gap: 0.5rem;
}

.gridItem1 {
  background: transparent !important;
  max-width: 100%;
  box-shadow: none !important;
}

.gridItem5 {
  padding: 1rem;
}
.gridItem2 {
  display: flex;
  flex-direction: column;
  background: transparent !important;
  box-shadow: none !important;
}

.gridItem5 .trendingProdClass {
  overflow-y: auto;
  overflow-x: hidden;
}

.gridItem {
  grid-row: span 1;
  grid-column: span 1;
  background: #fff;
  border-radius: 2px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}
.chartSection {
  background: #fff;
  border-radius: 10px;
  width: 88%;
  width: 88%;
}

.noteCard {
  margin-right: 0.6rem;
}

.customBtn {
  padding: 0.5rem;
  background: hsl(264, 39%, 51%);
  color: #fff;
  transition: background 0.5s;
  border-radius: 5px;
}

.customBtn:hover {
  background: transparent;
  border: 1px solid hsl(264, 39%, 51%);
  color: hsl(264, 39%, 51%);
}

.chartVariant li {
  width: 10rem;
}

.innerGridContainer {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  overflow: hidden;
  column-gap: 5px;
}

.noteCard {
  grid-column: span 1;
}

.animated-container {
  position: absolute;
  top: 20%;
  right: 0%;
  height: 300px;
  width: 300px;
  background: #7952b3;
  background: linear-gradient(180deg, #7952b3, #c75377);
  padding: 15px;
  transform: translateX(5%);
  transition: transform 0.5s; /* Adjust the transition duration as needed */
  display: flex;
  align-items: center;
  border: 2px solid hsl(264, 39%, 51%);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.chartBtn {
  font-size: 0.8rem;
  border-bottom: hsl(264, 39%, 51%) 1px solid;
  border-radius: 0% !important;
}
</style>
