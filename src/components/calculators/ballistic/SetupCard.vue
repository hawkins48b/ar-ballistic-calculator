<template>
  <q-card>
    <q-card-section>
      <setupSelect v-model="setupId" />
    </q-card-section>
  </q-card>
</template>

<script setup>
// imports
import SetupSelect from 'components/profiles/setup/SetupSelect.vue'
import { useBallisticStore } from 'stores/ballistic'
import { storeToRefs } from 'pinia'

// set calculation profile
const ballisticStore = useBallisticStore()
const { setupId } = storeToRefs(ballisticStore)
</script>
