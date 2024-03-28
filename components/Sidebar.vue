<template>
  <div>
    <div
      :class="['sidebar', { active: isSidebarActive }]"
      @mouseenter="isSidebarActive = true"
      @mouseleave="isSidebarActive = false"
      style="overflow: hidden"
    >
      <div class="top">
        <div class="logo">
          <nuxt-link to="/">
            <img src="~/assets/rigellogo.png" class="rlogo" />
          </nuxt-link>
          <span class="rName">Rigel OS</span>
        </div>
        <!-- <i class="bx bx-menu" id="btn" @click="toggleSidebar"></i> -->

        <nuxt-link to="/">
          <img src="~/assets/rigellogo.png" id="btn" />
        </nuxt-link>
      </div>

      <div class="userRoleContainer mt-3">
        <ul>
          <li>
            <nuxt-link
              to="/"
              :class="{
                'nav-link': true,
                // active: role.address === selectedRoleAddress,
              }"
            >
              <div class="role-wrapper">
                <i class="bi bi-clipboard-data icon"></i>
                <span class="iconName">Dashboad</span>
              </div>
              <span class="tooltip"> Dashboad </span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/branch-summaries"
              :class="{
                'nav-link': true,
                // active: role.address === selectedRoleAddress,
              }"
            >
              <div class="role-wrapper">
                <i class="bi bi-receipt icon"></i>
                <span class="iconName">Summary</span>
              </div>
              <span class="tooltip"> Summary </span>
            </nuxt-link>
          </li>
       
          <li>
            <nuxt-link
              to="/master-price"
              :class="{
                'nav-link': true,
                // active: role.address === selectedRoleAddress,
              }"
            >
              <div class="role-wrapper">
                <i class="bi bi-tag icon"></i>
                <span class="iconName">Price</span>
              </div>
              <span class="tooltip"> Price </span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/staff"
              :class="{
                'nav-link': true,
                // active: role.address === selectedRoleAddress,
              }"
            >
              <div class="role-wrapper">
                <i class="bi bi-people"></i>
                <span class="iconName">Staff</span>
              </div>
              <span class="tooltip"> Staff </span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/transfers"
              :class="{
                'nav-link': true,
                // active: role.address === selectedRoleAddress,
              }"
            >
              <div class="role-wrapper">
                <i class="bi bi-send"></i>
                <span class="iconName">Transfers</span>
              </div>
              <span class="tooltip"> Transfers </span>
            </nuxt-link>
          </li>
          
          <li>
            <nuxt-link
              to="/products"
              :class="{
                'nav-link': true,
                // active: role.address === selectedRoleAddress,
              }"
            >
              <div class="role-wrapper">
                <i class="bi bi-archive icon"></i>
                <span class="iconName">Inventory</span>
              </div>
              <span class="tooltip"> Inventory </span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/Payments"
              :class="{
                'nav-link': true,
                // active: role.address === selectedRoleAddress,
              }"
            >
              <div class="role-wrapper">
                <i class="bi bi-credit-card icon"></i>
                <span class="iconName">Payments</span>
              </div>
              <span class="tooltip"> Payments </span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/Expiry"
              :class="{
                'nav-link': true,
                // active: role.address === selectedRoleAddress,
              }"
            >
              <div class="role-wrapper">
                <i class="bi bi-card-list icon"></i>
                <span class="iconName">Expiries</span>
              </div>
              <span class="tooltip"> Expiries </span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal43"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="margin-left: 200px; padding: 10px">
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
    <div class="main-content">
      <common />
      <div>
        <div class="navBar card2">
          <div style="display: flex; justify-content: space-between">
            <div>
              <!-- <img :src="$store.getters.getUserImage" class="user-img" /> -->
              <h6 class="bold">{{ this.$store.state.pharmacyName }}</h6>
              <h6>{{ this.$store.state.pharmacyLocation }}</h6>
            </div>
            <div>
              <h6 class="bold" style="text-align: center">
                {{ currentTime }} &nbsp; {{ currentDate }}
              </h6>
              <p style="text-align: right; margin-right: 1rem; font-size: 11px">
                &nbsp; Server IP : {{ pc.ip }} Server Name:&nbsp;{{ pc.host }}
              </p>
            </div>
            <div style="display: flex">
              <img
                style="margin-right: 20px"
                :src="$store.getters.getUserImage"
                class="user-img2"
              />
              <div>
                <h6 class="bold">Welcome {{ getUser }}</h6>
                <!-- <p>{{ selectedRoleTag }}</p> -->
              </div>
              <!-- ========= log out ====== -->
              <div>
                <i
                  class="bx bx-log-out userLogOut2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal43"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import "boxicons";
export default {
  data() {
    return {
      currentTime: "",
      currentDate: "",
      isSidebarActive: false,
      selectedRoleTag: "",
      currentIndex: 0,
      listItemHeight: 50,
      selectedRoleAddress: "",
      pc: {},
    };
  },
  methods: {
    formatTime(date) {
      const hours12 = date.getHours() % 12 || 12;
      const minutes = date.getMinutes();
      const isAm = date.getHours() < 12;
      return `${hours12.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
    },
    formatDate(date) {
      const DAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${DAYS[date.getDay()]}, ${
        MONTHS[date.getMonth()]
      } ${date.getDate()} ${date.getFullYear()}`;
    },
    updateTimeAndDate() {
      const now = new Date();
      this.currentTime = this.formatTime(now);
      this.currentDate = this.formatDate(now);
    },
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
      this.selectedRoleAddress = "";
    },

    async runLogout() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + process.env.NUXT_ENV_LOGOUT
        );

        // console.log(response);

        if (response.data.sucessful == true) {
          // console.log("Logged out");
          window.location.reload(true);
        } else {
          // console.log("LOGGED IN");
        }
      } catch (error) {
        this.error = error.message;
        // console.log(error);
      }
      // },
    },

    async getIP() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + "pcname"
        );

        // console.log(response);

        if (response.data.sucessful == true) {
          this.pc = response.data.data;
        }
      } catch (error) {
        this.error = error.message;
        // console.log(error);
      }
      // },
    },

   
    scrollToListItem() {
      const listItems = this.$refs.listItem;
      if (listItems && listItems.length > 0) {
        listItems[0].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
  },

  computed: {
    staffRoles() {
      const allRoles = this.$store.state.allRoles;
      const staffRoles = allRoles.filter((role) => role.tag === "staff");
      // console.log(staffRoles);
      return staffRoles;
    },

    adminRoles() {
      const allRoles = this.$store.state.allRoles;
      const staffRoles = allRoles.filter((role) => role.tag === "admin");
      // console.log(allRoles);
      return staffRoles;
    },

    truncatedRoleName() {
      return function (name) {
        if (name.length > 12) {
          return name.substring(0, 14) + "..."; // Truncate to 14 letters and add ellipsis
        }
        return name;
      };
    },

    allRoles() {
      return this.$store.state.allRoles;
    },
    getUser() {
      let u = this.$store.state.user.user;
      console.log(u);
      if (u) {
        return u.lname + " " + u.mname + " " + u.sname;
        // return u.lname;
      }
      return "";
    },
  },

  watch: {
    staffRoles(newRoles) {
      const staffRole = newRoles.find((role) => role.tag === "staff");
      this.selectedRoleTag = staffRole ? staffRole.tag : "";
    },
  },

  mounted() {
    this.scrollToListItem();
    this.getIP();
    // Initial update
    this.updateTimeAndDate();

    // Schedule periodic updates every 200 milliseconds
    this.timer = setInterval(() => {
      this.updateTimeAndDate();
    }, 200);
  },
  beforeDestroy() {
    // Clear the timer when the component is destroyed to avoid memory leaks
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.card {
  background-color: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 15px;
  border-radius: 10px;
}
.card2 {
  /* background-color: #fff; */
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px; */
  border: 1px solid rgba(60, 64, 67, 0.3);
  padding: 8px 15px;
  border-radius: 10px;
}

.navBar {
  margin-top: 0.4rem;
  margin-left: 0.8rem;
  margin-right: 0.8rem;
  z-index: 1;
}

* {
  margin: 0;
  padding: 0;
}

body {
  box-sizing: border-box;
  overflow-x: hidden;
}

.rlogo {
  width: 50px;
  border-radius: 100%;
  margin: 10px;
}

.rName {
  font-size: 20px;
}

.user.bottom {
  margin-top: auto;
}

.user-img {
  width: 50px;
  border-radius: 100%;
  border: 1px solid #eee;
}

.user-img2 {
  width: 30px;
  border-radius: 50%;
  border: 1px solid #eee;
}

.sidebar ul li a.active {
  background-color: hsl(264, 39%, 51%);
  color: white;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 70px;
  background-color: transparent;
  border: 1px solid rgba(60, 64, 67, 0.3);
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
  padding: 0.4rem;
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;
  height: 100vh;
  z-index: 3;
}

.top {
  height: 8%;
}

.userRoleContainer {
  height: 95%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin-bottom: 20px;
}

.adminRoleContainer {
  background-color: #f1f1f1;
  margin: 2px;
  border-radius: 10px;
  height: 34%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;
}

.user {
  height: 8%;
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.sidebar.active ~ .main-content {
  left: 250px;
  width: calc(100% - 250px);
}

.sidebar.active {
  width: 250px;
}

.sidebar #btn {
  position: absolute;
  top: 0.3rem;
  left: 50%;
  /* color: #12171e;
  font-size: 1.2rem;
  line-height: 50px; */
  height: 50px;
  width: 50px;
  transform: translateX(-50%);
  cursor: pointer;
}

.sidebar.active #btn {
  /* left: 90%; */
  display: none;
}

.sidebar .top .logo {
  color: #12171e;
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  pointer-events: none;
  opacity: 0;
}

.sidebar.active .top .logo {
  opacity: 1;
}

.top .logo i {
  font-size: 2rem;
  margin-right: 5px;
}

.user {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.user p {
  color: #12171e;
  opacity: 1;
  margin-left: 1rem;
}

.bold {
  font-weight: 600;
}

.sidebar p {
  opacity: 0;
}

.sidebar.active p {
  opacity: 1;
}

.userLogOut {
  opacity: 0;
  margin-left: 20px;
  font-size: 30px;
  display: flex;
  justify-items: end;
  color: hsl(331, 100%, 50%);
}

.userLogOut2 {
  margin-left: 20px;
  font-size: 30px;
  display: flex;
  justify-items: end;
  color: hsl(331, 100%, 50%);
}

.sidebar.active .userLogOut {
  opacity: 1;
}

/* ===CHANGE THIS==== */
.sidebar ul li {
  position: relative;
  list-style-type: none;
  height: 50px;
  width: 90%;
  margin: 0.4rem auto;
  line-height: 30px;
}

.icon {
  font-size: 20px;
}

.icon:hover {
  background-color: hsl(264, 39%, 51%);
  color: #fff;
  width: 90%;
  font-size: 30px;
  align-items: flex-start;
}

.role-wrapper {
  display: flex;
  align-items: center;
}

.iconName {
  display: inline-block;
  vertical-align: middle;
  opacity: 0;
  margin-left: 10px;
}

.sidebar.active ul li a .iconName {
  opacity: 1;
  font-size: 15px;
}

.sidebar ul li a {
  width: 90%;
  color: hsl(264, 39%, 51%);
  display: flex;
  text-decoration: none;
  border-radius: 0.8rem;
}

.sidebar ul li a:hover {
  background-color: hsl(264, 39%, 51%);
  color: #fff;
  font-size: 25px;
}

.sidebar ul li a i {
  text-align: left;
  height: 50px;
  min-width: 50px;
  border-radius: 15px;
  line-height: 50px;
  padding-left: 10px;
}

.sidebar .nav-item {
  opacity: 0;
}

.sidebar.active .nav-item {
  opacity: 1;
}

.sidebar ul li .tooltip {
  background-color: #fff;
  position: absolute;
  left: 125px;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 0.6rem;
  padding: 0.4rem 1.2rem;
  line-height: 1.8rem;
  opacity: 0;
}

.sidebar ul li:hover .tooltip {
  opacity: 1;
  color: hsl(264, 39%, 51%);
}

.sidebar.active ul li .tooltip {
  display: none;
}

.main-content {
  position: relative;
  height: 100vh;
  top: 0;
  left: 70px;
  transition: all 0.5s ease;
  width: calc(100% - 70px);
  /* background: rgba(254, 255, 255, 0.49);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(17.1px);
  -webkit-backdrop-filter: blur(17.1px); */
}
</style>
