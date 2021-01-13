import {shallowMount} from '@vue/test-utils';
import DaysPicker from '@/components/DaysPicker.vue';

describe('DaysPicker.vue', () => {
  const wrapper = shallowMount(DaysPicker);

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('check current date is correct', () => {
    const currentDate = new Date().toISOString().split('.')[0];

    expect(wrapper.vm.$data.currentDate.toISOString().split('.')[0]).toBe(currentDate);
  });

  it('check is calendar days data generated correctly', () => {
    DaysPicker.methods.setWeekDays(wrapper.vm.$data.weekDays, 0);
    const days = wrapper.vm.$data.calendarDays.lastMonth.length
      + wrapper.vm.$data.calendarDays.currentMonth.length
      + wrapper.vm.$data.calendarDays.nextMonth.length;
    expect(days).toBe(42);
  });

  it('check is component generated days of current month correctly', () => {
    const currentMonthDays = wrapper.findAll('.daysPicker__day--currentMonth');
    const numberOfDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    expect(currentMonthDays.length).toBe(numberOfDays);
  });

  it('check is component generated all days correctly', () => {
    const allDays = wrapper.findAll('.daysPicker__day');

    expect(allDays.length).toBe(42);
  });

  it('calls selectDay function when day is clicked', () => {

    const selectDay = jest.spyOn(wrapper.vm, 'selectDay');

    wrapper.find('.today').trigger('click');

    expect(selectDay).toHaveBeenCalled();
  });

  it('calls changeDate function when prev button is clicked', () => {

    const changeDate = jest.spyOn(wrapper.vm, 'changeDate');

    wrapper.find('.daysPicker__changeDate--prev').trigger('click');

    expect(changeDate).toHaveBeenCalled();
  });

  it('calls changeDate function when next button is clicked', () => {

    const changeDate = jest.spyOn(wrapper.vm, 'changeDate');

    wrapper.find('.daysPicker__changeDate--next').trigger('click');

    expect(changeDate).toHaveBeenCalled();
  });
});
