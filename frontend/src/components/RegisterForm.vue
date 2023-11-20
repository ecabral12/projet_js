<template>
  <div class="container">
    <h1>Sign up </h1>
    <div class="center">
      
      <div class="register">
        <input type="text" placeholder="Full name" class="center-input" v-model="fullName" />
        <input type="text" placeholder="Name" class="center-input" v-model="name" />
        <input type="text" placeholder="xyz@mail.com" class="center-input" v-model="email" />
        <input type="text" placeholder="066899087" class="center-input" v-model="phone" />
        <input type="password" placeholder="Enter your password" class="center-input" v-model="password" />
        <button class="center-button" v-on:click="register">Login</button>
        <RouterLink to="/login" class="register-link">Already have an account ? Login</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue';
import axios from 'axios'
import router from '@/router';

    const email = ref('')
    const password = ref('')
    const phone = ref('')
    const name = ref('')
    const fullName = ref('')

  async function register(){
      const requestBody = {
        nom: fullName.value,
        prenom: name.value,
        email: email.value,
        telephone: phone.value,
        mdp: password.value
      }
      try{
        const request =  await axios.post("http://localhost:3000/api/auth/register",requestBody)

        if(request.status == 201 ){
          alert("User created")
          router.push("/login") 
          }  
      }catch(error){
        console.log(error)
      }
    
    }
  onMounted(() => {
    console.log('Le composant a été monté.');
    let user = localStorage.getItem("user");
    if(user){
      router.push("/")
    }
});
    
</script>

<style>
.container {
  background-color: #252525;
  width: 400px;
  height: auto; 
  display: block;
  align-items: center; 
  justify-content: center; 
  margin: auto;
  border-radius: 10px;
  margin-top: 70px;
  padding: 15px;
}
h1{
  margin-bottom: 30px;
  text-align: center;
  font-size: 30px;
  font-weight: 400;
  position: relative;
  margin-top: 5px;
}
.center {
  text-align: center; 
}

.center-input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin: 0 auto; 
  margin-bottom: 30px;
  border: 2px solid white;
  border-radius: 6px;
}

.center-button {
  width: 320px;
  height: 40px;
  border: 1px solid #d62323;
  color: white;
  cursor: pointer;
  display: block;
  margin: 0 auto; 
  background:#D32F2F;
  border-radius: 7px;
  margin-bottom: 20px;
}

.register-link {
  color: white; /* Couleur du texte blanc pour le lien */
  text-decoration: underline; /* Souligner le lien (peut être ajusté selon vos préférences) */
  cursor: pointer;
}
</style>