<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import HomeViewTest from '../views/HomeViewTest.vue'
import router from '@/router';
import { onMounted, ref } from 'vue';


//TODO Add a utils File to manage user connection 

    function bookTable(){
        // 1.check user is connected 
        let user = localStorage.getItem("user");
        if(user){
            router.push("/booking")
        }else{
            router.push("/login")
        }
    }
    const myValue ="2023-11-05 14:31"
    const selectedDateTime = ref(new Date()); // Utilisez une variable de type Date pour stocker la sélection

</script>


<template>
    <h1>Welcome to </h1>
    <h2>THE CASTLE</h2>
    <button v-on:click="bookTable()">Book a table </button>
</template>

<style>
    @import '../index.css';
    @font-face {
    font-family: "AribauGrotesk-Regular";
    src: url("https://db.onlinewebfonts.com/t/ddb4daa06f2d44fdbfdeb2ef47cb4a58.eot");
    src: url("https://db.onlinewebfonts.com/t/ddb4daa06f2d44fdbfdeb2ef47cb4a58.eot?#iefix")format("embedded-opentype"),
    url("https://db.onlinewebfonts.com/t/ddb4daa06f2d44fdbfdeb2ef47cb4a58.woff2")format("woff2"),
    url("https://db.onlinewebfonts.com/t/ddb4daa06f2d44fdbfdeb2ef47cb4a58.woff")format("woff"),
    url("https://db.onlinewebfonts.com/t/ddb4daa06f2d44fdbfdeb2ef47cb4a58.ttf")format("truetype"),
    url("https://db.onlinewebfonts.com/t/ddb4daa06f2d44fdbfdeb2ef47cb4a58.svg#AribauGrotesk-Regular")format("svg");
}
    
    body{
        background-image: url("../views/images/bg_V2.jpg");
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
    }

    h2{
        font-size: 60px;
        text-align: center;
        
        color: white;
        font-family: "AribauGrotesk-Regular";
    }

    button{
        display: block;
        margin: auto;
        width: 150px;
        height: 40px;
        background: white;
        color: red;
        border-radius: 10px;
        font-family: "AribauGrotesk-Regular";
    }
    button:hover {
        transform: scale(1.2);
    }


</style>



