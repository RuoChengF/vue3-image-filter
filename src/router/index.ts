import { createRouter, createWebHistory } from "vue-router";
import ImageFilter from "@/components/ImageFilter.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: ImageFilter,
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
