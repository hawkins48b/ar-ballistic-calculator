<template>
  <q-select
    v-model="setupId"
    :options="setupList"
    option-label="name"
    option-value="id"
    map-options
    label="Setup"
  >
    <template #append>
      <q-btn
        round
        dense
        flat
        size="sm"
        icon="edit"
        :to="{name:'edit-setup',params: {setupId}}"
      >
        <template #loading />
      </q-btn>
    </template>
  </q-select>
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
