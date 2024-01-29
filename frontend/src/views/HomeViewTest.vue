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
</script>


<template>
    <h1 class="welcomeTitle">Welcome to </h1>
    <h2 class="titleHome">THE CASTLE</h2>
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

    .titleHome{
        font-size: 60px;
        text-align: center;
        
        color: white;
        font-family: "AribauGrotesk-Regular";
    }

    .welcomeTitle{
        font-size: 50px;
        text-align: center;
        margin-top: 170px;
        color: white;
        font-family: 'Tilda', sans-serif;
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



