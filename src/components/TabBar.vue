<template>
  <ul class="nav nav-tabs">
    <li class="nav-item" :class="{ active: $route.path === '/' }">
      <router-link
      to="/"
      class="nav-link"
      >
        Bus Lines
      </router-link>
    </li>
    <li class="nav-item" :class="{ active: $route.path === '/stops' }">
      <router-link
        to="/stops"
        class="nav-link"
      >
        Stops
      </router-link>
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
}
  .nav-item.active {
    border: none;
    border-bottom: #1952E1 solid 2px;
    color: #33373C;
    a {
      text-decoration: none;
      color: #33373C;
    }
  }
  .nav-item:not(.active) {
    a {
      text-decoration: none;
      color: #9A9DA4;
    }
  }
</style>
  