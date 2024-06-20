<template>
    <div class="card-container">
        <div class="card-content">
            <div class="card-image">
                <img src="../views/images/logo.png" alt="logoImage" class="image_card">
            </div>    
            <div class="card-text">
                <p>{{date}}</p>
                <p> Time: {{time}}</p>
                <p> Guests: {{numberOfPlp }}</p>
            </div>

            <div class="card-buttons" v-if="showButtons">
                <button @click="handleButtonClick">
                    <img width="30" height="30" src="https://img.icons8.com/retro/32/edit.png" alt="edit"/>
                </button>
                <button @click="handleDeleteButton">
                    <img width="30" height="30" src="https://img.icons8.com/plasticine/100/filled-trash.png" alt="filled-trash"/>                
                </button>
            </div>
        </div>
    </div>
    

</template>

<script setup lang="ts">
    import { ref, defineProps } from 'vue';
    import { RouterLink, RouterView } from 'vue-router'
    import axios from 'axios'
    import router from '@/router';
    import {useToast} from 'vue-toast-notification';
    import BookingForm from '../components/BookingForm.vue'
    const props = defineProps(['date', 'time', 'numberOfPlp','showButtons','reservationId']);
    const emits = defineEmits();
    const showBookingForm = ref(false)
    const toast = useToast()
    
    function handleButtonClick() {
        emits('buttonClick', props.reservationId);
        console.log("i clicked in",props.reservationId)
        router.push({ name: 'update', params: { reservationId: props.reservationId } });
        
    }

   async function handleDeleteButton(){
        const request = await axios.delete(`http://localhost:3000/api/reservation/${props.reservationId}`)
        if(request.status == 200){
            toast.success("You reservation has been deleted please update your page")
            location.reload(); 
            // TODO: Toast here and maybe a reload of the page
        }
        console.log("i clicked delete button",props.reservationId)

    }
    
</script>

<style>
    .card-container {
        width: 330px;
        height: 120px;
        background: white;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
    }

    .card-content {
        display: flex;
        width: 100%;
        padding: 10px;
    }

    .card-image {
        height: 100%;
        width: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card-text {
        margin-left: 20px;
        margin-right: auto; /* Ajoutez cette ligne pour déplacer le bouton à la fin */
    }

    .card-buttons {
        display: flex;
        flex-direction: column; 
        margin-top: auto; 
    }

    .card-buttons button {
        width: 20px;
    }
</style>
