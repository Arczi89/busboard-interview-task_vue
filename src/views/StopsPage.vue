<template>
  <div class="stops-page">
    <div class="input-group">
      <input
        v-model="searchTerm"
        type="text"
        class="form-control search"
        placeholder="Search for stops..."
      />
    </div>
    <h2>
      Bus Stops
      <div
        class="btn btn-link sort"
        @click="toggleSortOrder"
        :aria-label="sortOrder === 'ASC' ? 'Sort descending' : 'Sort ascending'"
      >
        <i
          class="bi"
          :class="
            sortOrder === 'ASC' ? 'bi-arrow-up-square' : 'bi-arrow-down-square'
          "
        ></i>
      </div>
    </h2>

    <ul class="list-group">
      <li v-for="stop in filteredStops" :key="stop" class="list-group-item">
        {{ stop }}
      </li>
    </ul>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="text-danger">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import api from "../services/api";

export default defineComponent({
  name: "StopsPage",
  setup() {
    const searchTerm = ref("");
    const busStops = ref<string[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const sortOrder = ref<"ASC" | "DESC">("ASC");

    const fetchStops = async () => {
      loading.value = true;
      error.value = null;
      try {
        const data = await api.getSortedStops(sortOrder.value);
        busStops.value = data;
      } catch (err: unknown) {
        error.value = err instanceof Error ? err.message : "Unknown error";
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
      sortOrder.value = sortOrder.value === "ASC" ? "DESC" : "ASC";
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
  background-color: white;

  div,
  li,
  ul,
  a {
    color: #63666e;
    text-decoration: none;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  .text-danger {
    color: red;
  }

  h2 {
    padding: 1rem 0 0 1rem;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
  }

  ul.list-group {
    overflow-y: scroll;
    height: 60vh;
  }

  .list-group-item {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    border: 1px solid #f3f4f9;
    padding: 1rem;

    &.active {
      color: #1952e1;
      background: white;
    }
  }
}
</style>
