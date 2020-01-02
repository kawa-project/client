<template>
  <div class="Banner">
    <v-container fluid class="px-0 py-0">
      <v-row justify="center">
        <v-col cols="10" v-if="$route.path == '/'">
          <h2 v-if="$route.path == '/howtoorder'">How To Order</h2>

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

        <v-col cols="10" v-if="$route.path == '/howtoorder'">
          <h2>How To Order</h2>
          <div id="cover-order">
            <v-carousel
              :show-arrows="true"
              interval="5000"
              :hide-delimiters="false"
              hide-delimiter-background
              height="auto"
              style="transition:1s; border: 3px solid black;"
            >
              <v-carousel-item
                style="transition-duration:1s; transition-timing-function: ease-in-out;"
                v-for="(item, i) in howtoorder"
                :key="i"
                :src="item.src"
              ></v-carousel-item>
            </v-carousel>
          </div>
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
        },
        {
          src: "https://i.imgur.com/t04lPHx.jpg"
        },
        {
          src: "https://imgur.com/cH4iFyO.jpg"
        },
        {
          src: "https://imgur.com/Y00Qcq7.jpg"
        }
      ],
      howtoorder: [
        {
          src: "https://imgur.com/SYCprTE.jpg"
        },
        {
          src: "https://imgur.com/q6VbTmG.jpg"
        },
        {
          src: "https://imgur.com/kLBnn8x.jpg"
        },
        {
          src: "https://imgur.com/erd1nE0.jpg"
        },
        {
          src: "https://imgur.com/JIngTIG.jpg"
        },
        {
          src: "https://imgur.com/5vkX3sJ.jpg"
        },
        {
          src: "https://imgur.com/KhZgF9x.jpg"
        },
        {
          src: "https://imgur.com/tnZKkSi.jpg"
        },
        {
          src: "https://imgur.com/v3FK8O2.jpg"
        },
        {
          src: "https://imgur.com/FCcbhex.jpg"
        },
        {
          src: "https://imgur.com/wAKeFq4.jpg"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
