<template>
    <div class="Nasdaq-container">
      <h2 class="Nasdaq-title">Nasdaq</h2>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error occurred while fetching Nasdaq data</div>
      <div v-else>
        <ul class="Nasdaq-info">
          <li class="Nasdaq-item">Price: {{ nasdaq.price }}</li>
          <li class="Nasdaq-item">% Change: {{ nasdaq.percentChange }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'NasdaqCard',
    data() {
      return {
        nasdaq: {},
        loading: false,
        error: false,
      };
    },
    mounted() {
      this.fetchNasdaqData();
    },
    methods: {
      async fetchNasdaqData() {
        this.loading = true;
        try {
          const response = await axios.get('/stocks/indices');
          const nasdaqIndex = response.data.find((index) => index.symbol === '^IXIC');
          this.nasdaq = {
            price: nasdaqIndex.regularMarketPrice.toFixed(2),
            percentChange: nasdaqIndex.regularMarketChangePercent.toFixed(2),
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
  .Nasdaq-container {
    position: absolute;
    width: 20vw;
    height: 10vh;
    left: 2vw;
    top: 53vh;
    background: rgba(127, 236, 6, 0.35);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(6.5px);
    -webkit-backdrop-filter: blur(6.5px);
    border-radius: 10px;
  }
  
  .Nasdaq-title {
    margin-bottom: 10px;
    color: #000;
  }
  
  .Nasdaq-info {
    list-style: none;
    padding: 0;
  }
  
  .Nasdaq-item {
    margin-bottom: 5px;
    color: #000;
  }
  </style>
  