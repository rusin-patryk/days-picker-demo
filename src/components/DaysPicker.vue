<template>
  <div class="days-picker">
    <div class="days-picker__container">
      <div class="days-picker__header">
        header
      </div>
      <div class="days-picker__week-days">
        <div
            v-for="(day, index) in weekDays"
            :key="`weekDays_${index}`"
            class="days-picker__week-day"
        >
          {{ day }}
        </div>
      </div>
      <div class="days-picker__days">
        <div
            v-for="(day, index) in calendarDays.lastMonth"
            :key="`lastMonth_${index}`"
            class="days-picker__day days-picker__day--last-month"
        >
          {{ day }}
        </div>
        <div
            v-for="(day, index) in calendarDays.currentMonth"
            :key="`currentMonth_${index}`"
            class="days-picker__day days-picker__day--current-month"
        >
          {{ day }}
        </div>
        <div
            v-for="(day, index) in calendarDays.nextMonth"
            :key="`nextMonth_${index}`"
            class="days-picker__day days-picker__day--next-month"
        >
          {{ day }}
        </div>
      </div>
      <div class="days-picker__actions">
        actions
      </div>
    </div>
  </div>
</template>

<script>
import DaysPickerFactory from '@/factories/DaysPickerFactory';
import DaysPickerService from '@/services/DaysPickerService';

export default {
  name: 'DaysPicker',
  data() {
    return {
      settings: DaysPickerFactory.toSettings(),
      currentDate: DaysPickerService.setDate(),
      weekDays: DaysPickerFactory.weekDays(),
      firstMonthDay: null,
      allowedRange: DaysPickerFactory.toAllowedRange(),
      pickedRange: DaysPickerFactory.toPickedRange(),
      calendarDays: DaysPickerFactory.calendarDays(),
    };
  },

  created() {
    this.setWeekDays(this.weekDays, this.settings.firstDayOfWeek);
    this.prepareMonth();
  },

  methods: {
    setWeekDays(weekDays, firstDayOfWeek) {
      this.weekDays = DaysPickerService.setWeekDays(weekDays, firstDayOfWeek);
    },

    prepareMonth() {
      this.calendarDays.lastMonth = DaysPickerService.pushLastMonthDays(this.currentDate, this.settings.firstDayOfWeek);
      this.calendarDays.currentMonth = DaysPickerService.pushCurrentMonthDays(this.currentDate);
      this.calendarDays.nextMonth = DaysPickerService.pushNextMonthDays(this.calendarDays);
    },
  }
};
</script>

<style
    scoped
    lang="scss"
>

@import '../styles/DaysPicker';

</style>
