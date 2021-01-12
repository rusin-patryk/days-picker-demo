<template>
  <div class="days-picker">
    <div class="days-picker__container">
      <div class="days-picker__header">
        header
      </div>
      <div class="days-picker__week-days">
        <div>_1</div>
        <div>_2</div>
        <div>_3</div>
        <div>_4</div>
        <div>_5</div>
        <div>_6</div>
        <div>_7</div>
      </div>
      <div class="days-picker__days">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
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
      console.log(this.calendarDays);
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
