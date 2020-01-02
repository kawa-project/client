<template>
  <div class="Navbar">
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <hr id="hr" />
          <v-app-bar flat dense light color="rgba(0,0,0,0)">
            <v-app-bar-nav-icon @click.prevent="drawer = true" v-if="isLogin"></v-app-bar-nav-icon>

            <v-toolbar-title v-if="isLogin">Menus</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn id="btn-menu" text @click.prevent="$router.push('/')">
              <span>Home</span>
            </v-btn>

            <v-btn id="btn-menu" text @click.prevent="$router.push('/product')">
              <span>Product</span>
            </v-btn>

            <v-btn id="btn-menu" text @click.prevent="$router.push('/howtoorder')">
              <span>How To Order</span>
            </v-btn>

            <v-btn id="btn-menu" text @click.prevent="$router.push('/about')">
              <span>About Us</span>
            </v-btn>

            <v-btn id="btn-menu" text @click.prevent="$router.push('/contact')">
              <span>Contact Us</span>
            </v-btn>
          </v-app-bar>
          <hr id="hr" />
        </v-col>
      </v-row>
    </v-container>
    <navdrawer-component :drawer="drawer" @close-drawer="drawer = $event" />
  </div>
</template>

<script>
import NavDrawer from "@/components/NavDrawer.vue";

export default {
  name: "Navbar",
  components: {
    "navdrawer-component": NavDrawer
  },
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
.Navbar {
  padding-top: 20px;
  background-color: rgb(193, 193, 193);
  height: 95px;
  font-family: "Roboto", sans-serif;
}
#hr {
  border: 1px dashed black;
}

#btn-menu span {
  color: #222831;
  transition: 0.5s;
  font-weight: 500;
}

#btn-menu span:hover {
  transition: 0.5s;
  color: #000000;
  font-size: 16px;
  font-weight: 1000;
}
</style>
