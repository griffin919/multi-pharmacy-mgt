<template>
    <div>
      <div class="container-fluid">
        <div class=" ">
          <div class="card h-100">
            <div class="card-body">
              <div class="">
                <div class="">
                  <div style="display: flex; margin: 10px">
                    <div style="width: 70%">
                      <h3 style="align-content: flex-start" class="">Users</h3>
                    </div>
                    <div style="margin-left: 5%">
                      <button
                        @click="loadUsers"
                        role="button"
                        class="btn rounded-1 btn-primary"
                      >
                        Load Users
                      </button>
                    </div>
                    <div style="margin-left: 5%">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#addUserModal"
                        role="button"
                        class="btn rounded-1 btn-primary"
                      >
                        Add User
                      </button>
                    </div>
                  </div>
                  <!-- <div>
                    <input type="text" name="" id="" placeholder="Search User">
                    <button  class="btn rounded-1 btn-outline-primary">Search User</button>
                    <button data-bs-toggle="modal" data-bs-target="#addUserModal" role="button" class="btn rounded-1 btn-outline-primary">Add User</button>
                  </div> -->
                </div>
  
                <table class="table table-hover table-responsive">
                  <thead>
                    <tr>
                      <th
                        id="userTh"
                        scope="col"
                        class="col-3 fw-normal text-primary"
                      >
                        User
                      </th>
                      <!-- <th id="otherTh" scope="col" class="col-2 fw-normal text-primary">Access Level</th> -->
                      <th
                        id="otherTh"
                        scope="col"
                        class="col-2 fw-normal text-primary"
                      >
                        Manage
                      </th>
                      <th
                        id="otherTh"
                        scope="col"
                        class="col-2 fw-normal text-primary"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style="vertical-align: baseline; padding: 4px"
                      v-for="user in userlist"
                      :key="user.id"
                    >
                      <td id="userTh">
                        <img
                          style="margin-right: 10px"
                          data-bs-toggle="modal"
                          data-bs-target="#editUserImg"
                          role="button"
                          id="userimgCon"
                          :src="$store.state.urlBase + 'adpic?id=' + user.user.id"
                          class="img-fluid"
                        />
                        {{
                          user.user.lname +
                          " " +
                          user.user.sname +
                          " " +
                          user.user.mname
                        }}
                      </td>
                      <!-- <td id="otherTh">
                    <span v-if="user.active.issystemadmin">Full Access</span>
                    <span v-else>{{ getRoleName(user.active.roleid) }}</span>
                    <span class="glyphicon glyphicon-pencil"></span>
                    </td> -->
                      <td id="otherTh">
                        <div class="dropdown">
                          <button
                            class="btn rounded-1 btn-primary"
                            style=""
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Manage User
                          </button>
                          <ul
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li @click="editUser(user)" role="button">
                              <span class="dropdown-item">Edit user info</span>
                            </li>
                            <li
                              v-if="!user.active.issystemadmin"
                              @click="editUserRole(user)"
                              role="button"
                            >
                              <span class="dropdown-item">Edit user roles</span>
                            </li>
                            <li
                              v-if="!user.active.issystemadmin"
                              @click="delUser(user)"
                              role="button"
                            >
                              <span class="dropdown-item">Delete user</span>
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td id="otherTh">
                        <button
                          v-if="!user.active.issystemadmin"
                          style="width: 90px; color: #fff"
                          :class="[
                            user.active.isactive
                              ? 'btn rounded-1 btn-success'
                              : 'btn rounded-1 btn-danger',
                          ]"
                          @click="toggle(user)"
                        >
                          {{ user.active.isactive ? "ACTIVE" : "INACTIVE" }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
              ></button>
            </div>
            <div class="modal-body">
              <AddUserForm :users="userlist" />
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
              ></button>
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
              ></button>
            </div>
            <div class="modal-body">
              <EditUserRole :selectedUser="selectedUser" />
            </div>
          </div>
        </div>
      </div>
  
      <!-- Edit User Image -->
      <div
        class="modal fade"
        id="editUserImg"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Select User Image
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <EditUserImage :selectedUser="selectedUser" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userlist: [],
        backupUser: {},
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
      };
    },
    mounted() {
      // console.log(this.$store.state.rolenames)
    },
    methods: {
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
    computed: {},
  };
  </script>
  
  <style scoped>
  #userimgCon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: azure;
  }
  
  #userTh {
    width: 40%;
    text-align: left;
  }
  
  #otherTh {
    width: 20%;
    text-align: center;
  }
  </style>