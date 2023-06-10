<template>
  <div class="navigation">
    <input type="checkbox" id="menuToggleCheckbox" class="menuToggleCheckbox">
    <label for="menuToggleCheckbox" class="menuToggle">
      <ion-icon name="prism-outline" class="big-icon" @click="toggleDashboard"></ion-icon>
    </label>
    <div class="menu" id="menu">
      <ul>
        <li class="left-align" style="--i:0.1s;">
          <a href="#" @click="toggleNewsDashboard">
            <ion-icon name="newspaper-outline" class="medium-icon"></ion-icon>
          </a>
        </li>        
        <li class="left-align" style="--i:0.2s;"><a href="#"><ion-icon name="search-outline" class="medium-icon"></ion-icon></a></li>
        <li class="left-align" style="--i:0.3s;"><a href="#"><ion-icon name="information-circle-outline" class="medium-icon"></ion-icon></a></li>
        <li class="right-align" style="--i:0.4s;"><a href="#"><ion-icon name="person-outline" class="medium-icon"></ion-icon></a></li>
        <li class="right-align" style="--i:0.5s;"><a href="#"><ion-icon name="bar-chart-outline" class="medium-icon"></ion-icon></a></li>
        <li class="right-align" style="--i:0.6s;"><a href="#"><ion-icon name="chatbubbles-outline" class="medium-icon"></ion-icon></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleDashboard() {
      this.$emit('toggle-dashboard');
    },
    toggleNewsDashboard() {
      this.$emit('toggle-news-dashboard');
    }
  }
}
</script>

<style scoped lang="css">
@import '@/styles/NavbarStyle.css';
</style>
