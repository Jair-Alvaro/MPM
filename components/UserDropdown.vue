<script setup lang="ts">
const router = useRouter();
const supabase = useSupabaseClient();

async function signOut() {
  await supabase.auth.signOut();
  navigateTo("/");
}
// Referencia reactiva para almacenar los detalles del usuario
const user = ref(null);

// Obtener los detalles del usuario al montar el componente

const items = computed(() => [
  [
    {
      slot: "account",
      label: "",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
      to: "/settings",
    },
  ],

  [
    {
      label: "Sign out",
      click: async () => {
        await supabase.auth.signOut();
        navigateTo("/login");
      },
    },
  ],
]);


</script>

<template>
  <UDropdown
    mode="hover"
    :items="items"
    :ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
    :popper="{ strategy: 'absolute', placement: 'top' }"
    class="w-full"
  >
    <template #default="{ open }">
      <UButton
        color="gray"
        variant="ghost"
        class="w-full"
        label="Admin"
        :class="[open && 'bg-gray-50 dark:bg-gray-800']"
      >
        <template #leading>
          <UAvatar
            src="https://i.pinimg.com/564x/fa/e1/4d/fae14df790c528d2f2cbfea1f6df5ada.jpg"
            size="2xs"
          />
        </template>

        <template #trailing>
          <UIcon name="i-heroicons-ellipsis-vertical" class="w-5 h-5 ml-auto" />
        </template>
      </UButton>
    </template>

    <template #account>
      <div class="text-left">
        <p>Registrado como</p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ user ? user.email : "No hay usuario autenticado" }}
        </p>
      </div>
    </template>
  </UDropdown>
</template>
