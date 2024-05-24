<template>
    <section class="layout">
        <div class="sidebar">
            <article class="main-wrap">
                <h1 class="mb30">대구광역시 공공데이터 현황</h1>
                <section class="main-button">
                    <button class="btn" @click="toggleCircle('population')">인구</button>
                    <button class="btn" @click="toggleCircle('welfare')">복지</button>
                    <button class="btn" @click="toggleCircle('safety')">안전</button>
                    <button class="btn" @click="toggleCircle('environment')">환경</button>
                </section>
                <button id="addBtn" v-show="showResetButton" @click="clearMap()">초기화</button>
            </article>
            
          <article>

            <summary class="main-area" v-if="sectionOption === 'population'">지역별 인구분포</summary>
            <section v-if="sectionOption === 'population'" class="main-button button-area" >
                <button @click="filterPopulation('북구')">북구</button>
                <button @click="filterPopulation('중구')">중구</button>
                <button @click="filterPopulation('남구')">남구</button>
                <button @click="filterPopulation('동구')">동구</button>
                <button @click="filterPopulation('서구')">서구</button>
                <button @click="filterPopulation('수성구')">수성구</button>
                <button @click="filterPopulation('달서구')">달서구</button>
                <button @click="filterPopulation('달성군')">달성군</button>
                <button @click="showAllPopulationCircles()">전체보기</button>
            </section>

            <summary class="main-area" v-if="sectionOption === 'welfare'">지역별 공공센터</summary>
            <section v-if="sectionOption === 'welfare'" class="main-button button-area">
                <button @click="filterDistrict('북구')">북구</button>
                <button @click="filterDistrict('중구')">중구</button>
                <button @click="filterDistrict('남구')">남구</button>
                <button @click="filterDistrict('동구')">동구</button>
                <button @click="filterDistrict('서구')">서구</button>
                <button @click="filterDistrict('수성구')">수성구</button>
                <button @click="filterDistrict('달서구')">달서구</button>
                <button @click="filterDistrict('달성군')">달성군</button>
                <button @click="showAllWelfareCenters()">전체보기</button>
            </section>

            <summary class="main-area" v-if="sectionOption === 'safety'">지역별 안전정보</summary>
            <section v-if="sectionOption === 'safety'" class="main-button button-area">
                <button @click="filterSafety('북구')">북구</button>
                <button @click="filterSafety('중구')">중구</button>
                <button @click="filterSafety('남구')">남구</button>
                <button @click="filterSafety('동구')">동구</button>
                <button @click="filterSafety('서구')">서구</button>
                <button @click="filterSafety('수성구')">수성구</button>
                <button @click="filterSafety('달서구')">달서구</button>
                <button @click="filterSafety('달성군')">달성군</button>
                <button @click="filterSafety('전체보기')">전체보기</button>
            </section>

            <summary class="main-area" v-if="sectionOption === 'safety' && safetyDistrict">카테고리별 안전지수</summary>
            <section v-if="sectionOption === 'safety' && safetyDistrict" class="safety-categories button-area">
                <button @click="filterSafetyCategory('safety_traffic')">교통사고</button>
                <button @click="filterSafetyCategory('safety_fire')">화재</button>
                <button @click="filterSafetyCategory('safety_crime')">범죄</button>
                <button @click="filterSafetyCategory('safety_life')">생활안전</button>
                <button @click="filterSafetyCategory('safety_suicide')">자살</button>
                <button @click="filterSafetyCategory('safety_disease')">감염병</button>
            </section>

            <summary class="main-area" v-if="sectionOption === 'environment'">지역별 환경정보</summary>
            <section v-if="sectionOption === 'environment'" class="main-button button-area">
                <button @click="filterEnvironment('북구')">북구</button>
                <button @click="filterEnvironment('중구')">중구</button>
                <button @click="filterEnvironment('남구')">남구</button>
                <button @click="filterEnvironment('동구')">동구</button>
                <button @click="filterEnvironment('서구')">서구</button>
                <button @click="filterEnvironment('수성구')">수성구</button>
                <button @click="filterEnvironment('달서구')">달서구</button>
                <button @click="filterEnvironment('달성군')">달성군</button>
                <button @click="showAllEnvironmentCircles()">전체보기</button>
            </section>

        </article>

          
        </div>
        <div class="mapSection" ref="map"></div>
    </section>
    <!-- 안전(안전지수) 버튼을 누르면 표시되는 범례 -->
    <section v-if="sectionOption === 'safety' && safetyDistrict" class="legend">
        <h3>안전지수 범례</h3>
        <div class="legend-item">
            <span class="legend-color" style="background-color: #1F77B4;"></span>
            <span class="legend-label">1단계</span>
        </div>
        <div class="legend-item">
            <span class="legend-color" style="background-color: #2CA02C;"></span>
            <span class="legend-label">2단계</span>
        </div>
        <div class="legend-item">
            <span class="legend-color" style="background-color: #FFD700;"></span>
            <span class="legend-label">3단계</span>
        </div>
        <div class="legend-item">
            <span class="legend-color" style="background-color: #FFA500;"></span>
            <span class="legend-label">4단계</span>
        </div>
        <div class="legend-item">
            <span class="legend-color" style="background-color: #FF0000;"></span>
            <span class="legend-label">5단계</span>
        </div>
        <div>* 높을수록 위험</div>
    </section>

    <section v-if="sectionOption" class="rightSideBar">
      <!-- 선택된 circle에 따라 다른 내용을 보여줄 수 있습니다 -->
      <div v-if="sectionOption === 'population'">
        <h1 class="mb-30">대구광역시 인구 통계</h1>
        <br>
        <p>전체 인구수 : 2,363,285 명</p>
        <p>인구 증감률 : 5.27%</p>
        <p>노인인구 비율 : 20.1%</p>
        <p>남여 비율(남/여) : 0.96%</p>
        <p>외국인 인구 비율 : 3.7%</p>
        <div>지역별 인구수?비율 그래프 넣을 공간</div>
    </div>
      <div v-if="sectionOption === 'welfare'">
        <h1 class="mb-30">대구광역시 복지 통계</h1>
        <br>
        <p>공공센터 수 :</p>
        <p>노인 요양시설 수 : 273개</p>
        <p>아동 복지시설 수 : 202개</p>
        <p>그래프</p>
        
    </div>
      <div v-if="sectionOption === 'safety'">
        <h1 class="mb-30">대구광역시 안전 통계</h1>
        <br>
        <p>경찰서 수 : 72개</p>
        <p>소방서 수 : 9개</p>
        <p>범죄 발생 건수 : 580,323건</p>
        <p>사고 발생 건수(화재,교통) : 8636건</p>
        <p>그래프</p>
        
    </div>
      <div v-if="sectionOption === 'environment'">
        <h1 class="mb-30">대구광역시 환경 통계</h1>
        <br>
        <p>환경오염배출 사업장 수 : 2094개</p>
        <p>연간 폐기물 배출량 : 1,185,000톤</p>
        <p>월별 폐기물 처리량 : 58,368톤</p>
        <p>그래프</p>

        
    </div>
    </section>

    

</template>

<script>

import axios from "axios";
export default {
    data() {
        return {
            showResetButton: false,

            mapInstance: null,
            circles: [],
            dataList: [],
            sectionOption: '',
            safetyDistrict: '',
            markers: [
                { position: new kakao.maps.LatLng(35.82692778, 128.5350639), title: '달서구', content: '<div style="padding: 10px; margin-bottom: 15px"><strong>인구정보</strong><hr><ul><li>행정구역: 대구 달서구</li><li>총 인구 수: 525,768 명</li><li>인구 증감률 : +2.64%</li><li>고령인구 비율 : 18.3%</li></ul></div>' },
                { position: new kakao.maps.LatLng(35.85520833, 128.6328667), title: '수성구', content: '<div style="padding: 10px; margin-bottom: 15px"><strong>인구정보</strong><hr><ul><li>행정구역: 대구 수성구</li><li>총 인구 수: 411,553 명</li><li>인구 증감률 : +0.49%</li><li>고령인구 비율 : 18.7%</li></ul></div>' },
                { position: new kakao.maps.LatLng(35.846, 128.5752), title: '남구', content: '<div style="padding: 10px; margin-bottom: 15px"><strong>인구정보</strong><hr><ul><li>행정구역: 대구 남구</li><li>총 인구 수: 141,519 명</li><li>인구 증감률 : -5.41%</li><li>고령인구 비율 : 26.8%</li></ul></div>' },
                { position: new kakao.maps.LatLng(35.77475029, 128.4313995), title: '달성군', content: '<div style="padding: 10px; margin-bottom: 15px"><strong>인구정보</strong><hr><ul><li>행정구역: 대구 달성군</li><li>총 인구 수: 263,162 명</li><li>인구 증감률 : -2.61%</li><li>고령인구 비율 : 15.8%</li></ul></div>' },
                { position: new kakao.maps.LatLng(35.88682728, 128.6355584), title: '동구', content: '<div style="padding: 10px; margin-bottom: 15px"><strong>인구정보</strong><hr><ul><li>행정구역: 대구 동구</li><li>총 인구 수: 339,530 명</li><li>인구 증감률 : +4.59%</li><li>고령인구 비율 : 22.8%</li></ul></div>' },
                { position: new kakao.maps.LatLng(35.9265, 128.573), title: '북구', content: '<div style="padding: 10px; margin-bottom: 15px"><strong>인구정보</strong><hr><ul><li>행정구역: 대구 북구</li><li>총 인구 수: 430,912 명</li><li>인구 증감률 : +5.71%</li><li>고령인구 비율 : 18.1%</li></ul></div>' },
                { position: new kakao.maps.LatLng(35.87194054, 128.5591601), title: '서구', content: '<div style="padding: 10px; margin-bottom: 15px"><strong>인구정보</strong><hr><ul><li>행정구역: 대구 서구</li><li>총 인구 수: 159,827 명</li><li>인구 증감률 : -4.25%</li><li>고령인구 비율 : 26.7%</li></ul></div>' },
                { position: new kakao.maps.LatLng(35.8673, 128.5937), title: '중구', content: '<div style="padding: 10px; margin-bottom: 15px"><strong>인구정보</strong><hr><ul><li>행정구역: 대구 중구</li><li>총 인구 수: 91,034 명</li><li>인구 증감률 : +4.16%</li><li>고령인구 비율 : 19.1%</li></ul></div>' }
            ],
            polygons: {},
        };
    },

    methods: {
        toggleButton(type) {
        this.showResetButton = true;
        },
        clearMap() {

        this.showResetButton = false;
        },
        toggleCircle(itm) {
            console.log("선택한 값= ", itm);
            this.sectionOption = itm;

        },
        //인구 전체보기
        showAllPopulationCircles() {
            const vm = this; // 현재 컴포넌트 인스턴스를 가리키는 변수 생성

            this.markers.forEach(marker => {
                const position = marker.position;
                const circleOptions = {
                    center: position,
                    radius: 1500, // 반지름 설정
                    strokeWeight: 1,
                    strokeColor: '#333',
                    strokeOpacity: 0.7,
                    fillColor: '#1F77B4', // 파랑색
                    fillOpacity: 0.5
                };
                const circle = new kakao.maps.Circle(circleOptions);

                // 지도에 원을 추가
                circle.setMap(vm.mapInstance);

                // 원을 circles 배열에 추가
                this.circles.push({ circle });

                // 인포윈도우 생성 및 표시
                const infoWindow = new kakao.maps.InfoWindow({
                    position: position,
                    content: marker.content,
                });
                infoWindow.open(vm.mapInstance);
            });
        },
        //지역별 인구보기
        filterPopulation(district) {
            console.log("필터링할 지역: ", district);
            const vm = this;

            // markers 배열에서 선택된 지역의 정보 찾기
            const selectedMarker = vm.markers.find(marker => marker.title === district);

            // 선택된 지역의 정보가 없으면 종료
            if (!selectedMarker) {
                console.error(`"${district}" 지역의 정보를 찾을 수 없습니다.`);
                return;
            }

            // 선택된 지역의 위치 정보
            const position = selectedMarker.position;

            // 원을 저장할 변수 추가
            if (!vm.circles) {
                vm.circles = {};
            }

            // 이미 원이 존재하면 새로 그리지 않음
            if (vm.circles[district]) {
                console.log(`${district} 지역에 이미 원이 그려져 있습니다.`);
                return;
            }

            // 원 그리기
            const circleOptions = {
                center: position,
                radius: 1500, // 반지름 설정
                strokeWeight: 1,
                strokeColor: '#333',
                strokeOpacity: 0.7,
                fillColor: '#1F77B4', // 파랑색
                fillOpacity: 0.5
            };
            const circle = new kakao.maps.Circle(circleOptions);

            // 원 저장
            vm.circles[district] = circle;

            // 원에 클릭 이벤트 추가
            kakao.maps.event.addListener(circle, 'click', function () {
                // 클릭한 원의 내용 표시
                const infoWindow = new kakao.maps.InfoWindow({
                    position: position,
                    content: selectedMarker.content,
                });
                infoWindow.open(vm.mapInstance);
            });

            // 지도에 원을 추가
            circle.setMap(vm.mapInstance);
        },

        //전체 공공센터보기
        showAllWelfareCenters() {
            const vm = this;
            axios({
                url: "/welfareData.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {},
            })
            .then(function (response) {
                console.log("welfareData - response :", response.data);
                vm.dataList = response.data;

                vm.dataList.forEach(center => {
                    const position = new kakao.maps.LatLng(center.public_center_latitude, center.public_center_longitude);
                    const marker = new kakao.maps.Marker({ position });
                    marker.setMap(vm.mapInstance);

                    const infoWindow = new kakao.maps.InfoWindow({
                        content: `<div style="padding: 10px; margin-bottom: 15px"><strong>${center.public_center_name}</strong><hr><ul><li>${center.public_center_add}</li></ul></div>`
                    });

                    // 마커에 클릭 이벤트 추가
                    kakao.maps.event.addListener(marker, 'click', function () {
                        // 다른 인포윈도우 닫기
                        if (vm.currentInfoWindow) {
                            vm.currentInfoWindow.close();
                        }
                        // 클릭한 마커의 인포윈도우 열기
                        infoWindow.open(vm.mapInstance, marker);
                        // 현재 열려 있는 인포윈도우 저장
                        vm.currentInfoWindow = infoWindow;
                    });

                    vm.circles.push({ marker });
                });
            })
            .catch(function (error) {
                console.log("welfareData - error :", error);
                alert("공공센터 데이터 조회에 오류가 발생했습니다.");
            });
        },
    
        

        filterDistrict(district) {
            console.log("필터링할 구/군: ", district);
            const vm = this;
            axios({
                url: "/welfareData.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { district: district },
            })
                .then(function (response) {
                    console.log("welfareData - response :", response.data);
                    vm.dataList = response.data.filter(item => item.public_center_add === district);
                    vm.showMarkers();
                })
                .catch(function (error) {
                    console.log("welfareData - error :", error);
                    alert("공공시설 데이터 조회에 오류가 발생했습니다.");
                });
        },

        filterSafety(district) {
            console.log("필터링할 구/군: ", district);
            this.safetyDistrict = district; // 전체보기를 선택해도 district 값을 설정하도록 변경
        },

        filterSafetyCategory(category) {
            console.log("필터링할 안전 카테고리: ", category);
            const vm = this;
            axios({
                url: "/safetyData.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { district: this.safetyDistrict, category: category },
            })
                .then(function (response) {
                    console.log("safetyData - response :", response.data);
                    const filteredData = response.data;

                    let targetDistrict = vm.safetyDistrict; // 필터링 대상 지역 변수 생성
                    if (targetDistrict === '전체보기') {
                        targetDistrict = ''; // 전체보기인 경우 빈 문자열로 설정
                    }

                    // 이전에 그려진 원들을 모두 삭제
                    vm.circles.forEach(item => {
                        item.circle.setMap(null);
                    });
                    vm.circles = [];

                    // 클릭 이벤트 리스너를 추가하는 대신, 원을 생성할 때 바로 인포윈도우를 열기
                    filteredData.forEach(safetyData => {
                        // 전체보기인 경우 또는 선택된 지역인 경우에만 원을 그림
                        if (!targetDistrict || safetyData.safety_region === targetDistrict) {
                            const position = new kakao.maps.LatLng(safetyData.safety_latitude, safetyData.safety_longitude);
                            const circleOptions = {
                                center: position,
                                radius: 1500,
                                strokeWeight: 1,
                                strokeColor: '#333',
                                strokeOpacity: 0.7,
                                fillColor: vm.getSafetyColor(safetyData[category]),
                                fillOpacity: 0.5
                            };
                            const circle = new kakao.maps.Circle(circleOptions);

                            // 인포윈도우 생성 및 표시
                            const infoWindow = new kakao.maps.InfoWindow({
                                position: position,
                                content: `<div style="padding: 10px; margin-bottom: 15px; text-align: center;">
                                    <strong>${safetyData.safety_region}</strong>
                                    <hr>
                                    <ul>
                                        <li>안전지수 : ${safetyData[category]}</li>
                                        <li>경찰서 수 : ${safetyData.safety_police}</li>
                                        <li>소방관 수 : ${safetyData.safety_firePeople}</li>
                                    </ul>
                                </div>`,
                            });
                            infoWindow.open(vm.mapInstance);

                            // 지도에 원을 추가
                            circle.setMap(vm.mapInstance);
                            vm.circles.push({ circle });
                        }
                    });
                })
                .catch(function (error) {
                    console.log("safetyData - error :", error);
                    alert("안전 카테고리 데이터 조회에 오류가 발생했습니다.");
                });
        },
        //환경 전체보기
        showAllEnvironmentCircles() {
            const vm = this;

            // 전체 지역에 대한 환경 정보를 가져오는 axios 요청
            axios({
                url: "/environmentData.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { district: '전체보기' }, // 전체 지역에 대한 데이터 요청
            })
            .then(function (response) {
                console.log("environmentData - response :", response.data);

                // 가져온 데이터를 이용하여 지도에 원과 인포윈도우 표시
                response.data.forEach(envData => {
                    const position = new kakao.maps.LatLng(envData.env_latitude, envData.env_longitude);
                    const circleOptions = {
                        center: position,
                        radius: 1500, // 반지름 설정
                        strokeWeight: 1,
                        strokeColor: '#333',
                        strokeOpacity: 0.7,
                        fillColor: '#1F77B4', // 파랑색
                        fillOpacity: 0.5
                    };
                    const circle = new kakao.maps.Circle(circleOptions);

                    // 인포윈도우 생성 및 표시
                    const infoWindow = new kakao.maps.InfoWindow({
                        position: position,
                        content: `<div style="padding: 10px; margin-bottom: 15px; text-align: center;">
                            <strong>${envData.env_region}</strong>
                            <hr>
                            <ul>
                                <li>환경오염배출사업장 수: ${envData.env_company}개</li>
                                <li>폐기물 배출량(연간/톤): ${envData.env_waste}</li>
                            </ul>
                        </div>`,
                    });
                    infoWindow.open(vm.mapInstance); // 인포윈도우 열기

                    // 클릭 이벤트 리스너 추가
                    kakao.maps.event.addListener(circle, 'click', function () {
                        infoWindow.close(); // 클릭한 원을 다시 클릭할 때 인포윈도우가 닫히지 않도록 인포윈도우를 닫음
                    });

                    circle.setMap(vm.mapInstance); // 지도에 원 표시
                    vm.circles.push({ circle }); // 원을 circles 배열에 추가
                });
            })
            .catch(function (error) {
                console.log("environmentData - error :", error);
                alert("환경 데이터 조회에 오류가 발생했습니다.");
            });
        },


        filterEnvironment(district) {
            console.log("필터링할 지역: ", district);
            const vm = this;
            axios({
                url: "/environmentData.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { district: district },
            })
                .then(function (response) {
                    console.log("environmentData - response :", response.data);

                    // 지역에 해당하는 데이터만 필터링
                    const filteredData = response.data.filter(item => item.env_region === district);

                    // 필터링된 데이터를 이용하여 지도에 원 그리기
                    filteredData.forEach(envData => {
                        const position = new kakao.maps.LatLng(envData.env_latitude, envData.env_longitude);
                        const circleOptions = {
                            center: position,
                            radius: 1500, // 반지름 설정
                            strokeWeight: 1,
                            strokeColor: '#333',
                            strokeOpacity: 0.7,
                            fillColor: '#1F77B4', // 파랑색
                            fillOpacity: 0.5
                        };
                        const circle = new kakao.maps.Circle(circleOptions);

                        // 클릭 이벤트 리스너 추가
                        kakao.maps.event.addListener(circle, 'click', function () {
                            // 클릭한 원의 내용 표시
                            const infoWindow = new kakao.maps.InfoWindow({
                                position: position,
                                content: `<div style="padding: 10px; margin-bottom: 15px; text-align: center;">
                            <strong>${envData.env_region}</strong>
                            <hr>
                            <ul>
                                <li>환경오염배출사업장 수: ${envData.env_company}개</li>
                                <li>폐기물 배출량(연간/톤): ${envData.env_waste}</li>
                            </ul>
                          </div>`,
                            });
                            infoWindow.open(vm.mapInstance);
                        });

                        circle.setMap(vm.mapInstance); // 지도에 원 표시
                        vm.circles.push({ circle }); // 원을 circles 배열에 추가
                    });
                })
                .catch(function (error) {
                    console.log("environmentData - error :", error);
                    alert("환경 데이터 조회에 오류가 발생했습니다.");
                });
        },

        getSafetyColor(riskIndex) {
            // 위험지수에 따른 색상 결정
            if (riskIndex === 1) {
                return '#1F77B4'; // 파랑
            } else if (riskIndex === 2) {
                return '#2CA02C'; // 초록
            } else if (riskIndex === 3) {
                return '#FFD700'; // 노랑
            } else if (riskIndex === 4) {
                return '#FFA500'; // 주황
            } else {
                return '#FF0000'; // 빨강
            }
        },

        showMarkers() {
            this.dataList.forEach(markerData => {
                const position = new kakao.maps.LatLng(markerData.public_center_latitude, markerData.public_center_longitude);
                const marker = new kakao.maps.Marker({ position });
                marker.setMap(this.mapInstance);

                // 클릭 이벤트 리스너 추가
                kakao.maps.event.addListener(marker, 'click', () => {
                    const infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="padding: 10px; margin-bottom: 15px"><strong>${markerData.public_center_name}</strong><hr><ul><li></li></ul></div>`
                    });
                    infowindow.open(this.mapInstance, marker);
                });

                this.circles.push({ marker });
            });
        },


        clearMap() {
            location.reload();
        },


    },

    mounted() {
        // Kakao Maps API가 로드되었는지 확인
        if (window.kakao && window.kakao.maps) {
            var container = this.$refs.map;
            var options = {
                center: new kakao.maps.LatLng(35.8311, 128.5656),
                level: 7
            };
            this.mapInstance = new window.kakao.maps.Map(container, options);

        } else {
            console.error("Kakao Maps API가 로드되지 않았습니다.");
        }
    }
};
</script>

<style scoped>
.layout {
    width: 100vw;
    height: 100%;
    margin: 0;
    text-align: center;
    display: grid;
    grid-template-columns: 20% 80%;
    gap: 8px;
}

.sidebar {
    grid-column: 1 / 2;
}

.mapSection {
    grid-column: 2 / 3;
    height: 100%;
}

.main_dropdown {
    width: 90%;
    text-align: center;
    height: 3%;
}

details {
    font-size: 1.8rem;
}

summary {
    margin-bottom: 1rem;

}

.main-button,
.safety-categories {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding-bottom: 1rem;
}

.main-button button,
.safety-categories button {
    width: 100%;
    padding: 1rem 0;
    border: 0px ;
    margin-right: 1rem;
    word-break: keep-all;
    cursor: pointer;
    font-size: 1rem;
    font-family: 'PretendardGOV-Medium';

}

.legend {
    position: absolute;
    top: 7%;
    right: 73%;
    z-index: 1;
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.legend h3 {
    margin: 0 0 10px;
    font-size: 16px;
}

.legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.legend-color {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
}

.legend-label {
    font-size: 14px;
}

.rightSideBar {
    position: absolute;
    top: 5.9%;
    right: 0%;
    height: 68%;
    z-index: 1;
    background-color: #fff;
    padding: 6.5%;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>