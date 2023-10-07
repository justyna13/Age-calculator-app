<script setup lang="ts">

const calculate = () => {
  console.log('click')
}
</script>

<template>
  <form @submit.prevent="calculate">
    <label for="age-day">Day</label>
    <input id="age-day" type="number">
    <label for="age-month">Month</label>
    <input id="age-month" type="number">
    <label for="age-year">Year</label>
    <input id="age-year" type="number">

    <div>
      <button type="submit"></button>
    </div>
  </form>
</template>

<style scoped>

</style>
