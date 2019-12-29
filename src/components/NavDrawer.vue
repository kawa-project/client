<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="userInfo.avatar"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title style="text-transform:uppercase;">
          {{ userInfo.username }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <div v-if="statusRole">
        <v-list-item
          v-for="item in itemsAdmin"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div v-if="!statusRole">
        <v-list-item v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>

    <template>
      <div class="pa-2 mt-auto" v-if="isLogin">
        <v-btn depressed color="black" dark block @click.prevent="onLogout"
          >Logout</v-btn
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavDrawer",
  props: {
    drawer: {
      type: Boolean
    }
  },
  data() {
    return {
      statusRole: false,
      currentUser: null,
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        { title: "Account", icon: "mdi-account-box-outline", link: "/account" },
        {
          title: "Cart",
          icon: "mdi-cart",
          link: "/cart"
        },
        {
          title: "Transaction",
          icon: "mdi-currency-usd",
          link: "/transaction"
        }
      ],
      itemsAdmin: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        {
          title: "Add Product",
          icon: "mdi-rocket",
          link: "/admin/add-product"
        },
        {
          title: "Transaction",
          icon: "mdi-currency-usd",
          link: "/admin/transaction"
        },
        {
          title: "Edit Product",
          icon: "mdi-file",
          link: "/product"
        }
      ]
    };
  },
  methods: {
    closeDrawer() {
      this.$emit("close-drawer", false);
    },
    onLogout() {
      this.closeDrawer();
      setTimeout(() => {
        this.$store.dispatch("user/onLogout").then(data => {
          this.$snotify.success(`Have Nice Day ${data}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        });
      }, 1);
    }
  },
  watch: {
    drawer(val) {
      if (!val) {
        this.closeDrawer();
      }
    },
    userInfo(val) {
      if (val) {
        if (val.role === "admin") {
          this.currentUser = val;
          this.statusRole = true;
        } else {
          this.currentUser = val;
          this.statusRole = false;
        }
      } else {
        this.currentUser = {
          avatar: "https://randomuser.me/api/portraits/men/78.jpg",
          username: "anonymus"
        };
      }
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.user.isLogin;
    },
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  created() {
    if (!localStorage.getItem("token")) {
      this.currentUser = {
        avatar: "https://randomuser.me/api/portraits/men/78.jpg",
        username: "anonymus"
      };
    } else {
      console.log("masuk");
      console.log(this.$store.state.user.userInfo);
      this.currentUser = this.$store.state.user.userInfo;
    }
  }
};
</script>

<style></style>
