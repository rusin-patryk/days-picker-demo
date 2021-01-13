<template>
  <div class="bookingForm">
    <header class="bookingForm__header">
      <h2
          v-if="price"
          class="bookingForm__price"
      >
        {{ price }} zł
      </h2>
      <div
          v-if="rating.average"
          class="bookingForm__ratings"
      >
        <div
            :style="{'--rating': rating.average}"
            aria-label="Rating of this product is 2.3 out of 5."
            class="bookingForm__ratings--average"
        >
        </div>
        <span class="bookingForm__ratings--total">{{ rating.total }}</span>
      </div>
      <div class="daysPicker__header--line" />
    </header>
    <section class="daysPicker__content">
      <div class="daysPicker__title">Dates</div>
      <div class="daysPicker__form">
        <input
            v-model="pickedRange.dateFrom"
            class="daysPicker__input daysPicker__input--dateFrom"
            placeholder="Check In"
            readonly
            title="Check In"
            type="text"
            @click="toggleCalendar = !toggleCalendar"
        />
        <div class="form-arrow"></div>
        <input
            v-model="pickedRange.dateTo"
            class="daysPicker__input daysPicker__input--dateTo"
            placeholder="Check Out"
            readonly
            title="Check Out"
            type="text"
            @click="toggleCalendar = !toggleCalendar"
        />
      </div>
      <DaysPicker
          v-if="toggleCalendar"
          :allowed-range="allowedRange"
          :picked-range="pickedRange"
          :settings="settings"
          @close="closeCalendar"
      />
      <div class="daysPicker__error">
        <span v-if="error">{{ error }}</span>
      </div>
    </section>
    <footer class="bookingForm__footer">
      <button
          class="bookingForm__button bookingForm__button--reset"
          type="button"
          @click="reset()"
      >
        Reset
      </button>
      <button
          class="bookingForm__button bookingForm__button--submit"
          type="button"
          @click="reservation()"
      >
        Submit
      </button>
    </footer>
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
        return {
          average: null,
          total: null,
        };
      },
    },
    settings: {
      type: Object,
      default: () => DaysPickerFactory.toSettings(),
    },
    allowedRange: {
      type: Object,
      default: () => DaysPickerFactory.toAllowedRange(),
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
      if (!this.pickedRange || !this.pickedRange.dateFrom || !this.pickedRange.dateTo) {
        this.error = 'It is required to complete the form.';
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
