import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/Home.vue';
import Navbar from './components/Navbar.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    components: {
      default: HomePage,
      navbar: Navbar,
    },
  },
  // Other routes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
  ,
});

export default router;
