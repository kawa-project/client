<template>
  <div class="EditProfile">
    <v-form ref="formProfile">
      <v-text-field label="Username" type="text" v-model="username" clearable outlined dense></v-text-field>
      <v-text-field label="Email" type="email" v-model="email" clearable outlined dense></v-text-field>
      <v-text-field label="Address" type="text" v-model="address" clearable outlined dense></v-text-field>
      <v-text-field label="Phone" type="text" v-model="phone" clearable outlined dense></v-text-field>
      <v-btn depressed color="brown darken-4" dark @click.prevent="onUpdateProfile">Update Profile</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "EditProfile",
  props: {
    newavatar: {
      type: String
    }
  },
  data() {
    return {
      username: "",
      email: "",
      address: "",
      phone: "",
      avatar: ""
    };
  },
  methods: {
    resetForm() {
      this.$refs.formProfile.reset();
    },
    getUserInfo() {
      this.$store.dispatch("user/getUserInfo");
    },
    onUpdateProfile() {
      let payload = {
        username: this.username,
        email: this.email,
        address: this.address,
        phone: this.phone,
        avatar: this.avatar
      };
      this.$store
        .dispatch("user/onUpdateProfile", payload)
        .then(data => {
          this.$store.dispatch("user/getUserInfo");
          this.$snotify.success(`${data.message}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
          this.$router.push("/account");
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
  watch: {
    newavatar(val) {
      this.avatar = val;
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    }
  },
  created() {
    this.getUserInfo();
    this.username = this.userInfo.username;
    this.email = this.userInfo.email;
    this.address = this.userInfo.address;
    this.phone = this.userInfo.phone;
    this.avatar = this.userInfo.avatar;
  }
};
</script>

<style scoped>
</style>