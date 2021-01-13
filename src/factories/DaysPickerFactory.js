export default class DaysPickerFactory {
  static toSettings(settings = {}) {
    return {
      firstDayOfWeek: settings.firstDayOfWeek || 1,
      closeOnSelect: settings.closeOnSelect || true,
    };
  }

  static toPickedRange(range = {}) {
    return {
      dateFrom: range.dateFrom || null,
      dateTo: range.dateTo || null,
    };
  }

  static toAllowedRange(range = {}) {
    return {
      min: range.min || null,
      max: range.max || null,
    };
  }

  static calendarDays() {
    return {
      lastMonth: [],
      currentMonth: [],
      nextMonth: [],
    };
  }
}
