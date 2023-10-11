import HomePage from "../pages/HomePage.vue";
import AboutUsPage from "../pages/AboutUsPage.vue";
import AdminPanelPage from "../pages/AdminPanelPage.vue";
import EmployeeLoginPage from "../pages/EmployeeLoginPage.vue";
import MenuPage from "../pages/MenuPage.vue";
import OrdersPage from '../pages/OrdersPage.vue';

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
      path: "/login",
      name: "employeeLogin",
      component: EmployeeLoginPage,
    },
    {
      path: "/menu",
      name: "menu",
      component: MenuPage
    },
    {
      path: "/orders",
      name: "orders",
      component: OrdersPage,
    },
  ];

  export default routes;