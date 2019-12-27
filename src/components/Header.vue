<template>
  <div class="Header">
    <v-container class="px-0 py-0" fluid style="height:200px;">
      <v-row justify="center">
        <v-col cols="6" class="mx-0">
          <div id="header-left">
            <div id="logo-wrap">
              <v-img
                alt="logo"
                src="../assets/images/logonav.png"
                max-width="200"
              ></v-img>
              <p>
                Kawa Craft
              </p>
            </div>
          </div>
        </v-col>
        <v-col cols="4" class="mx-0">
          <div id="header-right"></div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Long+Cang&display=swap");
.Header {
  font-family: "Long Cang", cursive;
  background-color: #bbbbbb;
}
#header-left {
  float: left;
  width: 728px;
  height: 90px;
}

#logo-wrap {
  width: 200px;
  height: 200px;
  text-align: center;
  position: relative;
  border: 2px solid black;
  border-radius: 8px;
  margin-left: 75px;
}

#logo-wrap p {
  position: absolute;
  top: 80%;
  left: 20%;
  z-index: 2;
  font-size: 30px;
}
</style>
