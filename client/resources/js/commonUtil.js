/**
 * @author 최정우

 * @since 2019.12.06
 *
 * 공통 자바스크립트 Util입니다.
 */

const COMMON_UTIL = (function () {

	var _utils = {
		/**
		 * 빈 객체 여부
		 */
		isEmpty: function (data) {
			if (data === undefined || data === null || data === "" || data.length === 0 || (data.constructor == Object && Object.keys(data).length === 0)) {
				if ((typeof data) === "number") {
					return false
				} else {
					return true;
				}
			} else {
				return false;
			}
		},

		/**
		 * empty to null
		 */
		toNull: function (data) {
			if(data === undefined || data === "") {
				try {
					data = null;
					return data;
				} catch (e) {
					console.log("commonUtil.js - empty to null convert error : ", e);
					return data;
				}
			} else {
				return data;
			}
		},

		/**
		 * string to JSON
		 */
		toJson: function (data) {
			if ("string" === (typeof data)) {
				try {
					return JSON.parse(data);
				} catch (e) {
					console.log("commonUtil.js - string to json convert error : ", e);
					return data;
				}
			} else {
				return data;
			}
		},

		/**
		 * string to JSON
		 */
		toJson: function (data) {
			if ("string" === (typeof data)) {
				try {
					return JSON.parse(data);
				} catch (e) {
					console.log("commonUtil.js - string to json convert error : ", e);
					return data;
				}
			} else {
				return data;
			}
		},

		/**
		 * JSON to string
		 */
		toString: function (data) {
			try {
				return JSON.parse(data);
			} catch (e) {
				console.log("commonUtil.js - json to string convert error : ", e);
				return data;
			}
		},

		/**
		 * 다중 separator split
		 */
		split: function (text, separator) {
			var words = [];
			if (this.isEmpty(text) == false && this.isEmpty(separator) == false && separator.length > 0) {
				words.push(text);
				for (var i = 0; i < separator.length; i++) {
					var subWords = [];
					for (var j = 0; j < words.length; j++) {
						if (this.isEmpty(words[j]) == false && this.isEmpty(separator[i]) == false) {
							subWords = subWords.concat(words[j].split(separator[i]));
						} else {
							if (words[j] == false) {
								subWords.push(words[j]);
							} else {
								continue;
							}
						}
					}
					words = subWords;
				}
				return words;
			} else {
				if (this.isEmpty(text) == false) {
					words.push(text);
				}
				return words;
			}
		},

		/**
		 * 객체 깊은 복사
		 */
		copyObject: function (obj) {
			if (obj === null || typeof(obj) !== 'object') return obj;

			try {
				return JSON.parse(JSON.stringify(obj));
			} catch (e) {
				console.log("commonUtil.js - copyObject error : ", e);
				return null;
			}
		},
		/**
		 * 날짜 + 시간 구하기
		 *
		 *

		 */
		getDateTime : function () {
			return this.getDate()+ " " + this.getFullTime();
		},

		/**
		 * 날짜 구하기
		 *
		 * param 설명
		 *
		 * options = {
		 * 	 addYear(Integer),
		 *   addMonth(Integer),
		 *   addDay(Integer),
		 *   separator(String)
		 * }
		 */
		getDate: function (options) {

			if (this.isEmpty(options) == true) {
				options = {
					addYear: 0,
					addMonth: 0,
					addDay: 0,
					separator: '-'
				}
			} else {
				options.addYear = options.addYear || 0;
				options.addMonth = options.addMonth || 0;
				options.addDay = options.addDay || 0;
				options.separator = options.separator || '-';
			}

			var date = new Date();
			date.setFullYear(date.getFullYear() + options.addYear);
			date.setMonth(date.getMonth() + options.addMonth);
			date.setDate(date.getDate() + options.addDay);

			var yyyy = date.getFullYear();
			var mm = date.getMonth() + 1;
			var dd = date.getDate();

			return yyyy + options.separator + this.prefixZero(mm, 2) + options.separator + this.prefixZero(dd, 2);
		},

		/**
		 * 현재 년도 조회
		 */
		getYear: function () {
			var date = new Date();
			return date.getFullYear();
		},

		/**
		 * 현재 월 조회
		 */
		getMonth: function () {
			var date = new Date();
			return date.getMonth() + 1;
		},

		/**
		 * 현재 월 조회
		 */
		getFullMonth: function () {
			var date = new Date();
			return this.prefixZero((date.getMonth() + 1), 2);
		},

		/**
		 * 현재 일 조회
		 */
		getDay: function () {
			var date = new Date();
			return date.getDate();
		},

		/**
		 * 현재 일 조회
		 */
		getFullDay: function () {
			var date = new Date();
			return this.prefixZero(date.getDate(), 2);
		},

		/**
		 * 현재 시간 조회
		 */
		getHour: function () {
			var date = new Date();
			return date.getFullYear();
		},

		/**
		 * 현재 분 조회
		 */
		getMinute: function () {
			var date = new Date();
			return date.getMinutes() + 1;
		},

		/**
		 * 현재 초 조회
		 */
		getSeconds: function () {
			var date = new Date();
			return date.getSeconds();
		},

		/**
		 * 시간 구하기
		 *
		 * param 설명
		 *
		 * options = {
		 * 	 addHour(Integer),
		 *   addMinute(Integer),
		 *   addSeconds(Integer),
		 *   separator(String)
		 * }
		 */
		getFullTime: function (options) {
			if (this.isEmpty(options) == true) {
				options = {
					addHour: 0,
					addMinute: 0,
					addSeconds: 0,
					separator: '-'
				}
			} else {
				options.addHour = options.addHour || 0;
				options.addMinute = options.addMinute || 0;
				options.addSeconds = options.addSeconds || 0;
				options.separator = options.separator || ':';
			}

			var date = new Date();
			date.setHours(date.getHours() + options.addHour);
			date.setMinutes(date.getMinutes() + options.addMinute);
			date.setSeconds(date.getSeconds() + options.addSeconds);

			var h = date.getHours();
			var m = date.getMinutes();
			var s = date.getSeconds();

			return this.prefixZero(h, 2) + ":" + this.prefixZero(m, 2) + ":" + this.prefixZero(s, 2);
		},

		/**
		 * 시간 구하기
		 *
		 * param 설명
		 *
		 * options = {
		 * 	 addHour(Integer),
		 *   addMinute(Integer),
		 *   separator(String)
		 * }
		 */
		getTime: function (options) {
			if (this.isEmpty(options) == true) {
				options = {
					addHour: 0,
					addMinute: 0,
					separator: '-'
				}
			} else {
				options.addHour = options.addHour || 0;
				options.addMinute = options.addMinute || 0;
				options.separator = options.separator || ':';
			}

			var date = new Date();
			date.setHours(date.getHours() + options.addHour);
			date.setMinutes(date.getMinutes() + options.addMinute);

			var h = date.getHours();
			var m = date.getMinutes();

			return this.prefixZero(h, 2) + ":" + this.prefixZero(m, 2);
		},

		/**
		 * 특정 길이만큼 앞에'0' 붙이기
		 *
		 * param 설명
		 *
		 * text(String or Integer): 맨 뒤에 붙일 문자열(숫자든 문자든 상관웞음)
		 * length(Integer): 해당 값 만큼 '0'을 붙임 (단, text의 문자열 길이를 뺌)
		 * ex) this.prefixZero(2, 5) => 00002, this.prefixZero(20, 5) => 00020
		 *
		 */
		prefixZero: function (text, length) {
			var zero = '';
			var suffix = text;

			if ((typeof text) === "number") {
				suffix = text.toString();
			}


			if (suffix.length < length) {
				for (let i = 0; i < length - suffix.length; i++) {
					zero += '0';
				}
			}
			return zero + suffix;
		},

		/**
		 * Date => text
		 */
		dateToText: function (date) {
			var d = new Date(date);
			var yyyy = d.getFullYear();
			var mm = d.getMonth() + 1;
			var dd = d.getDate();
			return yyyy + "-" + this.prefixZero(mm, 2) + "-" + this.prefixZero(dd, 2);
		},

		/**
		 * 최솟값은 포함, 최댓값은 제외한 정수 난수 생성(최솟값 ~ 최댓값 - 1)
		 *
		 * param 설명
		 *
		 * min(Integer): 난수 생성시, 최소값
		 * max(Integer): 난수 생성시, 최대값
		 *
		 * ex) getRandomInt(2, 5) => 2~5사이의 정수 난수 값 리턴
		 */
		getRandomInt: function (min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min)) + min;
		},

		/**
		 * 현재 시스템의 URL 조회
		 *
		 * ex) http://localohst:8080, https://www.naver.com
		 */
		getSystemURL: function () {
			var url = window.location.protocol
			+ "//" + window.location.host;
			return url;
		},

		/**
		 * 현재 시스템의 URL 경로  조회
		 *
		 * ex) http://localohst:8080/dataset/datasetPostList => /dataset/datasetPostList
		 */
		getSystemPath: function () {
			var path = window.location.pathname;
			return path;
		},

		/**
		 * 3글자 마다 콤마 찍기 (돈)
		 *
		 * ex) 10000 => 10,000
		 */
		comma: function (text) {
			try {
				return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			} catch (e) {
				if (this.isEmpty(text) == true) {
					return "-";
				} else {
					return text;
				}
			}
		},

		/**
		 * 3글자 마다 콤마 찍기 (돈)
		 *
		 * ex) 10,000 => 10000
		 */
		removeComma: function (text) {
			try {
				return text.toString().replace(/,/g, "");;
			} catch (e) {
				if (this.isEmpty(text) == true) {
					return "-";
				} else {
					return text;
				}
			}
		},

		/**
		 * json 데이터 가지고 오기 (외부 JSON 파일 PATH or URL) (동기 요청)
		 */
		getJsonByPromise: function (url, isAsync) {
			if (this.isEmpty(url) == true) {
				new Error('COMMON_UTIL - getJson(url, isAsync) Error : url(parameter) is empty')
			}
			if (this.isEmpty(isAsync) == true) {
				isAsync = true;
			}

			return new Promise(function (resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.onload = function (e) {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							resolve(JSON.parse(this.responseText));
						} else {
							reject(this);
						}
					}
				};
				xhr.onerror = function (e) {
					reject(this);
				};
				xhr.open("GET", url, isAsync);
				//xhr.responseType='json';
				xhr.send(null);
			});
		},

		/**
		 * json 데이터 가지고 오기 (동기 요청) (외부 JSON 파일 PATH or URL)
		 */
		getJsonBySync: function (url) {
			var result = {};
			if (this.isEmpty(url) == true) {
				new Error('COMMON_UTIL - getJson(url, isAsync) Error : url(parameter) is empty')
				return result;
			}

			var xhr = new XMLHttpRequest();
			xhr.onload = function (e) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						result = JSON.parse(this.responseText);
					} else {
						console.error(this);
					}
				}
			};
			xhr.onerror = function (e) {
				console.error(this);
			};
			xhr.open("GET", url, false);
			xhr.send(null);

			return result;
		},

	}


	//초기화
	function init() {
        //console.info('commonUtil.js initialized.');
        return _utils;
    }


	return init();

})();


export default COMMON_UTIL;