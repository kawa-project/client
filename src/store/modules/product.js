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
          token: localStorage.getItem("token"),
        },
      });
    },
    uploadImage({}, payload) {
      return axios({
        url: "/image",
        method: "POST",
        data: payload,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    getOneProduct({}, payload) {
      return axios({
        url: `/product/${payload}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    updateProduct({}, payload) {
      return axios({
        url: `/product/${payload.id}`,
        method: "PUT",
        data: payload.data,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    updateAttributes({}, payload) {
      return axios({
        url: `/product/${payload.id}/attr`,
        method: "PUT",
        data: payload.data,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    deleteProduct({}, payload) {
      return axios({
        url: `/product/${payload}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
  },
};
