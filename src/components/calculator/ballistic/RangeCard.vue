<template>
  <q-card
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md full-height"
  >
    <p class="text-h6">
      Range
    </p>
    <RangeForm />
  </q-card>
</template>

<script setup>
import RangeForm from 'components/calculator/ballistic/RangeForm.vue'

</script>
