import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import AboutUsPage from "../pages/AboutUsPage.vue";
import AdminPanelPage from "../pages/AdminPanelPage.vue";
import TableSelectPage from "../pages/TableSelectPage.vue";
import EmployeeLoginPage from "../pages/EmployeeLoginPage.vue";
import MenuPage from "../pages/MenuPage.vue";

const routes = [
  {
    path: "/",
    name: "entry",
    component: HomePage,
  },
  {
    path: "/about",
    name: "aboutUs",
    component: AboutUsPage,
  },
  {
    path: "/control-panel",
    name: "controlPanel",
    component: AdminPanelPage,
  },
  {
    path: "/table-select",
    name: "tableSelect",
    component: TableSelectPage,
  },
  {
    path: "/login",
    name: "employeeLogin",
    component: EmployeeLoginPage,
  },
  ,
  {
    path: "/menu",
    name: "menu",
    component: MenuPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
