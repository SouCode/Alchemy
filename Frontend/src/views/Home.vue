<template>
  <div class="banner">
    <h2 id="text">Alchemy</h2>
    <div class="aura">
      <img :src="require('@/assets/aura1.png')" style="--i:1;">
      <img :src="require('@/assets/aura2.png')" style="--i:2;">
      <img :src="require('@/assets/aura3.png')" style="--i:3;">
      <img :src="require('@/assets/aura4.png')" style="--i:4;">
      <img :src="require('@/assets/aura5.png')" style="--i:5;">       
      <img :src="require('@/assets/aura1.png')" style="--i:10;">
      <img :src="require('@/assets/aura2.png')" style="--i:9;">
      <img :src="require('@/assets/aura3.png')" style="--i:8;">
      <img :src="require('@/assets/aura4.png')" style="--i:7;">
      <img :src="require('@/assets/aura5.png')" style="--i:6;">        
    </div>
  </div>
  <div class="menu">
    <div class="toggle"></div>
    <li style="--i:0">
      <a href="#"></a>
    </li>
    <li style="--i:1">
      <a href="#"></a>
    </li>
    <li style="--i:2">
      <a href="#"></a>
    </li>
    <li style="--i:3">
      <a href="#"></a>
    </li>
    <li style="--i:4">
      <a href="#"></a>
    </li>
    <li style="--i:5">
      <a href="#"></a>
    </li>
  </div>

</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Old Standard TT', serif;
}

.banner {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(~@/assets/AlchemyBG.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner #text {
  position: relative;
  font-size: 12em;
  color: #ffffff;
  text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;
}

.banner .aura {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.banner .aura img {
  position: absolute;
  bottom: 0;
  max-width: 100%;
  transform: translate(-50%, -50%);
  animation: animate calc(4s * var(--i)) linear infinite alternate;
  animation-fill-mode: both;
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  25%,
  75% {
    opacity: 0.2;
  }
  100% {
    opacity: 0;
    transform: scale(3);
  }
}
</style>
