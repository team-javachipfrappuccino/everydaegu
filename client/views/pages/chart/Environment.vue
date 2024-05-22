<template>
    <div class="chart-container-wrapper">
      <div class="chart-column" style="padding-left: 100px;">
        <h2 style="padding-left: 200px; padding-top: 30px;">대기 수질 환경오염배출사업장 현황</h2>
        <div id="chartdiv1" class="chart-container"></div>
      </div>
      <div class="chart-column" style="padding-right: 100px;">
        <h2 style="padding-left: 200px; padding-top: 30px;">2023 월별 폐기물 처리량</h2>
        <div id="chartdiv2" class="chart-container"></div>
        <p style="text-align: right; padding-right: 90px; ">처리차량(대)</p>
      </div>
    </div>
    <div class="chart-column2">
      <h2 style="padding-left: 750px; padding-top: 30px;">연도별 폐기물 반입현황</h2>
      <div class="dropdown-wrapper">
        <div class="dropdown-and-amount">
          <select @change="updateChart" v-model="selectedMonth">
            <option v-for="month in months" :key="month">{{ month }}</option>
          </select>
          <button @click="showTrashCanStatus">대구 쓰레기통 설치 지역</button>
          <p>반입차량(대)</p>
        </div>
      </div>
      <div id="chartdiv3" class="chart-container"></div>
    </div>
  </template>
  
<script>
import axios from "axios";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
  
  export default {
    data() {
      return {
        selectedMonth: '1월',
        months: [         
          '1월', '2월', '3월', '4월', '5월', '6월',
          '7월', '8월', '9월', '10월', '11월', '12월'
        ],
        wasteData: [],
        chartData: [],
        carryInData: [
          [
            { year: "2022", life_waste: 3305, construction_site_waste: 1505, workplace_waste: 330 },
            { year: "2023", life_waste: 5631, construction_site_waste: 2457, workplace_waste: 283 },
            { year: "2024", life_waste: 3192, construction_site_waste: 853, workplace_waste: 157 }
          ]
        ],
      };
    },
    methods: {
      loadData() {
        this.loadPieChartData();
        this.loadBarChartData();
        this.loadCarryInData();
      },
  
      loadPieChartData() {
        axios.post("/wasteList.json", {})
          .then(response => {
            console.log("wasteSelectData - response:", response.data);
            this.wasteData = response.data;
            this.preparePieChartData();
          })
          .catch(error => {
            console.log("wasteSelectData - error :", error);
            alert("파이차트 조회 오류");
          });
      },
  
      loadBarChartData() {
        axios.post("/processList.json", {})
          .then(response => {
            console.log("selectChartData - response:", response.data);
            this.chartData = response.data;
            this.prepareBarChart();
          })
          .catch(error => {
            console.log("selectChartData - error :", error);
            alert("막대차트 조회 오류");
          });
      },
  
      loadCarryInData() {
        axios.post("/carryInList.json", {})
          .then(response => {
            this.carryInData = response.data;
            this.createCarryInChart(this.carryInData);
          })
          .catch(error => {
            alert("차트3 조회 오류");
          });
      },
  
      preparePieChartData() {
        const groupedData = this.groupDataByInduty();
        const pieChartData = Object.entries(groupedData).map(([induty, count]) => ({
          category: induty,
          value: count 
        }));
        this.createPieChart(pieChartData);
      },
  
      groupDataByInduty() {
        const groupedData = {};
        this.wasteData.forEach(item => {
          const induty = item.INDUTY;
          if (groupedData[induty]) {
            groupedData[induty]++;
          } else {
            groupedData[induty] = 1;
          }
        });
        return groupedData;
      },
  
      prepareBarChart() {
        const barChartData = this.chartData.map(item => ({
          month: item.month,
          total_vehicles: item.total_vehicles
        }));
        this.createBarChart(barChartData);
      },
  
      createPieChart(data) {
        var root1 = am5.Root.new("chartdiv1");
        const theme1 = am5.Theme.new(root1);
  
        var chart1 = root1.container.children.push(am5percent.PieChart.new(root1, {
          layout: root1.verticalLayout
        }));
  
        var series1 = chart1.series.push(am5percent.PieSeries.new(root1, {
          valueField: "value",
          categoryField: "category"
        }));
  
        series1.data.setAll(data);
        series1.appear(1000, 100);

        root1._logo.dispose();
      },
  
      createBarChart(data) {
        var root2 = am5.Root.new("chartdiv2");
        const theme2 = am5.Theme.new(root2);
  
        var chart2 = root2.container.children.push(am5xy.XYChart.new(root2, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingLeft: 0,
          paddingRight: 1
        }));
  
        var cursor2 = chart2.set("cursor", am5xy.XYCursor.new(root2, {}));
        cursor2.lineY.set("visible", false);
  
        var xRenderer2 = am5xy.AxisRendererX.new(root2, {
          minGridDistance: 30,
          minorGridEnabled: true
        });
        xRenderer2.labels.template.setAll({
          rotation: 0,
          centerY: am5.p50,
          centerX: am5.p100,
          paddingRight: 15
        });
        xRenderer2.grid.template.setAll({
          location: 1
        });
        var xAxis2 = chart2.xAxes.push(am5xy.CategoryAxis.new(root2, {
          maxDeviation: 0.3,
          categoryField: "month",
          renderer: xRenderer2,
          tooltip: am5.Tooltip.new(root2, {})
        }));
  
        var yRenderer2 = am5xy.AxisRendererY.new(root2, {
          strokeOpacity: 0.1
        });
        var yAxis2 = chart2.yAxes.push(am5xy.ValueAxis.new(root2, {
          maxDeviation: 0.3,
          renderer: yRenderer2
        }));
  
        var series2 = chart2.series.push(am5xy.ColumnSeries.new(root2, {
          name: "Series 2",
          xAxis: xAxis2,
          yAxis: yAxis2,
          valueYField: "total_vehicles",
          sequencedInterpolation: true,
          categoryXField: "month",
          tooltip: am5.Tooltip.new(root2, {
            labelText: "{valueY}"
          })
        }));
        series2.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        series2.columns.template.adapters.add("fill", function (fill, target) {
          return chart2.get("colors").getIndex(series2.columns.indexOf(target));
        });
        series2.columns.template.adapters.add("stroke", function (stroke, target) {
          return chart2.get("colors").getIndex(series2.columns.indexOf(target));
        });
  
        xAxis2.data.setAll(data);
        series2.data.setAll(data);
  
        series2.appear(1000);
        chart2.appear(1000, 100);

        root2._logo.dispose();
      },
  
      createCarryInChart(data) {
        var root3 = am5.Root.new("chartdiv3");
  
        root3.setThemes([
          am5themes_Animated.new(root3)
        ]);
  
        var chart3 = root3.container.children.push(am5xy.XYChart.new(root3, {
          panX: false,
          panY: false,
          paddingLeft: 0,
          layout: root3.verticalLayout
        }));
  
        chart3.set("scrollbarX", am5.Scrollbar.new(root3, { orientation: "horizontal" }));
  
        var xAxis3 = chart3.xAxes.push(am5xy.CategoryAxis.new(root3, {
          categoryField: "year",
          renderer: am5xy.AxisRendererX.new(root3, { minGridDistance: 30 })
        }));
        xAxis3.get("renderer").labels.template.setAll({
          rotation: 0,
          centerY: am5.p50,
          centerX: am5.p100,
          paddingRight: 15,
          fontSize: 20
        });
  
        var yAxis3 = chart3.yAxes.push(am5xy.ValueAxis.new(root3, {
          renderer: am5xy.AxisRendererY.new(root3, {})
        }));
  
        var series3_1 = chart3.series.push(am5xy.ColumnSeries.new(root3, {
          name: "생활폐기물",
          xAxis: xAxis3,
          yAxis: yAxis3,
          valueYField: "life_waste",
          categoryXField: "year",
          tooltip: am5.Tooltip.new(root3, { labelText: "{name}: {valueY}" })
        }));
  
        var series3_2 = chart3.series.push(am5xy.ColumnSeries.new(root3, {
          name: "건설현장 폐기물",
          xAxis: xAxis3,
          yAxis: yAxis3,
          valueYField: "construction_site_waste",
          categoryXField: "year",
          tooltip: am5.Tooltip.new(root3, { labelText: "{name}: {valueY}" })
        }));
  
        var series3_3 = chart3.series.push(am5xy.ColumnSeries.new(root3, {
          name: "작업장 폐기물",
          xAxis: xAxis3,
          yAxis: yAxis3,
          valueYField: "workplace_waste",
          categoryXField: "year",
          tooltip: am5.Tooltip.new(root3, { labelText: "{name}: {valueY}" })
        }));
  
        var legend = chart3.children.push(am5.Legend.new(root3, {}));
        legend.data.setAll(chart3.series.values);
  
        xAxis3.data.setAll(data);
        series3_1.data.setAll(data);
        series3_2.data.setAll(data);
        series3_3.data.setAll(data);
  
        chart3.appear(1000, 100);

        root3._logo.dispose();
      }
    },
    mounted() {
      this.loadData();
    }
  };
  </script>
  
  <style>
  .chart-container-wrapper {
    display: flex;
    margin: 30px;
  }
  
  .chart-column {
    flex: auto;
  }
  
  .chart-container {
    width: 90%;
    height: 500px;
  }
  
  .chart-column2 {
    width: 90%;
    padding-top: 30px;
    padding-left: 100px;
  }
  
  .dropdown-wrapper {
    padding-left: 30px;
  }
  
  .dropdown-and-amount {
    display: flex;
    align-items: center;
  }
  
  .dropdown-wrapper select {
    padding: 7px;
    font-size: 15px;
  }
  
  .dropdown-wrapper p {
    margin-left: 20px;
  }
  
  .dropdown-wrapper button {
    margin-left: 20px;
    padding: 7px 10px;
    font-size: 15px;
  }
  </style>
  