<script setup lang="ts">
import { sub } from "date-fns";
import type { Period, Range } from "~/types";

const range = ref<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>("daily");
</script>

<template>
  <NuxtLayout>
    <UDashboardPage>
      <UDashboardPanel grow>
        <UDashboardNavbar title="Dashboard" class="mt-2">
          <template #right>
            <DashboardHeader />
          </template>
        </UDashboardNavbar>

        <UDashboardToolbar>
          <template #left>
            <!-- ~/components/home/HomeDateRangePicker.vue -->
            <HomeDateRangePicker v-model="range" class="-ml-2.5" />

            <!-- ~/components/home/HomePeriodSelect.vue -->
            <HomePeriodSelect v-model="period" :range="range" />
          </template>
        </UDashboardToolbar>

        <UDashboardPanelContent>
          
          <FrequencySpectrum />

          <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
            <!-- ~/components/home/HomeSales.vue -->
            <TemperatureChart />
            <!-- ~/components/home/HomeCountries.vue -->
            <ECharts3DScatter />
          </div>

          <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
            <!-- ~/components/home/HomeSales.vue -->
            <HomeSales />
            <!-- ~/components/home/HomeCountries.vue -->
            <HomeCountries />
          </div>
        </UDashboardPanelContent>
      </UDashboardPanel>
    </UDashboardPage>
  </NuxtLayout>
</template>
