<template>
  <div class="dashboard-container">
    <router-link to="/profile">
      <div class="account-container">
        <ProfilePic :profileImageUrl="profileImageUrl" />
      </div>
    </router-link>
    <SearchSymbol @stock-found="onStockFound" />
    <LiveVideo />
    <div class="watchlist-container">
      <div class="watchlist-title">Watchlist</div>
    </div>    <TrendingStocks />
    <NewsSection />
    <NasdaqCard />
    <DowCard />
    <SP500Card />
    <BuyStockCard />
  </div>
</template>


<script>
import TrendingStocks from '@/components/TrendingStocks.vue';
import SearchSymbol from '@/components/SearchSymbol.vue';
import NewsSection from '@/components/NewsSection.vue';
import LiveVideo from '@/components/LiveVideo.vue';
import NasdaqCard from '@/components/NasdaqCard.vue';
import DowCard from '@/components/DowCard.vue';
import SP500Card from '@/components/SP500Card.vue';
import BuyStockCard from '@/components/BuyStockCard.vue';
import ProfilePic from '@/components/ProfilePic.vue';

export default {
  name: 'DashboardPage',
  components: {
    TrendingStocks,
    SearchSymbol,
    NewsSection,
    LiveVideo,
    NasdaqCard,
    DowCard,
    SP500Card,
    BuyStockCard,
    ProfilePic,
  },
  computed: {
    profileImageUrl() {
      // Retrieve the profile image URL for the logged-in user from the store or API response
      // You need to replace this with the actual code to fetch the image URL
      return 'https://example.com/path/to/profile-image.jpg';
    },
  },
  data() {
  return {
    foundStock: null
  };
},
methods: {
  onStockFound(stock) {
    this.foundStock = stock.symbol;
  }
}
};
</script>

<style>
.dashboard-container {
  position: absolute;
  width: 95vw;
  height: 95vh;
  left: 50px;
  top: 30px;

  background: rgb(255, 255, 255);
  border: 1px solid rgba(0, 3, 3, 0.01);
  backdrop-filter: blur(6px);
  border-radius: 0px;
}

.account-container {
  position: absolute;
  width: 5vw;
  height: 70px;
  left: 85vw;
  top: 3vh;

  background: rgba(0, 0, 0, 0.85);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0.5px);
  -webkit-backdrop-filter: blur(0.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
}

.account-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}


.watchlist-container {
  position: absolute;
  width: 15vw;
  height: 20vh;
  left: 78vw;
  top: 15vh;

  background: rgba(0, 0, 0, 0.85);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0.5px);
  -webkit-backdrop-filter: blur(0.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  justify-content: center;
  align-items: center;
}

.watchlist-title {
  color: #fff;
  font-size: 20px;
}

.Buy-container {
  /* S&P500 */
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
</style>