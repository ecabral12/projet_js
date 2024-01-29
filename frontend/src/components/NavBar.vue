<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import router from '@/router';
  import { onMounted, ref } from 'vue';
const isUserConnected = ref(localStorage.getItem("user") !== null);
const navbar = ref(false);
let userName = ref("")
const userJSON = localStorage.getItem("user")
            if(userJSON){
              const userData = JSON.parse(userJSON)
              console.log(userData.nom)
              userName = userData.prenom
            }

function logOut() {
  localStorage.clear();
  isUserConnected.value = false; // Mettre à jour l'état de l'utilisateur connecté
  router.push("/")
}

</script>

<template>

<nav class="bg-transparent border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" class="flex items-center">
      <img width="35" height="35" src="../views/images/logo.png"  class="h-8 mr-2" alt="restaurant-building--v1"/>
        <span class="self-center text-2xl font-semibold whitespace-nowrap md:text-white dark:text-white">The castle</span>
    </a>
    <button  data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" @click="navbar ? navbar = false : navbar = true">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class=" w-full md:block md:w-auto" id="navbar-default" :class="navbar ? 'flex' : 'hidden'">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-cyan-500 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent	dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-rose-500 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page"><RouterLink to="/">Home</RouterLink></a>
        </li>
        <li>
          <a href="#" class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
            <RouterLink
              :to="isUserConnected ? '/myaccount' : '/login'"
              class="block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              {{ isUserConnected ? userName : 'My Account' }}
            </RouterLink>
          </li>

          <li v-if="isUserConnected">
          <a
            href="#"
            class="block py-2 pl-3 pr-4 text-white rounded hover-bg-gray-100 md:hover-bg-transparent md:border-0 md:hover-text-blue-700 md:p-0 dark-text-white md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent"
            @click="logOut"
          >
            Log out
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>