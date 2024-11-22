<template>
    <div class="bus-line-details mt-4">
      <h3>Bus Line: {{ line }}</h3>
      <div v-if="!stops || stops.length === 0" class="text-muted">
        Please select the bus stop first.
      </div>
      <div class="row">
        <div class="col-md-6">
          <h4>Bus Stops</h4>
          <ul class="list-group">
            <li
              v-for="stop in sortedStops"
              :key="stop.id"
              class="list-group-item"
              :class="{ active: stop.id === selectedStop?.id }"
              @click="selectStop(stop)"
            >
              {{ stop.name }}
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <h4 v-if="selectedStop">Bus Stop: {{ selectedStop.name }}</h4>
          <ul v-if="selectedStop" class="list-group">
            <li v-for="time in selectedStop.times" :key="time" class="list-group-item">
              {{ time }}
            </li>
          </ul>
          <div v-else class="text-muted">Please select a bus stop to view times.</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BusLineDetails",
    props: {
      line: {
        type: [String, Number],
        required: true,
      },
      stops: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        selectedStop: null,
        sortOrder: "asc",
      };
    },
    computed: {
      sortedStops() {
        return [...this.stops].sort((a, b) => {
          if (this.sortOrder === "asc") {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
      },
    },
    methods: {
      selectStop(stop) {
        this.selectedStop = stop;
      },
      toggleSortOrder() {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      },
    },
  };
  </script>
  