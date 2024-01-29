<template>
 <div class="container" :style="{ height: dynamicHeight }">
    <h1>Log in</h1>
    <div class="center">
     

      <div class="register">
        <input type="text" placeholder="xyz@mail.com" class="center-input" v-model="email" />
        <input type="password" placeholder="Enter your password" class="center-input" v-model="password" />
        <button class="center-button" v-on:click="login">
          <span v-if="isLoading">Loading...</span>
          <span v-else>Login</span>
        </button>        
        <RouterLink to="/register" class="register-link">New here?</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  
  import { RouterLink, RouterView } from 'vue-router'
  import axios from 'axios'
  import { onMounted, ref } from 'vue';
  import router from '@/router';
  import {useToast} from 'vue-toast-notification';
	import 'vue-toast-notification/dist/theme-sugar.css';

  const $toast = useToast();
  const isLoading = ref(false);


 
  const email = ref('') // to be assign to get our values such as document.getElement in js 
  const password = ref('')
  const dynamicHeight = ref('400');

  function adjustContainerHeight() {
  dynamicHeight.value = '400';
}


   async function login(){ // functions to be assign to click events

    isLoading.value = true;
  
        const requestBody = {
            email: email.value,
            mdp: password.value
        }
        try{
            console.log(requestBody)
            const request =  await axios.post("http://localhost:3000/api/auth/login", requestBody)
          if(request.status == 200 ){
            localStorage.setItem("user",JSON.stringify(request.data.user[0]))
            router.push("/")
            setTimeout(() => {
              location.reload(); 
            }, 100);
          }                  
        }catch(error){
            console.error('Erreur lors de la requête API :', error);
            $toast.error("Wrong email or password.")
            isLoading.value = false

        }
    }
  onMounted(() => {
    adjustContainerHeight()
    console.log('Le composant a été monté.');
    
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
  margin-top: 100px;
  
}
h1{
  margin-bottom: 70px;
  text-align: center;
  font-size: 30px;
  font-weight: 400;
  position: relative;
  top: 30px;
}
.center {
  text-align: center; 
}

.center-input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: flex;
  margin: 0 auto; 
  margin-bottom: 40px;
  border: 2px solid white;
  border-radius: 6px;
}

.center-button {
  width: 320px;
  height: 40px;
  border: 2px solid #d62323;
  color: white;
  cursor: pointer;
  display: block;
  margin: 0 auto; 
  background: #D32F2F;
  border-radius: 7px;
  margin-bottom: 50px;
}

.register-link {
  color: white; /* Couleur du texte blanc pour le lien */
  text-decoration: underline; /* Souligner le lien (peut être ajusté selon vos préférences) */
  cursor: pointer;
}


</style>