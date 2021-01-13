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
          <button
              type="button"
              @click="changeDate('next')"
          >
            <i class="arrow right"></i>
          </button>
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
            :class="{
              'today': isToday(day),
              'disabled': !isAllowed(day),
              'inSelectedRange': isInSelectedRange(generateStringDate(day)),
              'selected first': generateStringDate(day) === localPickedRange.dateFrom,
              'selected last': generateStringDate(day) === localPickedRange.dateTo,
              'last': generateStringDate(day) === hoveredDay && !localPickedRange.dateTo,
            }"
            class="daysPicker__day daysPicker__day--currentMonth"
            @click="selectDay(day)"
            @mouseover="hoveredDay = generateStringDate(day)"
            @mouseleave="hoveredDay = null"
        >
          <span>{{ day }}</span>
        </div>
        <div
            v-for="(day, index) in calendarDays.nextMonth"
            :key="`nextMonth_${index}`"
            class="daysPicker__day daysPicker__day--nextMonth"
        >
          {{ day }}
        </div>
      </div>
      <div
          v-if="!settings.closeOnSelect"
          class="daysPicker__actions"
      >
        <button
            type="button"
            class="daysPicker__actionButton daysPicker__actionButton--clear"
            @click="closeCalendar()"
        >
          Zamknij
        </button>
        <button
            type="button"
            class="daysPicker__actionButton daysPicker__actionButton--enter"
            @click="saveCalendar()"
        >
          Wprowadź
        </button>
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
      currentDate: DaysPickerService.setDate(),
      weekDays: CalendarConstants.weekDays(),
      calendarDays: DaysPickerFactory.calendarDays(),
      localPickedRange: null,
      hoveredDay: null,
    };
  },

  props: {
    settings: {
      type: Object,
      default: () => DaysPickerFactory.toSettings(),
    },
    pickedRange: {
      type: Object,
      default: () => DaysPickerFactory.toPickedRange(),
    },
    allowedRange: {
      type: Object,
      default: () => {
      },
    },
  },

  filters: {
    monthName: (value) => {
      return CalendarConstants.getMonths()[value];
    },
  },

  watch: {
    pickedRange: {
      handler() {
        this.localPickedRange = this.pickedRange;
      },
    },
  },

  created() {
    this.localPickedRange = this.pickedRange;
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

    selectDay(day) {
      if (!this.isAllowed(day)) {
        return;
      }
      if (!this.localPickedRange.dateFrom) {
        this.setDateFrom(day);
      } else {
        if (new Date(this.generateStringDate(day)) < new Date(this.localPickedRange.dateFrom)) {
          this.setDateFrom(day);
        } else if (!this.localPickedRange.dateTo) {
          this.setDateTo(day);
          this.saveCalendar();
        } else {
          this.setDateFrom(day);
        }
      }
    },

    saveCalendar() {
      this.$emit('close', this.localPickedRange);
    },

    closeCalendar() {
      this.$emit('close', null);
    },

    clearPickedRange() {
      this.localPickedRange = DaysPickerFactory.toPickedRange();
    },

    setDateFrom(day) {
      this.clearPickedRange();
      this.localPickedRange.dateFrom = this.generateStringDate(day);
    },

    setDateTo(day) {
      this.localPickedRange.dateTo = this.generateStringDate(day);
    },

    isToday(day) {
      const today = new Date();
      return today.getMonth() === this.currentDate.getMonth() && day === today.getDate();
    },

    isAllowed(day) {
      const dateToCheck = this.generateStringDate(day);
      let inRangeCount = 0;
      if (this.allowedRange.min) {
        if (this.isDateInRange(dateToCheck, this.allowedRange.min, '<')) {
          inRangeCount++;
        }
      }
      if (this.allowedRange.max) {
        if (this.isDateInRange(dateToCheck, this.allowedRange.max, '>')) {
          inRangeCount++;
        }
      }
      return inRangeCount === 0;
    },

    isDateInRange(dateToCheck, checkWith, modifier) {
      if (modifier === '<') {
        return new Date(dateToCheck) < new Date(checkWith);
      } else if (modifier === '>') {
        return new Date(dateToCheck) > new Date(checkWith);
      }
      return false;
    },

    generateStringDate(day, date = this.currentDate) {
      return `${date.getFullYear()}-${this.parseTo2Chars(date.getMonth() + 1)}-${this.parseTo2Chars(day)}`;
    },

    parseTo2Chars(element) {
      if (element.toString().length === 1) {
        return `0${element}`;
      }
      return element;
    },

    isInSelectedRange(day) {
      if (!this.localPickedRange.dateFrom) {
        return false;
      }
      if (this.localPickedRange.dateFrom && this.localPickedRange.dateTo) {
        if (new Date(day) >= new Date(this.localPickedRange.dateFrom) && new Date(day) <= new Date(this.localPickedRange.dateTo)) {
          return true;
        }
      } else if (this.localPickedRange.dateFrom && !this.localPickedRange.dateTo) {
        if (new Date(day) >= new Date(this.localPickedRange.dateFrom) && new Date(day) <= new Date(this.hoveredDay)) {
          return true;
        }
      }
    },
  },
};
</script>

<style
    lang="scss"
    scoped
>

@import '../styles/DaysPicker';

</style>
