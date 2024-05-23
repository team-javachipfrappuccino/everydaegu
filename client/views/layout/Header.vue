<template>
  <header>
    <!-- 네비바 -->
    <div class="nav">
      <router-link class="home" to="/">everyDaegu</router-link>
      <ul>
        <li><router-link to="/population.page">인구</router-link></li>
        <li><router-link to="/welfare.page">복지</router-link></li>
        <li><router-link to="/safety.page">안전</router-link></li>
        <li><router-link to="/environment.page">환경</router-link></li>
        <li><router-link to="/Admin.page">관리자</router-link></li>
        <!-- <li><a href="#">관리자</a></li> -->
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {},
  components: {},
  mounted() {
    console.log("Header mounted");
  },
};
</script>
