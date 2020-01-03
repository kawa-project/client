<template>
  <div class="Product">
    <v-container>
      <v-row>
        <v-col
          v-if="$route.path == '/product'"
          cols="10"
          class="mx-auto text-left"
        >
          <h2 id="label-product">Product</h2>
        </v-col>
      </v-row>
      <shoes-component v-if="$route.path == '/product'" />
      <router-view v-if="$route.params" />
    </v-container>
  </div>
</template>

<script>
import Shoes from "@/components/Shoes.vue";

export default {
  name: "Product",
  components: {
    "shoes-component": Shoes
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
.Product {
  overflow: hidden;
  position: relative;
  background-color: rgb(193, 193, 193);
  font-family: "Montserrat", sans-serif;
}

#label-product {
  margin-left: 43px;
}

#sepatu-thumb {
  width: 450px;
  height: 400px;
  float: left;
  text-align: center;
  padding: 2px;
  margin: 3px;
  transition: 1s;
}

#my-shoes {
  transition: 1s;
  animation: rotation2 1s linear;
  animation-fill-mode: backwards;
}

#my-shoes:hover {
  animation: rotation 0.5s linear;
  animation-fill-mode: forwards;
  cursor: -webkit-grab;
}

@keyframes rotation2 {
  from {
    transform: rotate(-13deg);
  }
  to {
    transform: rotate(0deg);
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-13deg);
  }
}

#sepatu-display {
  cursor: pointer;
  color: #a3a3a3;
}

#label-sepatu {
  z-index: 4;
  position: absolute;
  color: #fff;
  float: left;
  margin-left: 40px;
}

#title-sepatu {
  margin-top: -100px;
  width: auto;
  height: 35px;
  padding-right: 5px;
  padding-left: 5px;
  font-weight: normal;
  font-size: 13px;
}

#title-sepatu h2 {
  color: #a3a3a3;
  text-decoration: none;
  font-size: 14px;
  margin: 0px;
  font-weight: bold;
  padding-bottom: 3px;
  text-transform: capitalize;
}

#title-sepatu a {
  color: #333;
  font-family: "open sans";
  font-size: 16px;
  position: relative;
}

#title-sepatu a:hover {
  cursor: pointer;
  text-decoration: underline;
}

#harga-sepatu {
  font-size: 16px;
  margin-top: -10px;
  margin-right: 0px;
  margin-left: 0;
  font-weight: normal;
  padding: 2px;
  font-family: oswald;
  color: #5a5e61;
  position: relative;
}
</style>
