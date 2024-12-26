<template>
  <AtmosphereForm
    v-model="atmosphere"
    class="q-mt-md"
  />
</template>

<script setup>

// imports
import AtmosphereForm from 'components/calculators/ballistic/AtmosphereForm.vue'
import { storeToRefs } from 'pinia'
import { useScopeViewStore } from 'stores/scopeview'

const scopeViewStore = useScopeViewStore()
const { atmosphere } = storeToRefs(scopeViewStore)

</script>
