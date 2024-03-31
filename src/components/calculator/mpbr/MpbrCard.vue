<template>
  <q-card
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md"
  >
    <q-inner-loading
      :showing="loading"
      color="primary"
    />
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
import { ref } from 'vue'

// set calculation profile
const mpbrStore = useMpbrStore()

const loading = ref(false)

console.log('calculateMpbr', mpbrStore.calculateMpbr())

</script>
