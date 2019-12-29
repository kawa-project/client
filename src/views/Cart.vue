<template>
  <v-container>
    <h1 class="text-center">Cart</h1>
    <v-row>
      <v-col cols="10" class="mx-auto col-style">
        <v-simple-table class="table-style">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">No</th>
                <th class="text-center">Items</th>
                <th class="text-center">Name</th>
                <th class="text-center">Size</th>
                <th class="text-center">Amount</th>
                <th class="text-center">Cost</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in userCart" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <img :src="item.productId.image" class="image-style" />
                </td>
                <td>
                  {{ item.productId.name }}
                </td>
                <td>{{ item.size }}</td>
                <td>
                  <v-icon
                    class="mr-2 icon"
                    @click.prevent="minusStock(item._id)"
                    >mdi-minus-circle</v-icon
                  >
                  {{ item.amount }}
                  <v-icon class="ml-2 icon" @click.prevent="addStock(item._id)"
                    >mdi-plus-circle</v-icon
                  >
                </td>
                <td>{{ convert(item.cost) }}</td>
                <td>
                  <v-icon
                    class="delete-icon"
                    @click.prevent="deleteItem(item._id)"
                    >mdi-delete</v-icon
                  >
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total Cost</td>
                <td>{{ convert(totalCost) }}</td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn color="dark" class="checkout-btn" @click.prevent="checkoutItem"
          >Checkout</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import format from "rupiah-format";

export default {
  name: "Cart",
  data() {
    return {};
  },
  methods: {
    getCart() {
      this.$store.dispatch("cart/fetchCart");
    },
    convert(item) {
      return format.convert(item);
    },
    minusStock(id) {
      this.$store
        .dispatch("cart/minusItemCart", id)
        .then(({ data }) => {
          this.getCart();
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
    addStock(id) {
      this.$store
        .dispatch("cart/addItemCart", id)
        .then(({ data }) => {
          this.getCart();
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
    deleteItem(id) {
      this.$store
        .dispatch("cart/deleteItem", id)
        .then(({ data }) => {
          this.getCart();
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
    checkoutItem() {
      this.$store
        .dispatch("transaction/checkoutItem")
        .then(({ data }) => {
          this.$router.push("/");
          this.$snotify.success(`Success Checkout`, {
            timeout: 1500,
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
    userCart() {
      return this.$store.state.cart.currentCart;
    },
    totalCost() {
      let cost = 0;
      let cart = this.$store.state.cart.currentCart;
      cart.forEach(data => {
        cost += data.cost;
      });
      return cost;
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getCart();
    }
  },
};
</script>

<style scoped>
.col-style {
  width: 100%;
}

td {
  padding: 10px;
  text-align: center;
}

.image-style {
  width: 50px;
  height: 50px;
}

.table-style {
  background-color: rgb(175, 175, 175);
}

.icon:hover {
  cursor: pointer;
  color: rgb(58, 24, 24);
}

.delete-icon {
  cursor: pointer;
}

.delete-icon:hover {
  color: rgb(58, 24, 24);
}

.checkout-btn {
  float: right;
  margin: 10px 0px;
}
</style>
