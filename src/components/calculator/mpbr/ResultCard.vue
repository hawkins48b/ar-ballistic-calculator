<template>
  <q-card
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md"
  >
    <q-card-section>
      <p class="text-h6">
        No results
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup>
// imports
import { useMpbrStore } from 'stores/mpbr'

// set calculation profile
const mpbrStore = useMpbrStore()

console.log('calculateMpbr', mpbrStore.calculateMpbr())

</script>
