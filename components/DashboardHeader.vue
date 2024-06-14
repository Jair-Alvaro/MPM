<template>
    <UDashboardNavbar>
        <template #right>
            <div class="flex items-center space-x-2">
                <UDashboardSection class="mt-4">
                    <template #links>
                        <UColorModeSelect color="gray" />
                    </template>
                </UDashboardSection>

                <UTooltip text="Notifications" :shortcuts="['N']">
                    <UButton color="gray" variant="ghost" square @click="isNotificationsSlideoverOpen = true">
                        <UChip color="red" inset>
                            <UIcon name="i-heroicons-bell" class="w-5 h-5" />
                        </UChip>
                    </UButton>
                </UTooltip>

                <UDropdown :items="items">
                    <UButton icon="i-heroicons-plus" size="md" class="ml-1.5 rounded-full" />
                </UDropdown>
            </div>
        </template>
    </UDashboardNavbar>
</template>

<script setup lang="ts">
import { sub } from "date-fns";
import type { Period, Range } from "~/types";

const { isNotificationsSlideoverOpen } = useDashboard();

const items = [
    [
        {
            label: "New mail",
            icon: "i-heroicons-paper-airplane",
            to: "/inbox",
        },
        {
            label: "New user",
            icon: "i-heroicons-user-plus",
            to: "/users",
        },
    ],
];

const range = ref<Range>({
    start: sub(new Date(), { days: 14 }),
    end: new Date(),
});
const period = ref<Period>("daily");
</script>
