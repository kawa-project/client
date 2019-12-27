<template>
  <div class="Home">
  
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from "@/components/Banner.vue";

export default {
  name: "Home",
  components: {
    "banner-component": Banner
  }
};
</script>

<style scoped>
.Home {
  overflow: hidden !important;
}
</style>