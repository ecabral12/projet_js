<template>
    <div class="wrapper">
        <MyAccount class="C1" />
        <MyBookings class="C2" />
        
        <!-- <CarbBooking
            date="Friday, Dec 7"
            time="11h30"
            numberOfPlp="3"
        
        class="C2" /> -->
    </div>
</template>

<script setup lang="ts">
    import MyAccount from '../components/MyAccountForm.vue'
    import MyBookings from '../components/MyBookings.vue'
</script>

<style>
    .wrapper {
        display: flex;
        justify-content: space-between;
    }
    .C2 {
        margin-left: auto;
        margin-right: 100px;
        overflow-y: auto; /* Rendez le conteneur scrollable si son contenu dépasse la hauteur maximale */

    }
    
</style>
