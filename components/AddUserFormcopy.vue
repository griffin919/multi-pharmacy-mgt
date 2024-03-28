<template>
  <div class="container-fluid">
    <div class="">
      <div class="">
        <!-- <h1 class="text-center my-5">Edit User</h1> -->
        <ValidationObserver v-slot="{ handleSubmit }">
          <form class="" @submit.prevent="handleSubmit(onSubmit)">
            <!-- Name -->
            <div class="row">
              <ValidationProvider
                class="col-6"
                name="users' first name"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="fname1">First Name</label>
                  <input
                    v-model="formData.fname"
                    type="text"
                    class="form-control"
                    id="fname1"
                    placeholder="First Name"
                  />
                </div>

                <div
                  id="ClientFirstNameHelp"
                  class="text-danger form-text mb-4"
                >
                  {{ errors[0] }}
                </div>
              </ValidationProvider>

              <ValidationProvider
                class="col-6"
                name="users' last name"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="lname1">Last Name</label>
                  <input
                    v-model="formData.lname"
                    type="text"
                    class="form-control"
                    id="lname1"
                    placeholder="Last Name"
                  />
                </div>

                <div id="ClientLastNameHelp" class="text-danger form-text mb-4">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <!-- Contact -->
            <div class="row">
              <!-- Email -->
              <ValidationProvider
                class="col-6"
                name="email"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="email1">Email</label>
                  <input
                    v-model="formData.email"
                    type="text"
                    class="form-control"
                    id="email1"
                    placeholder="user@email.com"
                  />
                </div>

                <div
                  id="ClientFirstNameHelp"
                  class="text-danger form-text mb-4"
                >
                  {{ errors[0] }}
                </div>
              </ValidationProvider>

              <!-- Telephone Number -->
              <ValidationProvider
                class="col-6"
                name="users' contact"
                rules="required|numeric|min10:10|max10:10"
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="tel">Mobile Number</label>
                  <input
                    v-model="formData.tel"
                    type="text"
                    class="form-control"
                    id="tel"
                    placeholder="0201231231"
                  />
                </div>

                <div id="ClientContactHelp" class="text-danger form-text mb-4">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>
            <div class="row">
              <!-- userid -->
              <ValidationProvider
                class="col-6"
                name="userid1"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="userid1">User ID</label>
                  <input
                    v-model="formData.userid"
                    type="text"
                    class="form-control"
                    id="userid1"
                    placeholder="user ID"
                  />
                </div>

                <div
                  id="ClientFirstNameHelp"
                  class="text-danger form-text mb-4"
                >
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <!-- Password -->
            <div class="row">
              <!-- Password 1 -->
              <ValidationProvider
                class="col-6"
                name="password"
                rules="required|min4:4"
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="passw">Password</label>
                  <input
                    v-model="formData.passwd"
                    type="password"
                    class="form-control"
                    id="passw"
                    placeholder="Enter password here"
                  />
                </div>

                <div
                  id="ClientFirstNameHelp"
                  class="text-danger form-text mb-4"
                >
                  {{ errors[0] }}
                </div>
              </ValidationProvider>

              <!-- Password 2 -->
              <ValidationProvider
                class="col-6"
                name="password doesn't match"
                rules="required|min4:4"
                v-slot="{ errors }"
              >
                <div class="">
                  <label class="form-label" for="cpassw"
                    >Confirm Password</label
                  >
                  <input
                    v-model="formData.confirmpasswd"
                    type="password"
                    class="form-control"
                    id="floatingInput"
                    placeholder="Enter password again here"
                  />
                </div>

                <div id="ClientContactHelp" class="text-danger form-text mb-4">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
            </div>

            <div class="d-flex mt-2 justify-content-center">
              <input
                @click="handleSubmit(onSubmit)"
                type="submit"
                class="col-5 text-white btn btn-primary"
                value="Add New User"
              />
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
// import {ValidationObserver} from '../../plugins/vee-validate.js'

import { defineComponent } from 'vue';
import { useForm, useField, ValidationProvider, ValidationObserver, } from 'vee-validate';

// import { ValidationObserver } from "vee-validate";

export default {
  components: {ValidationObserver, ValidationProvider},
  props: {
    users: [],
  },
  data() {
    return {
      formData: {
        fname: "",
        lname: "",
        email: "",
        tel: "",
        passwd: "",
        confirmpasswd: "",
        userRole: "",
        userid: "",
      },
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
  methods: {
    //validatepassword
    validatePassword() {
      if (this.passwd != this.confirmpasswd) {
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
      // console.log(this.selectedUser);
      let axios = this.$axios;
      let state = this.$store.state;
      let item = this.formData;
      let page = this;
      let info = "Are you sure you want to add " + item.fname + "?";
      this.$store.commit("changeDialog", info);
      let func = {};
      func.yesfunc = async function () {
        try {
          // $("#waitdailog").modal('show')
          page.$store.commit("changeDialog", "Please wait!");
          page.$store.commit("showWait");
          // console.log(item)
          let send = {};
          send.user = {
            centre: 1,
            id: "",
            lname: item.lname,
            mname: "",
            passw: item.passwd,
            sname: item.fname,
            userid: item.userid,
          };
          send.emails = [item.email];
          send.addre = [];
          send.contacts = [item.tel];
          send.changePassw = false;
          send.changeUserID = false;
          send.olduserid = item.userid;
          // Object.assign({},item)

          let response = await axios.post(
            state.urlBase + "rest/nad/updateuser",
            send
          );
          let data = response.data;

          if (data.sucessful) {
            page.users.unshift(data.data);
            page.formData = {
              fname: "",
              lname: "",
              email: "",
              tel: "",
              passwd: "",
              confirmpasswd: "",
              userRole: "",
              userid: "",
            };
          }

          await $("#addUserModal").modal("hide");
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

      this.$store.commit("OpenYesOrNOClick", func);
    },
  },
};
</script>

<style scoped>
.roleCon {
  display: flex;
}

#imgCon {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>