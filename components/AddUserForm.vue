<template>
  <div class="container-fluid">
    <div class="">
      <div class="">
        <!-- <h1 class="text-center my-5">Edit User</h1> -->
        <div>
            <!-- Name -->
            <div class="row">
              <div
                class="col-6"
                name="users' first name"
                rules="required"
             
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
              
                </div>
              </div>

              <div
                class="col-6"
                name="users' last name"
                rules="required"
            
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
              </div>
            </div>

            <!-- Contact -->
            <div class="row">
              <!-- Email -->
              <div
                class="col-6"
                name="email"
              >
                <div class="">
                  <label class="form-label" for="email">Email</label>
                  <input
                    v-model="formData.email"
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="user@email.com"
                  />
                </div>

              </div>

              <!-- Telephone Number -->
              <div
                class="col-6"
                name="users' contact"
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

              </div>
            </div>
            <div class="row">
              <!-- userid -->
              <div
                class="col-6"
                name="userid1"
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
              </div>
            </div>

            <!-- Password -->
            <div class="row">
              <!-- Password 1 -->
              <div
                class="col-6"
                name="password"
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
              </div>

              <!-- Password 2 -->
              <div
                class="col-6"
                name="password doesn't match"
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
              </div>
            </div>

            <div class="d-flex mt-2 justify-content-center">
              <input
                @click="onSubmit"
                type="submit"
                class="col-5 text-white btn btn-primary"
                value="Add New User"
              />
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
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
            // $("#waitdailog").modal("hide");
            setTimeout(() => {
              // data.message
              page.$store.commit("showMessage", data.message);
            }, 200);
          }, 500);
          //
        } catch (error) {
          console.log(error);
          this.error = error.message;
          // $("#waitdailog").modal("hide");
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