<template>
  <div class="Account">
    <v-container>
      <v-row>
        <v-col cols="10" class="mx-auto">
          <div class="cover-profile d-flex flex-row grey lighten-2">
            <v-col cols="4">
              <div id="foto-profile" v-if="$route.path == '/account'">
                <v-img alt="photo-profile" :src="userInfo.avatar"></v-img>
              </div>
              <div id="foto-profile" v-if="$route.params.id">
                <loading
                  :active.sync="isLoading"
                  :can-cancel="false"
                  :on-cancel="onCancel"
                  :is-full-page="fullPage"
                  color="#007bff"
                  height="128"
                  width="128"
                ></loading>
                <v-img
                  alt="photo-profile"
                  :src="avatar"
                  max-width="591"
                ></v-img>
              </div>
              <v-file-input
                v-if="$route.params.id"
                v-model="files"
                color="deep-purple accent-4"
                counter
                label="Image File"
                multiple
                placeholder="Update Your Image"
                prepend-icon="mdi-camera"
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
            <hr />
            <v-col cols="6">
              <div id="detail-profile" v-if="$route.path == '/account'">
                <h2 color="black">
                  Username :
                  <span style="font-size:20px; color:#015668;">{{
                    userInfo.username
                  }}</span>
                </h2>
                <h2 color="black" class="mt-3">
                  Email :
                  <span style="font-size:20px; color:#015668;">{{
                    userInfo.email
                  }}</span>
                </h2>
                <h2 color="black" class="mt-3">
                  Address :
                  <span style="font-size:20px; color:#015668;">{{
                    userInfo.address
                  }}</span>
                </h2>
                <h2 color="black" class="mt-3">
                  Phone :
                  <span style="font-size:20px; color:#015668;">{{
                    userInfo.phone
                  }}</span>
                </h2>
                <v-btn
                  depressed
                  class="mt-3"
                  color="brown darken-4"
                  dark
                  @click.prevent="$router.push(`/account/${userInfo._id}`)"
                  >Edit Profile</v-btn
                >
              </div>
              <router-view :newavatar="avatar" />
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "Account",
  data() {
    return {
      files: [],
      avatar: "",
      isLoading: false,
      fullPage: true
    };
  },
  components: {
    Loading
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch("user/getUserInfo");
    },
    fileHandle() {
      this.isLoading = true;
      let formData = new FormData();
      formData.append("image", this.files[0]);
      this.$store
        .dispatch("user/uploadImage", formData)
        .then(({ data }) => {
          this.avatar = data.image;
          this.isLoading = false;
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
            position: "leftTop"
          });
        });
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  created() {
    this.getUserInfo();
    this.avatar = this.userInfo.avatar;
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

.Account {
  font-family: "Montserrat", sans-serif;
}

#foto-profile {
  border: 3px solid black;
}

.cover-profile {
  border: 1px dashed beige;
  transition: 0.5s;
  opacity: 0.6;
}

.cover-profile:hover {
  transition: 0.5s;
  opacity: 1;
  box-shadow: 5px 5px;
}

hr {
  border: 1px dashed gray;
}
</style>
