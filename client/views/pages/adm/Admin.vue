<template>
    <div class="admin-wrap flex justify-between ">
        <div class="file-upload-section gd-3 no-space pt60 pl30 pr30 pb30">
            <h1>파일등록</h1>
            <input type="file" id="input-file" @change="fileReadAPI" class="file-input">
            <input v-model="datasetName" placeholder="테이블 명을 입력해 주세요" class="text-input">
            <textarea v-model="tableDescription" placeholder="테이블 설명을 입력해 주세요" class="textarea-input"></textarea>
            <div class="button-group">
                <button @click="datasetInsert" class="btn save-btn">저장</button>
                <button @click="resetForm" class="btn reset-btn">초기화</button>
                <button @click="selectFrom" class="btn reset-btn">보기</button>
            </div>
        </div>
        <div class="admin-area  pt30 pr30 pb30">

            <div class=" admin-area-box">
                <p class="pd30">미리보기</p>

                <div v-if="fileReadData.length > 0" class="table-section pb30 pl30 pr30">
                    <table class="file-data-list  ">
                        <colgroup>
                            <col style="width: 30% ;">
                            <col style="width: 30% ;">
                            <col style="width: 30% ;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th v-for="(column, index) in fileReadData[0]" :key="index">{{ column }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, rowIndex) in fileReadData.slice(1)" :key="rowIndex">
                                <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as XLSX from 'xlsx';

export default {
    data() {
        return {
            fileReadData: [],
            datasetName: '',
            tableDescription: ''
        };
    },
    methods: {
        
        fileReadAPI(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const workbook = XLSX.read(e.target.result, { type: 'string' });

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonSheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                this.fileReadData = jsonSheet;
                this.fileReadData.name = "환경";
            };
            reader.readAsText(file, 'UTF-8');
        },
        selectFrom() {
            console.log("엑셀 값을 알고싶다", this.fileReadData);
        },



        datasetInsert() {
            const vm = this;

            if (!this.datasetName || this.fileReadData.length === 0) {
                alert('테이블 명을 입력하고 파일을 업로드해 주세요.');
                return;
            }

            if (!confirm('정말 저장하시겠습니까?')) {
                return;
            }


            axios({
                url: "/fileDataInsert.json",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                data: { fileReadData: vm.fileReadData, datasetName: vm.datasetName },
            })
                .then(function (response) {
                    console.log("fileDataInsert - response :", response.data);
                    alert("파일 데이터 등록에 성공했습니다!");
                    // 데이터 초기화
                    this.resetForm();
                })
                .catch(function (error) {
                    console.log(" - error :", error);
                    alert("파일 데이터 등록에 실패하였습니다!");
                })
        },
        resetForm() {
            this.fileReadData = [];
            this.datasetName = '';
            this.tableDescription = '';
            document.getElementById('input-file').value = '';
        },
    },
};
</script>

<style scoped>
.admin-wrap {
    width: 100%;
    height: 100%;
    background-color: white;
    flex-wrap: nowrap;
}

.file-upload-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.file-input,
.text-input,
.textarea-input {
    margin: 10px 0;
    padding: 10px;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.textarea-input {
    height: 100px;
}

.button-group {
    display: flex;
    justify-content: center;
    width: 100%;
}

.btn {
    margin: 0 3px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.save-btn {
    background-color: #007BFF;
    color: white;
}

.reset-btn {
    background-color: white;
    color: black;
    border: 1px solid #ccc;
}

.btn:hover {
    background-color: #2769af;
}

.reset-btn:hover {
    background-color: #d0d4d8;
}
</style>