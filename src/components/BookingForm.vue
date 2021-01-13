<template>
  <div class="bookingForm">
    <div class="bookingForm__header">
      <h2
          class="bookingForm__price"
          v-if="price"
      >
        {{ price }} zł
      </h2>
      <div
          class="bookingForm__ratings"
          v-if="rating.average"
      >
        <div
            class="bookingForm__ratings--average"
            :style="{'--rating': rating.average}"
            aria-label="Rating of this product is 2.3 out of 5."
        >
        </div>
        <span class="bookingForm__ratings--total">{{ rating.total }}</span>
      </div>
      <div class="daysPicker__header--line" />
    </div>
    <div class="daysPicker__content">
      <div class="daysPicker__title">Dates</div>
      <div class="daysPicker__form">
        <input
            type="text"
            class="daysPicker__input daysPicker__input--dateFrom"
            placeholder="Check In"
            title="Check In"
            v-model="pickedRange.dateFrom"
            readonly
            @click="toggleCalendar = !toggleCalendar"
        />
        <div class="form-arrow"></div>
        <input
            type="text"
            class="daysPicker__input daysPicker__input--dateTo"
            placeholder="Check Out"
            title="Check Out"
            v-model="pickedRange.dateTo"
            readonly
            @click="toggleCalendar = !toggleCalendar"
        />
      </div>
      <DaysPicker
          v-if="toggleCalendar"
          :status="toggleCalendar"
          :allowed-range="allowedRange"
          :settings="settings"
          :picked-range="pickedRange"
          @close="closeCalendar"
      />
      <div class="daysPicker__error">
        <span v-if="error">{{ error }}</span>
      </div>
    </div>
    <div class="bookingForm__footer">
      <button
          type="button"
          class="bookingForm__button bookingForm__button--reset"
          @click="reset()"
      >
        Reset
      </button>
      <button
          type="button"
          class="bookingForm__button bookingForm__button--submit"
          @click="reservation()"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import DaysPicker from '@/components/DaysPicker';
import DaysPickerFactory from '@/factories/DaysPickerFactory';

export default {
  name: 'BookingForm',
  components: {
    DaysPicker,
  },

  data() {
    return {
      toggleCalendar: false,
      pickedRange: DaysPickerFactory.toPickedRange(),
      error: null,
    };
  },

  props: {
    price: {
      type: Number,
      default: () => null,
    },
    rating: {
      type: Object,
      default: () => {
      },
    },
    settings: {
      type: Object,
      default: () => DaysPickerFactory.toSettings(),
    },
    allowedRange: {
      type: Object,
      default: () => {
      },
    },
  },

  methods: {
    closeCalendar(pickedRange) {
      if (pickedRange) {
        this.pickedRange = pickedRange;
      }
      this.toggleCalendar = false;
    },

    reservation() {
      this.error = null;
      if (!this.pickedRange.dateFrom || !this.pickedRange.dateTo) {
        this.error = 'Wymagane jest uzupełnienie formularza';
        return;
      }
      this.$emit('reservation', this.pickedRange);
    },

    reset() {
      this.error = null;
      this.pickedRange = DaysPickerFactory.toPickedRange();
      this.$emit('reservation', this.pickedRange);
    },
  },
};
</script>

<style
    lang="scss"
    scoped
>

@import '../styles/BookingForm';

</style>
