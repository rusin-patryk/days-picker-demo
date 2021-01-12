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
}
