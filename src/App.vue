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
    max-width: 100vw;
    max-height: 100vh; 
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }
</style>