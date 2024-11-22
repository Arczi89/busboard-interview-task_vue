<template>
    <div class="stops-page">
      <h2 class="mt-4">Stops</h2>
  
      <div class="input-group mb-3">
        <input
          v-model="searchTerm"
          type="text"
          class="form-control"
          placeholder="Search for stops..."
        />
      </div>
  
      <ul class="list-group">
        <li
          v-for="stop in filteredStops"
          :key="stop.id"
          class="list-group-item"
        >
          {{ stop.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchTerm: "",
        busStops: [
          { id: 1, name: "Stop A" },
          { id: 2, name: "Stop B" },
          { id: 3, name: "Stop C" },
        ],
      };
    },
    computed: {
      filteredStops() {
        return this.busStops.filter((stop) =>
          stop.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      },
    },
  };
  </script>
  