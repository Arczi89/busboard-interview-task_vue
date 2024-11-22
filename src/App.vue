<template>
    <div id="app" class="container">
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
  