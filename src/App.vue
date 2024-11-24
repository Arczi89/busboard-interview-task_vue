<template>
    <div id="my-app" class="container">
      <AppHeader />
      <TabBar />
      <router-view />
    </div>
  </template>
  
  <script>
  import AppHeader from "@/components/AppHeader.vue";
  import TabBar from "@/components/TabBar.vue";
  
  export default {
    components: {
      AppHeader,
      TabBar,
    },
  };
  </script>

<style scoped>
  .container {
    padding: 2rem;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>