<template>
  <div class="lines-grid">
    <div class="row gx-2 gy-2">
      <div
        v-for="line in lines"
        :key="line"
        class="col-auto"
      >
        <button
          class="btn btn-primary btn-sm px-2"
          @click="selectLine(line)"
          :class="{ active: line === selectedLine }"
        >
          {{ line }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinesGrid",
  props: {
    lines: {
      type: Array,
      default: () => [],
    },
    selectedLine: {
      type: [String, Number],
      default: null,
    },
  },
  methods: {
    selectLine(line) {
      this.$emit("select-line", line);
    },
  },
};
</script>

<style scoped>
.lines-grid {
  text-align: center;
}

button {
  width: 50px; 
  height: 40px;
}
</style>
