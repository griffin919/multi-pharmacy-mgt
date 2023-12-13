<template>
  <div class="input-group mb-2 selectField">
    <label
      class="input-group-text"
      style="font-size: small"
      for="inputGroupSelect01"
      >{{ title }}</label
    >
    <select class="form-select" style="width: 40%" id="inputGroupSelect01">
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.selectField {
  font-size: 0.8rem;
}
</style>
