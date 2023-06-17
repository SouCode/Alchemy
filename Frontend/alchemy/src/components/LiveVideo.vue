<template>
    <div class="live-video">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/nG0Kt1Xzk60"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LiveVideo',
  };
  </script>
  
  <style>
  .live-video {
    position: absolute;
    width: 50vw;
    height: 50vh;
    left: 26vw;
    top: 14vh;
    background: #000000;
    border-radius: 40px;
    overflow: hidden;
  }
  
  .live-video iframe {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  </style>
  