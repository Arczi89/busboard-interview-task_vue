<template>
  <div class="lines-grid">
    <div class="row gx-2 gy-2">
      <div
        v-for="line in sortedLines"
        :key="line"
        class="col-auto"
      >
        <button
          class="btn btn-primary btn-sm px-2"
          @click="selectLine(line)"
          :class="{ active: line === selectedLine }"
        >{{ line }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

export default defineComponent({
  name: "LinesGrid",
  props: {
    lines: {
      type: Array as () => number[],
      default: () => [],
    },
    selectedLine: {
      type: [String, Number] as PropType<string | number | null>,
      default: null,
    },
  },
  setup(props, { emit }) {
    const sortedLines = computed(() => {
      return props.lines;
    });

    const selectLine = (line: number) => {
      emit("select-line", line);
    };

    return {
      sortedLines,
      selectLine,
    };
  }
});
</script>
