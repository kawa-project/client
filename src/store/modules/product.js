import axios from "@/api/axios.js";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    createProduct({}, payload) {
      return axios({
        url: "/product",
        method: "POST",
        data: payload,
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDRmNWNiMTkzZWM2MzNmMjJlMDE2NyIsImlhdCI6MTU3NzU0NTM2MH0.NNpCp6Bl-0j_NNuDyONu24AeQwBaqZy1W4bp0VzyBeA",
        },
      });
    },
    uploadImage({}, payload) {
      return axios({
        url: "/image",
        method: "POST",
        data: payload,
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDRmNWNiMTkzZWM2MzNmMjJlMDE2NyIsImlhdCI6MTU3NzU0NTM2MH0.NNpCp6Bl-0j_NNuDyONu24AeQwBaqZy1W4bp0VzyBeA",
        },
      });
    },
    getOneProduct({}, payload) {
      return axios({
        url: `/product/${payload}`,
        method: "GET",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDRmNWNiMTkzZWM2MzNmMjJlMDE2NyIsImlhdCI6MTU3NzU0NTM2MH0.NNpCp6Bl-0j_NNuDyONu24AeQwBaqZy1W4bp0VzyBeA",
        },
      });
    },
    updateProduct({}, payload) {
      return axios({
        url: `/product/${payload.id}`,
        method: "PUT",
        data: payload.data,
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDRmNWNiMTkzZWM2MzNmMjJlMDE2NyIsImlhdCI6MTU3NzU0NTM2MH0.NNpCp6Bl-0j_NNuDyONu24AeQwBaqZy1W4bp0VzyBeA",
        },
      });
    },
    updateAttributes({}, payload) {
      return axios({
        url: `/product/${payload.id}/attr`,
        method: "PUT",
        data: payload.data,
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDRmNWNiMTkzZWM2MzNmMjJlMDE2NyIsImlhdCI6MTU3NzU0NTM2MH0.NNpCp6Bl-0j_NNuDyONu24AeQwBaqZy1W4bp0VzyBeA",
        },
      });
    },
    deleteProduct({}, payload) {
      return axios({
        url: `/product/${payload}`,
        method: "DELETE",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDRmNWNiMTkzZWM2MzNmMjJlMDE2NyIsImlhdCI6MTU3NzU0NTM2MH0.NNpCp6Bl-0j_NNuDyONu24AeQwBaqZy1W4bp0VzyBeA",
        },
      });
    },
  },
};
