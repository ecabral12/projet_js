<template>
    <div class="container-booking-vue">
        <h2 class="bookingTitle">My Bookings</h2>
        <div id="tabs" class="container">
  
            <div class="tabs">
                <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">Upcoming </a>
                <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]">Past </a>
            </div>

            <div class="content">
                <div v-if="activetab === 1" class="tabcontent">
                    <div v-if="upcomingButtons" class="scrollable-content">
                        <CardBooking
                            v-for="booking in upcomingButtons"
                            :date="formatDate(booking.date_reserv)"
                            :time="formatTime(booking.date_reserv)"
                            :numberOfPlp="booking.nombre_personnes"
                            :showButtons="true"
                            :reservationId="booking.reservation_id"
                            @bookingButtonClick="handleBookingButtonClick"
                            class="booking-card"
                        />
                    </div>
                    
                    <div v-else>
                        <p>Loading...</p>
                    </div> 
                </div>
                <div v-if="activetab === 2" class="tabcontent">
                    <div v-if="upcomingButtons" class="scrollable-content">
                        <CardBooking
                            v-for="booking in pastBookings"
                            :date="formatDate(booking.date_reserv)"
                            :time="formatTime(booking.date_reserv)"
                            :numberOfPlp="booking.nombre_personnes"
                            :showButtons="false"
                            class="booking-card"
                        />
                    </div>
                    
                    <div v-else>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
    </div>
        
        
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import axios from 'axios'
    import CardBooking from '../components/BookingCards.vue'
    import moment from 'moment'


   const activetab = ref(1)

    function formatDate(date :string){
       return  moment(date).format('MMMM Do YYYY');
    }

    function formatTime(date :string){
       return moment(date).format('LT'); 

    }

    const upcomingButtons = ref<{
         reservation_id: number; 
         client_id: number;
         table_id: number;
         nombre_personnes:number;
         date_reserv: string
        }[]>([]);

    const pastBookings = ref<{
         reservation_id: number; 
         client_id: number;
         table_id: number;
         nombre_personnes:number;
         date_reserv: string
        }[]>([]);


    let client_id = ref(0)
    const userJSON = localStorage.getItem("user")
            if(userJSON){
              const userData = JSON.parse(userJSON)
              console.log(userData.nom)
              client_id = userData.client_id
            }

    
 async function getReservByClient(){
        
        try{
            const request = await axios.get(`http://localhost:3000/api/reservation/reservUpcomingClient/${client_id}`)
            const requestPastBookinngs = await axios.get(`http://localhost:3000/api/reservation/reservPastClient/${client_id}`)

            if(request.status == 200){
                console.log("data :", request.data.data)
                upcomingButtons.value = request.data.data
            }

            if(requestPastBookinngs.status == 200){
                pastBookings.value = requestPastBookinngs.data.data
            }
            
        }catch(e){

        }
    }
    function handleBookingButtonClick(event: { reservationId: number }) {
    // Utilisez l'identifiant de la réservation reçu de CardBooking
    const reservationId = event.reservationId;
    console.log(`Button clicked for reservation ID: ${reservationId}`);

    // Ajoutez ici la logique que vous souhaitez exécuter en fonction de reservationId
}

    onMounted(() => {
    getReservByClient();
  });

</script>

<style>
    .container-booking-vue{
        width: 600px;
        height: 600px;
        background-color: #252525;
        border-radius: 8px;
    }
    .bookingTitle{
        font-size: 40px;
        font-family: 'Tilda';
        margin-top: 30px;
        margin-bottom: 0px;
        text-align: center;
        color:white;
    }

    .scrollable-content {
        padding-right: 17px;
    }

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

    .container {  
        max-width: 620px; 
        min-width: 420px;
        margin: 40px auto;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 0.9em;
        color: #888;
    }

    /* Style the tabs */
    .tabs {
        overflow: hidden;
        margin-left: 20px;
        margin-bottom: -2px; 
    }

    .tabs ul {
        list-style-type: none;
        margin-left: 20px;
    }

    .tabs a{
        float: left;
        cursor: pointer;
        padding: 12px 24px;
        transition: background-color 0.2s;
        border: 1px solid #ccc;
        border-right: none;
        background-color: #f1f1f1;
        border-radius: 10px 10px 0 0;
        font-weight: bold;
    }
    .tabs a:last-child { 
        border-right: 1px solid #ccc;
    }

    /* Change background color of tabs on hover */
    .tabs a:hover {
        background-color: #aaa;
        color: #fff;
    }

    /* Styling for active tab */
    .tabs a.active {
        background-color: #fff;
        color: #484848;
        border-bottom: 2px solid #fff;
        cursor: default;
    }

    /* Style the tab content */
    .tabcontent {
        padding: 30px;
        border-radius: 10px;
        margin-bottom: 100px;
    
    }

    .booking-card{
        margin-bottom: 20px;
    }

</style>