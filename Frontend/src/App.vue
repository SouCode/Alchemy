<template>
  <div id="app">
    <navbar @toggle-dashboard="toggleDashboard"></navbar>
    <div v-if="!showDashboard">
      <home></home>
    </div>
    <div v-else>
      <dashboard></dashboard>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Home,
    Dashboard
  },
  data() {
    return {
      showDashboard: false
    };
  },
  methods: {
    toggleDashboard() {
      this.showDashboard = !this.showDashboard;
    }
  }
}
</script>

<style>
/* Add your global styles here */
body {
  background-color: white;
  margin: 0;
  padding: 0;
}
</style>
