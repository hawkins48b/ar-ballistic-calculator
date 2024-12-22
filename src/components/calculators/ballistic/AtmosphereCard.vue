<template>
  <zroCard>
    <div class="text-h6">
      <q-icon
        name="cloud"
        size="lg"
        class="q-mr-sm"
      />
      Atmospheric Conditions
    </div>
    <AtmosphereForm class="q-mt-md" />
  </zroCard>
</template>

<script setup>
// imports
import AtmosphereForm from 'components/calculators/ballistic/AtmosphereForm.vue'
import zroCard from 'components/zroCard.vue'
</script>
