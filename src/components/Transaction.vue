<template>
  <v-container>
    <v-row>
      <v-col cols="10" class="mx-auto">
        <h1 class="text-center">Transaction</h1>
        <v-card
          class="mx-auto card-style mt-4"
          outlined
          color="grey lighten-2"
          v-for="data in transaction"
          :key="data._id"
          raised
          shaped
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ data._id }}</div>
              <v-list-item-title class="headline mb-1">
                {{ data.UserId.username }}
              </v-list-item-title>
              <v-list-item-subtitle
                >Status : {{ data.status }}</v-list-item-subtitle
              >
              <v-list-item-subtitle
                >Created : {{ getDate(data.createdAt) }}</v-list-item-subtitle
              >
              <v-list-item-subtitle v-if="data.transfer !== 'none'">
                Transfer Evidence :
                <a
                  :href="data.transfer"
                  target="_blank"
                  class="transaction-image"
                  >See Image</a
                >
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="data.receipt !== 'none'">
                Transaction Receipt :
                <a
                  :href="data.receipt"
                  target="_blank"
                  class="transaction-image"
                  >Receipt</a
                >
              </v-list-item-subtitle>
              <v-simple-table class="grey lighten-2">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">No</th>
                      <th class="text-center">Items</th>
                      <th class="text-center">Name</th>
                      <th class="text-center">Size</th>
                      <th class="text-center">Amount</th>
                      <th class="text-center">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in data.listProduct" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <img class="image-trans" :src="item.productId.image" />
                      </td>
                      <td>{{ item.productId.name }}</td>
                      <td>{{ item.size }}</td>
                      <td>{{ item.amount }}</td>
                      <td>{{ convert(item.cost) }}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Total Cost</td>
                      <td>{{ convert(data.totalCost) }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
              <img :src="data.UserId.avatar" />
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-flex v-if="data.status === 'unpaid' && role === 'customer'">
              <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :on-cancel="onCancel"
                :is-full-page="fullPage"
                color="#007bff"
                height="128"
                width="128"
              ></loading>
              <v-file-input
                v-model="imageTransfer"
                small-chips
                multiple
                label="upload image transfer"
                v-on:change="fileTransfer"
              ></v-file-input>
              <v-btn
                color="red darken-3"
                dark
                @click.prevent="sentImageTransfer(data._id)"
                >Upload</v-btn
              >
            </v-flex>
            <v-flex v-if="data.status === 'unconfirm' && role === 'admin'">
              <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :on-cancel="onCancel"
                :is-full-page="fullPage"
                color="#007bff"
                height="128"
                width="128"
              ></loading>
              <v-file-input
                v-model="receiptImage"
                small-chips
                multiple
                label="send receipt"
                v-on:change="fileReceipt"
              ></v-file-input>
              <v-btn
                color="gray darken-1"
                dark
                @click.prevent="sentReceipt(data._id)"
                >Confirm</v-btn
              >
            </v-flex>
            <v-btn
              color="success"
              dark
              v-if="data.status === 'paid' && role === 'admin'"
              @click.prevent="updateToSent(data._id)"
              >Sent Product</v-btn
            >
            <v-btn
              color="warning"
              dark
              v-if="data.status === 'sent' && role === 'customer'"
              @click.prevent="updateToReceived(data._id)"
              >Received</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import format from "rupiah-format";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import moment from "moment";

export default {
  name: "Transaction",
  data() {
    return {
      imageTransfer: [],
      receiptImage: [],
      transfer: "",
      receipt: "",
      isLoading: false,
      fullPage: true,
    };
  },
  components: {
    Loading,
  },
  methods: {
    getUserTransaction() {
      this.$store.dispatch("transaction/getUserTransaction");
    },
    getAdminTransaction() {
      this.$store.dispatch("transaction/getAdminTransaction");
    },
    convert(item) {
      return format.convert(item);
    },
    getDate(item) {
      return moment(item).format("LL");
    },
    updateToUnconfirm(id) {
      this.$store
        .dispatch("transaction/updateToUnconfirm", id)
        .then(({ data }) => {
          this.$snotify.success(`Image and Status has been updated`, {
            timeout: 1500,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop",
          });
          this.getUserTransaction();
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
    updateToPaid(id) {
      this.$store
        .dispatch("transaction/updateToPaid", id)
        .then(({ data }) => {
          this.$snotify.success(`Image and Status has been updated`, {
            timeout: 1500,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop",
          });
          this.getAdminTransaction();
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
    updateToSent(id) {
      this.$store
        .dispatch("transaction/updateToSent", id)
        .then(({ data }) => {
          this.$snotify.success(`Success update`, {
            timeout: 1500,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop",
          });
          this.getAdminTransaction();
          this.$store.dispatch("transaction/getOneTransaction", id);
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
    updateToReceived(id) {
      this.$store
        .dispatch("transaction/updateToReceived", id)
        .then(({ data }) => {
          this.$snotify.success(`Success update`, {
            timeout: 1500,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop",
          });
          this.getUserTransaction();
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
    sentImageTransfer(id) {
      let payload = {
        id,
        data: {
          transfer: this.transfer,
        },
      };
      this.$store
        .dispatch("transaction/uploadImageTransfer", payload)
        .then(({ data }) => {
          this.updateToUnconfirm(id);
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
    sentReceipt(id) {
      let payload = {
        id,
        data: {
          receipt: this.receipt,
        },
      };
      this.$store
        .dispatch("transaction/uploadImageReceipt", payload)
        .then(({ data }) => {
          this.updateToPaid(id);
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
    fileTransfer() {
      this.isLoading = true;
      let formData = new FormData();
      formData.append("image", this.imageTransfer[0]);
      this.$store
        .dispatch("transaction/uploadTransfer", formData)
        .then(({ data }) => {
          this.transfer = data.image;
          this.isLoading = false;
          this.$snotify.success(`Image has been uploaded`, {
            timeout: 1500,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop",
          });
          this.getUserTransaction();
        })
        .catch(err => {
          this.isLoading = false;
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
    fileReceipt() {
      this.isLoading = true;
      let formData = new FormData();
      formData.append("image", this.receiptImage[0]);
      this.$store
        .dispatch("transaction/uploadReceipt", formData)
        .then(({ data }) => {
          this.receipt = data.image;
          this.isLoading = false;
          this.$snotify.success(`Image has been uploaded`, {
            timeout: 1500,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop",
          });
          this.getAdminTransaction();
        })
        .catch(err => {
          this.isLoading = false;
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
    transaction() {
      return this.$store.state.transaction.currentTransaction;
    },
    role() {
      return localStorage.getItem("role");
    },
  },
  created() {
    let role = localStorage.getItem("role");
    if (role === "admin") {
      this.getAdminTransaction();
    } else {
      this.getUserTransaction();
    }
  },
};
</script>

<style scoped>
.image-trans {
  width: 50px;
  height: 50px;
}

.card-style {
  width: 100%;
}

td {
  padding: 10px;
  text-align: center;
}

.transaction-image {
  text-decoration: none;
  color: blue;
}
</style>
