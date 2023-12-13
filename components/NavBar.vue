<!-- @@ -1,208 +1,115 @@ -->
<template>
  <div>
    <common />
    <div class="container-fluid">
      <div class="card">
        <nav
          class="card-body nav nav-pills nav-justified d-flex align-items-center"
        >
          <div
            class="text-capitalise d-flex align-items-center me-1 fw-bold fs-5"
          >
            <i class="bi text-danger fs-3 bi-patch-plus-fill me-2"></i>
            <!-- <i class="bi text-info bi-file-medical-fill"></i> -->
            <span class="text-success pe-2">
              <!-- Arzthena Pharmacy -->
              Rigel OS
            </span>
          </div>

          <div class="col-8 d-flex justify-content-between">
            <div class="" v-for="role in allRoles" :key="role.roleid">
              <nuxt-link
                v-if="role.tag == 'staff' && role.hassub == false"
                :to="role.address"
                class="nav-link"
                >{{ role.name }}</nuxt-link
              >
            </div>
          </div>
          <li
            class="nav-item dropdown col-1"
            v-if="this.$store.state.admincount > 0"
          >
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navrDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <div v-for="role in staffRole" :key="role.roleid">
                <li>
                  <nuxt-link :to="role.address" class="nav-link">{{
                    role.name
                  }}</nuxt-link>
                </li>
              </div>
            </ul>
          </li>

          <div class="col justify-content-end d-flex align-items-center">
            <div class="">
              <!-- <span class="text-primary ">F. Perez</span> <br> -->
              <li class="dropdown col-1">
                <a
                  class="text-danger dropdown-toggle"
                  href="#"
                  id="navrDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ getUser }} hello
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <span
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal43"
                      class=""
                      ><u>Logout</u></span
                    >
                  </li>
                </ul>
              </li>
            </div>
            <i class="ms-2 fs-3 bi"
              ><img
                width="32px"
                height="32px"
                :src="$store.getters.getUserImage"
            /></i>
            <!-- bi-person-circle -->
          </div>
        </nav>

        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal43"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div
                class="modal-body d-flex justify-content-between align-items-baseline"
              >
                Are you sure you want to log out?
                <div>
                  <button
                    type="button"
                    @click="runLogout"
                    class="btn btn-danger text-white"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    class="btn btn-success text-white"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async runLogout() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + process.env.NUXT_ENV_LOGOUT
        );

        console.log(response);

        if (response.data.sucessful == true) {
          console.log("Logged out");
          window.location.reload(true);
        } else {
          console.log("LOGGED IN");
        }
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
      // },
    },
  },
  computed: {
    allRoles() {
      const allRoles = this.$store.state.allRoles;
      const staffRoles = allRoles.filter((role) => role.tag === "staff");
      console.log(staffRoles);
      return staffRoles;
    },
    allRoles() {
      return this.$store.state.allRoles;
    },
    getUser() {
      let u = this.$store.state.user.user;
      if (u) {
        return u.lname + " " + u.mname + " " + u.sname;
      }
      return "";
    },
  },
};
</script>

<style></style>
