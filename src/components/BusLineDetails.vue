<template>
  <div class="bus-line-details">
    <div class="columns">
      <div class="column" :class="{ box: !line }" >
        <h3 v-if="line"> Bus Line: {{ line }}</h3>
        <h4 v-if="!line" class="text-muted-stops">Please select the bus line first.</h4>
        <h4 v-else>Bus Stops
          <span
          class="btn btn-link sort"
          @click="toggleSortOrder"
          :aria-label="sortOrder === 'ASC' ? 'Sort descending' : 'Sort ascending'"
        >
          <i class="bi" :class="sortOrder === 'ASC' ? 'bi-arrow-up-square' : 'bi-arrow-down-square'"></i>
        </span>
        </h4>
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
      <div class="gap"></div>
      <div class="column" :class="{ box: !selectedStop }">
        <h3 v-if="selectedStop">Bus Stop: {{ selectedStop.name }}</h3>
        <h3 v-else class="text-muted-times">Please select a bus stop to view times.</h3>
        <h4 v-if="line">Time</h4>
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

.columns {
  display:flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;

  .gap {
    width: 1rem;
    flex-shrink: 0;
    background-color: #F3F4F9;
  }
  .column {
    flex: 1;
  }

  i.bi {
    color: #63666E;
  }

  .list-group-item {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    border: 1px solid #F3F4F9;
    cursor: pointer;

    &.active {
      color: #1952E1;
      background: white;
    }
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
  }
}
h3 {
  padding: 1rem 0 0 1rem;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
}
h4 {
  padding: 1rem 0 0 1rem;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
}
</style>