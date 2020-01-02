<template>
  <div class="About">
    <v-container>
      <v-row justify="center">
        <v-col cols="10" class="d-flex flex-column justify-center">
          <h2 class="my-3">About Us</h2>
          <v-img
            id="logo-about"
            alt="logo"
            src="../assets/images/logonav.png"
            max-width="250"
            class="mx-auto"
          ></v-img>
          <p id="judul-about" class="text-center display-2">Kawa-Craft</p>
          <hr />
          <p class="text-center font-weight-light my-3">
            <span>
              Kawa Craft adalah pemain baru dibidang produksi sepatu lifestyle
              dengan tema workboots untuk laki-laki berbahan kulit pullup dan
              crazy horse dengan kualitas terbaik. Kawa Berdiri pada tahun 2019
              ,lebih tepatnya 20 Maret 2019 Kawa sendiri merupakan bahasa jepang
              yang artinya kulit. Berslogan “ We Are The Craft of Our Towns “
              yang mencitrakan Kawa sebagai pembuat kerajinan terbaik di Kota
              Bandung.
            </span>
          </p>
          <hr />
          <v-img
            class="my-3 mx-auto"
            alt="about"
            src="https://i.ibb.co/dgkdLgY/FOTO1.jpg"
            max-width="900"
          ></v-img>
          <hr />
          <p class="text-center font-weight-light my-3">
            <span>
              Sepatu KAWA mempunyai ciri khas yaitu diproduksi dengan
              menggunakan bahan-bahan berkualitas dan dikerjakan oleh ahli-ahli
              yang berpengalaman sehingga terciptalah sepatu yang mempunyai
              kualitas tinggi, dan mempunyai daya saing global yang di produksi
              di Kota Bandung, Jawa Barat, Indonesia.
            </span>
          </p>
          <hr />
          <v-flex class="d-flex flex-row justify-center my-3">
            <v-img
              id="shoes"
              alt="img-about"
              src="../assets/images/shoes1.jpg"
              max-width="400"
              class="mr-5"
            ></v-img>
            <v-img
              id="shoes"
              alt="img-about"
              src="../assets/images/shoes2.jpg"
              max-width="400"
              class="ml-5"
            ></v-img>
          </v-flex>
          <hr />
          <p class="text-center font-weight-light my-3">
            Kawa memproduksi dua jenis produk / series , produk dengan bahan
            kulit pull-up yang berwarna Tan dan coklat tua/ DarkBrown . Harga
            per sepasang sepatu dijual sama yaitu Rp 550.000 .
          </p>
          <hr />
          <v-flex class="d-flex flex-row justify-space-around">
            <v-img
              class="my-3 un-photo"
              alt="img-about"
              src="../assets/images/foto web/FOTO10.jpg"
              max-width="300"
            ></v-img>
            <v-img
              class="my-3"
              alt="img-about"
              src="../assets/images/foto web/FOTO11.jpg"
              max-width="300"
            ></v-img>
            <v-img
              class="my-3"
              alt="img-about"
              src="../assets/images/foto web/FOTO12.jpg"
              max-width="300"
            ></v-img>
          </v-flex>
          <hr />
          <p
            class="text-center font-weight-light my-3 mt-5"
            style="text-decoration:underline;"
          >Support your local Product 😊</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
.About {
  font-family: "Montserrat", sans-serif;
}

hr {
  border-top: 1px dotted white;
}

#logo-about {
  animation: rotation 2s linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#judul-about {
  position: relative;
  font-family: sans-serif;
  text-transform: uppercase;
  font-size: 2em;
  letter-spacing: 4px;
  overflow: hidden;
  background: linear-gradient(90deg, #000, #fff, #000);
  background-repeat: no-repeat;
  background-size: 80%;
  animation: animate 3s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
}

@keyframes animate {
  0% {
    background-position: -500%;
  }
  100% {
    background-position: 500%;
  }
}

#shoes {
  transition: 0.5s;
}
#shoes:hover {
  transition: 0.5s;
  transform: scale(1.1);
}
</style>
