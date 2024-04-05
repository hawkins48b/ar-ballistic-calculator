<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <div class="text-h6">
      <q-icon
        name="cloud"
        size="lg"
        class="q-mr-sm"
      />
      Atmospheric Conditions
    </div>
    <AtmosphereForm class="q-mt-md" />
  </q-card>
</template>

<script setup>
// imports
import AtmosphereForm from 'components/calculators/ballistic/AtmosphereForm.vue'
</script>
