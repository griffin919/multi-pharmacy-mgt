<template>
  <div class="ml-4 mr-4 parent">
    <!-- Header -->
    <div class="mt-3 mb-2 row d-flex align-items-center">
      <div class="col-4 pageTitleText w-50">
        <p>Staff Management</p>
      </div>
      <div class="col-4 tabBar" style="display: flex; justify-content: center">
        <div class="input-group">
          <i class="input-group-text bi bi-search"></i>
          <!-- autofocus="autofocus" -->
          <input
            @keyup.enter=""
            @input=""
            v-model="searchTerm"
            style="border: #ced4da 1px solid; margin-left: 3px"
            type="text"
            class="form-control input-sm border"
            id=""
            placeholder="Search for staff"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>

      <div class="col-4 d-flex align-items-center justify-content-end">
        <!-- <select
          class="form-select form-select-sm"
          id="selectFilter"
          aria-label=".form-select-sm example"
        >
          <option selected>Filter by branch</option>
          <option v-for="branch in branches" value="branch.id">
            {{ branch.name }}
          </option>
        </select> -->

        <button
          data-bs-toggle="modal"
          data-bs-target="#addUserModal"
          role="button"
          style="margin-left: 20px;"
          class="btn rounded-1 btn-primary"
        >
          Add User
        </button>
      </div>
    </div>

    <!-- product search for price change -->
    <div id="pageBody" style="">
      <div class="tableContainer">
        <table class="tabCon table mt-2;">
          <thead>
            <tr>
              <th style="width: 5%">#</th>
              <th style="width: 10%" class="text-center">Staff ID</th>
              <th style="width: 25%" class="text-center">Name</th>
              <th style="width: 10%" class="text-center">Branches</th>
              <th style="width: 10%" class="text-center">Access Level</th>
              <th style="width: 30%" class="text-center"></th>
              <th style="width: 10%" class="text-center"></th>
              <th style="width: 5%" class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in userlist" :key="index" @click="handleSelectedUser(user)">
              <td>{{ index + 1}}</td>
              <td class="text-center">{{user.user.userid}}</td>
              <td  class="text-center">{{`${user.user.lname} ${user.user.sname}`}} </td>
              <td class="text-center">2</td>
              <td class="text-center">{{ user.active.roleid }}</td>
              <td class="text-center"></td>
              <td class="text-center">   
                <button v-if="!user.active.issystemadmin" @click="editUserRole(user)">
                <!-- <button data-bs-toggle="modal" data-bs-target="#editUserModal" > -->
                  Edit Roles
                </button>
              </td>
              <td class="text-center">
                <button data-bs-toggle="modal" @click="editUser(user)">
                <!-- <button data-bs-toggle="modal" data-bs-target="#editUserModal" > -->
                  Manage
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add User Modal -->
    <div
      class="modal fade"
      id="addUserModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >x</button>
          </div>
          <div class="modal-body">
            <AddUserForm :users="userlist" />
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Role Modal -->
    <div
      class="modal fade"
      id="editUserRole"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Select User Role</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >x</button>
          </div>
          <div class="modal-body">
            <EditUserRole :selectedUser="selectedUser" />
          </div>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div
      class="modal fade"
      id="editUserModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >x</button>
          </div>
          <div class="modal-body">
            <EditUserForm
              :selectedUser="selectedUser"
              :backupUser="backupUser"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- View Staff Info -->
    <!-- <div
      class="modal fade changePrice-modal-lg"
      tabindex="-1"
      role="dialog"
      id="staffInfoModal"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content d-flex flex-columns">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Staff Details</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div class="modal-body">
            <table class="">
              <tbody>
                <tr>
                  <td class="fw-bold">ID:</td>
                  <td>Efiekuma1</td>
                  <td class="fw-bold">Name:</td>
                  <td>Kofi Kinaata</td>
                </tr>
                <tr>
                  <td class="fw-bold">Role:</td>
                  <td>Admin</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr class="border-top">
                  <td class="fw-bold">Associated Branches:</td>
                  <td>
                    <ul>
                      <li>
                        <span>Branch One</span
                        ><button
                          style="
                            padding: 5px;
                            margin-left: 10px;
                            background: transparent;
                          "
                        >
                          <i class="bi bi-x-lg"></i>
                        </button>
                      </li>
                      <li>
                        <span>Branch Two</span
                        ><button
                          style="
                            padding: 5px;
                            margin-left: 10px;
                            background: transparent;
                          "
                        >
                          <i class="bi bi-x-lg"></i>
                        </button>
                      </li>
                      <li><button>Add to Branch</button></li>
                    </ul>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Transfer Staff -->
    <!-- <div
      class="modal fade changePrice-modal-lg"
      tabindex="-1"
      role="dialog"
      id="transferStaffModal"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content d-flex flex-columns">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Transfer Staff</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div class="modal-body">
            <table class="">
              <tbody>
                <tr >
                  <td class="fw-bold">ID:</td>
                  <td>Efiekuma1</td>
                  <td class="fw-bold">Branches:</td>
                  <td>
                    <select
                      class="form-select form-select-sm"
                      id="selectFilter"
                      aria-label=".form-select-sm example"
                    >
                      <option selected>Select branch</option>
                      <option v-for="branch in branches" value="branch.id">
                        {{ branch.name }}
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><button>Transfer</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<style scoped>
#pageBody {
  border: 1px solid rgba(60, 64, 67, 0.3);
  padding: 10px;
  border-radius: 10px;
  min-height: 80vh;
}

#pageBody .table thead th {
  background-color: transparent !important;
  color: #6d6f72;
  padding: 20px;
  text-align: left;
  border: 0;
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

thead {
  position: sticky;
  /* make the table heads sticky */
  top: 0px;
  /* table head will be placed from the top of the table and sticks to it */
}

#selectFilter {
  padding: 10px 20px;
}

button {
  font-size: 0.8rem;
  color: #fff;
  background-color: #8e44ad;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

table th,
table td {
  padding: 10px 16px;
  vertical-align: middle;
  font-size: 0.8rem;
  padding: 0.3rem !important;
  vertical-align: middle !important;
}

#staffInfoModal table tr {
  padding: 20px 10px;
}

#staffInfoModal table tr li {
  padding: 5px 0;
}

#staffInfoModal table tr li i {
  color: red;
}
</style>

<script>
import selectBranches from "../components/elements/selectBranches.vue";
import { branches } from "../store/sampledb";
import EditUserForm from '../components/staff/EditUserForm.vue';
import EditUserRole from '../components/staff/EditUserRole.vue';


export default {
  components: { EditUserForm, EditUserRole },

  data() {
    return {
      searchTerm: "",
      branches: branches,
      searchStart: false,
      userlist: [],
      selectedUser: {
        contacts: [
          {
            adminid: "0",
            ddate: "2023-02-06T16:59:47.000+0000",
            tel: "",
            id: 1,
          },
        ],
        email: [
          {
            adminid: "0",
            ddat: "2023-02-06T16:59:47.000+0000",
            email: "",
            id: 1,
          },
        ],
        privillage: {
          accessjson: "[]",
          adminid: 1,
          eccode: "0",
          id: 1,
          isadmin: true,
        },
        roles: [],
        user: {
          centre: 1,
          id: 1,
          lname: "",
          mname: "",
          passw: "",
          sname: "",
          userid: "",
        },
        active: {
          adminid: 1,
          id: 1,
          isactive: true,
          roleid: 1,
        },
      },
      backupUser: {}
    };
  },

  mounted() {
    this.loadUsers();
  },

  computed: {},

  methods: {
    logSomefin1() {
      console.log("🚀 ~ logSomefin ~ logSomefin:");
    },

    handleSelectedUser(user){
      this.selectedUser = user;
    },

    async loadUsers() {
      try {
        this.$store.commit("changeDialog", "Please wait!");
        this.$store.commit("showWait");
        let response = await this.$axios.get(
          this.$store.state.urlBase + "rest/nad/users"
        );
        let data = response.data.sucessful;
        // console.log(response.data.data);
        this.userlist = response.data.data;
        console.log("🚀 ~ loadUsers ~ this.userlist:", this.userlist);

        if (data) {
          //  this.$store.commit('updateExpensesList',response.data.data)
        }
      } catch (error) {
        this.error = error.message;
      }
      setTimeout(() => {
        $("#waitdailog").modal("hide");
      }, 500);
    },

    delUser(user) {
      let axios = this.$axios;
      let state = this.$store.state;
      let item = this.selectedUser;
      let page = this;
      let info =
        "Are you sure you want to delete " +
        (user.user.lname + " " + user.user.sname + " " + user.user.mname) +
        " ?";
      this.$store.commit("changeDialog", info);
      let func = {};
      func.yesfunc = async function () {
        try {
          // $("#waitdailog").modal('show')
          page.$store.commit("changeDialog", "Please wait!");
          page.$store.commit("showWait");
          // process.env.NUXT_ENV_UPDATE_EXPENSE
          let response = await axios.post(
            state.urlBase + "rest/nad/deluser/" + user.user.id,
            {}
          );
          let data = response.data;

          //  console.log(data)
          if (data.sucessful) {
            try {
              var idx = page.userlist.indexOf(user);
              if (idx !== -1) {
                page.userlist.splice(idx, 1);
              }
            } catch (error) {}

            // user.active.isactive = !user.active.isactive ;
          }
          setTimeout(() => {
            $("#waitdailog").modal("hide");
            setTimeout(() => {
              // data.message
              page.$store.commit("showMessage", data.message);
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
    },

    getRoleName(roleid) {
      var name = "";
      this.$store.state.rolenames.forEach((r) => {
        if (r.id === roleid) {
          // console.log(roleid)
          name = r.name;
        }
      });
      return name;
    },
    editUser(user) {
      this.selectedUser = user;
      this.backupUser = Object.assign({}, user);
      let e = user.email[0];
      if (e) {
      } else {
        user.email[0] = {};
        user.email[0].email = "";
      }

      let t = user.contacts[0];
      if (t) {
      } else {
        user.contacts[0] = {};
        user.contacts[0].tel = "";
      }

      // console.log(user)
      $("#editUserModal").modal("show");
    },
    editUserRole(user) {
      this.selectedUser = user;
      // console.log(user)
      $("#editUserRole").modal("show");
    },
   
    toggle(user) {
      let axios = this.$axios;
      let state = this.$store.state;
      let item = this.selectedUser;
      let page = this;
      let info =
        "Are you sure you want to mark " +
        (user.user.lname + " " + user.user.sname + " " + user.user.mname) +
        " " +
        (user.active.isactive ? "active" : "inactive") +
        " ?";
      this.$store.commit("changeDialog", info);
      let func = {};
      func.yesfunc = async function () {
        try {
          // $("#waitdailog").modal('show')
          page.$store.commit("changeDialog", "Please wait!");
          page.$store.commit("showWait");
          // process.env.NUXT_ENV_UPDATE_EXPENSE
          let response = await axios.post(
            state.urlBase +
              "rest/nad/changeactive/" +
              user.user.id +
              "/1/" +
              !user.active.isactive,
            {}
          );
          let data = response.data;

          //  console.log(data)
          if (data.sucessful) user.active.isactive = !user.active.isactive;

          setTimeout(() => {
            $("#waitdailog").modal("hide");
            setTimeout(() => {
              // data.message
              page.$store.commit("showMessage", data.message);
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
    },
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
          this.$store.commit("setProducts", resList);
          this.searchDone = true;
          this.searchStart = true;
        } catch (error) {
          this.error = error.message;
        }
      }
    },
  };
</script>
