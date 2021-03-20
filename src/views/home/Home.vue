<template>
  <div id="home">
  <h2>首页</h2>
  </div>
</template>

<script>
  export default {
    name: "Home",
    components: {
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
