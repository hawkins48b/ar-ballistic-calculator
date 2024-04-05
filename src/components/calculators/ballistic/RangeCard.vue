<template>
  <q-card
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md full-height"
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
  </q-card>
</template>

<script setup>
import RangeForm from 'components/calculators/ballistic/RangeForm.vue'

</script>
