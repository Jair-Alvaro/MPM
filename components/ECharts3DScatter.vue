<template>
  <div id="main" style="width: 100%; height: 600px"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";

export default {
  data() {
    return {
      myChart: null,
      option: null,
      data: [], // Aquí almacenaremos nuestros datos ficticios
    };
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("main"));
    this.loadData();
  },
  methods: {
    loadData() {
      this.data = [
        {
          Income: 10000,
          "Life Expectancy": 70,
          Population: 5000000,
          Country: "Country A",
          Year: "2022",
        },
        {
          Income: 20000,
          "Life Expectancy": 75,
          Population: 7000000,
          Country: "Country B",
          Year: "2022",
        },
        {
          Income: 30000,
          "Life Expectancy": 80,
          Population: 9000000,
          Country: "Country C",
          Year: "2022",
        },
        {
          Income: 22000,
          "Life Expectancy": 73,
          Population: 6000000,
          Country: "Country F",
          Year: "2022",
        },
        {
          Income: 28000,
          "Life Expectancy": 77,
          Population: 8000000,
          Country: "Country G",
          Year: "2022",
        },
        {
          Income: 32000,
          "Life Expectancy": 82,
          Population: 9500000,
          Country: "Country H",
          Year: "2022",
        },
        {
          Income: 19000,
          "Life Expectancy": 69,
          Population: 4800000,
          Country: "Country I",
          Year: "2022",
        },
        {
          Income: 27000,
          "Life Expectancy": 76,
          Population: 7500000,
          Country: "Country J",
          Year: "2022",
        },
        // Agrega más datos ficticios según sea necesario
      ];

      // Llama al método para inicializar y dibujar el gráfico
      this.drawChart();
    },
    drawChart() {
      const symbolSize = 2.5;
      this.option = {
        grid3D: {},
        xAxis3D: { type: "category" },
        yAxis3D: {},
        zAxis3D: {},
        dataset: {
          dimensions: [
            "Income",
            "Life Expectancy",
            "Population",
            "Country",
            { name: "Year", type: "ordinal" },
          ],
          source: this.data,
        },
        series: [
          {
            type: "scatter3D",
            symbolSize: symbolSize,
            encode: {
              x: "Country",
              y: "Life Expectancy",
              z: "Income",
              tooltip: [0, 1, 2, 3, 4],
            },
          },
        ],
      };
      this.myChart.setOption(this.option);
    },
  },
};
</script>
