import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      auth: false,
      title: "KawaCraft"
    }
  },
  {
    path: "/product",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "Product" */ "../views/Product.vue"),
    meta: {
      auth: false,
      title: "Product | KawaCraft"
    },
    children: [
      {
        path: ":id",
        name: "DetailProduct",
        component: () =>
          import(
            /* webpackChunkName: "DetailProduct" */ "../views/DetailProduct.vue"
          ),
        meta: {
          auth: false,
          title: "Detail Product | KawaCraft"
        }
      }
    ]
  },
  {
    path: "/transaction",
    name: "CustomerTransaction",
    component: () =>
      import(
        /* webpackChunkName: "CustomerTransaction" */ "../components/Transaction.vue"
      ),
    meta: {
      auth: false,
      title: "Transaction | KawaCraft"
    }
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "About" */ "../views/About.vue"),
    meta: {
      auth: false,
      title: "About Us | KawaCraft"
    }
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import(/* webpackChunkName: "Cart" */ "../views/Cart.vue"),
    meta: {
      auth: false,
      title: "Cart | KawaCraft"
    }
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(/* webpackChunkName: "Contact" */ "../views/Contact.vue"),
    meta: {
      auth: false,
      title: "Contact Us | KawaCraft"
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "AdminPage" */ "../views/AdminPage.vue"),
    meta: {
      auth: false,
      title: "Admin Page | KawaCraft"
    },
    children: [
      {
        path: "transaction",
        name: "AdminTransaction",
        component: () =>
          import(
            /* webpackChunkName: "transaction" */ "../components/Transaction.vue"
          ),
        meta: {
          auth: false,
          title: "Transaction | KawaCraft"
        }
      },
      {
        path: "add-product",
        name: "ProductForm",
        component: () =>
          import(
            /* webpackChunkName: "ProductForm" */ "../components/ProductForm.vue"
          ),
        meta: {
          auth: false,
          title: "Add Product | KawaCraft"
        }
      },
      {
        path: ":id",
        name: "EditForm",
        component: () =>
          import(
            /* webpackChunkName: "ProductForm" */ "../components/ProductForm.vue"
          ),
        meta: {
          auth: false,
          title: "Edit Product | KawaCraft"
        }
      }
    ]
  },
  {
    path: "/account",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "Account" */ "../views/Account.vue"),
    meta: {
      auth: false,
      title: "Account | KawaCraft"
    },
    children: [
      {
        path: ":id",
        name: "EditProfile",
        component: () =>
          import(
            /* webpackChunkName: "EditProfile" */ "../components/EditProfile.vue"
          ),
        meta: {
          auth: false,
          title: "Edit Profile | KawaCraft"
        }
      }
    ]
  },
  {
    path: "/howtoorder",
    name: "HowToOrder",
    component: () =>
      import(/* webpackChunkName: "HowToOrder" */ "../views/HowToOrder.vue"),
    meta: {
      auth: false,
      title: "How To Order | KawaCraft"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
