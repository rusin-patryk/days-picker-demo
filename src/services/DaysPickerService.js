export default class DaysPickerService {
  static setDate(date = new Date(), modifier) {
    if (modifier) {
      switch (modifier) {
        case 'next':
          if (date.getMonth() === 11) {
            return new Date(date.getFullYear() + 1, 0, 1);
          } else {
            return new Date(date.getFullYear(), date.getMonth() + 1, 1);
          }
        case 'prev':
          if (date.getMonth() === 0) {
            return new Date(date.getFullYear() - 1, 11, 1);
          } else {
            return new Date(date.getFullYear(), date.getMonth() - 1, 1);
          }
        default:
          console.error(`Cannot parse data`);
      }
    }
    return date;
  }

  static setWeekDays(weekDays, firstDayOfWeek) {
    if (firstDayOfWeek === 1) {
      const firstDay = weekDays[0];
      weekDays.shift();
      weekDays.push(firstDay);
      return weekDays;
    }
    return weekDays;
  }

  static pushLastMonthDays(currentDate, firstDayOfWeek) {
    const days = [];
    for (let i = this.getFirstMonthDay(currentDate, firstDayOfWeek) - 1; i >= 0; i--) {
      days.push(this.getNumberOfDaysInLastMonth(currentDate) - i);
    }
    return days;
  }

  static pushCurrentMonthDays(currentDate) {
    const days = [];
    for (let i = 1; i <= this.getNumberOfDaysInMonth(currentDate); i++) {
      days.push(i);
    }
    return days;
  }

  static pushNextMonthDays(calendarDays) {
    const previousDaysNumber = calendarDays.currentMonth.length + calendarDays.lastMonth.length;
    const days = [];
    for (let i = 1; i <= 42 - previousDaysNumber; i++) {
      days.push(i);
    }
    return days;
  }

  static getFirstMonthDay(currentDate, firstDayOfWeek) {
    let firstMonthDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() - firstDayOfWeek;
    if (firstMonthDay < 0) {
      firstMonthDay = 6;
    }
    return firstMonthDay;
  }

  static getNumberOfDaysInMonth(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  }

  static getNumberOfDaysInLastMonth(currentDate) {
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    if (month === 0) {
      month = 12;
    }
    return new Date(year - 1, month, 0).getDate();
  }
}
