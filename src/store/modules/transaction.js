import axios from "@/api/axios.js";

export default {
  state: {
    currentTransaction: [],
  },
  getters: {},
  mutations: {
    SET_CURRENT_TRANSACTION(state, payload) {
      state.currentTransaction = payload;
    },
  },
  actions: {
    getUserTransaction({ commit }) {
      axios({
        url: "/transaction/user",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then(({ data }) => {
          commit("SET_CURRENT_TRANSACTION", data);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    getAdminTransaction({ commit }) {
      axios({
        url: "/transaction",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then(({ data }) => {
          commit("SET_CURRENT_TRANSACTION", data);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    updateToPaid({}, payload) {
      return axios({
        url: `/transaction/${payload}?paid=true`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    updateToSent({}, payload) {
      return axios({
        url: `/transaction/${payload}?sent=true`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    updateToReceived({}, payload) {
      return axios({
        url: `/transaction/${payload}?received=true`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    checkoutItem({}, payload) {
      return axios({
        url: "/transaction",
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
  },
};
