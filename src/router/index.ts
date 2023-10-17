import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import AboutUsPage from "@/pages/AboutUsPage.vue";
import AdminPanelPage from "@/pages/AdminPanelPage/AdminPanelPage.vue";
import EmployeeLoginPage from "@/pages/Authentication/EmployeeLoginPage.vue";
import MenuPage from "@/pages/MenuPage/MenuComponent.vue";
import OrdersPage from "@/pages/OrdersPage/OrdersPage.vue";
import { usersStore } from "@/store/usersStore";
import RegisterForm from "@/pages/AdminPanelPage/RegisterForm.vue";
import UsersList from "@/pages/AdminPanelPage/UsersList.vue";

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
    meta: { requireAuth: true },
    children: [
      { path: "register-employee", name: "registerEmployee", component: RegisterForm },
      { path: "users-list", name: "usersList", component: UsersList },
    ],
  },
  {
    path: "/login",
    name: "employeeLogin",
    component: EmployeeLoginPage,
    beforeEnter: () => {
      const store = usersStore();
      if (store.currentUser) {
        router.push({ name: "controlPanel" });
      }
    },
  },
  {
    path: "/menu",
    name: "menu",
    component: MenuPage,
  },
  {
    path: "/orders",
    name: "orders",
    component: OrdersPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, _, next) => {
  const store = usersStore();
  const user = store.currentUser;
  if (to.meta.requireAuth && !user) return next({ name: "employeeLogin" });
  next();
});

export default router;
