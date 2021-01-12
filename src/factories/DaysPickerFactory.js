export default class DaysPickerFactory {
  static toSettings(settings = {}) {
    return {
      firstDayOfWeek: settings.firstDayOfWeek || 1,
      closeOnSelect: settings.closeOnSelect || true,
      closeOnClickOutside: settings.closeOnClickOutside || true,
      baseColor: settings.baseColor || '#21DCB2',
    };
  }

  static toPickedRange(range = {}) {
    return {
      dateFrom: range.dateFrom || null,
      dateTo: range.dateTo || null,
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
