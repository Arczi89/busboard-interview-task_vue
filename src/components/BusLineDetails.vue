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
        <ul v-if="selectedStop && selectedStop.times.length > 0" class="list-group">
          <li v-for="time in sortedTimes" :key="time" class="list-group-item">
            {{ time }}
          </li>
        </ul>
        <div v-else class="text-muted">Please select a bus stop to view times.</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import api from '../services/api';
import type { SortedStop } from '@/types/SortedStop';

export default defineComponent({
  name: 'BusLineDetails',
  props: {
    line: {
      type: [String, Number],
      required: true,
    },
    stops: {
      type: Array as () => SortedStop[], 
      default: () => [],
    },
  },
  setup(props) {
    const selectedStop = ref<SortedStop | null>(null);
    const sortOrder = ref<'ASC' | 'DESC'>('ASC'); 
    const sortedStops = computed(() => {
      return [...props.stops].sort((a, b) => a.order - b.order); 
    });

    const sortedTimes = computed(() => {
      if (!selectedStop.value || !selectedStop.value.times) return [];
      return [...selectedStop.value.times].sort((a, b) => api.convertToMinutes(a) - api.convertToMinutes(b));
    });

    const selectStop = async (stop: SortedStop) => {
      selectedStop.value = stop;
      if (!selectedStop.value.times) {
        const times = await api.getTimesByStop(stop.name);
        selectedStop.value.times = times;
      }
    };

    const toggleSortOrder = () => {
      sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
    };

    watch(() => props.line, () => selectedStop.value = null);

    return {
      selectedStop,
      sortedStops,
      sortedTimes,
      selectStop,
      toggleSortOrder,
    };
  },
});
</script>
