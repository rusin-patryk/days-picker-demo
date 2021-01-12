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

  it('check is calendar days generated correctly', () => {
    DaysPicker.methods.setWeekDays(wrapper.vm.$data.weekDays, 0);
    const days = wrapper.vm.$data.calendarDays.lastMonth.length
      + wrapper.vm.$data.calendarDays.currentMonth.length
      + wrapper.vm.$data.calendarDays.nextMonth.length;
    expect(days).toBe(42);
  });
});
