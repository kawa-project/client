<template>
  <div class="App">
    <v-app>
      <header-component />
      <navbar-component />
      <v-content>
        <router-view />
      </v-content>
      <footer-component />
      <vue-snotify></vue-snotify>
    </v-app>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    "header-component": Header,
    "navbar-component": Navbar,
    "footer-component": Footer
  },
  data: () => ({
    //
  })
};
</script>

<style scoped>
.App {
  width: 100%;
  height: 100vh;
  padding: 0px;
  margin: 0px;
}
</style>
