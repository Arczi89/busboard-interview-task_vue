<template>
  <div class="bus-lines-container">
    <h2>Select Bus Line</h2>
    <LinesGrid :lines="lines" @select-line="handleLineSelect" />
    <div class="separator"></div>
    <BusLineDetails :line="selectedLine" :stops="stops" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import LinesGrid from "@/components/LinesGrid.vue";
import BusLineDetails from "@/components/BusLineDetails.vue";
import api from "@/services/api";
import { SortedStop } from "@/types/SortedStop";

export default defineComponent({
  name: "BusLinesContainer",
  components: {
    LinesGrid,
    BusLineDetails,
  },
  setup() {
    const lines = ref<number[]>([]);
    const selectedLine = ref<number | string | null>(null);
    const stops = ref<SortedStop[]>([]);

    onMounted(async () => {
      lines.value = await api.getLines();
    });

    const handleLineSelect = async (line: number) => {
      selectedLine.value = line;
      try {
        stops.value = await api.getStopsByLine(line);
      } catch (error) {
        console.error("Failed to load stops:", error);
      }
    };

    return {
      lines,
      selectedLine,
      stops,
      handleLineSelect,
    };
  },
});
</script>
<style scoped>
.bus-lines-container {
  background-color: white;
}
h2 {
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  font-family: Inter;
  padding: 1rem;
}
</style>
