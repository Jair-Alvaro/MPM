<template>
  <UDashboardCard :ui="{ body: { padding: '!pb-3 !px-0' } }">
    <template #header>
      <p class="text-xl font-semibold">Espectro de Frecuencia</p>
      <pre>{{data}}</pre>
    </template>

    <div class="container" ref="cardRef">
      <div ref="chart" class="chart"></div>
    </div>
  </UDashboardCard>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import axios from "axios";

const chart = ref(null);
const cardRef = ref(null); // Agregar referencia al contenedor del componente

const showGraph = async () => {
  try {
    // Obtener datos de la API
    const response = await axios.get("http://34.207.208.96:9000/api/spectral");
    const data = response.data[0]; // Se asume que la respuesta es un arreglo con un solo elemento

    // Muestreo de datos: Tomar cada 10mo punto de datos para mayor claridad
    const labels = data.frecuencia.filter((_, index) => index % 10 === 0);
    const amplitudes = data.Amplitud.filter((_, index) => index % 10 === 0);

    const limiteSuperior = 800; // Define el límite superior

    // Creamos un nuevo arreglo para los datos donde coloreamos en rojo las líneas por encima del límite
    const amplitudesColoreadas = amplitudes.map((amplitud) => ({
      value: amplitud,
      itemStyle: {
        color: amplitud > limiteSuperior ? "red" : null, // Si la amplitud es mayor que el límite, coloreamos en rojo
      },
    }));

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
        min: 0,
        max: Math.max(...amplitudes) + 1000, // Ajustar el rango del eje y
        splitLine: { show: false }, // Ocultar las líneas horizontales
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
      series: [
        {
          name: "Amplitud",
          type: "line",
          data: amplitudesColoreadas, // Utilizamos el nuevo arreglo con los datos coloreados
        },
      ],
    };

    const myChart = echarts.init(chart.value);
    myChart.setOption(option);
    // Ajustar el tamaño del gráfico al cambiar el tamaño de la ventana
    window.addEventListener("resize", myChart.resize);
  } catch (error) {
    console.error(error);
  }
};

onMounted(showGraph);
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart {
  width: 100%;
  height: 60vh;
}
</style>
