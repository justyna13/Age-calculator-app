<script setup>
import CalculatorResults from "./components/CalculatorResults.vue";
import CalculatorForm from "./components/CalculatorForm.vue";

</script>

<template>
  <div class="card">
    <CalculatorForm />
    <CalculatorResults />
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
