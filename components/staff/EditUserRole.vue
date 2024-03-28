<template>
  <div class="container-fluid">
    <div class="">
      <div class="">
        <!-- <h1 class="text-center my-5">{{selectedUser.user.sname}}</h1> -->
        <!-- <ValidationObserver v-slot="{ handleSubmit }">  -->
        <form @submit.prevent="onSubmit" class="">
          <!-- <button @click="testLog">test log</button> -->
          <!-- USER ROLE -->
          <div>
            <div style="margin-left: 0 20px; text-align: center">
              <h5>Select User Role ({{`${selectedUser.user.lname} ${selectedUser.user.sname}`}})</h5>
            </div>
          </div>

          <div
            style="display: flex; justify-content: center"
            class="form-check"
          >
            <label
              style="margin: 20px; text-align: center"
              class="form-check-label fs-5"
            >
              <input
                type="checkbox"
                value="true"
                id="admin"
                v-model="adminUser"
              />
              Admin
            </label>
          </div>

          <div v-if="adminUser"></div>
          <div class="roleCon" v-else>
            <!-- COLUMN 1id="child1" -->
            <div class="grid-container">
              <div class="form-check" v-for="role in roles" :key="role.id">
                <label class="form-check-label fs-5">
                  <input
                    type="checkbox"
                    :id="role.id"
                    :value="role.id"
                    v-model="selectedRoles"
                  />
                  {{ role.name }}
                </label>
              </div>
            </div>
          </div>

          <div class="d-flex mt-2 justify-content-center">
            <input
              @click="onSubmit"
              type="button"
              class="col-5 text-white btn btn-primary"
              value="Update User Role"
            />
          </div>
        </form>
        <!-- </ValidationObserver> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedUser: Object,
  },
  data() {
    return {
      selectedRoles: [],
      formData: {
        userRole: "",
      },
      adminUser: false,
      selectedRole: "",
      roles: [],

      responseMessageTrue: "User added successfully.",
      responseMessageFalse: "User not added.",
    };
  },
  async mounted() {
    
    let page = this;
    try {
      setTimeout(() => {
        $("#editUserRole").on("shown.bs.modal", function () {
          let privillage = page.selectedUser.active;
          if (privillage.issystemadmin === true) {
            page.adminUser = true;
          } else {
            page.adminUser = false;
          }
          page.selectedRoles = [];
          for (const rol of page.selectedUser.roles) {
            page.selectedRoles.push(rol.roleid);
          }
          console.log(page.selectedRoles);
        });
      }, 200);
    } catch (error) {}

    try {
      // console.log("in edit role "+this.$store.state.urlBase+'rest/nad/roles');
      let response = await this.$axios.get(
        this.$store.state.urlBase + "rest/nad/roles"
      );

      let data = response.data;
      this.roles = response.data.data;
      console.log(response);
      if (data) {
        // console.log(response);
        //  this.$store.commit('updateExpensesList',response.data.data)
      }
    } catch (error) {
      console.log(error);
      this.error = error.message;
      this.roles = [];
    }
  },
  methods: {
    testLog(){
      console.log(this.selectedUser)
    },
    //validatepassword
    validatePassword() {
      if (this.passwd != this.confirmpasswd) {
        alert("Passwords did not match");
      } else {
        alert("Password created successfully");
      }
    },

    async onSubmit() {
      let axios = this.$axios;
      let state = this.$store.state;
      let item = this.selectedUser;
      let page = this;
      let info = "Are you sure you want to update roles?";
      this.$store.commit("changeDialog", info);
      let func = {};
      let upload = {};
      if (this.adminUser) {
        upload.value = [];
      } else {
        upload.value = this.selectedRoles;
      }
      upload.isadmin = this.adminUser;
      upload.id = this.selectedUser.user.id;
      console.log(upload);
      func.yesfunc = async function () {
        try {
          // $("#waitdailog").modal('show')
          page.$store.commit("changeDialog", "Please wait!");
          page.$store.commit("showWait");
          // nad/updaterole
          // process.env.NUXT_ENV_UPDATE_EXPENSE
          let response = await axios.post(
            state.urlBase + "rest/nad/updaterole",
            upload
          );
          let data = response.data;
          // console.log(data)

          await $("#editUserRole").modal("hide");

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
          setTimeout(() => {
            $("#waitdailog").modal("hide");
          }, 200);
        }
      };

      func.nofunc = async function () {};

      this.$store.commit("OpenYesOrNOClick", func);
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  grid-auto-rows: minmax(40px, auto);
}
.roleCon {
  display: flex;
  margin: 10px;
  justify-content: space-evenly;
}
</style>