<template>
    <div class="profile-page">
      <h2>Profile</h2>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input v-model="firstName" type="text" id="firstName" name="firstName" required>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input v-model="lastName" type="text" id="lastName" name="lastName" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="profileImage">Profile Image</label>
          <input type="file" accept=".png, .jpg" @change="handleFileUpload" id="profileImage" name="profileImage">
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfilePage',
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        profileImage: null,
      };
    },
    methods: {
      updateProfile() {
        // Prepare the payload for the profile update request
        const payload = {
          username: this.$store.state.user.username,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        };
  
        // Send the profile update request to the backend API
        this.$axios
          .put('/auth/profile', payload)
          .then(() => {
            // Profile update successful
            console.log('Profile updated successfully');
            // Optionally, you can show a success message to the user
          })
          .catch((error) => {
            // Profile update failed
            console.error('Error updating profile:', error);
            // Optionally, you can show an error message to the user
          });
      },
      handleFileUpload(event) {
        // eslint-disable-next-line no-unused-vars
        const file = event.target.files[0];
        // Validate the file type and size if needed
        // Perform the file upload to the backend API (you may need to use a file upload library or handle it manually)
        // Save the uploaded file to the user's profile in the database
        // You can use the file object directly or convert it to Base64 before sending to the backend
      },
    },
  };
  </script>
  
  <style>
  .profile-page {
    max-width: 500px;
    margin: 0 auto;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  </style>
  