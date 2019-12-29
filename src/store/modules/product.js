import axios from "@/api/axios.js";

export default {
  state: {
    allProduct: [],
    detailProduct: {}
  },
  getters: {},
  mutations: {
    SET_ALL_PRODUCT(state, payload) {
      state.allProduct = payload;
    },
    SET_DETAIL_PRODUCT(state, payload) {
      state.detailProduct = payload;
    }
  },
  actions: {
    createProduct({}, payload) {
      return axios({
        url: "/product",
        method: "POST",
        data: payload,
        headers: {
          token: localStorage.getItem("token")
        }
      });
    },
    uploadImage({}, payload) {
      return axios({
        url: "/image",
        method: "POST",
        data: payload,
        headers: {
          token: localStorage.getItem("token")
        }
      });
    },
    getOneProduct({ commit }, payload) {
      return axios({
        url: `/product/${payload}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      }).then(({ data }) => {
        commit("SET_DETAIL_PRODUCT", data);
      });
    },
    getOneProductAdmin({ commit }, payload) {
      return axios({
        url: `/product/${payload}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      });
    },
    updateProduct({}, payload) {
      return axios({
        url: `/product/${payload.id}`,
        method: "PUT",
        data: payload.data,
        headers: {
          token: localStorage.getItem("token")
        }
      });
    },
    updateAttributes({}, payload) {
      return axios({
        url: `/product/${payload.id}/attr`,
        method: "PUT",
        data: payload.data,
        headers: {
          token: localStorage.getItem("token")
        }
      });
    },
    deleteProduct({}, payload) {
      return axios({
        url: `/product/${payload}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token")
        }
      });
    },
    getAllProduct({ commit }) {
      axios({
        url: "/product/",
        method: "GET"
      }).then(({ data }) => {
        commit("SET_ALL_PRODUCT", data);
      });
    }
  }
};
