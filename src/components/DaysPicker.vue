<template>
  <div class="daysPicker">
    <div class="daysPicker__container">
      <div class="daysPicker__header">
        <div class="daysPicker__header--previous">
          <button
              type="button"
              @click="changeDate('prev')"
          ><i class="arrow left"></i>
          </button>
        </div>
        <div class="daysPicker__header--date">
          {{ currentDate.getMonth() | monthName }} {{ currentDate.getFullYear() }}
        </div>
        <div class="daysPicker__header--next">
          <div class="daysPicker__header--previous">
            <button
                type="button"
                @click="changeDate('next')"
            >
              <i class="arrow right"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="daysPicker__weekDays">
        <div
            v-for="(day, index) in weekDays"
            :key="`weekDays_${index}`"
            class="daysPicker__weekDay"
        >
          {{ day }}
        </div>
      </div>
      <div class="daysPicker__days">
        <div
            v-for="(day, index) in calendarDays.lastMonth"
            :key="`lastMonth_${index}`"
            class="daysPicker__day daysPicker__day--lastMonth"
        >
          {{ day }}
        </div>
        <div
            v-for="(day, index) in calendarDays.currentMonth"
            :key="`currentMonth_${index}`"
            class="daysPicker__day daysPicker__day--currentMonth"
            :class="{'today': isToday(day), 'disabled': !isAllowed(day)}"
        >
          {{ day }}
        </div>
        <div
            v-for="(day, index) in calendarDays.nextMonth"
            :key="`nextMonth_${index}`"
            class="daysPicker__day daysPicker__day--nextMonth"
        >
          {{ day }}
        </div>
      </div>
      <div class="daysPicker__actions">
        actions
      </div>
    </div>
  </div>
</template>

<script>
import DaysPickerFactory from '@/factories/DaysPickerFactory';
import DaysPickerService from '@/services/DaysPickerService';
import CalendarConstants from '@/constants/CalendarConstants';

export default {
  name: 'DaysPicker',
  data() {
    return {
      settings: DaysPickerFactory.toSettings(),
      currentDate: DaysPickerService.setDate(),
      weekDays: CalendarConstants.weekDays(),
      firstMonthDay: null,
      disallowedDates: [],
      pickedRange: DaysPickerFactory.toPickedRange(),
      calendarDays: DaysPickerFactory.calendarDays(),
    };
  },

  filters: {
    monthName: (value) => {
      return CalendarConstants.getMonths()[value];
    },
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

    changeDate(modifier) {
      this.currentDate = DaysPickerService.setDate(this.currentDate, modifier);
      this.prepareMonth();
    },

    isToday(day) {
      const today = new Date();
      return today.getMonth() === this.currentDate.getMonth() && day === today.getDate();
    },

    isAllowed(day) {
      const dateToCheck = this.generateStringDate(this.currentDate, day);
      let inRangeCount = 0;
      this.disallowedDates.forEach((element) => {
        if (element[0] === '<') {
          if (this.isDateInRange(dateToCheck, element.split('<')[1], '<')) {
            inRangeCount++;
          }
        } else if (element[0] === '>') {
          if (this.isDateInRange(dateToCheck, element.split('>')[1], '>')) {
            inRangeCount++;
          }
        } else {
          if (this.isDateInRange(dateToCheck, element)) {
            inRangeCount++;
          }
        }
      });
      return inRangeCount === 0;
    },

    isDateInRange(dateToCheck, checkWith, modifier) {
      if (!modifier) {
        return dateToCheck === checkWith;
      } else if (modifier === '<') {
        return new Date(dateToCheck) < new Date(checkWith);
      } else if (modifier === '>') {
        return new Date(dateToCheck) > new Date(checkWith);
      }
      return false;
    },

    generateStringDate(date, day) {
      return `${date.getFullYear()}-${this.parseTo2Chars(date.getMonth() + 1)}-${this.parseTo2Chars(day)}`;
    },

    parseTo2Chars(element) {
      if (element.toString().length === 1) {
        return `0${element}`;
      }
      return element;
    },
  },
};
</script>

<style
    scoped
    lang="scss"
>

@import '../styles/DaysPicker';

</style>
