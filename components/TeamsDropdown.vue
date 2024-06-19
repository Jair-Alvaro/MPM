<script setup lang="ts">
const teams = [
  {
    label: "MPM",
    avatar: {
      src: "/log1.jpeg",
    },
    click: () => {
      team.value = teams[0];
    },
  },
  

];

const team = ref(teams[0]);
</script>

<template>
  <UDropdown
    v-slot="{ open }"
    mode="hover"
    class="w-full"
    :ui="{ width: 'w-full' }"
    :popper="{ strategy: 'absolute' }"
  >
    <UButton
      color="gray"
      variant="ghost"
      :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      class="w-full"
    >
      <UAvatar :src="team.avatar.src"  style="width: 35px; height: 35px;"/>

      <span class="truncate text-gray-900 dark:text-white font-semibold">{{
        team.label
      }}</span>
    </UButton>
  </UDropdown>
</template>
