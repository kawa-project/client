<template>
  <div class="Shoes">
    <v-row justify="center" class="d-flex flex-row">
      <v-col
        cols="5"
        class="pt-0"
        v-for="product in fetchAllProduct"
        :key="product._id"
      >
        <div id="sepatu-thumb">
          <div id="label-sepatu">
            <v-img
              alt="logo-sale"
              src="http://artapfootwear.com/wp-content/themes/pasaraya/images/sale.png"
              max-width="70"
            ></v-img>
          </div>
          <a id="sepatu-display" @click.prevent="goDetailProduct(product._id)">
            <v-img
              id="my-shoes"
              alt="sepatu"
              :src="product.image"
              max-width="446"
              max-height="446"
            ></v-img>
          </a>
          <div id="title-sepatu">
            <h2>
              <a>{{ product.name }}</a>
            </h2>
          </div>
          <div id="harga-sepatu">{{ convert(product.price) }}</div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import format from "rupiah-format";

export default {
  name: "Shoes",
  data() {
    return {
      isLoading: false,
      fullPage: true
    };
  },
  methods: {
    getAllProduct() {
      this.$store.dispatch("product/getAllProduct");
    },
    convert(item) {
      return format.convert(item);
    },
    goDetailProduct(id) {
      if (localStorage.getItem("role") == "customer") {
        this.$router.push(`/product/${id}`);
      } else if (localStorage.getItem("role") == "admin") {
        this.$router.push(`/admin/${id}`);
      } else if (!localStorage.getItem("token")) {
        this.$router.push("/");
        this.$snotify.info(`You Must Login First`, {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          position: "leftTop"
        });
      }
    }
  },
  computed: {
    fetchAllProduct() {
      return this.$store.state.product.allProduct;
    }
  },
  created() {
    this.getAllProduct();
  }
};
</script>

<style></style>
