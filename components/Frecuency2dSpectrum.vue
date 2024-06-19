<template>
  <UDashboardCard :ui="{ body: { padding: '!pb-3 !px-0' } }">
    <template #header>
      <p class="text-xl font-semibold">Espectro de Frecuencia</p>
    </template>

    <div class="container" ref="cardRef">
      <div class="filters">
        <UButton @click="changeGraph('all')" class="m-1" color="teal"
          >Todos</UButton
        >
        <UButton @click="changeGraph('modoX')" class="m-1" color="teal"
          >Modo X</UButton
        >
        <UButton @click="changeGraph('modoY')" class="m-1" color="teal"
          >Modo Y</UButton
        >
        <UButton @click="changeGraph('modoZ')" class="m-1" color="teal"
          >Modo Z</UButton
        >
      </div>
      <USelect
        icon="i-heroicons-magnifying-glass-20-solid"
        v-model="selectedRecordIndex"
        @change="changeSelectedRecord"
        color="teal"
        variant="outline"
        :options="
          currentData.map((record, index) => ({
            label: `Registro ${index + 1}`,
            value: index,
          }))
        "
      />
      <div ref="chart" class="chart" style="width: 100%; height: 60vh"></div>
    </div>
  </UDashboardCard>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import axios from "axios";

const LIMIT_MODE_X = 100; // Límite para Modo X
const LIMIT_MODE_Y = 150; // Límite para Modo Y
const LIMIT_MODE_Z = 200; // Límite para Modo Z

const chart = ref(null);
const cardRef = ref(null);
const currentData = ref([]);
const selectedRecordIndex = ref(0); // Índice del registro seleccionado

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/spectrals");
    console.log("Datos de la API:", response.data);
    currentData.value = response.data;
    renderGraph("all"); // Renderizar todos los modos inicialmente
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

const renderGraph = (mode) => {
  if (!Array.isArray(currentData.value) || currentData.value.length === 0) {
    console.error("Datos inválidos: currentData no es un array o está vacío");
    return;
  }

  const data = currentData.value[selectedRecordIndex.value];
  let labels = [];
  let seriesData = [];

  if (mode === "all") {
    labels = data.modoX.frecuencia;
    seriesData = [
      {
        name: "Modo X",
        data: data.modoX.amplitud,
        type: "line",
        itemStyle: {
          color: "blue",
        },
      },
      {
        name: "Modo Y",
        data: data.modoY.amplitud,
        type: "line",
        itemStyle: {
          color: "teal",
        },
      },
      {
        name: "Modo Z",
        data: data.modoZ.amplitud,
        type: "line",
        itemStyle: {
          color: "red",
        },
      },
    ];
  } else {
    if (!data[mode] || !data[mode].frecuencia || !data[mode].amplitud) {
      console.error(`Datos inválidos para el modo: ${mode}`);
      return;
    }

    labels = data[mode].frecuencia;
    seriesData = [
      {
        name: `Modo ${mode.toUpperCase()}`,
        data: data[mode].amplitud,
        type: "line",
        itemStyle: {
          color: mode === "modox" ? "blue" : mode === "modoy" ? "green" : "red",
        },
      },
    ];
  }

  const option = {
    title: {
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "10%",
      top: "10%",
      containLabel: true,
    },
    xAxis: {
      data: labels,
      name: "Frecuencia",
      type: "category",
    },
    yAxis: {
      name: "Amplitud",
      type: "value",
      splitLine: { show: false },
    },
    toolbox: {
      right: 10,
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    dataZoom: [
      {
        startValue: 0,
      },
      {
        type: "inside",
      },
    ],
    series: seriesData,
  };

  const myChart = echarts.init(chart.value);
  myChart.setOption(option);
  window.addEventListener("resize", myChart.resize);

  checkLimits(seriesData, mode);
};

const changeGraph = (mode) => {
  renderGraph(mode); // Cambiar el gráfico según el modo seleccionado
};

const changeSelectedRecord = () => {
  renderGraph("all"); // Renderizar todos los modos cuando se cambia el registro seleccionado
};

const checkLimits = (seriesData, mode) => {
  const data = currentData.value[selectedRecordIndex.value];

  if (mode === "all" || mode === "modox") {
    const maxAmplitudeX = Math.max(...data.modoX.amplitud);
    if (maxAmplitudeX > LIMIT_MODE_X) {
      alert(`¡Alerta! El modo X ha superado el límite de ${LIMIT_MODE_X}`);
    }
  }
  if (mode === "all" || mode === "modoy") {
    const maxAmplitudeY = Math.max(...data.modoY.amplitud);
    if (maxAmplitudeY > LIMIT_MODE_Y) {
      alert(`¡Alerta! El modo Y ha superado el límite de ${LIMIT_MODE_Y}`);
    }
  }
  if (mode === "all" || mode === "modoz") {
    const maxAmplitudeZ = Math.max(...data.modoZ.amplitud);
    if (maxAmplitudeZ > LIMIT_MODE_Z) {
      alert(`¡Alerta! El modo Z ha superado el límite de ${LIMIT_MODE_Z}`);
    }
  }
};

onMounted(fetchData);
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filters {
  margin-bottom: 10px;
}

.chart {
  width: 100%;
  height: 60vh;
}
</style>
