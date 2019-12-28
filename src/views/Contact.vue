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

                <v-btn class="mr-4 brown darken-2" type="submit" dark>
                  Submit
                </v-btn>

                <v-btn
                  depressed
                  color="yellow darken-2"
                  class="mr-4"
                  @click="resetFormSaran"
                >
                  Reset Form
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
          <hr />
          <v-flex class="d-flex flex-row justify-center my-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.298867328605!2d107.6283346499371!3d-6.974022670201222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6285c5b7da517%3A0x864485f26a388f95!2sTelkom%20University!5e0!3m2!1sid!2sid!4v1577468869050!5m2!1sid!2sid"
              width="1000"
              height="450"
              frameborder="0"
              style="border:0;"
              allowfullscreen=""
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
        message: ""
      },
      desserts: [
        {
          name: "Call",
          calories: "0811 2131 996"
        },
        {
          name: "SMS",
          calories: "0811 2131 996"
        },
        {
          name: "Whatsapp",
          calories: "0811 2131 996"
        },
        {
          name: "Email",
          calories: "fairenheito2000@gmail.com"
        },
        {
          name: "Office",
          calories:
            "Jl. Telekomunikasi Jl. Terusan Buah Batu, Sukapura, Kec. Dayeuhkolot, Bandung, Jawa Barat 40257"
        }
      ]
    };
  },
  methods: {
    resetFormSaran() {
      this.$refs.formSaran.reset();
    },
    onSubmit() {
      alert(this.form);
      this.resetFormSaran();
    }
  }
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
