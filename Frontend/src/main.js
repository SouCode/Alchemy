import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// In App.vue or main.js
import './styles/global.css';
import Navbar from './components/Navbar.vue';


const app = createApp(App);
app.component('Navbar', Navbar);
app.use(router);
app.mount('#app');



createApp(App).use(router).mount('#app')
