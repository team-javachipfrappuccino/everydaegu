<template>
    <div class="container">
        <div class="row">
            <div class="column">
                <h2>연도별 대구 인구 변화</h2>
                <div id="chartdiv1" class="chartdiv"></div>
            </div>
            <div class="column">
                <h2>대구 남녀 인구변화</h2>
                <div id="chartdiv2" class="chartdiv"></div>
            </div>
            <div class="column">
                <h2>대구 등록세대수 변화</h2>
                <div id="chartdiv3" class="chartdiv"></div>
            </div>
        </div>
    </div>
    <hr>
    <div class="container">
        <div class="row">
            <div class="column">
                <h2>대구 인구증감율</h2>
                <div id="chartdiv4" class="chartdiv"></div>
            </div>
            <div class="column">
                <h2>대구 노인 인구변화</h2>
                <div id="chartdiv5" class="chartdiv"></div>
            </div>
            <div class="column">
                <h2>대구 지역 인구수</h2>
                <div id="chartdiv6" class="chartdiv"></div>
            </div>
        </div>
    </div>
    <hr>
    <div class="container">
        <div class="row">
            <div class="column">
                <h1 style="margin-top: 12px;">대구 인구밀도</h1><br>
                <div class="flex-container">
                    <div class = "textbox1">
                        국토교통부 "지적통계"의 행정구역별 국토면적을 이용하여 업데이트 하였음</div>
                <div id="chartdiv7" class="chartdiv"></div>
                </div>
            </div>
            <div class="column">
                <h2 style="margin-top: 12px;">대구 외국인 인구변화</h2><br>
                <div class="flex-container">
                <div class = "textbox2">
                    fff</div>
                <div id="chartdiv8" class="chartdiv"></div>
                </div>
            </div>
        </div>
    </div>
    <hr>
</template>

<script>
import axios from "axios";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default {
    data() {
        return {
            dataList: [],
            chartData: {
                year: [],
                Register: [],
                Register_men: [],
                Register_women: [],
                Korean: [],
                Korean_man: [],
                Korean_women: [],
                Foreign: [],
                Households: [],
                Foreign_man: [],
                Foreign_women: [],
                plus: [],
                Elderly: [],
                density: [],
                pieData: [
                    { region: "달서구", value: 525768 },
                    { region: "수성구", value: 411533 },
                    { region: "남구", value: 141519 },
                    { region: "달성군", value: 263162 },
                    { region: "동구", value: 339530 },
                    { region: "북구", value: 430912 },
                    { region: "서구", value: 159827 },
                    { region: "중구", value: 91034 }
                ]
            }
        };
    },
    methods: {
        loadData() {
            axios.post("/chartList.json", {}, { headers: { "Content-Type": "application/json" }})
                .then(response => {
                    this.dataList = response.data;
                    this.prepareChartData();
                })
                .catch(error => {
                    console.log("데이터 조회 오류:", error);
                    alert("조회 오류");
                });
        },
        prepareChartData() {
            this.dataList.forEach(item => {
                this.chartData.year.push(item.year);
                this.chartData.Korean.push({ year: item.year, value: item.Korean });
                this.chartData.Korean_man.push({ year: item.year, value: item.Korean_man });
                this.chartData.Korean_women.push({ year: item.year, value: item.Korean_women });
                this.chartData.Households.push({ year: item.year, value: item.Households });
                this.chartData.plus.push({ year: item.year, value: item.plus });
                this.chartData.Elderly.push({ year: item.year, value: item.Elderly });
                this.chartData.density.push({ year: item.year, value: item.density });
                
          
        

                // 다른 데이터도 유사하게 처리
            });

            // 차트 생성 호출
            this.createChart("chartdiv1", this.chartData.Korean, "value");
            this.createGenderChart("chartdiv2", this.chartData.Korean_man, this.chartData.Korean_women);
            this.createLineChart("chartdiv3", this.chartData.Households);
            this.createPlusChart("chartdiv4", this.chartData.plus, "value");
            this.createElderlyChart("chartdiv5", this.chartData.Elderly, "value");
            this.createPieChart("chartdiv6", this.chartData.pieData);
            this.createdensityChart("chartdiv7", this.chartData.density, "value");
           
            // 다른 차트도 유사하게 생성
        },
        createChart(chartDivId, chartData, valueField) {
            let root = am5.Root.new(chartDivId);

            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true,
                paddingLeft: 0,
                paddingRight: 1
            }));

            let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);

            let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30, minorGridEnabled: true });
            xRenderer.labels.template.setAll({
              
                centerY: am5.p50,
                centerX: am5.p100,
                paddingRight: 15
            });
            xRenderer.grid.template.setAll({ location: 1 });

            let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.3,
                categoryField: "year",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            }));

            let yRenderer = am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 });
            let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { maxDeviation: 0.3, renderer: yRenderer }));

            let series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "Series 1",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: valueField,
                sequencedInterpolation: true,
                categoryXField: "year",
                tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
            }));

            series.columns.template.setAll({
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
                strokeOpacity: 0
            });
            series.columns.template.adapters.add("fill", (fill, target) => chart.get("colors").getIndex(series.columns.indexOf(target)));
            series.columns.template.adapters.add("stroke", (stroke, target) => chart.get("colors").getIndex(series.columns.indexOf(target)));

            xAxis.data.setAll(chartData);
            series.data.setAll(chartData);

            series.appear(1000);
            chart.appear(1000, 100);
            root._logo.dispose();
        },
        createGenderChart(chartDivId, maleData, femaleData) {
            let root = am5.Root.new(chartDivId);

            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true,
                paddingLeft: 0,
                paddingRight: 1
            }));

            let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);

            let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30, minorGridEnabled: true });
            xRenderer.labels.template.setAll({
                centerY: am5.p50,
                centerX: am5.p100,
                paddingRight: 15
            });
            xRenderer.grid.template.setAll({ location: 1 });

            let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.3,
                categoryField: "year",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            }));

            let yRenderer = am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 });
            let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { maxDeviation: 0.3, renderer: yRenderer }));

            let maleSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "남자",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                sequencedInterpolation: true,
                categoryXField: "year",
                tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
            }));

            let femaleSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "여자",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                sequencedInterpolation: true,
                categoryXField: "year",
                tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
            }));

            maleSeries.columns.template.setAll({
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
                strokeOpacity: 0,
                fill: am5.color(0x0000ff)  // 파란색
            });

            femaleSeries.columns.template.setAll({
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
                strokeOpacity: 0,
                fill: am5.color(0xff0000)  // 빨간색
            });

            xAxis.data.setAll(maleData.map((data, index) => ({
                year: data.year,
                maleValue: data.value,
                femaleValue: femaleData[index].value
            })));

            maleSeries.data.setAll(maleData);
            femaleSeries.data.setAll(femaleData);

            maleSeries.appear(1000);
            femaleSeries.appear(1000);
            chart.appear(1000, 100);

            // Legend 추가
            let legend = chart.children.push(am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            }));

            legend.data.setAll([maleSeries, femaleSeries]);

            root._logo.dispose();
        },

        createLineChart(chartDivId, chartData) {
            let root = am5.Root.new(chartDivId);

            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true,
                paddingLeft: 0,
                paddingRight: 1
            }));

            let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);

            let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30, minorGridEnabled: true });
            xRenderer.labels.template.setAll({
                centerY: am5.p50,
                centerX: am5.p100,
                paddingRight: 15
            });
            xRenderer.grid.template.setAll({ location: 1 });

            let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.3,
                categoryField: "year",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            }));

            let yRenderer = am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 });
            let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { maxDeviation: 0.3, renderer: yRenderer }));

            let series = chart.series.push(am5xy.LineSeries.new(root, {
                name: "Households",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                sequencedInterpolation: true,
                categoryXField: "year",
                tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
            }));

            xAxis.data.setAll(chartData.map(data => ({
                year: data.year,
                value: data.value
            })));

            series.data.setAll(chartData);

            series.appear(1000);
            chart.appear(1000, 100);
            root._logo.dispose();
        },
        createPlusChart(chartDivId, chartData, valueField) {
    let root = am5.Root.new(chartDivId);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 1
    }));

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30, minorGridEnabled: true });
    xRenderer.labels.template.setAll({
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
    });
    xRenderer.grid.template.setAll({ location: 1 });

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "year",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
    }));

    let yRenderer = am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 });
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { maxDeviation: 0.3, renderer: yRenderer }));

    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: valueField,
        sequencedInterpolation: true,
        categoryXField: "year",
        tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
    }));

    series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0
    });
    series.columns.template.adapters.add("fill", (fill, target) => chart.get("colors").getIndex(series.columns.indexOf(target)));
    series.columns.template.adapters.add("stroke", (stroke, target) => chart.get("colors").getIndex(series.columns.indexOf(target)));

    xAxis.data.setAll(chartData);
    series.data.setAll(chartData);

    series.appear(1000);
    chart.appear(1000, 100);
    root._logo.dispose();
        },
        createElderlyChart(chartDivId, chartData, valueField) {
            let root = am5.Root.new(chartDivId);

            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true,
                paddingLeft: 0,
                paddingRight: 1
            }));

            let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
            cursor.lineY.set("visible", false);

            let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30, minorGridEnabled: true });
            xRenderer.labels.template.setAll({
              
                centerY: am5.p50,
                centerX: am5.p100,
                paddingRight: 15
            });
            xRenderer.grid.template.setAll({ location: 1 });

            let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                maxDeviation: 0.3,
                categoryField: "year",
                renderer: xRenderer,
                tooltip: am5.Tooltip.new(root, {})
            }));

            let yRenderer = am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 });
            let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, { maxDeviation: 0.3, renderer: yRenderer }));

            let series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: "Series 2",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: valueField,
                sequencedInterpolation: true,
                categoryXField: "year",
                tooltip: am5.Tooltip.new(root, { labelText: "{valueY}" })
            }));

            series.columns.template.setAll({
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
                strokeOpacity: 0
            });
            series.columns.template.adapters.add("fill", (fill, target) => chart.get("colors").getIndex(series.columns.indexOf(target)));
            series.columns.template.adapters.add("stroke", (stroke, target) => chart.get("colors").getIndex(series.columns.indexOf(target)));

            xAxis.data.setAll(chartData);
            series.data.setAll(chartData);

            series.appear(1000);
            chart.appear(1000, 100);
            root._logo.dispose();
        },
        createPieChart(chartDivId, pieData) {
            let root = am5.Root.new(chartDivId);

            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(am5percent.PieChart.new(root, {
                layout: root.verticalLayout
            }));

            let series = chart.series.push(am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "region"
            }));

            series.data.setAll(pieData);

            series.appear(1000, 100);
            root._logo.dispose();
        },
        
    },
    mounted() {
        this.loadData();
        
    }
};

</script>

<style>
.container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
    text-align: center;
}
.chartdiv {
    width: 95%;
    height: 250px;
}
.textbox1, .textbox2 {
    margin-left: 20px;
    word-wrap: break-word; /* 긴 단어 줄바꿈 */
    padding: 10px;
    background-color: #ccc; /* 박스 배경색 */
    border-radius: 10px; /* 모서리 둥글게 */
    display: flex;
    justify-content: center;
    align-items: center;
}    
.flex-container {
  display: flex;
  padding: 10px;
}
.textbox1{
    width: 20%; 
    margin-right: 40px;
}
.textbox2{
    width: 15%;
}
</style>
