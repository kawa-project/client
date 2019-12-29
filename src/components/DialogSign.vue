<template>
  <div class="DialogSign">
    <v-dialog v-model="dialoglogin" width="500">
      <v-card>
        <v-card-title class="headline blue" primary-title>
          Form Login
        </v-card-title>
        <v-container>
          <v-form
            ref="formLogin"
            v-model="valid"
            @submit.prevent="onLogin"
            lazy-validation
          >
            <v-text-field
              v-model="login.email"
              :rules="loginemailRules"
              label="E-mail"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="login.password"
              :rules="loginpasswordRules"
              label="Password"
              type="password"
              required
            ></v-text-field>

            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you ready for shopping?"
              required
            ></v-checkbox>

            <v-btn :disabled="!valid" color="blue" class="mr-4" type="submit"
              >Login</v-btn
            >

            <v-btn color="error" class="mr-4" @click="resetLogin"
              >Reset Form</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- register -->
    <v-dialog v-model="dialogregister" width="500">
      <v-card>
        <v-card-title class="headline brown lighten-2" primary-title>
          Form Register
        </v-card-title>
        <v-container>
          <v-form
            ref="formRegister"
            v-model="valid"
            @submit.prevent="onRegister"
            lazy-validation
          >
            <v-text-field
              v-model="register.username"
              :rules="usernameRules"
              label="Username"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              v-model="register.email"
              :rules="registeremailRules"
              label="E-mail"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="register.password"
              :rules="registerpasswordRules"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="register.address"
              :rules="addressRules"
              label="Address"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              v-model="register.phone"
              :rules="phoneRules"
              label="Phone"
              type="integer"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="brown lighten-2"
              class="mr-4"
              type="submit"
              >Register</v-btn
            >

            <v-btn color="error" class="mr-4" @click="resetRegister"
              >Reset Form</v-btn
            >
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DialogSign",
  props: {
    dialoglogin: {
      type: Boolean
    },
    dialogregister: {
      type: Boolean
    }
  },
  data() {
    return {
      valid: true,
      login: {
        email: "",
        password: ""
      },
      register: {
        username: "",
        email: "",
        password: "",
        address: "",
        phone: ""
      },
      loginemailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      registeremailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      usernameRules: [v => !!v || "Username is required"],
      addressRules: [v => !!v || "Address is required"],
      phoneRules: [v => !!v || "Phone is required"],
      loginpasswordRules: [
        v => !!v || "password is required",
        v => v.length >= 6 || "password minimum 6 characters"
      ],
      registerpasswordRules: [
        v => !!v || "password is required",
        v => v.length >= 6 || "password minimum 6 characters"
      ],
      checkbox: false
    };
  },
  methods: {
    onLogin() {
      if (this.$refs.formLogin.validate()) {
        this.$store
          .dispatch("user/onLogin", this.login)
          .then(data => {
            this.$emit("close-dialoglogin");
            this.resetLogin();
            this.$snotify.success(`${data.message}`, {
              timeout: 5000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              position: "leftTop"
            });
          })
          .catch(err => {
            this.resetLogin();
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
    onRegister() {
      if (this.$refs.formRegister.validate()) {
        this.$store
          .dispatch("user/onRegister", this.register)
          .then(data => {
            this.$snotify.success(`${data.message}`, {
              timeout: 5000,
              showProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              position: "leftTop"
            });
            this.$emit("open-dialoglogin");
            this.resetRegister();
          })
          .catch(err => {
            this.resetRegister();
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
    resetLogin() {
      this.$refs.formLogin.reset();
    },
    resetRegister() {
      this.$refs.formRegister.reset();
    }
  },
  watch: {
    dialoglogin(val) {
      if (!val) {
        this.$emit("close-dialoglogin");
        this.resetLogin();
      } else {
        this.$emit("close-dialogregister");
        this.resetRegister();
      }
    },
    dialogregister(val) {
      if (!val) {
        this.$emit("close-dialogregister");
        this.resetRegister();
      }
    }
  }
};
</script>

<style></style>
