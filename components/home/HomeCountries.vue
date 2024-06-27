<script setup lang="ts">
import * as echarts from 'echarts';
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface TemperatureData {
  _id: string;
  FrecMax: number;
  temp: {
    tiempo: string[];
    temperatura: number[];
  };
}

const temperatureData = ref<TemperatureData[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get<TemperatureData[]>(
      "http://localhost:3000/api/spectrals"
    );
    temperatureData.value = response.data;
  } catch (error) {
    console.error("Error fetching temperature data:", error);
  }
});

const formatTemperature = (temperature: number[]) => {
  if (temperature.length === 0) return "No data";
  const lastTemperature = temperature.slice(-1)[0];
  return `${lastTemperature.toFixed(2)}°C`;
};

const getTemperatureColor = (temperature: number) => {
  if (temperature < 29.05) return "green";
  if (temperature < 30) return "yellow";
  return "red";
};
</script>

<template>
  <UDashboardCard title="Temperature Data" icon="i-heroicons-sun-20-solid">
    <div class="space-y-2">
      <UMeter
        v-for="(tempItem, index) in temperatureData"
        :key="index"
        :value="tempItem.temp.temperatura[tempItem.temp.temperatura.length - 1]"
        :label="`${tempItem.FrecMax}`"
        :color="
          getTemperatureColor(
            tempItem.temp.temperatura[tempItem.temp.temperatura.length - 1]
          )
        "
        size="lg"
        class="flex-row-reverse items-center"
        :ui="{
          label: { base: 'flex-shrink-0 w-24' },
          indicator: { container: '!w-auto' },
          meter: { base: 'flex-1' },
        }"
        indicator
      >
        <template #indicator>
          {{ formatTemperature(tempItem.temp.temperatura) }}
        </template>
      </UMeter>
    </div>
  </UDashboardCard>
</template>