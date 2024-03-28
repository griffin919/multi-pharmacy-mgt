// @@ -1,2005 +1,2023 @@
// import addbarcode from '~/static/addbarcode.js'
import axios from "@nuxtjs/axios";
// import common from 'common.js'

function updateLocalStorage(cart) {
  console.log("added to local storage");
  localStorage.setItem("cart", JSON.stringify(cart));
}

export const state = () => ({
  receiptinfo: [{ info: "" }],
  pharmacyemail: "",
  user: {},
  preRoles: [],
  allRoles: [],
  dialoginfo: "",
  admincount: 0,


  // urlBase: "http://rigeliscx/",
  urlBase: "http://auto.rigelos.com/",
  // urlBase: "",

  // urlBase: "http://192.168.5.143:8081/",
  // urlBase: "http://192.168.100.23:8081/",
  userimg: 0,
  addCusRes: "",
  rolenames: [],
  customerSearchResults: [],
  yesorNoClickFunc: { yesfunc: undefined, nofunc: undefined },

  pharmacyName: "",
  pharmacyLocation: "",
  pharmacyContact: "",
  productsInfor: [],

  // multi pharmacy
  selectedBranches: [],
});

export const getters = {
  getSelectedBranches: (state) => {
    return state.selectedBranches;
  },
  // ==============================================
  getUserImage: (state) => {
    return state.urlBase + "spic?c=" + state.userimg;
  },
};

export const mutations = {
  changeDialog(state, payload) {
    state.dialoginfo = payload;
  },

  // setSelectedBranch(state, payload) {
  //   const index = state.selectedBranches.indexOf(payload);
  //   if (index !== -1) {
  //     // Remove the branch if it's already selected
  //     state.selectedBranches.splice(payload, 1);
  //   } else {
  //     // Add the branch if it's not selected
  //     state.selectedBranches.push(payload);
  //   }
  //   console.log("Updated selectedBranches:", state.selectedBranches);
  // },
  
  // setAllBranches(state, payload) {
  //   console.log("🚀 ~ setAllBranches ~ payload:", payload)
  //   if (payload[0]) {
  //     // Select all branches
  //     payload[1].forEach((b) => {
  //       if (!state.selectedBranches.includes(b.id)) {
  //         state.selectedBranches.push(b.id);
  //       }
  //     });
  //   } else {
  //     // Deselect all branches
  //     state.selectedBranches = [];
  //   }
  //   console.log("Updated selectedBranches:", state.selectedBranches);
  // },
  
  // ========================================================
  async setRolenames(state, payload) {
    if (payload) {
      state.rolenames = payload;
    }
  },

  setSelectedBranches(state, payload){
    state.selectedBranches = payload;
  },

  removeBranch(state, payload){
    console.log("🚀 ~ removeBranch ~ payload:", payload)
    
    state.selectedBranches.splice(payload, 1);
  }, 
  addBranch(state, payload){
    // state.selectedBranches.splice(payload, 1);
    state.selectedBranches.push(payload);
  }, 
  setAllBranches(state, payload){
    console.log("🚀 ~ setAllBranches ~ payload:", payload)
    if (!payload[0]) {
      // Select all branches
      payload[1].forEach((b) => {
        if (!state.selectedBranches.includes(b.id)) {
          state.selectedBranches.push(b.id);
        }
      });
    } else {
      // Deselect all branches
      state.selectedBranches = [];
    }
  },

  async showWait(state, payload) {
    if (payload) {
      state.dialoginfo = payload;
    }
    await $("#waitdailog").modal("show");
  },
  async closeWait(state, payload) {
    await setTimeout(() => {
      $("#waitdailog").modal("hide");
    }, 200);
  },
  async OpenYesOrNOClick(state, payload) {
    $("#yesorno").modal("show");
    // {backdrop: 'static', keyboard: false},
    state.yesorNoClickFunc = payload;
    // console.log(payload)
  },

  async YesOrNOClick(state, payload) {
    if (state.yesorNoClickFunc.yesfunc) {
      $("#yesorno").modal("hide");
      await state.yesorNoClickFunc.yesfunc();
    }
  },

  async YesOrNOCancelClick(state, payload) {
    // console.log("in cancel")
    if (state.yesorNoClickFunc.nofunc) await state.yesorNoClickFunc.nofunc();
  },
  async showMessage(state, payload) {
    state.dialoginfo = payload;
    await $("#okdialog").modal("show");
    setTimeout(() => {
      $("#okdialog").modal("hide");
    }, 1000);
  },

  async showSimpleYesOrNo(state, payload) {
    let info = payload.info;
    this.commit("changeDialog", info);
    let func = payload.func;
    this.commit("OpenYesOrNOClick", func);
  },

  async showSimpleYesOrNo2(state, payload) {
    let page = this;
    let axios = this.$axios;
    let dat = {};
    dat.info = payload.info;

    dat.func = {};
    dat.func.yesfunc = async function () {
      try {
        page.commit("changeDialog", "Please wait!");
        page.commit("showWait");
        try {
          payload.addfun(state, page, axios);
          setTimeout(() => {
            $("#waitdailog").modal("hide");
            $("#addSupplier").modal("hide");

            setTimeout(() => {
              page.commit("showMessage", payload.message);
            }, 200);
          }, 500);
        } catch (error) {
          this.error = error.message;
        }
      } catch (error) {
        console.log(error);
        this.error = error.message;
      }
    };
    this.commit("showSimpleYesOrNo", dat);
  },

  setUserDetails(state, payload) {
    // console.log(payload);
    state.pharmacyName = payload.name;
    state.pharmacyLocation = payload.location;
    state.pharmacyContactOne = payload.tel1;
    state.pharmacyContactTwo = payload.tel2;
    state.pharmacyemail = payload.email;
  },

  setUser(state, payload) {
    state.user = payload;
  },

  async setUserRoles(state, payload) {
    state.allRoles = [];

    let allRoles = state.preRoles;

    if (payload == "admin") {
      state.userRoles = allRoles;
      state.allRoles = allRoles;
      state.admincount = 1;
    } else {
      state.userRoles = payload;
      allRoles.forEach((allRole) => {
        // console.log(allRole)
        // state.userRoles
        state.userRoles.forEach((userRole) => {
          // console.log(allRole)
          if (allRole.id == userRole.roleid) {
            state.allRoles.push(allRole);
            if (allRole.tag == "admin") {
              state.admincount++;
              console.log(state.admincount);
            }
          }
        });
      });
    }

    // allRoles.forEach(allRole => {
    //   state.userRoles.forEach(userRole => {
    //     if (allRole.roleid == userRole) {
    //       state.allRoles.push(allRole)
    //     }
    //   });

    // });
    // state.allRoles.push(
    // {
    //   roleid:23,
    //   page: 'Transaction History',
    //   address: '/transactionhistory',
    //   access: 'admin'
    // },
    // )

    this.$router.push(window.location.pathname);
    // console.log('DONE');
  },
  async checkUserRoles(state, payload) {
    // console.log(state.userRoles);
    let access = state.userRoles.includes(payload);
    console.log(access);
    if (access == true) {
      console.log("ACCESS");
    } else {
      console.log("NO ACCESS");
      this.$router.push("/login");
    }
  },
};

export const actions = {
  //Fetch customers from API
  async fetchCustomers(context, state) {
    try {
      let response = await this.$axios.get(
        state.urlBase + process.env.NUXT_ENV_ALL_CUSTOMERS
      );
      let customers = response.data;
      // console.log(customers);
      context.commit("setCustomers", customers);
    } catch (error) {
      this.error = error.message;
    }
  },

  //Fetch customers from API
  async fetchSuppliers(context, state) {
    console.log("state");
    console.log(context.urlBase + process.env.NUXT_ENV_SUPPLIER);
    try {
      let response = await this.$axios.get(
        state.urlBase + process.env.NUXT_ENV_SUPPLIER
      );
      let suppliers = response.data.data;
      context.commit("setSuppliers", suppliers);
    } catch (error) {
      this.error = error.message;
    }
  },

  async fetchProductsFromDb(context, payload) {
    try {
      let response = await this.$axios.get(
        state.urlBase + process.env.NUXT_ENV_SEARCH_PRODUCT_API + payload
      );
      let products = response.data;
      context.commit("setProducts", products);
    } catch (error) {
      this.error = error.message;
    }
  },
};
