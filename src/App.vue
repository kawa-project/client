<template>
  <div class="App">
    <v-app id="app">
      <header-component />
      <navbar-component />
      <v-content>
        <transition name="fadeWindow" mode="out-in">
          <router-view />
        </transition>
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
  data() {
    return {};
  },
  methods: {},
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("user/SET_LOGIN", true);
      this.$store.dispatch("user/getUserInfo");
    } else {
      let payload = {
        avatar: "https://randomuser.me/api/portraits/men/78.jpg",
        username: "anonymus"
      };
      this.$store.commit("user/SET_USER_INFO", payload);
    }
  },
  watch: {
    $route: {
      handler: (to, from) => {
        document.title = to.meta.title || "KawaCraft";
      },
      immediate: true
    }
  }
};
</script>

<style>
.App {
  width: 100%;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  background-color: rgb(193, 193, 193);
}

#app {
  width: 100%;
  height: auto;
  padding: 0px;
  margin: 0px;
  background-color: rgb(193, 193, 193);
}

.fadeWindow-enter-active,
.fadeWindow-leave-active {
  transition: opacity 0.2s ease-in;
}

.fadeWindow-enter,
.fadeWindow-leave-to {
  opacity: 0;
}
</style>
