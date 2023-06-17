<template>
  <div class="trending-container">
    <h2>Trending Stocks</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error occurred while fetching trending stocks</div>
    <div v-else>
      <ul>
        <li v-for="stock in trendingStocks" :key="stock.symbol">
          <div class="stock">
            <div class="stock-symbol">{{ stock.symbol }}</div>
            <div class="stock-name">{{ stock.name }}</div>
            <div class="stock-price">{{ stock.price ? '$' + stock.price.toFixed(2) : '' }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TrendingStocks',
  data() {
    return {
      trendingStocks: [],
      loading: false,
      error: false,
    };
  },
  mounted() {
    this.fetchTrendingStocks();
  },
  methods: {
    async fetchTrendingStocks() {
      this.loading = true;
      try {
        const response = await axios.get('/stocks/trending');
        this.trendingStocks = response.data;
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
.trending-container {
  position: absolute;
  width: 15vw;
  height: 65vh;
  left: 78vw;
  top: 40vh;

  background: rgba(0, 0, 0, 0.85);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0.5px);
  -webkit-backdrop-filter: blur(0.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  color: #fff;
}

.trending-container h2 {
  margin-bottom: 10px;
}

.trending-container ul {
  list-style: none;
  padding: 0;
}

.stock {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.stock-symbol {
  font-weight: bold;
}

.stock-price {
  font-weight: bold;
  color: #009f00; /* Green color for positive price */
}

.stock-price.negative {
  color: #ff0000; /* Red color for negative price */
}
</style>
