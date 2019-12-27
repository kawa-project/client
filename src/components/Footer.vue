<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-text class="py-2 white--text text-center">
        <div
          style="display:flex; flex-direction:row; justify-content:center; align-items:center;"
        >
          <p style="margin-top:16px; margin-left:30px;">Follow Social Media</p>
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            class="mx-4"
            dark
            icon
            :href="icon.link"
            target="_blank"
          >
            <v-icon size="24px">{{ icon.icon }}</v-icon>
          </v-btn>
        </div>
        {{ new Date().getFullYear() }} —
        <strong>&copy;Kawa.Craft</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      icons: [
        {
          icon: "mdi-instagram",
          link: "https://www.instagram.com/kawa.craft/"
        }
      ]
    };
  }
};
</script>

<style></style>
