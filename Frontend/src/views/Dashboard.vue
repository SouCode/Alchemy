<template>
  <div class="cards">
    <div class="card">
      <!-- Add your content here -->
    </div>
  </div>
  <!-- END OF CARDS-->
</template>

<script>
export default {
name: 'Dashboard'
}
</script>

<style scoped>
:root {
  --card-padding: 1rem;
  --card-border-radius: 10px;
}

.cards {
  position: relative;
  height: 100vh;
  width: 100vw;
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(#7f8191, #27282f);
  opacity: 80%;
  padding: var(--card-padding);

  backdrop-filter: blur( 7.5px );
  -webkit-backdrop-filter: blur( 7.5px );
  border: 1px solid rgba( 255, 255, 255, 0.18 );

  border-radius: 40px;
  color: white;
  height: 80rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2rem 2rem rgba(0, 0, 0, 0.2);
  transition: all 300ms ease;
  min-width: 100rem;
}

.card:hover {
  box-shadow: none;
}
</style>

