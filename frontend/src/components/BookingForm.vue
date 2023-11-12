<template>
<div class="container">
		<div class="contact-box">
			
			<div class="left"></div>
			<div class="right">
				<h2>Book a table</h2>
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

    const numberPlp = ref(1)
    const tableId = 1
    const selectedDateTime = ref(new Date()); 
    watch(selectedDateTime, (newValue, oldValue) => {
        console.log('Nouvelle valeur de selectedDateTime:', newValue);
    });
	const tables = ref<{ table_id: number; capacite: number }[]>([]);
	const selectedTable = ref(0);

	console.log("table selectionné",selectedTable.value)	

	

    let userId = ref(0)
    const userJSON = localStorage.getItem("user")
            if(userJSON){
              const userData = JSON.parse(userJSON)
              console.log(userData.nom)
              userId = userData.client_id
			  console.log("Test elvis")
            }
	
	async function getAvailableTables(){
		const requestBody = {
			capaciteMin: numberPlp.value,
			dateReservation: selectedDateTime.value,
			nombre_personnes: numberPlp.value
		}

		try{
			console.log(requestBody)
			console.log(requestBody.capaciteMin)

            const request = await axios.post("http://localhost:3000/api/table/tablesDispo",requestBody)
            if(request.status == 200){
                console.log("Available tables", JSON.stringify(request.data.data))
				//populate the dropdown with values 
				tables.value = request.data.data; // response.data.data contient le tableau d'objets
				
            }
        }catch(error){
            console.log(error)
        }

	}
   	async function booking(){

        const requestBody = {
            client_id: userId,
            table_id: selectedTable.value,
            nombre_personnes: numberPlp.value,
            date_reservation: selectedDateTime.value       
        }

        try{
            const request = await axios.post("http://localhost:3000/api/reservation",requestBody)
            if(request.status == 201){
                console.log("Reservation Created", JSON.stringify(request.data))
				alert("It worked !!!")
            }
        }catch(error){
            console.log(error)
        }
    }
    



</script>


<style>
@font-face {
    font-family: 'Tilda';
    src: url('./views/fonts/Tilda Script S Non-connect Demo.otf')
  }
h2{
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

.container{
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 10px;
}

.container:after{
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: -1;
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

h2{
	position: relative;
	padding: 0 0 10px;
	margin-bottom: 10px;
}

h2:after{
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
	background-color: white;
	color: red;
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