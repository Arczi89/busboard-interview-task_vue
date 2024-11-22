<template>
    <div class="lines-page">
      <BusLinesContainer />
    </div>
  </template>
  
  <script>
  import BusLinesContainer from "@/components/BusLinesContainer.vue";
  
  export default {
    name: "LinesPage",
    components: {
      BusLinesContainer,
    },
  };
  </script>
  