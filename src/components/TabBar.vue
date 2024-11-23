<template>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link
          to="/"
          class="nav-link"
          :class="{ active: $route.path === '/' }"
        >
          Bus Lines
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/stops"
          class="nav-link"
          :class="{ active: $route.path === '/stops' }"
        >
          Stops
        </router-link>
      </li>
    </ul>
  </template>
  
  <script lang="ts">
  export default {
    name: "TabBar",
  };
  </script>
  