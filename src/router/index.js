import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/product",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "Product" */ "../views/Product.vue"),
    children: [
      {
        path: ":id",
        name: "DetailProduct",
        component: () =>
          import(
            /* webpackChunkName: "DetailProduct" */ "../views/DetailProduct.vue"
          )
      }
    ]
  },
  {
    path: "/transaction",
    name: "CustomerTransaction",
    component: () =>
      import(
        /* webpackChunkName: "CustomerTransaction" */ "../components/Transaction.vue"
      )
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "About" */ "../views/About.vue")
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import(/* webpackChunkName: "Cart" */ "../views/Cart.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "Contact" */ "../views/Contact.vue")
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "AdminPage" */ "../views/AdminPage.vue"),
    children: [
      {
        path: "transaction",
        name: "AdminTransaction",
        component: () =>
          import(
            /* webpackChunkName: "transaction" */ "../components/Transaction.vue"
          )
      },
      {
        path: "add-product",
        name: "ProductForm",
        component: () =>
          import(
            /* webpackChunkName: "ProductForm" */ "../components/ProductForm.vue"
          )
      },
      {
        path: ":id",
        name: "EditForm",
        component: () =>
          import(
            /* webpackChunkName: "ProductForm" */ "../components/ProductForm.vue"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
