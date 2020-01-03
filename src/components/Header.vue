<template>
  <div class="Header">
    <v-container class="px-0 py-3" style="height:200px;">
      <v-row justify="center">
        <v-col cols="6" class="mx-0">
          <div id="header-left" class="d-flex flex-row">
            <div id="logo-wrap" @click.prevent="$router.push('/')">
              <v-img
                id="logo-nav"
                alt="logo"
                src="../assets/images/logonav.png"
                max-width="200"
              ></v-img>
              <p>Kawa Craft</p>
            </div>
            <v-flex class="d-flex flex-row mt-5" style="margin-left:8%;">
              <div id="banner1">
                <v-img
                  alt="banner"
                  src="../assets/images/banner1.jpg"
                  max-width="150"
                ></v-img>
              </div>
              <div id="banner2">
                <v-img
                  alt="banner"
                  src="../assets/images/banner2.jpg"
                  max-width="150"
                ></v-img>
              </div>
              <div id="banner3">
                <v-img
                  alt="banner"
                  src="../assets/images/banner3.jpg"
                  max-width="150"
                ></v-img>
              </div>
            </v-flex>
          </div>
        </v-col>
        <v-col cols="4" class="mx-0">
          <div
            id="header-right"
            class="d-flex flex-column align-end"
            style="position:relative; top:190%;"
          >
            <div id="btn-sign" v-if="!isLogin">
              <v-btn
                id="btn"
                depressed
                text
                style="font-size:25px;"
                @click.prevent="dialogLogin"
                >LOGIN</v-btn
              >
              <v-btn
                id="btn"
                depressed
                text
                style="font-size:25px;"
                @click.prevent="dialogRegister"
                >Register</v-btn
              >
            </div>
            <div class="text-center mr-5 cart" v-if="isLogin">
              <v-badge>
                <template v-slot:badge>{{ totalCart }}</template>
                <v-icon large @click.prevent="goToCart"
                  >mdi-cart-arrow-down</v-icon
                >
              </v-badge>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <dialogsign-component
      :dialoglogin="dialoglogin"
      :dialogregister="dialogregister"
      @close-dialoglogin="closeDialogLogin"
      @close-dialogregister="closeDialogRegister"
      @open-dialoglogin="dialogLogin"
    />
  </div>
</template>

<script>
import DialogSign from "@/components/DialogSign.vue";

export default {
  name: "Header",
  components: {
    "dialogsign-component": DialogSign
  },
  data() {
    return {
      dialoglogin: false,
      dialogregister: false
    };
  },
  methods: {
    dialogLogin() {
      this.dialogregister = false;
      this.dialoglogin = true;
    },
    closeDialogLogin() {
      this.dialoglogin = false;
    },
    dialogRegister() {
      this.dialoglogin = false;
      this.dialogregister = true;
    },
    closeDialogRegister() {
      this.dialogregister = false;
    },
    goToCart() {
      this.$router.push("/cart");
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    },
    totalCart() {
      return this.$store.state.cart.currentCart.length;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Long+Cang&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
.Header {
  font-family: "Long Cang", cursive;
  background-color: rgb(193, 193, 193);
}
.cart {
  font-family: "Roboto", sans-serif;
  cursor: pointer;
}

#header-left {
  float: left;
  width: 728px;
  height: 90px;
}

#logo-wrap {
  width: 200px;
  height: 200px;
  text-align: center;
  position: relative;
  border: 2px solid black;
  border-radius: 8px;
  margin-left: 10px;
}

#logo-nav:hover {
  animation: rotation linear 2s infinite;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
#logo-wrap:hover {
  cursor: pointer;
  background-color: burlywood;
  transition-delay: 1s;
}

#logo-wrap p {
  position: absolute;
  top: 80%;
  left: 20%;
  z-index: 2;
  font-size: 30px;
}

#btn:hover {
  color: red;
}
</style>
