<template>
  <div class="hello">
    Hello, {{ msg }}
    <DaysPicker />
  </div>
</template>

<script>
import DaysPicker from '@/components/DaysPicker';

export default {
  name: 'BookingForm',
  components: {
    DaysPicker,
  },
  props: {
    msg: String,
  },
};
</script>
