<template>
  <div class="Contact">
    <v-container>
      <v-row justify="center">
        <v-col cols="10">
          <h2>Contact Us</h2>
          <v-row>
            <v-col class="mx-auto my-5">
              <v-simple-table dark>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
            <v-col lass="mx-auto my-3">
              <v-form ref="formSaran" @submit.prevent="onSubmit">
                <v-text-field
                  v-model="form.email"
                  label="E-mail"
                  required
                  type="email"
                ></v-text-field>

                <v-text-field
                  v-model="form.subject"
                  label="Subject"
                  required
                  type="text"
                ></v-text-field>

                <v-textarea
                  v-model="form.message"
                  filled
                  name="input-7-4"
                  label="Input Your Message"
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                ></v-textarea>

                <v-btn class="mr-4 brown darken-2" type="submit" dark
                  >Submit Message</v-btn
                >

                <v-btn
                  depressed
                  color="yellow darken-2"
                  class="mr-4"
                  @click="resetFormSaran"
                  >Reset Form</v-btn
                >
              </v-form>
            </v-col>
          </v-row>
          <hr />
          <v-flex class="d-flex flex-row justify-center my-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5018067120095!2d107.58739791455052!3d-6.949979394978816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e8c77b6151a3%3A0x212670ab89724cbf!2sJl.%20Sauyunan%20Mas%20Raya%20No.2e%2C%20Kb.%20Lega%2C%20Kec.%20Bojongloa%20Kidul%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040235!5e0!3m2!1sid!2sid!4v1578050315627!5m2!1sid!2sid"
              width="1000"
              height="450"
              frameborder="0"
              style="border:0;"
              allowfullscreen
            ></iframe>
          </v-flex>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      form: {
        email: "",
        subject: "",
        message: "",
      },
      desserts: [
        {
          name: "Call",
          calories: "0812 6392 1840",
        },
        {
          name: "SMS",
          calories: "0812 6392 1840",
        },
        {
          name: "Whatsapp",
          calories: "0811 2131 996",
        },
        {
          name: "Email",
          calories: "kawaleathercraft@gmail.com",
        },
        {
          name: "Office",
          calories:
            "Jl. Sauyunan Mas Raya No.2e Kb. Lega Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40235",
        },
      ],
    };
  },
  methods: {
    resetFormSaran() {
      this.$refs.formSaran.reset();
    },
    onSubmit() {
      let payload = this.form;
      this.$store
        .dispatch("user/contactUs", payload)
        .then(({ data }) => {
          this.$snotify.success(`Thanks for contact us`, {
            timeout: 3000,
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
      this.resetFormSaran();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
.Contact {
  font-family: "Roboto", sans-serif;
}

hr {
  border: 1px dotted white;
}
</style>
