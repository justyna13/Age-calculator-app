<script setup lang="ts">
import btnIcon from "../assets/icon-arrow.svg";
import { reactive } from "vue";

const emits = defineEmits<{
  calculated: [Function],
  reset: [Function]
}>();

const formData = reactive({
  day: null,
  month: null,
  year: null
});


const calculate = () => {
  const now = new Date();
  const birthDate = new Date('1984-09-24');

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


  console.log(years_passed, months_passed, days_passed)

  emits('calculated', { days: days_passed, months: months_passed, years: years_passed});
}

const resetForm = () => {
  emits('calculated', { days: null, months: null, years: null});
}
</script>

<template>
  <form @submit.prevent="calculate" class="calculator-form">
    <div class="calculator-form__inputs">
      <div class="calculator-form__inputs__col">
        <label for="age-day">Day</label>
        <input v-model="formData.day" id="age-day" type="number" class="calculator-form__input" placeholder="DD">
      </div>
      <div class="calculator-form__inputs__col">
        <label for="age-month">Month</label>
        <input id="age-month" type="number" class="calculator-form__input" placeholder="MM">
      </div>
      <div class="calculator-form__inputs__col">
        <label for="age-year">Year</label>
        <input id="age-year" type="number" class="calculator-form__input" placeholder="YY">
      </div>
    </div>

    <div class="calculator-form__btn">
      <button type="submit">
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
    -moz-appearance: textfield;
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
}
</style>
