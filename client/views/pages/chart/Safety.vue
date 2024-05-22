<template>
    <div class="container">
        <div class="row">
            <div class="column">
                <h1>경찰서</h1>
                <h2>경찰청 관서별 지역경찰 현황</h2>
                <div id="police" class="policediv"></div>
            </div>
            <div class="column">
                <h1>소방서</h1>
                <h2>소방관 1인당 관할면적 현황(㎢)</h2>
                <div id="fire" class="firediv"></div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="column">
                <h2>전년도 대비 범죄 현황</h2>
                <div id="crime" class="crimediv"></div>
            </div>
            <div class="column">
                <h2>전년도 대비 사고 현황</h2>
                <div id="accident" class="accidentdiv"></div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="column">
                <h1>통합 안전 지수</h1><br>
                <div class="flex-container">
                    <div class = "textbox1">
                        2021 - 2022<br>
                        범죄 증가율,<br>
                        사고 증가율에 기반한<br>
                        통합 안전 지수</div>
                <div id="safety" class="safediv"></div>
                </div>
            </div>
            <div class="column">
                <h2 style="margin-top: 12px;">사고 심각도</h2><br>
                <div class="flex-container">
                <div class = "textbox2">
                    2020 - 2022<br>
                    평균 교통사고<br>
                    사상자수/사고건수</div>
                <div id="casualty" class="casualtydiv"></div>
                </div>
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

        policeData: [],
        crimeData: [],
        fireData: [],
        accidentData: [],
        safetyData: [],
        casualtyData: []

      };
    },
  
    mounted() {
        
        this.PoliceCount();
        this.CrimeIncrease();
        this.FireRatio();
        this.AccidentIncrease();
        this.SafetyScore();
        this.Severity();
        
    },
  
    watch: {},
  
    computed: {},
  
    methods: {

        // police
        PoliceCount: function () {
            const vm = this;
            axios({
                url: "/PoliceCount.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {},
            })
            .then(function (response) {
                console.log("policeData - response.data:", response.data);
                // response.data가 배열인지 확인
                if (Array.isArray(response.data)) {
                    vm.policeData = response.data;
                    vm.policeChart();
                } else {
                    console.error("Invalid response format:", response.data);
                    alert("데이터 형식이 올바르지 않습니다.");
                }
            })
            .catch(function (error) {
                console.error("policeData - error:", error);
                alert("오류 발생: " + error.message);
            });
        },

        CrimeIncrease: function () {
            const vm = this;
            axios({
                url: "/CrimeIncrease.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {},
            })
            .then(function (response) {
                console.log("crimeData - response.data:", response.data);
                // response.data가 배열인지 확인
                if (Array.isArray(response.data)) {
                    vm.crimeData = response.data;
                    vm.crimeChart();
                } else {
                    console.error("Invalid response format:", response.data);
                    alert("데이터 형식이 올바르지 않습니다.");
                }
            })
            .catch(function (error) {
                console.error("crimeData - error:", error);
                alert("오류 발생: " + error.message);
            });
        },

        //fire
        FireRatio: function () {
            const vm = this;
            axios({
                url: "/FireRatio.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {},
            })
            .then(function (response) {
                console.log("fireData - response.data:", response.data);
                // response.data가 배열인지 확인
                if (Array.isArray(response.data)) {
                    vm.fireData = response.data;
                    vm.fireChart();
                } else {
                    console.error("Invalid response format:", response.data);
                    alert("데이터 형식이 올바르지 않습니다.");
                }
            })
            .catch(function (error) {
                console.error("fireData - error:", error);
                alert("오류 발생: " + error.message);
            });
        },

        // accident
        AccidentIncrease: function () {
            const vm = this;
            axios({
                url: "/AccidentIncrease.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {},
            })
            .then(function (response) {
                console.log("accidentData - response.data:", response.data);
                // response.data가 배열인지 확인
                if (Array.isArray(response.data)) {
                    vm.accidentData = response.data;
                    vm.accidentChart();
                } else {
                    console.error("Invalid response format:", response.data);
                    alert("데이터 형식이 올바르지 않습니다.");
                }
            })
            .catch(function (error) {
                console.error("accidentData - error:", error);
                alert("오류 발생: " + error.message);
            });
        },

        // safety
        SafetyScore: function () {
            const vm = this;
            axios({
                url: "/SafetyScore.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {},
            })
            .then(function (response) {
                console.log("safetyData - response.data:", response.data);
                // response.data가 배열인지 확인
                if (Array.isArray(response.data)) {
                    vm.safetyData = response.data;
                    vm.safetyChart();
                } else {
                    console.error("Invalid response format:", response.data);
                    alert("데이터 형식이 올바르지 않습니다.");
                }
            })
            .catch(function (error) {
                console.error("safetyData - error:", error);
                alert("오류 발생: " + error.message);
            });
        },

        // casualty
        Severity: function () {
            const vm = this;
            axios({
                url: "/Severity.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {},
            })
            .then(function (response) {
                console.log("casualtyData - response.data:", response.data);
                // response.data가 배열인지 확인
                if (Array.isArray(response.data)) {
                    vm.casualtyData = response.data;
                    vm.casualtyChart();
                } else {
                    console.error("Invalid response format:", response.data);
                    alert("데이터 형식이 올바르지 않습니다.");
                }
            })
            .catch(function (error) {
                console.error("casualtyData - error:", error);
                alert("오류 발생: " + error.message);
            });
        },



        
        policeChart: function() {
            const vm = this; // 현재 Vue 인스턴스를 참조하는 변수

            am5.ready(function() {
                // Create root element
                var root = am5.Root.new("police");

                // Set themes
                root.setThemes([
                    am5themes_Animated.new(root)
                ]);

                // Create chart
                var chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: false,
                    panY: false,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    paddingLeft: 0,
                    layout: root.verticalLayout
                }));

                // Add scrollbar
                /* chart.set("scrollbarX", am5.Scrollbar.new(root, {
                    orientation: "horizontal"
                })); */

                var data = vm.policeData.map(item => ({
                    police: item.police,
                    지구대: item.지구대,
                    파출소: item.파출소
                }));

                // Create axes
                var xRenderer = am5xy.AxisRendererX.new(root, {
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9,
                    minGridDistance: 30,
                    minorGridEnabled: true
                });

                var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "police",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {})
                }));

                xRenderer.grid.template.setAll({
                    location: 1
                });

                xRenderer.labels.template.setAll({
                    rotation: 0, // 레이블 회전 각도 설정
                    centerY: am5.p50,
                    centerX: am5.p150,
                    paddingRight: 0 // 레이블 간 여백 설정
                });



                xAxis.data.setAll(data);

                var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    min: 0,
                    renderer: am5xy.AxisRendererY.new(root, {
                        strokeOpacity: 0.1
                    })
                }));

                // Add legend
                var legend = chart.children.push(am5.Legend.new(root, {
                    centerX: am5.p50,
                    x: am5.p50
                }));

                // Add series
                function makeSeries(name, fieldName) {
                    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                        name: name,
                        stacked: true,
                        xAxis: xAxis,
                        yAxis: yAxis,
                        valueYField: fieldName,
                        categoryXField: "police"
                    }));

                    series.columns.template.setAll({
                        tooltipText: "{name}, {categoryX}: {valueY}",
                        tooltipY: am5.percent(10)
                    });

                    series.data.setAll(data);

                    // Make stuff animate on load
                    series.appear();

                    series.bullets.push(function() {
                        return am5.Bullet.new(root, {
                            sprite: am5.Label.new(root, {
                                text: "{valueY}",
                                fill: root.interfaceColors.get("alternativeText"),
                                centerY: am5.p50,
                                centerX: am5.p50,
                                populateText: true
                            })
                        });
                    });

                    legend.data.push(series);
                }

                makeSeries("지구대", "지구대");
                makeSeries("파출소", "파출소");

                // Make stuff animate on load
                chart.appear(1000, 100);
                root._logo.dispose(); //amChart 로고 삭제
            });
        },

        crimeChart: function() {

            const vm = this;

            am5.ready(function() {
                // Create root element
                var root = am5.Root.new("crime");

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

                var data = vm.crimeData.map(item => ({
                    경찰서: item.경찰서,
                    "2021": item["2021"],
                    "2022": item["2022"]
                }));


                // Create axes
                var xRenderer = am5xy.AxisRendererX.new(root, {
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9,
                    minGridDistance: 30,
                    minorGridEnabled: true
                });

                

                var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "경찰서",
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
                        categoryXField: "경찰서"
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

                makeSeries("2021", "2021");
                makeSeries("2022", "2022");

                chart.appear(1000, 100);

                root._logo.dispose(); //amChart 로고 삭제
            });
        },
    
        fireChart: function() {

            const vm = this;

            am5.ready(function() {

                // Create root element
                var root = am5.Root.new("fire");

                // Set themes
                root.setThemes([
                    am5themes_Animated.new(root)
                ]);

                // Create chart
                var chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true,
                    paddingLeft:0,
                    paddingRight:0
                }));

                // Add cursor
                var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
                cursor.lineY.set("visible", false);


                // Create axes
                var xRenderer = am5xy.AxisRendererX.new(root, { 
                    minGridDistance: 30, 
                    minorGridEnabled: true
                });

                xRenderer.labels.template.setAll({
                    rotation: 1,
                });

                xRenderer.grid.template.setAll({
                    location: 1
                })

                var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "소방서",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {})
                }));

                var yRenderer = am5xy.AxisRendererY.new(root, {
                    strokeOpacity: 0.1
                })

                var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    maxDeviation: 0.3,
                    renderer: yRenderer
                }));

                // Create series
                var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    name: "Series 1",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "비율",
                    sequencedInterpolation: true,
                    categoryXField: "소방서",
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


                // Set data
                var data = vm.fireData.map(item => ({
                    소방서: item.소방서,
                    비율: item.비율,
                }));

                xAxis.data.setAll(data);
                series.data.setAll(data);


                // Make stuff animate on load
                series.appear(1000);
                chart.appear(1000, 100);

                root._logo.dispose(); //amChart

            }); // end am5.ready()
        },

        accidentChart: function() {

            const vm = this;

            am5.ready(function() {
                // Create root element
                var root = am5.Root.new("accident");

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

                var data = vm.accidentData.map(item => ({
                    소방서: item.소방서,
                    "2021": item["2021"],
                    "2022": item["2022"]
                }));


                // Create axes
                var xRenderer = am5xy.AxisRendererX.new(root, {
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9,
                    minGridDistance: 30,
                    minorGridEnabled: true
                });


                var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    categoryField: "소방서",
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
                        categoryXField: "소방서"
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

                makeSeries("2021", "2021");
                makeSeries("2022", "2022");

                chart.appear(1000, 100);

                root._logo.dispose(); //amChart 로고 삭제
            });
        },

        safetyChart: function() {

            const vm = this;

            am5.ready(function() {


                // Create root element
                var root = am5.Root.new("safety");


                // Set themes
                root.setThemes([
                    am5themes_Animated.new(root)
                ]);


                // Create chart
                var chart = root.container.children.push(am5xy.XYChart.new(root, {
                    panX: true,
                    panY: true,
                    wheelX: "panX",
                    wheelY: "zoomX",
                    pinchZoomX: true,
                    paddingLeft: 0
                }));


                // Add cursor
                // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
                var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
                cursor.lineY.set("visible", false);


                // Create axes
                // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
                var xRenderer = am5xy.AxisRendererX.new(root, {
                    minGridDistance:15,
                    minorGridEnabled: true
                });

                xRenderer.labels.template.setAll({
                    rotation: 0,
                    centerY: 0,
                    centerX: am5.p50
                });

                
                xRenderer.grid.template.setAll({
                    visible: false,
                    location: 1
                });

                var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                    maxDeviation: 0.3,
                    categoryField: "기관명",
                    renderer: xRenderer,
                    tooltip: am5.Tooltip.new(root, {})
                }));

                var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                    maxDeviation: 0.3,
                    renderer: am5xy.AxisRendererY.new(root, {})
                }));


                // Create series
                // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
                var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "안전지수",
                    categoryXField: "기관명",
                    adjustBulletPosition: false,
                    tooltip: am5.Tooltip.new(root, {
                        labelText: "{valueY}"
                    })
                }));

                series.columns.template.setAll({
                    width: 5
                });

                series.bullets.push(function() {
                    return am5.Bullet.new(root, {
                        locationY: 1,
                        sprite: am5.Circle.new(root, {
                        radius: 5,
                        fill: series.get("fill")
                        })
                    })
                })


                // Set data
                var data = vm.safetyData.map(item => ({
                    기관명: item.기관명,
                    안전지수: item.안전지수
                }));

                xAxis.data.setAll(data);
                series.data.setAll(data);

                // y축 간격 설정
                yAxis.set("strictMinMaxStep", true);
                yAxis.set("baseInterval", { count: 5 });


                // Make stuff animate on load
                // https://www.amcharts.com/docs/v5/concepts/animations/
                series.appear(1000);
                chart.appear(1000, 100);

                root._logo.dispose(); //amChart 로고 삭제

                }); // end am5.ready()
            
        },

        casualtyChart: function() {

            const vm = this;

            am5.ready(function() {

            // Create root element
            var root = am5.Root.new("casualty");

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
                    valueField: "사고심각도",
                    categoryField: "경찰서",
                    endAngle: 270
                })
            );

            series.states.create("hidden", {
                endAngle: -90
            });

            // Set data
            var data = vm.casualtyData.map(item => ({
                경찰서: item.경찰서,
                사고심각도: item.사고심각도,
            }));

            series.data.setAll(data);

            series.appear(1000, 100);

            
            root._logo.dispose(); //amChart 로고 삭제

            }); // end am5.ready()
        }

        
    },
};

</script>
  
<style>
.policediv{
    width: 95%;
    height: 250px;
}
.crimediv{
    width: 95%;
    height: 250px;
}
.firediv {
    width: 92%;
    height: 220px;
}
.accidentdiv{
    width: 94%;
    height: 250px;
}
.casualtydiv{
    width: 65%;
    height: 150px;
    margin-left: 20px;
}
.safediv{
    width: 65%;
    height: 150px;
}
.textbox1{
    width: 20%; 
    margin-right: 40px;
}
.textbox2{
    width: 15%;
}
/* h1, h2 왼쪽 정렬 */
.column h1, .column h2 {
  text-align: left;
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
.flex-container {
  display: flex;
  padding: 10px;

}

</style>