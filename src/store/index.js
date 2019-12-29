import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/user";
import user from "./modules/user";
import Product from "./modules/product";
import Transaction from "./modules/transaction";
import Cart from "./modules/cart";

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
    },
    transaction: {
      namespaced: true,
      state: Transaction.state,
      getters: Transaction.getters,
      mutations: Transaction.mutations,
      actions: Transaction.actions
    },
    cart: {
      namespaced: true,
      state: Cart.state,
      getters: Cart.getters,
      mutations: Cart.mutations,
      actions: Cart.actions
    }
  }
});
