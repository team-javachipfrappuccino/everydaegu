<!-- Login.vue -->
<template>

    <div class="flex justify-center  login">
        <div class="login-area flex-column  align-center">

            <h1 class=" mb60" style="text-align: center;">EVERYDAEGU <br> LOGIN</h1>
            <div class="login-box mb30">
                <div class="flex justify-between align-center mb30">
                    <p>아이디 </p>
                    <input type="text" placeholder="아이디를 입력하세요.">
                </div>
                <div class="flex justify-between align-center">
                    <p>패스워드</p>
                    <input type="password" placeholder="패스워드를 입력하세요.">
                </div>
            </div>
            <div class="join-btn mb30">
                <button type="button" class="pr20" @click="joinOpen">회원가입</button>
                <button type="button">아이디/비밀번호 찾기</button>
            </div>
            <button @click="login" class="login-btn">Login</button>
        </div>


    </div>



</template>

<script>
export default {
    data() {
        return {
            openJoin: false,
            openModal: true
        };
    },
    methods: {
        login() {
            this.$emit('login-success');
        },


    }
};
</script>


<style scoped>
.login {
    width: 100%;
    height: 100%;
    padding: 12rem 0;
}

h1 {
    font-size: 3rem;
}

.login-box {
    width: 100%;
}

.login-box p {
    font-size: 1rem;
    font-family: 'PretendardGOV-Bold';

}

.login-box input {
    border: 0px;
    width: 70%;
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
}

.login-area {
    width: 20%;
    height: 30%;

}

.join-btn button {
    border: 0px;
    background-color: transparent;
    font-size: 1rem;
    cursor: pointer;

}

.login-btn {
    width: 100%;
    border: 0px;
    background-color: #495EA0;
    padding: 1rem;
    color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
}
</style>