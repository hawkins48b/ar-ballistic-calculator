<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
  >
    <p class="text-h4">
      Ballistic Calculator
    </p>
    <p>Calculate a bullet trajectory.</p>
    <RangeForm />
  </q-card>
</template>

<script setup>
// imports
import RangeForm from 'components/calculator/ballistic/RangeForm.vue'

</script>
