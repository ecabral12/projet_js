<template>
  <div class="container">
    <div class="header">
      <h1 :class="{ 'center-text': isEditing }">Account Details</h1>
      <button type="submit" class="edit-button" @click="toggleEditing" :class="{ 'invisible': isEditing }">
        <img width="32" height="32" src="https://img.icons8.com/retro/32/edit.png" alt="edit"/>
      </button>
    </div>
    <div class="left">
      <div class="register">
        <div class="input-group">
          <label for="fullName">Full Name:</label>
          <input type="text" placeholder="Full name" class="center-input" v-model="fullName" :disabled="!isEditing" />
        </div>

        <div class="input-group">
          <label for="name">Name:</label>
          <input type="text" placeholder="Name" class="center-input" v-model="name" :disabled="!isEditing" />
        </div>

        <div class="input-group">
          <label for="email">Email:</label>
          <input type="text" placeholder="xyz@mail.com" class="center-input" v-model="email" :disabled="!isEditing" />
        </div>

        <div class="input-group">
          <label for="phoneNumber">Phone Number:</label>
          <input type="text" placeholder="066899087" class="center-input" v-model="phone" :disabled="!isEditing" />
        </div>
      </div>
      <button class="center-button" v-on:click="Update">Update my profile</button>
     
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import axios from 'axios'

  const isEditing = ref(false);

  const email = ref('');
  const password = ref('');
  const phone = ref('');
  const name = ref('');
  const fullName = ref('');
  let client_id = ref(0)
    const userJSON = localStorage.getItem("user")
            if(userJSON){
              const userData = JSON.parse(userJSON)
              console.log(userData.nom)
              client_id = userData.client_id
			  console.log("Test elvis")
            }

  function getAccountInfo() {
    try {
      axios.get(`http://localhost:3000/api/client/${client_id}`)
        .then(response => {
          console.log("elvis",response.data.data[0])
          const data = response.data.data[0]; // Supposons que la réponse est un objet JSON

          // Remplir les variables avec les valeurs de la réponse
          fullName.value = data.nom;
          name.value = data.prenom;
          email.value = data.email;
          phone.value = data.telephone;
        })
        .catch(error => {
          console.error('Erreur lors de la requête :', error);
        });
    } catch (e) {
      console.error('Erreur inattendue :', e);
    }
  }

  function toggleEditing() {
    isEditing.value = !isEditing.value;
  }

 async function Update(){

    try{
        const requestBody = {
          nom: fullName.value,
          prenom: name.value,
          email: email.value,
          telephone: phone.value
        }
        console.log("data",requestBody)
        const request =  await axios.put(`http://localhost:3000/api/client/${client_id}`,requestBody)

        if(request.status == 200){
          alert("Your informations were updated! please reload the page to see somme results ")
          //TODO USE TOAST
  
          isEditing.value = false
        }
                        
    }catch(e){
      console.log("error updating the informations", e)

    }
      
  }

  onMounted(() => {
    // Appeler la fonction getAccountInfo lors du montage du composant
    getAccountInfo();
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
  border-radius: 10px;
  margin-top: 0px;
  padding: 15px;
  margin-left: 50px;;
}

.header {
  display: flex;
  justify-content:center;
  align-items: center;
  margin-left: 0px;
}
.edit-button{
  margin-right: 30px;
  width: 30px;
  height: 30px;
}
h1 {
  margin-bottom: 20px;
  text-align: center;
  font-size: 30px;
  font-weight: 400;
  position: relative;
  margin-top: 30px;
  margin-left: 80px;
 
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
  margin-bottom: 20px;
  border: 2px solid white;
  border-radius: 6px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  color: white;
  margin-bottom: 6px;
  display: block;
  margin-left:30px;
}

.center-button {
  width: 320px;
  height: 40px;
  border: 1px solid #d62323;
  color: white;
  display: block;
  margin: 0 auto; 
  background:#D32F2F;
  border-radius: 7px;
  margin-bottom: 20px;
}

.center-input:disabled {
  background-color: #c3c3bd; 
  color:  black;
}

.invisible {
  display: none;
}
.center-text{
  margin-left: 0px;
}
</style>
