import { createMemoryHistory, createRouter } from 'vue-router';
import DashboardPage from '../pages/DashboardPage.vue';

const routes = [{
  path: "/",
  component: DashboardPage,
}]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;