import axios from "@/api/axios";

export default {
  state: {
    isLogin: false,
    userInfo: null
  },
  getters: {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLogin = payload;
    },
    SET_LOGOUT(state, payload) {
      state.isLogin = payload;
    },
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {
    onLogin({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "/user/login",
          data: payload
        })
          .then(({ data }) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            commit("SET_LOGIN", true);
            commit("SET_USER_INFO", data.user);
            // dispatch("getUserInfo");
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    onRegister({}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          url: "/user/register",
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            address: payload.address,
            phone: payload.phone
          }
        })
          .then(({ data }) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    onLogout({ commit, state }) {
      return new Promise((resolve, reject) => {
        resolve(state.userInfo.username);
        commit("SET_LOGIN", false);
        reject(err);
      });
    },
    getUserInfo({ commit }) {
      let token = localStorage.getItem("token");
      axios({
        method: "GET",
        url: "/user/",
        headers: {
          token
        }
      }).then(({ data }) => {
        commit("SET_USER_INFO", data);
      });
    }
  }
};
