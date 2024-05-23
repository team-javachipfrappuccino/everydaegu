<template>
   <div style="width: 100%; height: 100%;">
     <!-- 로그인 상태가 아닐 때 Login 컴포넌트를 표시 -->
     <Login v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
     <!-- 로그인 상태일 때 나머지 UI 컴포넌트들을 표시 -->
     <div v-else style="width: 100%; height: 100%;">
       <Header></Header>
       <Nav></Nav>
       <div class="main-wrap">
         <router-view/>
       </div>
     </div>
   </div>
 </template>
 <script>
import Header from '../layout/Header.vue';
import Nav from '../layout/Nav.vue';
import Login from '../login/Login.vue';
 
 const App = {
    data: () => {
       return {
         isLoggedIn: false

       }
    },

    methods: {
      handleLoginSuccess() {
      this.isLoggedIn = true;
    }
    },

    watch: {
 
    },

    computed: {
 
    },
    
    components: {
      Header: Header,
      Login: Login,
      Nav: Nav
    },
    mounted: () => {
       console.log('Vue mounted');
    }
 }
 
 export default App;
 </script>

 <style scoped>
 .main-wrap{
   height: calc(100% - 75.4px);
 }
</style>