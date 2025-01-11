<template>
  <q-select
    v-model="setupId"
    :options="setupList"
    option-label="name"
    option-value="id"
    map-options
    label="Setup"
  />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useSetupStore } from 'src/stores/profiles/setup'

const setupId = defineModel({
  type: Number
})

const setupStore = useSetupStore()
const { setupList } = storeToRefs(setupStore)

</script>
