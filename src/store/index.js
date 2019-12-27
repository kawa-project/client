import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user";
import user from "./modules/user";
import Product from "./modules/product";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      state: User.state,
      getters: User.getters,
      mutations: user.mutations,
      actions: User.actions
    },
    product: {
      namespaced: true,
      state: Product.state,
      getters: Product.getters,
      mutations: Product.mutations,
      actions: Product.actions
    }
  }
});
