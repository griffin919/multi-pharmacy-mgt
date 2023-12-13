<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th
            v-for="(headerValue, index) in headerList"
            :key="index"
            scope="col"
          >
            <!-- class="text-capitalize col-1" -->
            {{ element }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rowValues, index) in bodyList" :key="index">
          <td v-for="value in rowValues" :key="value">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["headerList", "bodyList"],
};
</script>

<style scoped>
thead {
  color: black;
  background: red;
}
</style>
