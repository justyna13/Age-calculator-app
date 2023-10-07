<script setup>
import CalculatorResults from "./components/CalculatorResults.vue";
import CalculatorForm from "./components/CalculatorForm.vue";

</script>

<template>
  <div>
    <CalculatorForm />
    <CalculatorResults />
  </div>
</template>

<style lang="scss">
body {
  background-color: $clr-purple;
}
</style>
