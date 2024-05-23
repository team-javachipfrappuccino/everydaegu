<template>
    <div class="container">
        <div class="row">
            <div class="column">
                <h1>노인요양시설 현황</h1><br>
                <h2>관할구역별 시설 수</h2>
                <div id="senior" class="chartdiv"></div>
            </div>
            <div class="column">
                <h2 style="margin-top: 60px;">관할구역별 입소 정원</h2>
                <div id="seniorCapacity" class="chartdiv"></div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="column">
                <h1>아동복지시설 현황</h1><br>
                <h2>관할구역별 시설 수</h2>
                <div id="child" class="chartdiv"></div>
            </div>
            <div class="column">
                <h2 style="margin-top: 60px;">관할구역별 정원 현황</h2>
                <div id="childCapacity" class="chartdiv2"></div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="column">
                <h2>공공시설 현황</h2>
                <div id="public" class="chartdiv"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import * as am5 from "@amcharts/amcharts5"; // amChart5 기본 라이브러리
import * as am5xy from "@amcharts/amcharts5/xy"; // 막대, 라인 차트
import * as am5percent from "@amcharts/amcharts5/percent"; // 파이류 차트
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"; // 차트 애니메이션
  
export default {
    data() {
        return {
            publicData: [],
            seniorData: [],
            childData: [],
        };
    },
  
    mounted() {
        this.publicCenterCount();
        this.seniorCenterCount();
        this.childCenterCount();
    },
  
    methods: {
        publicCenterCount() {
            axios.post("/publicCenterCount.json", {}, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("publicData - response.data:", response.data);
                if (Array.isArray(response.data)) {
                    this.publicData = response.data;
                    this.publicChart();
                } else {
                    console.error("Invalid response format:", response.data);
                    alert("데이터 형식이 올바르지 않습니다.");
                }
            })
            .catch((error) => {
                console.error("publicData - error:", error);
                alert("오류 발생: " + error.message);
            });
        },
        seniorCenterCount() {
            axios.post("/seniorCenterCount.json", {}, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("seniorData - response.data:", response.data);
                if (Array.isArray(response.data)) {
                    this.seniorData = response.data;
                    this.seniorChart();
                    this.seniorCapacityChart();
                } else {
                    console.error("Invalid response format:", response.data);
                    alert("데이터 형식이 올바르지 않습니다.");
                }
            })
            .catch((error) => {
                console.error("seniorData - error:", error);
                alert("오류 발생: " + error.message);
            });
        },
        childCenterCount() {
            axios.post("/childCenterCount.json", {}, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("childData - response.data:", response.data);
                if (Array.isArray(response.data)) {
                    this.childData = response.data;
                    this.childChart();
                    this.childCapacityChart();
                } else {
                    console.error("Invalid response format:", response.data);
                    alert("데이터 형식이 올바르지 않습니다.");
                }
            })
            .catch((error) => {
                console.error("childData - error:", error);
                alert("오류 발생: " + error.message);
            });
        },


        publicChart() {
            const vm = this;

            am5.ready(function() {
                var root = am5.Root.new("public");

                root.setThemes([am5themes_Animated.new(root)]);

                var chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true,
                    paddingLeft: 0,
                    paddingRight: 0
                }));

                var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
                cursor.lineY.set("visible", false);

                var xRenderer = am5xy.AxisRendererX.new(root, { 
                    minGridDistance: 30, 
                    minorGridEnabled: true
                });

                xRenderer.labels.template.setAll({
                    rotation: 1,
                });

                xRenderer.grid.template.setAll({
                    location: 1
                });

                var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "public_center_add",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {})
                }));

                var yRenderer = am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1
                });

                var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    maxDeviation: 0.3,
                    renderer: yRenderer
                }));

                var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: "Series 1",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "count",
                    sequencedInterpolation: true,
                    categoryXField: "public_center_add",
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "{valueY}"
                    })
                }));

                series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
                series.columns.template.adapters.add("fill", function (fill, target) {
                    return chart.get("colors").getIndex(series.columns.indexOf(target));
                });

                series.columns.template.adapters.add("stroke", function (stroke, target) {
                    return chart.get("colors").getIndex(series.columns.indexOf(target));
                });

                var data = vm.publicData.map(item => ({
                    public_center_add: item.public_center_add,
                    count: item.count,
                }));

                xAxis.data.setAll(data);
                series.data.setAll(data);

                series.appear(1000);
                chart.appear(1000, 100);

                root._logo.dispose(); //amChart

            });
        },
        seniorChart() {
            const vm = this;

            am5.ready(function() {
                var root = am5.Root.new("senior");

                root.setThemes([am5themes_Animated.new(root)]);

                var chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true,
                    paddingLeft: 0,
                    paddingRight: 0
                }));

                var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
                cursor.lineY.set("visible", false);

                var xRenderer = am5xy.AxisRendererX.new(root, { 
                    minGridDistance: 30, 
                    minorGridEnabled: true
                });

                xRenderer.labels.template.setAll({
                    rotation: 1,
                });

                xRenderer.grid.template.setAll({
                    location: 1
                });

                var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "소재지",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {})
                }));

                var yRenderer = am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1
                });

                var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    maxDeviation: 0.3,
                    renderer: yRenderer
                }));

                var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: "Series 1",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "시설수",
                    sequencedInterpolation: true,
                    categoryXField: "소재지",
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "{valueY}"
                    })
                }));

                series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
                series.columns.template.adapters.add("fill", function (fill, target) {
                    return chart.get("colors").getIndex(series.columns.indexOf(target));
                });

                series.columns.template.adapters.add("stroke", function (stroke, target) {
                    return chart.get("colors").getIndex(series.columns.indexOf(target));
                });

                var data = vm.seniorData.map(item => ({
                    소재지: item.소재지,
                    시설수: item.시설수,
                }));

                xAxis.data.setAll(data);
                series.data.setAll(data);

                series.appear(1000);
                chart.appear(1000, 100);

                root._logo.dispose(); //amChart

            });
        },
        seniorCapacityChart() {

            const vm = this;

            am5.ready(function() {

                // Create root element
                var root = am5.Root.new("seniorCapacity");

                // Set themes
                root.setThemes([
                    am5themes_Animated.new(root)
                ]);

                // Create chart
                var chart = root.container.children.push(
                    am5percent.PieChart.new(root, {
                        endAngle: 270
                    })
                );

                // Create series
                var series = chart.series.push(
                    am5percent.PieSeries.new(root, {
                        valueField: "비율",
                        categoryField: "소재지",
                        endAngle: 270
                    })
                );

                series.states.create("hidden", {
                    endAngle: -90
                });

                // Set data
                var data = vm.seniorData.map(item => ({
                    소재지: item.소재지,
                    입소정원: item.입소정원
                }));

                // Calculate the total capacity
                var totalCapacity = data.reduce((sum, item) => sum + item.입소정원, 0);

                // Calculate the percentages for the pie chart
                var pieData = data.map(item => ({
                    소재지: item.소재지,
                    비율: (item.입소정원 / totalCapacity) * 100
                }));

                // Set data to series
                series.data.setAll(pieData);

                series.appear(1000, 100);

                // Remove amCharts logo
                root._logo.dispose();

            }); // end am5.ready()
        },
        childChart() {
            const vm = this;

            am5.ready(function() {
                var root = am5.Root.new("child");

                root.setThemes([am5themes_Animated.new(root)]);

                var chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true,
                    paddingLeft: 0,
                    paddingRight: 0
                }));

                var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
                cursor.lineY.set("visible", false);

                var xRenderer = am5xy.AxisRendererX.new(root, { 
                    minGridDistance: 30, 
                    minorGridEnabled: true
                });

                xRenderer.labels.template.setAll({
                    rotation: 1,
                });

                xRenderer.grid.template.setAll({
                    location: 1
                });

                var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "소재지",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {})
                }));

                var yRenderer = am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1
                });

                var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    maxDeviation: 0.3,
                    renderer: yRenderer
                }));

                var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: "Series 1",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "시설수",
                    sequencedInterpolation: true,
                    categoryXField: "소재지",
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "{valueY}"
                    })
                }));

                series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
                series.columns.template.adapters.add("fill", function (fill, target) {
                    return chart.get("colors").getIndex(series.columns.indexOf(target));
                });

                series.columns.template.adapters.add("stroke", function (stroke, target) {
                    return chart.get("colors").getIndex(series.columns.indexOf(target));
                });

                var data = vm.childData.map(item => ({
                    소재지: item.소재지,
                    시설수: item.시설수,
                }));

                xAxis.data.setAll(data);
                series.data.setAll(data);

                series.appear(1000);
                chart.appear(1000, 100);

                root._logo.dispose(); //amChart

            });
        },
        childCapacityChart() {

            const vm = this;

            am5.ready(function() {
                // Create root element
                var root = am5.Root.new("childCapacity");

                // Set themes
                root.setThemes([am5themes_Animated.new(root)]);

                // Create chart
                var chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    paddingLeft: 0,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    layout: root.verticalLayout
                }));

                // Add legend
                var legend = chart.children.push(
                    am5.Legend.new(root, {
                    centerX: am5.p50,
                    x: am5.p50
                    })
                );

                var data = vm.childData.map(item => ({
                    소재지: item.소재지,
                    정원: item.정원,
                    현원: item.현원
                }));

                // Create axes
                var xRenderer = am5xy.AxisRendererX.new(root, {
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9,
                    minGridDistance: 30,
                    minorGridEnabled: true
                });

                var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "소재지",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {})
                }));

                xRenderer.grid.template.setAll({
                    location: 1
                });
                
                xAxis.data.setAll(data);

                var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1
                    })
                }));

                // Add series
                function makeSeries(name, fieldName) {
                    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                        name: name,
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueYField: fieldName,
                        categoryXField: "소재지"
                    }));

                    series.columns.template.setAll({
                        tooltipText: "{name}, {categoryX}:{valueY}",
                        width: am5.percent(90),
                        tooltipY: 0,
                        strokeOpacity: 0
                    });

                    series.data.setAll(data);


                    series.appear();

                    series.bullets.push(function () {
                        return am5.Bullet.new(root, {
                            locationY: 0,
                            sprite: am5.Label.new(root, {
                                text: "{valueY}",
                                fill: root.interfaceColors.get("alternativeText"),
                                centerY: 0,
                                centerX: am5.p50,
                                populateText: true
                            })
                        });
                    });

                    legend.data.push(series);
                }

                makeSeries("정원", "정원");
                makeSeries("현원", "현원");

                chart.appear(1000, 100);

                root._logo.dispose(); //amChart 로고 삭제
            });
        },
    },
};
</script>
  
<style>
.chartdiv {
    width: 100%;
    height: 250px;
    margin-top: 10px;
}

.chartdiv2{
    width: 100%;
    height: 278px;
    margin-top: 10px;
}
.container {
    width: 100%;
    display: flex; 
    justify-content: center;
    padding: 10px;
}
.row {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
}
.column {
    flex: 100%;
    padding: 20px;
}
</style>
