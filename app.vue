<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() =>
  colorMode.value === "dark" ? "#111827" : "white"
);

const title = "Nuxt Proyecto Mineria";
const description = "Proyecto Mineria";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: "https://dashboard-template.nuxt.dev/social-card.png",
  twitterImage: "https://dashboard-template.nuxt.dev/social-card.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
