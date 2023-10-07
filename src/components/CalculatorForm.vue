<script setup lang="ts">
import btnIcon from "../assets/icon-arrow.svg";

const calculate = () => {
  console.log('click')
}
</script>

<template>
  <form @submit.prevent="calculate" class="calculator-form">
    <div class="calculator-form__inputs">
      <div class="calculator-form__inputs__col">
        <label for="age-day">Day</label>
        <input id="age-day" type="number" class="calculator-form__input" placeholder="DD">
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
