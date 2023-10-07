<script setup lang="ts">
import CalculatorResults from "./components/CalculatorResults.vue";
import CalculatorForm from "./components/CalculatorForm.vue";
import { reactive } from "vue";

interface CalculatedResultsType {
  years: number | null,
  months: number | null,
  days: number | null,
}

// Data
const calculatedResults: CalculatedResultsType = reactive({
  years: null,
  months: null,
  days: null,
});


const updateCalculatedResults = (results: CalculatorResults) => {
  calculatedResults.years = results.years ;
  calculatedResults.months = results.months;
  calculatedResults.days = results.days;
}

</script>

<template>
  <div class="card">
    <CalculatorForm @calculated="updateCalculatedResults" />
    <CalculatorResults
      :days="calculatedResults.days"
      :months="calculatedResults.months"
      :years="calculatedResults.years"/>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background-color: $clr-white;
  width: 94%;
  border-radius: 12px 12px 92px 12px;
  max-width: 600px;
  margin: 16px auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  padding: 32px;
}

@media (min-width: 768px) {
  .card {
    margin-top: 48px;
    padding: 32px 26px;
  }
}
</style>
