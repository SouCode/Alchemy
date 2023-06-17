import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import AboutPage from '@/views/AboutPage.vue';
import DashboardPage from '@/views/DashboardPage.vue'; // Import the DashboardPage component
import ProfilePage from '@/views/ProfilePage.vue';



const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage, // Add the DashboardPage component to the route
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage,
  }
  // Other routes in your application
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
