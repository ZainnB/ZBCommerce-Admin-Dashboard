import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/DashBoard.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/revenue_analysis",
    name: "Revenue Analysis",
    component: () => import("@/views/RevenueAnalysis.vue"),
  },
  {
    path: "/inventory_management",
    name: "Inventory Management",
    component: () => import("@/views/InventoryManagement.vue"),
  },
  {
    path: "/product_registration",
    name: "Product Registration",
    component: () => import("@/views/ProductRegistration.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/Settings1.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
