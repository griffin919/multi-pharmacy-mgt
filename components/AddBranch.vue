<template>
  <div id="addBranchWrap">
    <div class="p-2">
      <h1 style="color: white; text-align: center">Request to add branch</h1>
    </div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Branch ID"
        aria-label=""
        aria-describedby="basic-addon1"
      />
    </div>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder=""
        aria-label=""
        aria-describedby="basic-addon1"
      />
    </div>
    <div class="w-100 d-flex align-items-end">
      <button class="btn btn-outline-light btn-sm">Send Request</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#addBranchWrap input {
  font-size: 0.8rem;
}

#addBranchWrap button {
}
</style>
