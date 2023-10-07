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
}
</style>
