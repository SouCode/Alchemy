<template>
    <div class="dashboard-page">
      <!-- Your existing content -->
  
      <!-- Start Paper Trading Button -->
      <div class="buy-container">
        <button class="start-paper-trading" @click="showPaperTradingPopup">Start Paper Trading</button>
        <div class="paper-trading-popup" v-if="showPopup">
          <!-- Popup content here -->
          <h3>Start Paper Trading</h3>
          <p>Enter your Alpaca API key:</p>
          <input type="text" v-model="apiKey" placeholder="Enter API Key" />
          <p>Enter your Alpaca Secret API key:</p>
          <input type="text" v-model="secretApiKey" placeholder="Enter Secret API Key" />
          <button @click="saveAPIKeys">Start</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'BuyStockCard',
    data() {
      return {
        showPopup: false,
        apiKey: '',
        secretApiKey: '',
      };
    },
    methods: {
      showPaperTradingPopup() {
        this.showPopup = true;
      },
      async saveAPIKeys() {
        try {
          const response = await axios.post('/auth/saveKeys', {
            username: this.$store.state.user.username,
            alpacaApiKey: this.apiKey,
            alpacaSecretKey: this.secretApiKey,
          });
  
          console.log(response.data); // Handle API key save success
  
          // Reset the state
          this.showPopup = false;
          this.apiKey = '';
          this.secretApiKey = '';
        } catch (error) {
          console.error(error.response.data); // Handle API key save error
        }
      },
    },
  };
  </script>
  
  <style>
  .buy-container {
    position: absolute;
    width: 30vw;
    height: 25vh;
    left: 25vw;
    top: 66vh;
    background: rgba(0, 0, 0, 0.85);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(0.5px);
    -webkit-backdrop-filter: blur(0.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  
  .start-paper-trading {
    margin: 20px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .paper-trading-popup {
    margin-top: 0px;
    padding: 20px;
    background: rgba( 255, 255, 255, 0.95 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 13.5px );
    -webkit-backdrop-filter: blur( 13.5px );
    border-radius: 10px;
  }
  
  .paper-trading-popup h3 {
    margin-bottom: 10px;
    color: #000000;
  }
  
  .paper-trading-popup p {
    margin-bottom: 5px;
    color: #000000;
  }
  
  .paper-trading-popup input {
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .paper-trading-popup button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  