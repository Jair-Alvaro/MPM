<template>
  <UDashboardCard :ui="{ body: { padding: '!pb-3 !px-0' } }">
    <template #header>
      <p class="text-xl font-semibold">Espectro de Frecuencia 3D</p>
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
      <div>
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
      </div>
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
    render3DGraph();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
};

const render3DGraph = () => {
  if (currentData.value.length === 0) {
    console.error("Datos inválidos: currentData está vacío");
    return;
  }

  const selectedRecord = currentData.value[selectedRecordIndex.value];

  const seriesData = [
    {
      name: "Modo X",
      type: "line3D",
      data: prepareData(
        selectedRecord.modoX.frecuencia,
        selectedRecord.modoX.amplitud,
        0
      ),
      lineStyle: { color: "blue", width: 5 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(30, 144, 255, 0.8)" },
          { offset: 0.5, color: "rgba(255, 255, 0, 0.8)" },
          { offset: 1, color: "rgba(255, 0, 0, 0.8)" },
        ]),
        opacity: 0.9,
      },
    },
    {
      name: "Modo Y",
      type: "line3D",
      data: prepareData(
        selectedRecord.modoY.frecuencia,
        selectedRecord.modoY.amplitud,
        1
      ),
      lineStyle: { color: "teal", width: 5 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(30, 144, 255, 0.8)" },
          { offset: 0.5, color: "rgba(255, 255, 0, 0.8)" },
          { offset: 1, color: "rgba(255, 0, 0, 0.8)" },
        ]),
        opacity: 0.9,
      },
    },
    {
      name: "Modo Z",
      type: "line3D",
      data: prepareData(
        selectedRecord.modoZ.frecuencia,
        selectedRecord.modoZ.amplitud,
        2
      ),
      lineStyle: { color: "red", width: 5 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(30, 144, 255, 0.8)" },
          { offset: 0.5, color: "rgba(255, 255, 0, 0.8)" },
          { offset: 1, color: "rgba(255, 0, 0, 0.8)" },
        ]),
        opacity: 0.9,
      },
    },
  ];

  const option = {
    title: {
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      formatter: (params) => {
        const data = params[0].data;
        return `
          Frecuencia: ${data[0]} Hz<br/>
          Amplitud: ${data[2]}
        `;
      },
    },

    xAxis3D: {
      type: "value",
      name: "Frecuencia",
    },
    yAxis3D: {
      type: "value",
      name: "Modo",
    },
    zAxis3D: {
      type: "value",
      name: "Amplitud",
    },
    toolbox: {
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
    grid3D: {
      boxWidth: 200,
      boxDepth: 50,
      boxHeight: 100,
      viewControl: {
        autoRotate: false,
        rotateSensitivity: 2,
        zoomSensitivity: 0.2,
        panSensitivity: 1,
        distance: 250,
        target: [70, 30, 30],
      },
      light: {
        main: { intensity: 1.2 },
        ambient: { intensity: 0.3 },
      },
    },
    series: seriesData,
  };

  const myChart = echarts.init(chart.value);
  myChart.setOption(option);
  window.addEventListener("resize", () => myChart.resize());
};

const changeSelectedRecord = () => {
  render3DGraph();
};

const changeGraph = (type) => {
  let seriesData = []; // Nuevas series de datos según el modo seleccionado

  switch (type) {
    case "modoX":
      seriesData = [
        {
          name: "Modo X",
          type: "line3D",
          data: prepareData(
            currentData.value[selectedRecordIndex.value].modoX.frecuencia,
            currentData.value[selectedRecordIndex.value].modoX.amplitud,
            0
          ),
          lineStyle: { color: "blue", width: 5 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(30, 144, 255, 0.8)" },
              { offset: 0.5, color: "rgba(255, 255, 0, 0.8)" },
              { offset: 1, color: "rgba(255, 0, 0, 0.8)" },
            ]),
            opacity: 0.9,
          },
        },
      ];
      break;
    case "modoY":
      seriesData = [
        {
          name: "Modo Y",
          type: "line3D",
          data: prepareData(
            currentData.value[selectedRecordIndex.value].modoY.frecuencia,
            currentData.value[selectedRecordIndex.value].modoY.amplitud,
            1
          ),
          lineStyle: { color: "green", width: 5 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(30, 144, 255, 0.8)" },
              { offset: 0.5, color: "rgba(255, 255, 0, 0.8)" },
              { offset: 1, color: "rgba(255, 0, 0, 0.8)" },
            ]),
            opacity: 0.9,
          },
        },
      ];
      break;
    case "modoZ":
      seriesData = [
        {
          name: "Modo Z",
          type: "line3D",
          data: prepareData(
            currentData.value[selectedRecordIndex.value].modoZ.frecuencia,
            currentData.value[selectedRecordIndex.value].modoZ.amplitud,
            2
          ),
          lineStyle: { color: "red", width: 5 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(30, 144, 255, 0.8)" },
              { offset: 0.5, color: "rgba(255, 255, 0, 0.8)" },
              { offset: 1, color: "rgba(255, 0, 0, 0.8)" },
            ]),
            opacity: 0.9,
          },
        },
      ];
      break;
    case "all":
      seriesData = [
        {
          name: "Modo X",
          type: "line3D",
          data: prepareData(
            currentData.value[selectedRecordIndex.value].modoX.frecuencia,
            currentData.value[selectedRecordIndex.value].modoX.amplitud,
            0
          ),
          lineStyle: { color: "blue", width: 5 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(30, 144, 255, 0.8)" },
              { offset: 0.5, color: "rgba(255, 255, 0, 0.8)" },
              { offset: 1, color: "rgba(255, 0, 0, 0.8)" },
            ]),
            opacity: 0.9,
          },
        },
        {
          name: "Modo Y",
          type: "line3D",
          data: prepareData(
            currentData.value[selectedRecordIndex.value].modoY.frecuencia,
            currentData.value[selectedRecordIndex.value].modoY.amplitud,
            1
          ),
          lineStyle: { color: "green", width: 5 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(30, 144, 255, 0.8)" },
              { offset: 0.5, color: "rgba(255, 255, 0, 0.8)" },
              { offset: 1, color: "rgba(255, 0, 0, 0.8)" },
            ]),
            opacity: 0.9,
          },
        },
        {
          name: "Modo Z",
          type: "line3D",
          data: prepareData(
            currentData.value[selectedRecordIndex.value].modoZ.frecuencia,
            currentData.value[selectedRecordIndex.value].modoZ.amplitud,
            2
          ),
          lineStyle: { color: "red", width: 5 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(30, 144, 255, 0.8)" },
              { offset: 0.5, color: "rgba(255, 255, 0, 0.8)" },
              { offset: 1, color: "rgba(255, 0, 0, 0.8)" },
            ]),
            opacity: 0.9,
          },
        },
      ];
      break;
    default:
      break;
  }

  const myChart = echarts.getInstanceByDom(chart.value);
  myChart.setOption({
    series: seriesData,
  });

  // Comprobar límites y mostrar alertas
  checkLimits(seriesData);
};

const checkLimits = (seriesData) => {
  const currentRecord = currentData.value[selectedRecordIndex.value];

  // Verificar el límite para cada modo
  seriesData.forEach((serie) => {
    const mode = serie.name.split(" ")[1];
    const limit = getLimitForMode(mode);

    if (mode === "X") {
      const maxAmplitude = Math.max(...currentRecord.modoX.amplitud);
      if (maxAmplitude > limit) {
        alert(`¡Alerta! El modo X ha superado el límite de ${limit}`);
      }
    } else if (mode === "Y") {
      const maxAmplitude = Math.max(...currentRecord.modoY.amplitud);
      if (maxAmplitude > limit) {
        alert(`¡Alerta! El modo Y ha superado el límite de ${limit}`);
      }
    } else if (mode === "Z") {
      const maxAmplitude = Math.max(...currentRecord.modoZ.amplitud);
      if (maxAmplitude > limit) {
        alert(`¡Alerta! El modo Z ha superado el límite de ${limit}`);
      }
    }
  });
};

const getLimitForMode = (mode) => {
  switch (mode) {
    case "X":
      return LIMIT_MODE_X;
    case "Y":
      return LIMIT_MODE_Y;
    case "Z":
      return LIMIT_MODE_Z;
    default:
      return 0;
  }
};

const toggleGrid3D = () => {
  const myChart = echarts.getInstanceByDom(chart.value);
  const gridVisible = myChart.getOption().grid3D.show;
  myChart.setOption({
    grid3D: {
      show: !gridVisible,
    },
  });
};

const resetView = () => {
  const myChart = echarts.getInstanceByDom(chart.value);
  myChart.dispatchAction({
    type: "restore",
  });
};

// Función para preparar los datos en el formato esperado por ECharts
const prepareData = (frecuencia, amplitud, yAxisIndex) => {
  const data = [];
  for (let i = 0; i < frecuencia.length; i++) {
    data.push([frecuencia[i], yAxisIndex, amplitud[i]]);
  }
  return data;
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
  height: 60vh; /* Ajustamos la altura del gráfico */
}
</style>
