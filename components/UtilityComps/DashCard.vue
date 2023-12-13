<template>
  <div class="card1">
    <p class="time-text">
      <span>{{ value }}</span>
    </p>
    <p class="day-text">{{ description }}</p>
    <div class="moon d-flex justify-content-between">
      <!-- <button><i :class="topLeft"></i></button> -->
      <i :class="iconName"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "description", "iconName", "topLeft"],
};
</script>
<style scoped>
.card1 {
  height: 100%;
  background: rgb(42, 107, 103);
  border-radius: 5px;
  /* box-shadow: rgb(0, 0, 0, 0.7) 5px 10px 50px, rgb(0, 0, 0, 0.7) -5px 0px 250px; */
  display: flex;
  color: hsl(264, 39%, 51%);
  justify-content: center;
  position: relative;
  flex-direction: column;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.card:hover {
  /* box-shadow: rgb(0, 0, 0) 5px 10px 50px, rgb(0, 0, 0) -5px 0px 150px; */
}

.time-text {
  font-size: 1.4rem;
  margin-top: 15px;
  margin-left: 15px;
  font-weight: 600;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.time-sub-text {
  font-size: 1rem;
  margin-left: 5px;
}

.day-text {
  font-size: 18px;
  margin-top: 0px;
  margin-left: 15px;
  font-weight: 500;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.moon {
  font-size: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
  transition: all 0.3s ease-in-out;
}

.card1:hover > .moon {
  font-size: 23px;
}
</style>
