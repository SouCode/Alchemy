<template>
  <div class="stock-info-container">
    <h2>Stock Information</h2>
    <div class="search-container">
      <input type="text" v-model="symbol" placeholder="Enter stock symbol" />
      <button @click="searchStock">Search</button>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error occurred while fetching stock data</div>
    <div v-else>
      <div v-if="stock">
        <div class="stock-item">
          <div class="stock-item-label">Symbol:</div>
          <div class="stock-item-value">{{ stock.symbol }}</div>
        </div>
        <div class="stock-item">
          <div class="stock-item-label">Name:</div>
          <div class="stock-item-value">{{ stock.name }}</div>
        </div>
        <div class="stock-item">
          <div class="stock-item-label">Price:</div>
          <div :class="['stock-item-value', stock.priceColor]">${{ stock.price }}</div>
        </div>
        <div class="stock-item">
          <div class="stock-item-label">% Change:</div>
          <div :class="['stock-item-value', stock.percentChangeColor]">{{ stock.percentChange }}</div>
        </div>
        <div class="stock-item">
          <div class="stock-item-label">Last Open:</div>
          <div class="stock-item-value">{{ stock.lastOpen }}</div>
        </div>
        <div class="stock-item">
          <div class="stock-item-label">Last Close:</div>
          <div class="stock-item-value">{{ stock.lastClose }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'SearchSymbol',
  data() {
    return {
      symbol: '',
      stock: null,
      loading: false,
      error: false,
    };
  },
  methods: {
    async searchStock() {
      if (!this.symbol) return;

      this.loading = true;
      try {
        const response = await axios.get(`/stocks/search?symbol=${this.symbol}`);
        this.stock = response.data;
        this.updateColors();
      } catch (error) {
        console.error(error);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    updateColors() {
      if (this.stock && this.stock.percentChange) {
        const percentChange = parseFloat(this.stock.percentChange);
        this.stock.priceColor = percentChange < 0 ? 'red' : 'green';
        this.stock.percentChangeColor = percentChange < 0 ? 'red' : 'green';
      }
    },
  },
};
</script>

<style>
.stock-info-container {
  position: absolute;
  width: 20vw;
  height: 40vh;
  left: 2vw;
  top: 5vh;
  /* From https://css.glass */
background: rgba(255, 255, 255, 0.27);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(6.2px);
-webkit-backdrop-filter: blur(6.2px);
border: 1px solid rgba(255, 255, 255, 0.32);
}

.stock-info-container h2 {
  margin-bottom: 10px;
  color: #000000;
}

.stock-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.stock-item-label {
  font-weight: bold;
  color: #000000;
}

.stock-item-value {
  color: #000000;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>
