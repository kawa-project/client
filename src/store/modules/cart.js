import axios from "@/api/axios.js";

export default {
  state: {
    currentCart: {},
  },
  getters: {},
  mutations: {
    SET_CART(state, payload) {
      state.currentCart = payload;
    },
  },
  actions: {
    fetchCart({ commit }, payload) {
      axios({
        url: "/cart",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then(({ data }) => {
          commit("SET_CART", data);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    addItemCart({ commit }, payload) {
      return axios({
        url: `/cart/${payload}/add`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    minusItemCart({ commit }, payload) {
      return axios({
        url: `/cart/${payload}/min`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    deleteItem({ commit }, payload) {
      return axios({
        url: `/cart/${payload}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
  },
};
