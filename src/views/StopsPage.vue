<template>
  <div class="stops-page">
    <h2 class="mt-4">
      Bus Stops
      <button
        class="btn btn-link"
        @click="toggleSortOrder"
        :aria-label="sortOrder === 'ASC' ? 'Sort descending' : 'Sort ascending'"
      >
        <i class="bi" :class="sortOrder === 'ASC' ? 'bi-arrow-up' : 'bi-arrow-down'"></i>
      </button>
    </h2>

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

export default defineComponent({
  name: 'StopsPage',
  setup() {
    const searchTerm = ref('');
    const busStops = ref<string[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const sortOrder = ref<'ASC' | 'DESC'>('ASC');

    const fetchStops = async () => {
      loading.value = true;
      error.value = null;
      try {
        const data = await api.getSortedStops(sortOrder.value);
        busStops.value = data;
      } catch (err: unknown) {
        error.value = err instanceof Error ? err.message : 'Unknown error';
      } finally {
        loading.value = false;
      }
    };

    const filteredStops = computed(() => {
      return busStops.value.filter((stop) =>
        stop.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    const toggleSortOrder = () => {
      sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC';
      fetchStops();
    };

    onMounted(fetchStops);

    return {
      searchTerm,
      filteredStops,
      loading,
      error,
      sortOrder,
      toggleSortOrder,
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

button {
  background: transparent;
  border: none;
  padding: 0;
}
</style>
