<script setup lang="ts">

const props = defineProps<{
  days: number | null
  months: number | null
  years: number | null
}>();

</script>

<template>
  <div class="results">
    <div><span>{{ years ?? '--'}}</span> years</div>
    <div><span>{{ months ?? '--'}}</span> months</div>
    <div><span>{{ days ?? '--'}}</span> days</div>
  </div>
</template>

<style scoped lang="scss">
.results {
  color: $clr-black-off;
  font-size: $fs-result;
  font-weight: 800;
  span {
    color: $clr-purple;
  }
  div {
    margin-bottom: 4px;
  }
}
</style>
