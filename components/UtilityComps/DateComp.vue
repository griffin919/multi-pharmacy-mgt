<template>
  <div>
    <!-- <div class="d-flex justify-content-end align-items-center">
      <div>
        <label>{{ filterLabel }}:</label>
      </div>

      <div class="d-flex align-items-center dateDiv">
        <div class="mr-2 dateField d-flex" :style="{ background: bgColor }">
          <div>
            <label for="week" class="mb-0">From: </label>
          </div>
          <div>
            <input
              type="date"
              id="dInpt"
              class="dateBkg"
              v-model="fdate"
              style="border: none"
            />
          </div>
        </div>

        <div class="mr-2 dateField" :style="{ background: bgColor }">
          <label for="week" class="mb-0">To: </label>
          <input
            type="date"
            id="dInpt"
            class="dateBkg"
            v-model="tdate"
            style="border: none"
          />
        </div>

        <div>
          <button
            class="btn btn-search btn-sm"
            style="background: hsl(264, 39%, 51%)"
          >
            <i style="color: #fff" class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div> -->

    <div class="dCon">
      <div class="d-flex align-items-center">
        <h5 style="vertical-align: middle; font-weight: bold">
          {{ filterLabel }}:&nbsp;
        </h5>
      </div>
      <div class="d-flex align-items-center">
        <div>
          <label for="">From: &nbsp;</label>
        </div>
        <div>
          <input
            class="form-control rounded"
            id="dInpt"
            v-model="fdate"
            type="date"
            style="font-size: 0.8rem"
          />
        </div>
      </div>

      <div class="d-flex align-items-center">
        <div>
          <label for="">&nbsp;To: &nbsp;</label>
        </div>
        <div>
          <input
            class="form-control rounded"
            id="dInpt"
            v-model="tdate"
            type="date"
            style="font-size: 0.8rem"
          />
        </div>
      </div>

      <div>
        <button
          class="btn btn-search btn-sm"
          style="background: hsl(264, 39%, 51%); margin: 0 5px"
        >
          <i style="color: #fff" class="bi bi-search"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["filterLabel", "fDate", "tDate"],
  // props: ["filterLabel", "bgColor", "fDate", "tDate"],
  data() {
    return {
      fdate: null,
      tdate: null,
    };
  },
};
</script>

<style scoped>
/* .dateFilterContainer 
  padding: 3px 5px 3px 15px;
  border-radius: 5px;
  margin: 0 10px;
  /* color: aliceblue; */

/* .dateFilterContainer input {
  background: transparent;
  border: none;
}  */

.expCon {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 10px;
}

.dCon {
  display: flex;
  justify-content: center;
  align-content: center;
}

#dInpt {
  padding: 5px 5px;
  text-align: center;
}

#sbtn {
  background: hsl(264, 39%, 51%);
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
}
</style>
