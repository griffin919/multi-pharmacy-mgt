<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 80vh"
  >
    <div class="p-4 d-flex justify-content-center align-items-center loginCard">
      <div>
        <img
          src="~/assets/rigellogo.png"
          class="rlogo"
          style="height: 80px; width: 80px"
        />
      </div>
      <form>
        <label for="exampleInputEmail1" style="text-align: center; color: #fff"
          >Please select branch and enter credentials to login</label
        >
        <div class="form-group ma">
          <select
            type="text"
            class="form-select form-select-sm custom-select formField"
            aria-label="Default select example"
            id="exampleInputEmail1"
            placeholder="Username"
          >
            <option v-for="(branch, key) in branches" :key="key">
              {{ branch }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control formField"
            id="exampleInputEmail1"
            placeholder="Username"
            @input="logFunc()"
          />
        </div>
        <div class="form-group">
          <!-- <label for="exampleInputPassword1">Password</label> -->
          <input
            type="password"
            class="form-control formField"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-light">
            <!-- type="submit" -->
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { pharmacies } from "../store/sampledb";
export default {
  methods: {
    logFunc() {
      console.log(Object.keys(pharmacies));
    },
  },

  data() {
    return {
      branches: pharmacies ? [] : pharmacies,
    };
  },
};
</script>

<style>
.loginCard {
  width: 300px;
  height: 350px;
  background: rgb(42, 107, 103);
  border-radius: 10px;
  /* box-shadow: rgb(0, 0, 0, 0.7) 5px 10px 50px, rgb(0, 0, 0, 0.7) -5px 0px 250px; */
  display: flex;
  color: hsl(264, 39%, 51%);
  justify-content: center;
  position: relative;
  flex-direction: column;
  background: #7952b3;
  background: linear-gradient(180deg, #7952b3, #c75377);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.card1 input {
  font-size: 0.8rem;
}

.formField {
  margin: 10px 0 10px 0;
}
</style>
