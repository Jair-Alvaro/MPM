<script setup lang="ts">
const { data: posts, error } = await useFetch("/api/posts");
console.log(posts);

</script>

<template>
  <h1 class=""> 
  </h1>
  <pre>{{ posts }}</pre> 
</template>
