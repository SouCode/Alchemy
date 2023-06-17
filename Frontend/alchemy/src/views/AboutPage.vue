<template>
  <div class="about-page">
    <div class="popup">
      <div class="content">
        <h2>About Alchemy</h2>
        <p>Welcome to a powerful platform that empowers you to unlock your full trading potential.</p>
        <div class="section">
          <h3>Features</h3>
          <ul class="feature-list">
            <li>Stay up to date with the latest market news</li>
            <li>Search through countless Stock Symbols</li>
            <li>Buy and sell on a paper trading simulated market</li>
          </ul>
        </div>
        <div class="section">
          <h3>Future Updates</h3>
          <p>I am constantly working on improving Alchemy and bringing you new exciting features. Here are some of the future updates we have planned:</p>
          <ul class="update-list">
            <li>User Customizable Stock Ticker</li>
            <li>Live User Portfolio leaderboards</li>
            <li>Community Social Chat</li>
          </ul>
        </div>
        <button class="dashboard-button" @click="goToDashboard">Go to Dashboard</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  methods: {
    goToDashboard() {
      // Redirect to the Dashboard page
      this.$router.push('/dashboard');
    },
  },
};
</script>

<style>
.about-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup {
  width: 600px;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 20px;
  padding: 30px;
  color: #ffffff;
}

.content {
  margin-top: 30px;
}

h2 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

h3 {
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.section {
  margin-bottom: 30px;
}

.feature-list,
.update-list {
  list-style: none;
  padding-left: 0;
}

.feature-list li,
.update-list li {
  margin-bottom: 8px;
}

.dashboard-button {
  padding: 10px 20px;
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

.dashboard-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>