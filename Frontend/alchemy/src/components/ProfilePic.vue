<template>
    <div class="profile-pic">
      <img :src="profileImageUrl" alt="Profile Picture">
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfilePic',
    props: {
      profileImageUrl: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style>
.profile-pic-container {
  position: absolute;
  width: 5vw;
  height: 70px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background: rgba(0, 0, 0, 0.85);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0.5px);
  -webkit-backdrop-filter: blur(0.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-pic-container img {
  width: 80%;
  height: auto;
  object-fit: cover;
  border-radius: 50%;
}
</style>