<template>
  <div class="bus-lines-container">
    <h2>Select Bus Line</h2>
    <LinesGrid :lines="lines" @select-line="handleLineSelect" />
    <div v-if="!selectedLine" class="mt-4 text-muted">
      Please select the bus line first.
    </div>
    <BusLineDetails
      v-else
      :line="selectedLine"
      :stops="stops"
    />
  </div>
</template>

<script>
import LinesGrid from "@/components/LinesGrid.vue";
import BusLineDetails from "@/components/BusLineDetails.vue";
import api from "@/services/api";

export default {
  name: "BusLinesContainer",
  components: {
    LinesGrid,
    BusLineDetails,
  },
  data() {
    return {
      lines: [],
      selectedLine: null,
      stops: [],
    };
  },
  async created() {
    this.lines = await api.getLines();
  },
  methods: {
    async handleLineSelect(line) {
      this.selectedLine = line;
      try {
        this.stops = await api.getStopsByLine(line);
        console.log(this.stops);
      } catch (error) {
        console.error("Failed to load stops:", error);
      }
    }
  },
};
</script>
