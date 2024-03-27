<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <p class="text-h6">
      Atmospheric conditions
    </p>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6">
        <q-toggle v-model="atmosphere.useISA">
          Use standard atmosphere
        </q-toggle>
        <p>
          The <a
            href="https://en.wikipedia.org/wiki/International_Standard_Atmosphere"
            target="_blank"
          >International Standard Atmosphere (ISA)</a> is set at sea level.
        </p>
        <p>
          <span class="text-bold">Altitude</span> has little to no impact.
        </p>
        <p>
          <span class="text-bold text-h6">Pressure</span> has a big impact.
        </p>
        <p>
          <span class="text-bold text-h6">Temperature</span> has a big impact.
        </p>
        <p>
          <span class="text-bold">Humidity</span> has little to no impact.
        </p>
      </div>
      <div class="col-xs-12 col-sm-6">
        <AtmosphereForm />
      </div>
    </div>
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
