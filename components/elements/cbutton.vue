<template>
    <div>
      <button @click="handleClick" id="buttonid">
        {{ label }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: ["label", "clickHandler"],
    methods: {
      handleClick() {
        if (this.clickHandler) {
          this.clickHandler(); 
        }
      },
    },
  };
  </script>
  
  <style>
  #buttonid {
    padding: 7px 10px;
  }
  </style>