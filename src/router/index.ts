import { createRouter, createWebHistory } from "vue-router";
import LinesPage from "@/views/LinesPage.vue";
import StopsPage from "@/views/StopsPage.vue";

const routes = [
  {
    path: "/",
    name: "LinesPage",
    component: LinesPage,
  },
  {
    path: "/stops",
    name: "StopsPage",
    component: StopsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
