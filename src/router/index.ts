import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      component: () => import("@/views/index.vue"),
    },
    {
      path: "/single",
      name: "single",
      component: () => import("@/views/SingleFilter.vue"),
    },
    {
      path: "/batch",
      name: "batch",
      component: () => import("@/views/BatchFilter.vue"),
    },
  ],
});

export default router;
