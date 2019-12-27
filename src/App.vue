<template>
  <v-app>
    <navbar-component />
    <!-- <v-sheet id="scrolling-techniques-2" class="overflow-y-auto" max-height="600"> -->
    <v-content>
      <!-- <v-container max-height="600" style="height: 1500px; width: 100%;"> -->

      <router-view />
      <!-- </v-container> -->
    </v-content>
    <!-- </v-sheet> -->
    <!-- <v-content>
      <router-view />
    </v-content>-->
    <vue-snotify></vue-snotify>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    "navbar-component": Navbar
  },
  data: () => ({
    //
  })
};
</script>
