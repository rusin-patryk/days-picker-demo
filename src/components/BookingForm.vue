<template>
  <div class="hello">
    Hello, {{ msg }}
    <DaysPicker
        :disallowedDates="['2021-01-24', `<${new Date().toISOString().substr(0, 10)}`, '>2021-03-13']"
    />
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
