<template>
  <div class="HowToOrder">
    <v-container>
      <banner-component />
    </v-container>
  </div>
</template>

<script>
import Banner from "@/components/Banner.vue";

export default {
  name: "HowToOrder",
  components: {
    "banner-component": Banner
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

.HowToOrder {
  font-family: "Montserrat", sans-serif;
}
</style>