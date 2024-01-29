<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import BookingForm from '../components/BookingForm.vue'
import router from '@/router';
const props = defineProps(['reservationId']);

const reservationId = ref(null);
const mode = "update"



onMounted(() => {
  console.log('Reservation ID:', props.reservationId);
});

</script>


<template>
    <BookingForm :mode="mode" :reservationId="props.reservationId" />
</template>


