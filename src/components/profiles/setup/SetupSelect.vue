<template>
  <q-select
    v-model="selectedSetup"
    :options="setupList"
    option-label="name"
    label="Setup"
  />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useSetupStore } from 'src/stores/profiles/setup'
import { ref, watch } from 'vue'

const setupId = defineModel({
  type: Number
})

const selectedSetup = ref(null)

const setupStore = useSetupStore()
const { setupList } = storeToRefs(setupStore)

watch(selectedSetup, () => {
  setupId.value = selectedSetup.value.id
})

</script>
