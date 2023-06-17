<template>
    <div class="SP500-container">
      <h2 class="SP500-title">S&P 500</h2>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error occurred while fetching S&P 500 data</div>
      <div v-else>
        <ul class="SP500-info">
          <li class="SP500-item">Price: {{ sp500.price }}</li>
          <li class="SP500-item">% Change: {{ sp500.percentChange }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SP500Card',
    data() {
      return {
        sp500: {},
        loading: false,
        error: false,
      };
    },
    mounted() {
      this.fetchSP500Data();
    },
    methods: {
      async fetchSP500Data() {
        this.loading = true;
        try {
          const response = await axios.get('/stocks/indices');
          const sp500Index = response.data.find((index) => index.symbol === '^GSPC');
          this.sp500 = {
            price: sp500Index.regularMarketPrice.toFixed(0),// change to 2 when ready
            percentChange: sp500Index.regularMarketChangePercent.toFixed(0), // change to 2 when ready
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
  .SP500-container {
    /* S&P500 */
    position: absolute;
    width: 20vw;
    height: 10vh;
    left: 2vw;
    top: 66vh;

    background: rgba( 127, 236, 6, 0.35 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 1.5px );
    -webkit-backdrop-filter: blur( 1.5px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    }
  
  .SP500-title {
    margin-bottom: 10px;
    color: #000;
  }
  
  .SP500-info {
    list-style: none;
    padding: 0;
  }
  
  .SP500-item {
    margin-bottom: 5px;
    color: #000;
  }
  </style>
  