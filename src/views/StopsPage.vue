<template>
  <div class="stops-page">
    <h2 class="mt-4">Bus Stops</h2>

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
        v-for="stop in sortedStops"
        :key="stop"
        class="list-group-item"
      >
        {{ stop }}
      </li>
    </ul>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="text-danger">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import api from '../services/api';
import type { Stop } from '../types/Stop';

export default defineComponent({
  name: 'StopsPage',
  setup() {
    const searchTerm = ref('');
    const busStops = ref<Stop[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchStops = async () => {
      loading.value = true;
      error.value = null;
      try {
        const data = await api.getStops();
        busStops.value = data;
      } catch (err: unknown) {
        error.value = err instanceof Error ? err.message : 'Unknown error';
      } finally {
        loading.value = false;
      }
    };

    const sortedStops = computed(() => {
      return busStops.value
        .map((stop) => stop.stop)
        .filter((stopName, index, self) => self.indexOf(stopName) === index)
        .filter((stopName) =>
          stopName.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
        .sort((a, b) => a.localeCompare(b));
    });

    onMounted(fetchStops);

    return {
      searchTerm,
      sortedStops,
      loading,
      error,
    };
  },
});
</script>

<style scoped>
.stops-page {
  padding: 1rem;
}

h2 {
  font-size: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

.list-group-item {
  padding: 0.5rem 1rem;
}

.text-danger {
  color: red;
}
</style>
