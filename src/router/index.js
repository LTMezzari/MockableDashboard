import Vue from "vue";
import VueRouter from "vue-router";
import DashboardPage from '../pages/DashboardPage';
Vue.use(VueRouter);

const routes = [{
  path: "/",
  component: DashboardPage,
}]

const router = new VueRouter({
  routes,
  linkActiveClass: "active"
});

export default router;