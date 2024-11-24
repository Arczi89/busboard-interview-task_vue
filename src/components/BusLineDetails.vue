<template>
  <div class="bus-line-details">
    <div class="row">
      <div class="column" :class="{ box: !line }" >
        <h3 v-if="!line" class="text-muted-stops">Please select the bus line first.</h3>
        <h3 v-else>Bus Stops</h3>
        <button v-if="line"
          class="btn btn-link"
          @click="toggleSortOrder"
          :aria-label="sortOrder === 'ASC' ? 'Sort descending' : 'Sort ascending'"
        >
          <i class="bi" :class="sortOrder === 'ASC' ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
        </button>
        <h4 v-if="line"> Bus Line: {{ line }}</h4>
        <ul v-if="line" class="list-group stops">
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
      <div class="column" :class="{ box: !selectedStop }">
        <h3 v-if="selectedStop">Bus Stop: {{ selectedStop.name }}</h3>
        <h3 v-else class="text-muted-times">Please select a bus stop to view times.</h3>
        <ul v-if="selectedStop && selectedStop.times.length > 0" class="list-group times">
          <li v-for="time in sortedTimes" :key="time" class="list-group-item">
            {{ time }}
          </li>
        </ul>
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
      type: [String, Number, () => null],
      required: false,
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
<style scoped>
.row {
  display:flex;
  flex-direction: row;

  .column {
    flex: 50%;
  }

  .box {
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='4' stroke-dasharray='24%2c 23' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");

    .text-muted-stops, .text-muted-times {
      text-align: center;
      font-size: 14px;
      line-height: 24px;
      font-weight: 400;
      color: #33373C;
    }
    .stops, .times {
      display: block;
    }
  }
}
</style>