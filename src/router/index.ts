import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/tutorial",
      name: "tutorial",
      component: () => import("../views/TutorialView.vue"),
    },
    {
      path: "/input",
      name: "input",
      component: () => import("../views/InputMenuView.vue"),
    },
    {
      path: "/list",
      name: "list",
      component: () => import("../views/ListMenuView.vue"),
    },
    {
      path: "/list/:id",
      name: "detail",
      component: () => import("../views/DetailView.vue"),
      props: true,
    },
    {
      path: "/import",
      name: "import-manual",
      component: () => import("../views/ImportView.vue"),
    },
    {
      path: "/import/:payload",
      name: "import",
      component: () => import("../views/ImportView.vue"),
      props: true,
    },
  ],
});

export default router;
