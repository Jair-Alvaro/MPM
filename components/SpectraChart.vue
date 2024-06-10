<template>
    <div ref="chartRef" style="width: 100%; height: 600px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const sizeValue = '57%';
        const symbolSize = 2.5;
  
        // Definir los datos estáticos
        const data = [
          ['Income', 'Life Expectancy', 'Population', 'Country', { name: 'Year', type: 'ordinal' }],
          [10000, 80, 100000, 'USA', 2020],
          [15000, 85, 80000, 'China', 2020],
          [20000, 75, 90000, 'India', 2020],
          [25000, 78, 70000, 'Brazil', 2020]
        ];
  
        const option = {
          tooltip: {},
          grid3D: {
            width: '50%'
          },
          xAxis3D: {},
          yAxis3D: {},
          zAxis3D: {},
          grid: [
            { left: '50%', width: '20%', bottom: sizeValue },
            { left: '75%', width: '20%', bottom: sizeValue },
            { left: '50%', width: '20%', top: sizeValue },
            { left: '75%', width: '20%', top: sizeValue }
          ],
          xAxis: [
            {
              type: 'value',
              gridIndex: 0,
              name: 'Income',
              axisLabel: { rotate: 50, interval: 0 }
            },
            {
              type: 'category',
              gridIndex: 1,
              name: 'Country',
              boundaryGap: false,
              axisLabel: { rotate: 50, interval: 0 }
            },
            {
              type: 'value',
              gridIndex: 2,
              name: 'Income',
              axisLabel: { rotate: 50, interval: 0 }
            },
            {
              type: 'value',
              gridIndex: 3,
              name: 'Life Expectancy',
              axisLabel: { rotate: 50, interval: 0 }
            }
          ],
          yAxis: [
            { type: 'value', gridIndex: 0, name: 'Life Expectancy' },
            { type: 'value', gridIndex: 1, name: 'Income' },
            { type: 'value', gridIndex: 2, name: 'Population' },
            { type: 'value', gridIndex: 3, name: 'Population' }
          ],
          dataset: {
            source: data
          },
          series: [
            {
              type: 'scatter3D',
              symbolSize: 3,
              encode: {
                x: 'Population',
                y: 'Life Expectancy',
                z: 'Income',
                tooltip: [0, 1, 2, 3, 4]
              }
            },
            {
              type: 'scatter',
              symbolSize: symbolSize,
              xAxisIndex: 0,
              yAxisIndex: 0,
              encode: {
                x: 'Income',
                y: 'Life Expectancy',
                tooltip: [0, 1, 2, 3, 4]
              }
            },
            {
              type: 'scatter',
              symbolSize: symbolSize,
              xAxisIndex: 1,
              yAxisIndex: 1,
              encode: {
                x: 'Country',
                y: 'Income',
                tooltip: [0, 1, 2, 3, 4]
              }
            },
            {
              type: 'scatter',
              symbolSize: symbolSize,
              xAxisIndex: 2,
              yAxisIndex: 2,
              encode: {
                x: 'Income',
                y: 'Population',
                tooltip: [0, 1, 2, 3, 4]
              }
            },
            {
              type: 'scatter',
              symbolSize: symbolSize,
              xAxisIndex: 3,
              yAxisIndex: 3,
              encode: {
                x: 'Life Expectancy',
                y: 'Population',
                tooltip: [0, 1, 2, 3, 4]
              }
            }
          ]
        };
  
        const myChart = echarts.init(this.$refs.chartRef);
        myChart.setOption(option);
      }
    }
  };
  </script>
  
  <style>
  </style>
  