<template>
  <div class="home">
    <div class="water-droplet"></div>
    <div class="container glass">
      <h1>Welcome to our Paper Trading App!</h1>
      <p>Sign in with Google to start:</p>

      <button class="google-auth-button" @click="handleLogin">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google-logo" width="20px">
        <span>Sign in with Google</span>
      </button>
    </div>
  </div>
</template>



  
<script>

  export default {
    name: 'HomePage',
    components: {
    
    },
    methods: {
      async handleLogin() {
        // Insert your Google OAuth login logic here.
        // Make a request to your backend for Google authentication
        // window.location.href = 'http://localhost:5000/auth/google'
      }
    }
  }
</script>

  
<style scoped>
.home {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(https://cdn.discordapp.com/attachments/1085584293205647483/1113849794113306695/0_3.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.container {
  width: 500px;
  height: 300px;
  margin: 200px auto;
  text-align: center;
}

.glass {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
}

.google-auth-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #279e3d;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  text-align: center;
}

.google-auth-button img {
  margin-right: 10px;
}

</style>
