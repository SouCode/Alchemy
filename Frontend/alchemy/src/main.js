import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/styles/global.css';
import axios from 'axios';

// Update the base URL for API requests
const baseURL = 'http://localhost:5000'; // Replace with your backend server URL

// Set the base URL for API requests
axios.defaults.baseURL = baseURL;

const app = createApp(App);
app.use(router);
app.mount('#app');
