<script setup lang="ts">
import btnIcon from "../assets/icon-arrow.svg";
import { computed, reactive, ref, watch } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, integer, helpers, between } from '@vuelidate/validators'

// Data
const formData = reactive({
  day: null,
  month: null,
  year: null
});

// Emits
const emits = defineEmits<{
  calculated: [Function],
  reset: [Function]
}>();

// Validation
const getMinMaxDayRange = () => {
  const minDay = 1;

  if (!formData.month || !formData.year) {
    return between(minDay, 31)
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  if (Number(formData.year) === currentYear && Number(formData.month) === currentMonth) {
    return between(minDay, currentDay)
  }

  const maxDay = new Date(formData.year, formData.month, 0).getDate()
  return between(minDay, maxDay)
}

const getMinMaxMonthRange = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  if (Number(formData.year) === currentYear) {
    const currentMonth = now.getMonth() + 1;
    return between(1, currentMonth)
  }
  return between(1, 12)
}

const rules = computed(() => ({
  day: {
    required: helpers.withMessage('Day is required', required),
    integer: helpers.withMessage('Entered value is invalid', integer),
    between: helpers.withMessage( 'Entered value is invalid', getMinMaxDayRange()),
  },
  month: {
    required: helpers.withMessage('Month is required', required),
    integer: helpers.withMessage('Entered value is invalid', integer),
    between: helpers.withMessage('Entered value is invalid', getMinMaxMonthRange()),
  },
  year: {
    required: helpers.withMessage('Year is required', required),
    integer: helpers.withMessage('Entered value is invalid', integer),
    between: helpers.withMessage('Entered value is invalid', between(1, 2023)),
  }
}))

const v$ = useVuelidate(rules, formData)

// Methods
const calculate = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    // notify user form is invalid
    return
  }

  const now = new Date();
  const birthDate = new Date(`${formData.year}-${formData.month}-${formData.day}`);

  //Get the Timestamp
  const now_time_stamp = now.getTime();
  const birthDate_time_stamp = birthDate.getTime();

  let calc;

  //Check which timestamp is greater
  if (now_time_stamp > birthDate_time_stamp) {
    calc = new Date(now_time_stamp - birthDate_time_stamp);
  } else {
    calc = new Date(birthDate_time_stamp - now_time_stamp);
  }
  //Retrieve the date, month and year
  const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
  //Convert to an array and store
  const calcFormat = calcFormatTmp.split("-");
  //Subtract each member of our array from the default date
  const days_passed = Number(Math.abs(calcFormat[0]) - 1);
  const months_passed = Number(Math.abs(calcFormat[1]) - 1);
  const years_passed = Number(Math.abs(calcFormat[2]) - 1970);

  emits('calculated', {days: days_passed, months: months_passed, years: years_passed});
}

const resetForm = () => {
  emits('calculated', {days: null, months: null, years: null});
}

watch(formData, () => {
  resetForm()
})
</script>

<template>
  <form @submit.prevent="calculate" class="calculator-form" novalidate>
    <div class="calculator-form__inputs">
      <div class="calculator-form__inputs__col">
        <label for="age-day">Day</label>
        <input
          v-model="formData.day"
          id="age-day"
          type="text"
          class="calculator-form__input"
          :class="{'invalid': v$.day.$error}"
          placeholder="DD"
          @blur="v$.day.$touch">
        <p v-if="v$.day.$errors.length" class="input-error">{{ v$.day.$errors[0].$message}}</p>
      </div>
      <div class="calculator-form__inputs__col">
        <label for="age-month">Month</label>
        <input
          v-model="formData.month"
          id="age-month"
          type="text"
          class="calculator-form__input"
          :class="{'invalid': v$.month.$error}"
          placeholder="MM"
          @blur="v$.month.$touch()">
        <p v-if="v$.month.$errors.length" class="input-error">{{ v$.month.$errors[0].$message}}</p>
      </div>
      <div class="calculator-form__inputs__col">
        <label for="age-year">Year</label>
        <input
          v-model="formData.year"
          id="age-year"
          type="text"
          class="calculator-form__input"
          :class="{'invalid': v$.year.$error}"
          placeholder="YY"
          @blur="v$.year.$touch()">
        <p v-if="v$.year.$errors.length" class="input-error">{{ v$.year.$errors[0].$message}}</p>
      </div>
    </div>

    <div class="calculator-form__btn">
      <button type="submit" @click="calculate">
        <img :src="btnIcon" alt="">
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.calculator-form {
  label {
    display: block;
  }

  &__inputs {
    display: flex;
    gap: 48px;

    &__col {
      width: 120px;
      max-width: 30%;
    }

    label {
      font-size: .7rem;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: $clr-grey-smokey;
      margin-bottom: 8px;
    }
  }

  &__input {
    width: 100%;
    border-radius: 4px;
    box-shadow: none;
    border: 1px solid $clr-grey-light;
    height: 24px;
    padding: 8px;
    color: $clr-black-off;
    font-weight: 800;
    font-size: 1rem;

    &::placeholder {
      color: $clr-grey-smokey;
    }

    &:focus {
      outline: none !important;
      border-color: $clr-purple;
    }

    &.invalid,
    &.invalid:focus {
      border-color: $clr-red-light;
    }
  }

  &__btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;

    &:before {
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: $clr-grey-light;
      content: "";
      z-index: 0;
    }

    button {
      background-color: $clr-purple;
      border-radius: 50%;
      border: none;
      padding: 12px;
      z-index: 1;
      cursor: pointer;
    }

    img {
      height: 30px;
    }
  }
  .input-error {
    color: $clr-red-light;
    font-size: .7rem;
  }
}
</style>
