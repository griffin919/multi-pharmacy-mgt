<!-- @@ -1,74 +1,96 @@ -->
<template>
  <div>
    <Sidebar />
  </div>
</template>

<script>
import NavBar from "../components/NavBar";

export default {
  data() {
    return {
      rolenames: [],
    };
  },
  components: {
    NavBar,
  },
  head: {
    script: [
      { src: "/jquery-3.6.0.min.js", body: true }, // Load jQuery first
      { src: "/bootstrap.bundle.min.js", body: true }, // Then load Bootstrap
      // { src: '/addbarcode.js', body: true }, // Include other scripts if needed
    ],
  },

  async mounted() {
    console.log("in default");
    try {
      // this.$store.commit('updatePreRoles',[])rest/nad/roles
      let response = await this.$axios.get(
        this.$store.state.urlBase + "rest/nad/roles"
      );

      let data = response.data;
      //  console.log(data.data)
      if (data) {
        // console.log(data)
        this.$store.commit("updatePreRoles", data.data);
        await this.checkAccess();

        // userroles
      }
    } catch (error) {
      console.log(error);
      //  this.error = error.message;
    }

    try {
      let res = await this.$axios.get(
        this.$store.state.urlBase + "rest/nad/getrolenames"
      );
      this.rolenames = res.data.data;
      // console.log(this.rolenames);

      this.$store.commit("setRolenames", res.data.data);
    } catch (error) {
      console.log(error, "innnn");
    }

    // this.getUserDetails();
    // this.getReceiptDetails();
  },
  methods: {
    async checkAccess() {
      // console.log("in user")
      let response = await this.$axios.get(
        this.$store.state.urlBase + "rest/nad/getloginuser"
      );
      let data = response.data;
      //  console.log(data.data)
      this.$store.commit("setUser", data.data);
      let pri = data.data.privillage;
      if (pri.isadmin) {
        console.log("IS ADMIN");
        this.$store.commit("setUserRoles", "admin");
      } else {
        // console.log('IS NOT ADMIN');
        this.$store.commit("setUserRoles", data.data.roles);
      }
    },

    async getUserDetails() {
      //process.env.NUXT_ENV_GET_USER_DETAILS
      try {
        console.log(
          "userDetails.data " + this.$store.state.urlBase + "rest/company/name"
        );
        let userDetails = await this.$axios.get(
          this.$store.state.urlBase + "rest/company/name"
        );
        let user = userDetails.data.data;
        // console.log(userDetails.data);
        this.$store.commit("setUserDetails", user);
      } catch (err) {
        console.error(err);
      }
    },

    async getReceiptDetails() {
      //process.env.NUXT_ENV_GET_USER_DETAILS
      try {
        // console.log("userDetails.data "+this.$store.state.urlBase +"rest/receipt/allinfo");
        let userDetails = await this.$axios.get(
          this.$store.state.urlBase + "rest/receipt/allinfo"
        );
        let user = userDetails.data;
        // console.log(user.data);
        this.$store.commit("setReceiptInfo", user.data);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style></style>
