<template>
  <zroCard
    class="full-height"
  >
    <div class="text-h6">
      <q-icon
        name="tune"
        size="lg"
        class="q-mr-sm"
      />
      Range
    </div>
    <RangeForm />
  </zroCard>
</template>

<script setup>
import zroCard from 'components/zroCard.vue'
import RangeForm from 'components/calculators/ballistic/RangeForm.vue'

</script>
