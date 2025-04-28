import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import Layout from "../components/Layout.vue";
import { metaTitle } from "../config/loadedMicroAppLifeCycle";
import Dashboard from "../views/Dashboard.vue";
import { events } from "../utils/events";
import { isMicroApp } from "../config/loadedMicroAppLifeCycle";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "root",
    component: Layout,
    redirect: "dashboard",
    meta: {
      keepAlive: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          title: "dashboard",
          keepAlive: true,
        },
      },
      {
        path: "system",
        name: "system",
        meta: {
          title: "system",
          keepAlive: true,
        },
        children: [
          {
            path: "users",
            name: "users",
            component: () => import("../views/system/Users.vue"),
            meta: {
              title: "users",
              keepAlive: true,
            },
          },
          {
            path: "roles",
            name: "roles",
            component: () => import("../views/system/Roles.vue"),
            meta: {
              title: "roles",
              keepAlive: true,
            },
          },
          {
            path: "permissions",
            name: "permissions",
            component: () => import("../views/system/Permissions.vue"),
            meta: {
              title: "permissions",
              keepAlive: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/bev/:pathMatch(.*)*",
    name: "bevMicro",
    component: Layout,
    children: [],
    meta: {
      title: 'bevMicro',
      keepAlive: true,
    },
  },
  {
    path: "/insVue/:pathMatch(.*)*",
    name: "insVue",
    component: Layout,
    children: [],
    meta: {
      title: 'insVue',
      keepAlive: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
router.beforeEach((to, from, next) => {
  // if (to.path.startsWith("/insVue")) {
  //   events.emit("micro-app-change", {
  //     path: to.path,
  //     title: to.meta?.title,
  //   });
  //   metaTitle(to);
  // }
  if(isMicroApp(to.path)) {
    metaTitle(to);
  }
  next();
});
