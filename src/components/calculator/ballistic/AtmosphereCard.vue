<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <p class="text-h6">
      Atmospheric Conditions
    </p>
    <AtmosphereForm class="q-mt-md" />
  </q-card>
</template>

<script setup>
// imports
import AtmosphereForm from 'components/calculator/ballistic/AtmosphereForm.vue'
</script>
