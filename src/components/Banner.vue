<template>
  <div class="Banner">
    <v-container fluid class="px-0 py-0">
      <v-row justify="center">
        <v-col cols="10">
          <v-carousel
            :show-arrows="false"
            interval="5000"
            :hide-delimiters="true"
            hide-delimiter-background
            height="600"
            cycle
            style="transition:1s;"
          >
            <v-carousel-item
              reverse-transition="fade-transition"
              transition="fade-transition"
              style="transition-duration:1s; transition-timing-function: ease-in-out;"
              v-for="(item, i) in items"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      items: [
        {
          src: "http://artapfootwear.com/wp-content/uploads/2018/06/1-001.jpg"
        },
        {
          src: "http://artapfootwear.com/wp-content/uploads/2018/06/3-001.jpg"
        },
        {
          src: "http://artapfootwear.com/wp-content/uploads/2018/06/4-001.jpg"
        },
        {
          src: "https://i.ibb.co/dgkdLgY/FOTO1.jpg"
        }
      ]
    };
  }
};
</script>

<style></style>
