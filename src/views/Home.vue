<template>
  <div class="home">
    <BookingForm msg="BookingForm" />
  </div>
</template>

<script>
import BookingForm from '@/components/BookingForm.vue';

export default {
  name: 'Home',
  components: {
    BookingForm,
  },
};
</script>
