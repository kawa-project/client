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
                <image-magnifier
                  class="detail-img"
                  :src="detailProduct.image"
                  :zoom-src="detailProduct.image"
                  width="450"
                  height="450"
                  zoom-width="400"
                  zoom-height="300"
                ></image-magnifier>
              </a>
            </div>
            <div id="small-img" class="mx-auto">
              <v-img
                alt="sepatu"
                :src="detailProduct.image"
                max-width="100"
                class="mx-auto"
              ></v-img>
            </div>
          </div>
        </v-col>
        <v-col cols="5" class="pt-0">
          <div id="detailRight" class="d-flex flex-column align-start ml-5">
            <div class="detail">
              <h1 id="detail-title">{{ detailProduct.name }}</h1>
              <br />
            </div>
            <span style="font-size:30px;">{{
              convert(detailProduct.price)
            }}</span>
            <v-form @submit.prevent="addToCart" class="mt-3">
              <v-select
                v-model="add"
                append-icon="mdi-map"
                dense
                :items="size"
                item-text="text"
                item-value="value"
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
                type="submit"
                >Add To Cart</v-btn
              >
            </v-form>
          </div>
          <hr />
          <p class="mt-5" style="font-size:15px; line-height:25px;">
            {{ detailProduct.desc }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import format from "rupiah-format";

export default {
  name: "DetailProduct",
  data() {
    return {
      add: "",
      size: [{ text: "select size", value: 0 }],
    };
  },
  methods: {
    getOneProduct() {
      let payload = this.$route.params.id;
      this.$store.dispatch("product/getOneProduct", payload).then(_ => {
        let attributes = this.$store.state.product.detailProduct.attributes;
        attributes.forEach(el => {
          let obj = {};
          let detailSize = "";
          detailSize += `size : ${el.size} - stock : ${el.stock}`;
          obj["text"] = detailSize;
          obj["value"] = el.size;
          this.size.push(obj);
        });
      });
    },
    convert(item) {
      return format.convert(item);
    },
    addToCart() {
      let payload = {
        id: this.$route.params.id,
        data: {
          stock: 1,
          size: this.add,
        },
      };
      this.$store
        .dispatch("cart/addToCart", payload)
        .then(({ data }) => {
          this.$store.dispatch("cart/fetchCart");
          this.$snotify.success(`Success add product`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop",
          });
        })
        .catch(err => {
          let text = "";
          err.response.data.errors.forEach(element => {
            text += element + ", ";
          });
          this.$snotify.warning(`${text}`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop",
          });
        });
    },
  },
  computed: {
    detailProduct() {
      return this.$store.state.product.detailProduct;
    },
  },
  created() {
    this.getOneProduct();
  },
};
</script>

<style scoped>
.detail-img {
  cursor: crosshair !important;
  transform: translatey(-100px);
  transition: 1s;
  animation: downfade 1.2s linear;
  animation-fill-mode: forwards;
  z-index: 2;
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

@keyframes downfade {
  from {
    transform: translateY(-150px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
