import {shallowMount} from '@vue/test-utils';
import BookingForm from '@/components/BookingForm.vue';

describe('BookingForm.vue', () => {
  const wrapper = shallowMount(BookingForm);

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('check is error null', () => {
    BookingForm.methods.reservation();
    expect(wrapper.vm.$data.error).toBe(null);
  });

  it('calls reset function when reset button is clicked', () => {

    const reset = jest.spyOn(wrapper.vm, 'reset');

    wrapper.find('.bookingForm__button--reset').trigger('click');

    expect(reset).toHaveBeenCalled();
  });

  it('calls reservation function when reservation button is clicked', () => {

    const reservation = jest.spyOn(wrapper.vm, 'reservation');

    wrapper.find('.bookingForm__button--submit').trigger('click');

    expect(reservation).toHaveBeenCalled();
  });
});
