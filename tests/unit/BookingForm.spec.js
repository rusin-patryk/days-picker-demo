import { shallowMount } from '@vue/test-utils'
import BookingForm from '@/components/BookingForm.vue'

describe('BookingForm.vue', () => {
  const wrapper = shallowMount(BookingForm);

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  });
})
