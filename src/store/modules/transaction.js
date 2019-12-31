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
    updateToUnconfirm({}, payload) {
      return axios({
        url: `/transaction/${payload}?unconfirm=true`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token"),
        },
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
    uploadTransfer({}, payload) {
      return axios({
        url: `/image`,
        method: "POST",
        data: payload,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    uploadReceipt({}, payload) {
      return axios({
        url: "/image",
        method: "POST",
        data: payload,
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
    uploadImageTransfer({}, payload) {
      return axios({
        url: `/transaction/${payload.id}/transfer`,
        method: "PUT",
        data: payload.data,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    uploadImageReceipt({}, payload) {
      return axios({
        url: `/transaction/${payload.id}/receipt`,
        method: "PUT",
        data: payload.data,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    getOneTransaction({ dispatch }, payload) {
      axios({
        url: `/transaction/${payload}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then(({ data }) => {
          let list = data.listProduct;
          dispatch("updateStock", list);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateStock({ dispatch }, payload) {
      let userToken = localStorage.getItem("token");
      let promises = [];
      payload.forEach(data => {
        promises.push(
          axios({
            url: `/product/${data.productId}`,
            method: "PATCH",
            data: {
              size: data.size,
              stock: data.amount,
            },
            headers: {
              token: userToken,
            },
          })
            .then(({ data }) => {
              resolve(data);
            })
            .catch(err => {
              reject(err);
            })
        );
      });
      Promise.all(promises)
        .then(values => {
          console.log(values);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
};
