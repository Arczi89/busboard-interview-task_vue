<template>
  <div class="bus-stop-schedule">
    <h3>Bus Line: {{ line }}</h3>
    <div v-if="!stops || stops.length === 0" class="text-muted">
      Please select the bus stop first.
    </div>
    <div v-else class="list-group">
      <button
        v-for="stop in stops"
        :key="stop"
        class="list-group-item list-group-item-action"
        @click="$emit('select-stop', stop)"
      >
        {{ stop }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "BusStopSchedule",
  props: {
    line: {
      type: [String, Number],
      required: true,
    },
    stops: {
      type: Array as () => string[],
      default: () => [],
    },
  },
});
</script>
