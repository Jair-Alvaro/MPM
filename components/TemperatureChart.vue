<template>
  <UDashboardCard :ui="{ body: { padding: '!pb-3 !px-0' } }">
    <template #header>
      <p class="text-xl font-semibold">Temperaturas Diarias</p>
    </template>
    <div ref="chart" style="width: 100%; height: 600px"></div>
  </UDashboardCard>
</template>

<script setup>
import * as echarts from 'echarts';
import axios from 'axios';

const chart = ref(null);

onMounted(() => {
  const myChart = echarts.init(chart.value);

  const fetchTemperatureData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/spectrals');
      const apiData = response.data;

      // Extract temperature and time data
      const temperatures = apiData[7].temp.temperatura;
      const times = apiData[7].temp.tiempo;

      // Format the time data for ECharts
      const formattedTimes = times.map(time => new Date(time).toLocaleDateString('en-CA'));

      const option = {
        title: {
          left: 'center',
          textStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333',
          },
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          },
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: formattedTimes,
          axisLabel: {
            formatter: function (value) {
              let date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            },
          },
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '10%'],
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          axisLabel: {
            formatter: '{value} °C',
          },
        },
        dataZoom: [
          {
            type: 'inside',
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
            name: 'Temperatura',
            type: 'line',
            symbol: 'circle',
            symbolSize: 6,
            sampling: 'lttb',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#FF0000' }, // Red
                { offset: 0.5, color: '#FFFF00' }, // Yellow
                { offset: 1, color: '#00FF00' }, // Green
              ]),
            },
            lineStyle: {
              color: 'rgba(0, 0, 0, 0.8)', // Black
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#FF0000' }, // Red
                { offset: 0.5, color: '#FFFF00' }, // Yellow
                { offset: 1, color: '#00FF00' }, // Green
              ]),
            },
            data: temperatures,
          },
        ],
      };

      myChart.setOption(option);
    } catch (error) {
      console.error('Error fetching temperature data:', error);
    }
  };

  fetchTemperatureData();
});
</script>

<style scoped>
/* You can place your CSS styles here */
</style>
