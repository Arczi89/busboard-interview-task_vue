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

export default {
  name: "BusLinesContainer",
  components: {
    LinesGrid,
    BusLineDetails,
  },
  data() {
    return {
      lines: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
      selectedLine: null,
      stops: [],
    };
  },
  methods: {
    handleLineSelect(line) {
      this.selectedLine = line;
      this.stops = [
        { id: 1, name: "Czyżyny Dworzec", times: ["3:00", "3:30", "4:00"] },
        { id: 2, name: "Rondo Czyżyńskie", times: ["3:15", "3:45", "4:15"] },
        { id: 3, name: "Centralna", times: ["3:20", "3:50", "4:20"] },
      ];
    },
  },
};
</script>
