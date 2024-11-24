<template>
  <ul class="nav nav-tabs">
    <li class="nav-item" :class="{ active: $route.path === '/' }">
      <router-link to="/" class="nav-link"> Bus Lines </router-link>
    </li>
    <li class="nav-item" :class="{ active: $route.path === '/stops' }">
      <router-link to="/stops" class="nav-link"> Stops </router-link>
    </li>
  </ul>
  <div class="separator"></div>
</template>

<script lang="ts">
export default {
  name: "TabBar",
};
</script>

<style scoped>
.nav {
  background-color: white;
  .nav-item {
    padding: 1rem;
    margin-left: 1rem;
    a {
      text-decoration: none;
    }
  }
}
.nav-item.active {
  border: none;
  border-bottom: #1952e1 solid 2px;
  a {
    color: #33373c;
    font-weight: 500;
  }
}
.nav-item:not(.active) {
  a {
    color: #9a9da4;
  }
}
</style>
