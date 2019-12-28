<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
      //   drawer: null,
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        { title: "Profile", icon: "mdi-account-box-outline", link: "/profile" },
        { title: "Add Product", icon: "mdi-rocket", link: "/admin/add-product" }
      ]
    };
  },
  methods: {
    closeDrawer() {
      this.$emit("close-drawer", false);
    }
  },
  watch: {
    drawer(val) {
      if (!val) {
        this.closeDrawer();
      }
    }
  }
};
</script>

<style></style>
