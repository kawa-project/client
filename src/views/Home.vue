<template>
  <div class="Home">
    <v-container>
      <banner-component />
    </v-container>
  </div>
</template>

<script>
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
  overflow: hidden;
  position: relative;
  background-color: #bbbbbb;
}
</style>
