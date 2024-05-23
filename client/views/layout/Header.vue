<template>
  <header class="flex justify-end ">
    <article>
      <a href="/">최윤서 님</a>
      <span class="mr10 ml10">|</span>
      <a href="/">로그아웃</a>
    </article>
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

<style scoped>
header{
  padding: 0.2rem 2rem ;
  background-color: rgb(67, 67, 67);
}
header a,header span{
  color: white;
}
</style>
