import { shallowMount } from '@vue/test-utils'
import DaysPicker from '@/components/DaysPicker.vue'

describe('DaysPicker.vue', () => {
  const wrapper = shallowMount(DaysPicker);

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  });
})
