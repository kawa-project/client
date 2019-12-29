<template>
  <v-container>
    <v-row>
      <c-vol cols="10" class="mx-auto">
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
              <v-list-item-title class="headline mb-1">{{
                data.UserId.username
              }}</v-list-item-title>
              <v-list-item-subtitle
                >Status : {{ data.status }}</v-list-item-subtitle
              >
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
            <v-btn
              color="red darken-3"
              dark
              v-if="data.status === 'unpaid' && role === 'customer'"
              @click.prevent="updateToPaid(data._id)"
              >Confirm</v-btn
            >
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
      </c-vol>
    </v-row>
  </v-container>
</template>

<script>
import format from "rupiah-format";

export default {
  name: "Transaction",
  data() {
    return {};
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
    updateToPaid(id) {
      this.$store
        .dispatch("transaction/updateToPaid", id)
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
</style>
