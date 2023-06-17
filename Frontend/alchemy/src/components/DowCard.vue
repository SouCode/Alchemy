<template>
    <div class="Dow-container">
      <h2 class="Dow-title">Dow</h2>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error occurred while fetching Dow data</div>
      <div v-else>
        <ul class="Dow-info">
          <li class="Dow-item">Price: {{ dow.price }}</li>
          <li class="Dow-item">% Change: {{ dow.percentChange }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'DowCard',
    data() {
      return {
        dow: {},
        loading: false,
        error: false,
      };
    },
    mounted() {
      this.fetchDowData();
    },
    methods: {
      async fetchDowData() {
        this.loading = true;
        try {
          const response = await axios.get('/stocks/indices');
          const dowIndex = response.data.find((index) => index.symbol === '^DJI');
          this.dow = {
            price: dowIndex.regularMarketPrice.toFixed(2),
            percentChange: dowIndex.regularMarketChangePercent.toFixed(2),
          };
        } catch (error) {
          console.error(error);
          this.error = true;
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style>
  .Dow-container {
    /* S&P500 */
    position: absolute;
    width: 20vw;
    height: 10vh;
    left: 2vw;
    top: 78vh;

    background: rgba( 127, 236, 6, 0.35 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 6.5px );
    -webkit-backdrop-filter: blur( 6.5px );
    border-radius: 10px;
}
  
  .Dow-title {
    margin-bottom: 10px;
    color: #000;
  }
  
  .Dow-info {
    list-style: none;
    padding: 0;
  }
  
  .Dow-item {
    margin-bottom: 5px;
    color: #000;
  }
  </style>
  