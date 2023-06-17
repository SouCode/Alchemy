<template>
  <div class="landing-page">
    <div class="banner">
      <h2 id="text">Alchemy</h2>
      <div class="aura">
        <img :src="require('@/assets/aura1.png')" style="--i:1; z-index: 3;">
        <img :src="require('@/assets/aura2.png')" style="--i:2; z-index: 3;">
        <img :src="require('@/assets/aura3.png')" style="--i:3; z-index: 3;">
        <img :src="require('@/assets/aura4.png')" style="--i:4; z-index: 3;">
        <img :src="require('@/assets/aura5.png')" style="--i:5; z-index: 3;">
        <img :src="require('@/assets/aura1.png')" style="--i:10; z-index: 3;">
        <img :src="require('@/assets/aura2.png')" style="--i:9; z-index: 3;">
        <img :src="require('@/assets/aura3.png')" style="--i:8; z-index: 3;">
        <img :src="require('@/assets/aura4.png')" style="--i:7; z-index: 3;">
        <img :src="require('@/assets/aura5.png')" style="--i:6; z-index: 3;">
      </div>
      <!-- Trigger the popup with a button or any other element -->
      <button class="getting-started-button" @click="showGettingStartedPopup = true">Getting Started</button>
    </div>
    <div v-if="showGettingStartedPopup" class="getting-started-page">
      <div class="popup-container">
        <h3 class="welcome-message">Welcome to Alchemy!</h3>
        <p class="description">Start your journey with our powerful platform.</p>
        <div v-if="!showForm">
          <div class="button-container">
            <button class="popup-button register-button" @click="showForm = 'register'">Register</button>
            <button class="popup-button login-button" @click="showForm = 'login'">Login</button>
          </div>
        </div>
        <div v-else>
          <h4 v-if="showForm === 'register'">Register</h4>
          <h4 v-else-if="showForm === 'login'">Login</h4>
          <form v-if="showForm === 'register'" @submit.prevent="register" class="form-container">
            <input type="text" v-model="registerData.username" placeholder="Username" required>
            <input type="password" v-model="registerData.password" placeholder="Password" required>
            <div class="button-container">
              <button class="submit-button" type="submit">Register</button>
              <button class="back-button" @click="goBack">Back</button>
            </div>
          </form>
          <form v-else-if="showForm === 'login'" @submit.prevent="login" class="form-container">
            <input type="text" v-model="loginData.username" placeholder="Username" required>
            <input type="password" v-model="loginData.password" placeholder="Password" required>
            <div class="button-container">
              <button class="submit-button" type="submit">Login</button>
              <button class="back-button" @click="goBack">Back</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router/index';

export default {
  name: 'LandingPage',
  data() {
    return {
      showGettingStartedPopup: false,
      showForm: null,
      registerData: {
        username: '',
        password: '',
      },
      loginData: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:5000/auth/register', this.registerData);
        console.log(response.data); // Handle registration success
        router.push('/about'); // Redirect to the About page
      } catch (error) {
        console.error(error.response.data); // Handle registration error
      }
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', this.loginData);
        console.log(response.data); // Handle login success
        router.push('/about'); // Redirect to the About page
      } catch (error) {
        console.error(error.response.data); // Handle login error
      }
    },
    goBack() {
      this.showForm = null;
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Old Standard TT', serif;
}

.banner {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(~@/assets/AlchemyBG.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner #text {
  position: relative;
  font-size: 12em;
  color: #ffffff;
  text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
}

.banner .aura {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.banner .aura img {
  position: absolute;
  bottom: 0;
  max-width: 100%;
  transform: translate(-50%, -50%);
  animation: animate calc(4s * var(--i)) linear infinite alternate;
  animation-fill-mode: both;
  z-index: 999;
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  25%,
  75% {
    opacity: 0.2;
  }
  100% {
    opacity: 0;
    transform: scale(3);
  }
}

.getting-started-button {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  padding: 30px 50px;
  border: 0;
  text-decoration: none;
  border-radius: 15px;
  background-color: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(30px);
  color: rgba(255,255,255,0.8);
  font-weight: bold;
  font-size: 28px;
  letter-spacing: 2px;
  cursor: pointer;
  text-transform: uppercase;
  transition: box-shadow 0.3s ease-in-out;
}

.getting-started-button:hover {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.getting-started-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;
}

.popup-container {
  box-sizing: border-box;
  width: 791px;
  height: 414px;
  padding: 30px;
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.27);
  backdrop-filter: blur(6.4px);
  /* Note: backdrop-filter has minimal browser support */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}

.welcome-message {
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
}

.description {
  font-size: 18px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 30px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-button {
  padding: 15px 30px;
  margin: 0 10px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}

.popup-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

h4 {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
}

.submit-button {
  padding: 10px 30px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
}

.submit-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
