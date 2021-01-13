<template>
  <main class="home">
    <BookingForm
        :allowed-range="{min: new Date().toISOString().substr(0, 10), max: '2021-03-15'}"
        :picked-range="pickedRange"
        :price="298"
        :rating="{average: 4.5, total: 125,}"
        :settings="{
          firstDayOfWeek: 1,
          closeOnSelect: true,
        }"
        @reservation="reservation"
    />
    <code v-if="pickedRange.dateFrom">
      {{ pickedRange }}
    </code>
  </main>
</template>

<script>
import BookingForm from '@/components/BookingForm.vue';

export default {
  name: 'Home',
  components: {
    BookingForm,
  },
  data() {
    return {
      pickedRange: {},
    };
  },

  methods: {
    reservation(pickedRange) {
      this.pickedRange = pickedRange;
    },
  },
};
</script>
