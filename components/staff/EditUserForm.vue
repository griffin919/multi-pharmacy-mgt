<template>
  <div>
    <div>
      <table class="">
        <tbody>
          <tr>
            <td>
              <div class="">
                <label class="form-label" for="sname">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="fname"
                  placeholder="First Name"
                  v-model="selectedUser.user.sname"
                />
                <!-- <input v-model="selectedUser.user.lname" type="text" class="form-control" id="fname" placeholder="First Name"> -->
              </div>
            </td>
            <td>
              <div class="">
                <label class="form-label" for="lname">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="lname"
                  placeholder="Last Name"
                  v-model="selectedUser.user.lname"
                />
                <!-- <input v-model="selectedUser.user.lname" type="text" class="form-control" id="lname" placeholder="Last Name"> -->
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="">
                <label class="form-label" for="email">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="user@email.com"
                  v-model="userEmail"
                  />
                  <!-- v-model="selectedUser.email[0].email != undefined ? selectedUser.email[0].email : ''" -->
              </div>
            </td>
            <td>
              <div class="">
                <label class="form-label" for="mnumber">Mobile Number</label>
                <input
                  type="text"
                  class="form-control"
                  id="mnumber"
                  placeholder="0201231231"
                  v-model="selectedUser.contacts[0].tel"
                />
                <!-- <input v-model="selectedUser.contacts[0].tel" type="text" class="form-control" id="mnumber" placeholder="0201231231"> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="padding: 10px 0" class="border">
      <div style="display: flex; justify-content: center">
        <p style="font-size: 1rem">Assign to Branches</p>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td colspan="2">
                <div
                  id="checkboxDiv"
                  class=""
                  style="display: flex; justify-content: center"
                >
                <!-- v-if="!selectedUser.active.issystemadmin" -->
                <label
                    @click="toggle(selectedUser, branch.name)"
                    class="cl-checkbox"
                    v-for="branch in branches"
                    :key="branch.id"
                    style="display: flex; align-items: center"
                  >
                    <input checked="" type="checkbox" id="assignBranch"  v-model="selectedUser.active.isactive"/>
                    <span> {{ branch.name }} </span>
                  </label>


                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <div
                style="display: flex; justify-content: center"
                class="form-check"
                id="checkboxDiv"
              >
                <label
                  class="cl-checkbox"
                  style="display: flex; align-items: center"
                >
                  <input
                    id="changepass"
                    v-model="changepass"
                    checked=""
                    type="checkbox"
                  />
                  <span> Change Login Password </span>
                </label>
              </div>
            </td>
            <td>
              <div id="checkboxDiv">
                <label
                  class="cl-checkbox"
                  style="display: flex; align-items: center"
                >
                  <input
                    id="changeuserid"
                    v-model="changeuserid"
                    checked=""
                    type="checkbox"
                  />
                  <span> Change Login Password </span>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="changepass">
      <table>
        <tbody>
          <tr>
            <td>
              <div class="">
                <label class="form-label" for="passw">New Password</label>
                <input
                  v-model="selectedUser.user.passw"
                  type="password"
                  class="form-control"
                  id="passw"
                  placeholder="Enter password here"
                />
              </div>
            </td>
            <td>
              <div class="">
                <label class="form-label" for="cpassw">Confirm Password</label>
                <input
                  v-model="confirmpasswd"
                  type="password"
                  class="form-control"
                  id="cpassw"
                  placeholder="Enter password again here"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="changeuserid">
      <table>
        <tbody>
          <tr>
            <td>
              <label class="form-label" for="nuserid">New User ID</label>
              <input
                v-model="selectedUser.user.userid"
                type="text"
                class="form-control"
                id="nuserid"
              />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="display: flex; justify-content: center">
      <button class="border" style="padding: 8px 100px" @click="onSubmit">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { branches } from "../../store/sampledb";

export default {
  props: {
    selectedUser: { user: { fname: "" } },
    backupUser: {},
  },

  data() {
    return {
      // selectedUser: selectedUser,
      branches: branches,
      changeuserid: false,
      changepass: false,
      confirmpasswd: "",
      user: {},
      olduserid: "",
      oldpassw: "",
      selectedRole: "",
      userRole: "",
      basic: "",
      supervisor: "",
      manager: "",
      admin: "",

      responseMessageTrue: "User added successfully.",
      responseMessageFalse: "User not added.",
    };
  },

  computed: {
    userEmail: {
    get() {
      // If selectedUser.email[0] exists, return its email property. Otherwise, return an empty string.
      return this.selectedUser.email && this.selectedUser.email[0]
        ? this.selectedUser.email[0].email
        : '';
    },
    set(newValue) {
      // If selectedUser.email[0] exists, set its email property to the new value.
      if (this.selectedUser.email && this.selectedUser.email[0]) {
        this.selectedUser.email[0].email = newValue;
      }
    }
  }
  },

  methods: {
    logSome() {
      console.log("hello, dreamville", this.selectedUser.user.lname);
    },
    toggle(user,branchname) {
      let axios = this.$axios;
      let state = this.$store.state;
      let item = this.selectedUser;
      let page = this;
      let info =
        "Are you sure you want to " + (user.active.isactive ? "unasign " : "assign ") +
        (user.user.lname + " " + user.user.sname + " " + user.user.mname) +
        " " +  (user.active.isactive ? "from " : "to ")  + branchname
        // (user.active.isactive ? "active" : "inactive") +
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
    validatePassword() {
      if (this.selectedUser.user.passwd != this.confirmpasswd) {
        alert("Passwords did not match");
      } else {
        alert("Password created successfully");
      }
    },
    //CALIDATE USER ROLE
    setUserRole() {
      if (this.selectedRole === "basic") {
        this.userRole = basic;
      } else if (this.selectedRole === "supervisor") {
        this.userRole = supervisor;
      } else if (this.selectedRole === "manager") {
        this.userRole = manager;
      } else if (this.selectedRole === "admin") {
        this.userRole = admin;
      }
    },
    async onSubmit() {
      let axios = this.$axios;
      let state = this.$store.state;
      let item = this.selectedUser;
      let page = this;
      let info = "Are you sure you want to update?";
      this.$store.commit("changeDialog", info);
      let func = {};
      func.yesfunc = async function () {
        try {
          // $("#waitdailog").modal('show')
          page.$store.commit("changeDialog", "Please wait!");
          page.$store.commit("showWait");
          let send = {};
          send.user = item.user;
          send.emails = [item.email[0].email];
          send.addre = [];
          send.contacts = [item.contacts[0].tel];
          send.changePassw = page.changepass;
          send.changeUserID = page.changeuserid;
          send.olduserid = page.backupUser.user.userid;
          // Object.assign({},item)
          // console.log(send)
          let response = await axios.post(
            state.urlBase + "rest/nad/updateuser",
            send
          );
          let data = response.data;
          // console.log(data)

          await $("#editUserModal").modal("hide");
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
};
</script>

<style>
table tr td {
  padding: 10px 0;
}
#checkboxDiv label {
  margin: 10px 20px;
  font-size: 0.9rem;
}

label {
  font-size: 0.9rem;
}

#checkboxDiv span {
  display: flex;
  align-items: center;
}

.cl-checkbox {
  position: relative;
  display: inline-block;
}

/* Input */
.cl-checkbox > input {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  z-index: -1;
  position: absolute;
  left: -10px;
  top: -8px;
  display: block;
  margin: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: none;
  outline: none;
  opacity: 0;
  transform: scale(1);
  pointer-events: none;
  transition: opacity 0.3s, transform 0.2s;
}

/* Span */
.cl-checkbox > span {
  display: inline-block;
  width: 100%;
  cursor: pointer;
}

/* Box */
.cl-checkbox > span::before {
  content: "";
  display: inline-block;
  box-sizing: border-box;
  margin: 3px 11px 3px 1px;
  border: solid 2px;
  /* Safari */
  border-color: rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  width: 18px;
  height: 18px;
  vertical-align: top;
  transition: border-color 0.2s, background-color 0.2s;
}

/* Checkmark */
.cl-checkbox > span::after {
  content: "";
  display: block;
  position: absolute;
  top: 3px;
  left: 1px;
  width: 10px;
  height: 5px;
  border: solid 2px transparent;
  border-right: none;
  border-top: none;
  transform: translate(3px, 4px) rotate(-45deg);
}

/* Checked, Indeterminate */
.cl-checkbox > input:checked,
.cl-checkbox > input:indeterminate {
  background-color: #7851b3;
}

.cl-checkbox > input:checked + span::before,
.cl-checkbox > input:indeterminate + span::before {
  border-color: #7851b3;
  background-color: #7851b3;
}

.cl-checkbox > input:checked + span::after,
.cl-checkbox > input:indeterminate + span::after {
  border-color: #fff;
}

.cl-checkbox > input:indeterminate + span::after {
  border-left: none;
  transform: translate(4px, 3px);
}

/* Hover, Focus */
.cl-checkbox:hover > input {
  opacity: 0.04;
}

.cl-checkbox > input:focus {
  opacity: 0.12;
}

.cl-checkbox:hover > input:focus {
  opacity: 0.16;
}

/* Active */
.cl-checkbox > input:active {
  opacity: 1;
  transform: scale(0);
  transition: transform 0s, opacity 0s;
}

.cl-checkbox > input:active + span::before {
  border-color: #7851b3;
}

.cl-checkbox > input:checked:active + span::before {
  border-color: transparent;
  background-color: rgba(0, 0, 0, 0.6);
}

/* Disabled */
.cl-checkbox > input:disabled {
  opacity: 0;
}

.cl-checkbox > input:disabled + span {
  color: rgba(0, 0, 0, 0.38);
  cursor: initial;
}

.cl-checkbox > input:disabled + span::before {
  border-color: currentColor;
}

.cl-checkbox > input:checked:disabled + span::before,
.cl-checkbox > input:indeterminate:disabled + span::before {
  border-color: transparent;
  background-color: currentColor;
}
</style>
