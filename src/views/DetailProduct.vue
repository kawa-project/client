<template>
  <div class="DetailProduct">
    <v-container>
      <v-row justify="center" class="d-flex flex-row">
        <v-col cols="5" class="pt-0">
          <div id="detailLeft">
            <div class="detail-sepatu">
              <div id="label-sepatu">
                <v-img
                  alt="logo-sale"
                  src="http://artapfootwear.com/wp-content/themes/pasaraya/images/sale.png"
                  max-width="70"
                ></v-img>
              </div>
              <a>
                <v-img
                  id="detail-img"
                  alt="sepatu"
                  src="http://artapfootwear.com/wp-content/uploads/2016/10/51-500x500.jpg"
                ></v-img>
              </a>
            </div>
            <div id="small-img" class="mx-auto">
              <v-img
                alt="sepatu"
                src="http://artapfootwear.com/wp-content/uploads/2016/10/51-500x500.jpg"
                max-width="100"
                class="mx-auto"
              ></v-img>
            </div>
          </div>
        </v-col>
        <v-col cols="5" class="pt-0">
          <div id="detailRight" class="d-flex flex-column align-start ml-5">
            <div class="detail">
              <h1 id="detail-title">
                Law Full Black
              </h1>
              <br />
            </div>
            <span style="font-size:30px;">Rp 341.500</span>
            <v-form @submit.prevent="addToCart" class="mt-3">
              <v-select
                append-icon="mdi-map"
                dense
                :items="size"
                label="Select Size"
                outlined
                color="black"
                height="30"
                style="width:210px; font-size:12px;"
                background-color="white"
                light
                flat
              ></v-select>
              <v-btn
                depressed
                color="brown darken-3"
                dark
                style="font-size:13px; width:150px;"
                class="mb-5"
              >
                Add To Cart
              </v-btn>
            </v-form>
          </div>
          <hr />
          <p class="mt-5" style="font-size:15px; line-height:25px;">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            possimus voluptatem autem tempora nobis harum sequi commodi laborum
            asperiores architecto! Magnam cum laborum reiciendis possimus, a
            reprehenderit sapiente ex accusamus?
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "DetailProduct",
  data() {
    return {
      add: {
        size: "",
        stock: 1
      },
      size: ["Select Size", "43", "42"]
    };
  }
};
</script>

<style scoped>
span #detail-img {
  cursor: zoom-in;
}

#small-img {
  width: 15%;
  border: 2px solid white;
}

#detail-title {
  color: black;
  font-size: 28px;
  font-weight: normal;
  line-height: 28px;
  text-transform: capitalize;
}

hr {
  border: 1px dashed black;
}
</style>
