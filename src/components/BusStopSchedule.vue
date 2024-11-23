<template>
  <div class="bus-stop-schedule">
    <h3>Bus Line: {{ line }}</h3>
    <div v-if="!stops || stops.length === 0" class="text-muted">
      Please select the bus stop first.
    </div>
    <div v-else class="list-group">
      <button
        v-for="stop in stops"
        :key="stop.stop"
        class="list-group-item list-group-item-action"
        @click="$emit('select-stop', stop)"
      >
        {{ stop.stop }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BusStopSchedule",
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
};
</script>
