<template>
<div class="container-booking">
		<div class="contact-box">
			<div class="left"></div>
			<div class="right">
				<h2 class="titleBooking">Book a table</h2>
				<input type="number" class="field" placeholder="Number of people" v-model="numberPlp">
                <VueCtkDateTimePicker v-model="selectedDateTime" class="date-time-picker" :timezone="'Europe/Paris'" format="YYYY-MM-DD HH:mm:ss" :disabled-hours="['00','01','02','03','04','05','06','07','08','09','10','11','23']"/>
				<button id="btnCheck" class="btn" v-on:click="getAvailableTables">Check for tables</button>
				<select v-model="selectedTable">
  					<option value="0">Select table:</option>
  					<option v-for="table in tables" :value="table.table_id"> Table n°{{ table.table_id }}</option>
				</select>

				<textarea placeholder="Put here everything you find relevant for our staff" class="field"></textarea>
				<button class="btn" v-on:click="booking">Book it!</button>
			</div>
		</div>
	</div>

</template>


<script setup lang="ts">
    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
    import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
    import { onMounted, ref, watch } from 'vue';
    import axios from 'axios'
	import {useToast} from 'vue-toast-notification';
	import 'vue-toast-notification/dist/theme-sugar.css';
	import router from '@/router';

	const props = defineProps(['mode', 'reservationId']);
    const numberPlp = ref(1)
    const selectedDateTime = ref(new Date()); 
    watch(selectedDateTime, (newValue, oldValue) => {
        console.log('Nouvelle valeur de selectedDateTime:', newValue);
    });
	const tables = ref<{ table_id: number }[]>([]);
	const selectedTable = ref(0);
	const $toast = useToast();

	

	onMounted(() => {
		console.log("Mode is :",props.mode)
		console.log("ReservationId  is :",props.reservationId)
		if (props.mode == 'update') {
			 getReservationDetails();
		}
	});

	

    let userId = ref(0)
    const userJSON = localStorage.getItem("user")
            if(userJSON){
              const userData = JSON.parse(userJSON)
              console.log(userData.nom)
              userId = userData.client_id
            }
	
	async function getAvailableTables(){
		const requestBody = {
			capaciteMin: numberPlp.value,
			dateReservation: selectedDateTime.value,
			nombre_personnes: numberPlp.value
		}

		try{
            const request = await axios.post("http://localhost:3000/api/table/tablesDispo",requestBody)
            if(request.status == 200){
                console.log("Available tables", JSON.stringify(request.data.data))
				//populate the dropdown with values 
				tables.value = request.data.data; // response.data.data contient le tableau d'objets
            }
        }catch(error){
			$toast.error("Error during the tables")
            console.log(error)
        }

	}
   	async function booking() {
    const date = new Date(selectedDateTime.value);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

    const requestBody = {
      client_id: userId,
      table_id: selectedTable.value,
      nombre_personnes: numberPlp.value,
      date_reserv: formattedDate,
    };

    try {
      if (props.mode == 'reservation') {
        // Mode réservation : Ajouter une nouvelle réservation
        const request = await axios.post("http://localhost:3000/api/reservation", requestBody);
        if (request.status === 201) {
          console.log("Reservation Created", JSON.stringify(request.data));
		  $toast.success("Your reservations has been created")
		  router.push("/myaccount")		  
        }
      } else if (props.mode == 'update') {
        //todo update 
        const request = await axios.put(`http://localhost:3000/api/reservation/${props.reservationId}`, requestBody);
        if (request.status === 200) {		 
		  $toast.success('Your reservation has been updated!')
		  router.push("/myaccount")
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


function getReservationDetails() {
	try {
		axios.get(`http://localhost:3000/api/reservation/${props.reservationId}`)
				.then(response =>{
					console.log("The data returned the object:",response.data.data)
					const reservationDetails = response.data.data[0];
					numberPlp.value = reservationDetails.nombre_personnes;
					selectedDateTime.value = new Date(reservationDetails.date_reserv);
					tables.value = [{ table_id: reservationDetails.table_id }];
					selectedTable.value = reservationDetails.table_id;
				})
	} catch (error) {
		$toast.error("Error during the loading of your reservation details")
		console.error('Erreur lors de la récupération des détails de la réservation :', error);
	}
}

</script>


<style>
	@font-face {
		font-family: 'Tilda';
		src: url('./views/fonts/Tilda Script S Non-connect Demo.otf')
	}

	.titleBooking{
		color: white;
		font-family: 'Tilda';
	}
	*{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: 'Quicksand', sans-serif;
	}

	body{
		height: 100vh;
		width: 100%;
	}

	.container-booking{
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px 10px;
	}


	.contact-box{
		max-width: 930px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		justify-content: center;
		align-items: center;
		text-align: center;
		background-color: #575757;
		box-shadow: 0px 0px 19px 5px rgba(0,0,0,0.19);
	}

	.left{
		background: url("../views/images/burger2.jpeg") no-repeat center;
		background-size: cover;
		height: 100%;
	}

	.right{
		padding: 25px 40px;
	}

	.titleBooking{
		position: relative;
		padding: 0 0 10px;
		margin-bottom: 10px;
		font-size: 50px;
	}

	.titleBooking:after{
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translateX(-50%);
		height: 4px;
		width: 50px;
		border-radius: 2px;
		background-color: #d62323; 
	}

	.field{
		width: 100%;
		outline: none;
		background-color: white;
		padding: 0.5rem 1rem;
		font-size: 1.1rem;
		margin-bottom: 22px;
		transition: .3s;
		border-radius: 3px;
	}



	textarea{
		min-height: 140px;
	}

	.btn{
		width: 100%;
		padding: 0.5rem 1rem;
		background-color: #D32F2F;
		color: white;
		font-size: 1.1rem;
		border: none;
		outline: none;
		cursor: pointer;
		transition: .3s;
		border-radius: 5px;
	}


	.btnTest{
		margin-bottom: 20px;
	}

	.field:focus{
		border: 2px solid rgba(30,85,250,0.47);
		background-color: #fff;
	}

	@media screen and (max-width: 880px){
		.contact-box{
			grid-template-columns: 1fr;
		}
		.left{
			height: 200px;
		}
	}
	select{
		width: 400px;
		margin-top: 10px;
		margin-bottom: 10px;
		height: 40px;
		border-radius: 3px;
	}

</style>