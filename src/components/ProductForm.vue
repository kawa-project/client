<template>
  <v-container id="container" v-if="$route.path !== '/admin/transaction'">
    <v-row justify="center">
      <v-col cols="5" class="text-center">
        <p>Upload Image</p>
        <v-img
          contain
          class="image-upload mx-auto"
          height="250"
          width="250"
          :src="image"
        ></v-img>
        <v-file-input
          v-model="files"
          color="deep-purple accent-4"
          counter
          label="File input"
          multiple
          placeholder="Select your files"
          prepend-icon="mdi-paperclip"
          outlined
          :show-size="1000"
          class="mt-3 input mx-auto"
          dense
          v-on:change="fileHandle"
          ref="file"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip
              v-if="index < 2"
              color="deep-purple accent-4"
              dark
              label
              small
              >{{ text }}</v-chip
            >

            <span
              v-else-if="index === 2"
              class="overline grey--text text--darken-3 mx-2"
              >+{{ files.length - 2 }} File(s)</span
            >
          </template>
        </v-file-input>
      </v-col>
      <v-col cols="5">
        <p>Product Form</p>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="Product Name"
            v-model="name"
            :rules="nameRules"
            clearable
            outlined
            dense
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="desc"
            clearable
            dense
            outlined
          ></v-textarea>
          <v-text-field
            label="Price"
            type="Number"
            v-model="price"
            :rules="priceRules"
            placeholder="0"
            outlined
            dense
          ></v-text-field>
          <v-select
            v-model="size"
            :items="item"
            dense
            label="Size"
            :rules="sizeRules"
          ></v-select>
          <v-text-field
            v-model="stock"
            :rules="stockRules"
            label="Stock"
            type="Number"
            placeholder="0"
            outlined
            dense
            class="mt-4"
          ></v-text-field>
          <div v-if="add">
            <v-btn color="success" @click="validate">Submit</v-btn>
            <v-btn class="ml-3" color="warning" @click="resetForm"
              >Reset Form</v-btn
            >
          </div>
          <div v-if="!add">
            <v-btn color="success" @click="editProduct">Edit</v-btn>
            <v-btn class="ml-3" color="warning" @click="resetForm"
              >Reset Form</v-btn
            >
            <v-btn class="ml-3" dark color="red" @click="deleteProduct"
              >Delete</v-btn
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "FormProduct",
  data() {
    return {
      add: true,
      valid: true,
      image: "http://www.grub.express/uploads/users/product-default.png",
      files: [],
      size: "",
      sizeRules: [v => !!v || "You must select at least one size"],
      item: [40, 41, 42, 43, 44, 45],
      name: "",
      nameRules: [v => !!v || "Product Name is required"],
      desc: "",
      price: "",
      priceRules: [
        v => !!v || "Price is required",
        v =>
          (v && v > 0) ||
          "Price cannot have negative value and must greater than 0",
      ],
      stock: "",
      stockRules: [
        v => !!v || "Stock is required",
        v =>
          (v && v > 0) ||
          "Stock cannot have negative value and must greater than 0",
      ],
    };
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.submitForm();
      }
    },
    submitForm() {
      let payload = {
        name: this.name,
        desc: this.desc,
        price: this.price,
        stock: this.stock,
        image: this.image,
        size: this.size,
      };
      this.$store
        .dispatch("product/createProduct", payload)
        .then(({ data }) => {
          this.resetForm();
          this.image =
            "http://www.grub.express/uploads/users/product-default.png";
          this.files = [];
          this.$snotify.success(`${data.message}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop",
          });
          this.$router.push("/product");
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
    fileHandle() {
      let formData = new FormData();
      formData.append("image", this.files[0]);
      this.$store
        .dispatch("product/uploadImage", formData)
        .then(({ data }) => {
          this.image = data.image;
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
    fetchOneProduct(id) {
      this.$store
        .dispatch("product/getOneProductAdmin", id)
        .then(({ data }) => {
          this.name = data.name;
          this.desc = data.desc;
          this.image = data.image;
          this.price = data.price;
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
    editProduct() {
      let id = this.$route.params.id;
      let data = {
        name: this.name,
        desc: this.desc,
        price: this.price,
        image: this.image,
      };
      let payload = {
        id,
        data,
      };
      this.$store
        .dispatch("product/updateProduct", payload)
        .then(({ data }) => {
          this.editAttributes();
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
    editAttributes() {
      let id = this.$route.params.id;
      let data = {
        size: this.size,
        stock: this.stock,
      };
      let payload = {
        data,
        id,
      };
      this.$store
        .dispatch("product/updateAttributes", payload)
        .then(({ data }) => {
          this.resetForm();
          this.$router.push("/product");
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
    deleteProduct() {
      let id = this.$route.params.id;
      this.$snotify.confirm(`item: ${item.name}`, `Want Delete This?`, {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        buttons: [
          {
            text: "Yes",
            action: toast => {
              this.$store
                .dispatch("product/deleteProduct", id)
                .then(({ data }) => {
                  this.resetForm();
                  this.image =
                    "http://www.grub.express/uploads/users/product-default.png";
                  this.$store.dispatch("product/getAllProduct");
                  this.$router.push("/product");
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
            bold: false,
          },
          {
            text: "No",
            action: toast => {
              this.$snotify.info(
                `Cancel Delete ${item.name} from your Item Mall`,
                {
                  timeout: 3000,
                  showProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  position: "leftTop",
                }
              );
              this.$snotify.remove(toast.id);
            },
          },
          {
            text: "Close",
            action: toast => {
              this.$snotify.remove(toast.id);
            },
            bold: true,
          },
        ],
      });
    },
  },
  created() {
    if (this.$route.params.id) {
      this.add = false;
      let id = this.$route.params.id;
      this.fetchOneProduct(id);
    }
  },
};
</script>

<style scoped>
.image-upload {
  border: 1px solid #000;
}

#container {
  height: auto;
}

.input {
  width: 400px;
}
</style>
