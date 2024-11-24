<template>
  <div class="col border border-dashed p-3">
    <h6 v-if="title">{{ title }}</h6>
    <ul v-if="Array.isArray(content)" class="list-unstyled">
      <li
        v-for="(item, index) in content"
        :key="index"
        @click="$emit('itemSelected', item.name)"
      >
        {{ item.name || item }}
      </li>
    </ul>
    <p v-else>{{ content }}</p>
    <button
      v-if="sortable"
      class="btn btn-link p-0"
      @click="$emit('sort', 'asc')"
    >
      ↑
    </button>
    <button
      v-if="sortable"
      class="btn btn-link p-0"
      @click="$emit('sort', 'desc')"
    >
      ↓
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    content: [Array, String],
    sortable: Boolean,
  },
});
</script>
