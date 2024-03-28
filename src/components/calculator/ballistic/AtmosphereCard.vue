<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <p class="text-h6">
      Atmospheric Conditions
    </p>

    <q-toggle v-model="atmosphere.useISA">
      Use standard atmosphere
    </q-toggle>

    <AtmosphereForm class="q-mt-md" />
  </q-card>
</template>

<script setup>
// imports
import AtmosphereForm from 'components/calculator/ballistic/AtmosphereForm.vue'
import { storeToRefs } from 'pinia'
import { useCalculatorStore } from 'stores/calculator'

// calculator store
const calculatorStore = useCalculatorStore()

const { atmosphere } = storeToRefs(calculatorStore) // International Standard Atmosphere (ISA)

</script>
