<template>


  <UDashboardCard :ui="{ body: { padding: '!pb-3 !px-0' } }">
      <template #header>
        <p class="text-xl font-semibold">Temperaturas Diarias</p>
      </template>
      <div ref="chart" style="width: 100%; height: 600px"></div>

    
    </UDashboardCard>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chart = ref(null);

onMounted(() => {
  const myChart = echarts.init(chart.value);

  let base = +new Date(2023, 0, 1);
  let oneDay = 24 * 3600 * 1000;
  let date = [];
  let data = [20 + Math.random() * 5];
  for (let i = 1; i < 365; i++) {
    let now = new Date((base += oneDay));
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"));
    data.push(Math.round((Math.random() - 0.5) * 10 + data[i - 1]));
  }

  const option = {
    title: {
      left: "center",
      textStyle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
      },
    },
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
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
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: date,
      axisLabel: {
        formatter: function (value) {
          let date = new Date(value);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        },
      },
      axisLine: {
        lineStyle: {
          color: "#ccc",
        },
      },
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "10%"],
      axisLine: {
        lineStyle: {
          color: "#ccc",
        },
      },
      axisLabel: {
        formatter: "{value} °C",
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
      },
    ],
    series: [
      {
        name: "Temperatura",
        type: "line",
        symbol: "circle",
        symbolSize: 6,
        sampling: "lttb",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#FF0000" }, // Verde
            { offset: 0.5, color: "#FFFF00" }, // Amarillo
            { offset: 1, color: "#00FF00" }, // Rojo
          ]),
        },
        lineStyle: {
          color: "rgba(0, 0, 0, 0.8)", // Negro
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#FF0000" }, // Verde
            { offset: 0.5, color: "#FFFF00" }, // Amarillo
            { offset: 1, color: "#00FF00" }, // Rojo
          ]),
        },
        data: data,
      },
    ],
  };

  myChart.setOption(option);
});
</script>

<style scoped></style>
