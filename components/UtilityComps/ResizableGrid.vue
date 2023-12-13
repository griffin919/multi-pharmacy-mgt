<!-- USAGE -->
<!-- ====================================== -->
<!-- <ResizableGrid> -->
<!-- <template v-slot:default="{ index }"> -->
<!-- Place your component for box with index {{ index + 1 }} here -->
<!-- For example: -->
<!-- <FormSelect :boxIndex="index + 1" /> -->
<!-- </template> -->
<!-- </ResizableGrid> -->
<!-- ======================================== -->

<!-- components/ResizableGrid.vue -->
<template>
  <div class="grid-container">
    <div
      v-for="(box, index) in boxes"
      :key="index"
      class="box"
      :style="{ width: box.width + 'px', height: box.height + 'px' }"
      @mousedown="startResize(index, $event)"
    >
      <slot :index="index"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxes: [
        { width: 200, height: 200 },
        { width: 200, height: 200 },
        { width: 200, height: 200 },
        { width: 200, height: 200 },
      ],
      resizingIndex: null,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
    };
  },
  methods: {
    startResize(index, event) {
      this.resizingIndex = index;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.startWidth = this.boxes[index].width;
      this.startHeight = this.boxes[index].height;

      document.addEventListener("mousemove", this.resize);
      document.addEventListener("mouseup", this.stopResize);
    },
    resize(event) {
      if (this.resizingIndex !== null) {
        const deltaX = event.clientX - this.startX;
        const deltaY = event.clientY - this.startY;

        this.$set(this.boxes, this.resizingIndex, {
          width: this.startWidth + deltaX,
          height: this.startHeight + deltaY,
        });
      }
    },
    stopResize() {
      this.resizingIndex = null;
      document.removeEventListener("mousemove", this.resize);
      document.removeEventListener("mouseup", this.stopResize);
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 400px;
  height: 400px;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3498db;
  color: #fff;
  font-size: 2em;
  cursor: move;
  overflow: hidden;
}
</style>
