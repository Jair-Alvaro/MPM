<script setup lang="ts">
const { data: posts, error } = await useFetch("/api/posts");
</script>
<template>
  <div>
    <UDashboardNavbar title="Maquinas" />

    <pre>{{ posts }}</pre>
  
  </div>
</template>
