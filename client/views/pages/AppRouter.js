import { createWebHistory, createRouter } from "vue-router";

import Main from "../pages/main/Main.vue";
import Safety from '../pages/chart/Safety.vue';
import Environment from '../pages/chart/Environment.vue';
import Population from '../pages/chart/Population.vue';
import Welfare from '../pages/chart/Welfare.vue';
import Admin from '../pages/adm/Admin.vue';

const routes = [
  /* 메인화면 */
  { path: "/", name: "Main", component: Main },

  /* 차트 */
  { path: '/safety.page', name: 'Safety', component: Safety},
  { path: '/environment.page', name: 'Environment', component: Environment},
  { path: '/population.page', name: 'Population', component: Population},
  { path: '/welfare.page', name: 'Welfare', component: Welfare},
  { path: '/Admin.page', name: 'Admin', component: Admin},


];

const AppRouter = createRouter({
  history: createWebHistory(),
  routes,
});

export default AppRouter;
